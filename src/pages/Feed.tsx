import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import CardImage, { ImageData } from "../components/CardImage";
import { useAuthContext } from "../firebase/auth/AuthContext";
import {
  LikedPhotos,
  getUserDataAction,
  updatePhotoAction,
} from "../firebase/firestore-action";

interface ApiListDogImagesByBreedsResponse {
  message: string[];
  status: string;
}

interface DogBreedImages {
  breedName: string;
  images: string[];
}

function Feed() {
  const user = useAuthContext();

  const [breeds, setBreeds] = React.useState<string[]>([]);
  const [likedPhotos, setLikedPhotos] = React.useState<LikedPhotos>({});
  const [dogBreedImages, setDogBreedImages] = React.useState<DogBreedImages[]>(
    []
  );

  console.log("breeds", breeds);
  console.log("likedPhotos:", likedPhotos);

  // fetch user fav breeds
  React.useEffect(() => {
    async function fetchFavoriteBreeds() {
      if (!user) return;
      const data = await getUserDataAction(user.uid);
      if (data["favorite_breeds"]) {
        setBreeds(data["favorite_breeds"]);
      }
      if (data["liked_photos"]) {
        setLikedPhotos(data["liked_photos"] || {});
      }
    }
    fetchFavoriteBreeds();
  }, []);

  // fetch images based on user's fav breeds
  React.useEffect(() => {
    if (breeds.length) {
      let promises = [];
      for (let i = 0; i < breeds.length; i++) {
        const breedname = breeds[i];
        promises.push(
          axios
            .get<ApiListDogImagesByBreedsResponse>(
              `https://dog.ceo/api/breed/${breedname}/images/random/3`
            )
            .then((response) => {
              setDogBreedImages((prev) => [
                ...prev,
                {
                  breedName: breedname,
                  images: response.data.message,
                },
              ]);
            })
        );
      }
      Promise.all(promises).then(() => console.log("all done"));
    }
  }, [breeds]);

  async function handleLikePhoto(url: string, userId: string) {
    setLikedPhotos({ ...likedPhotos, [url]: new Date().toISOString() });
    await updatePhotoAction(userId, {
      ...likedPhotos,
      [url]: new Date().toISOString(),
    });
  }

  async function handleUnlikePhoto(url: string, userId: string) {
    const newState = { ...likedPhotos };
    delete newState[url];
    console.log("likedPhotos:", likedPhotos);
    console.log("newState:", newState);
    setLikedPhotos(newState);
    await updatePhotoAction(userId, newState);
  }

  return (
    <Container>
      {user && (
        <>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              View Feed of Your Favorite Breeds
            </Typography>
            <Stack direction="row" spacing={1}>
              {breeds.map((n) => (
                <Chip label={n} />
              ))}
            </Stack>
          </Box>
          <Box>
            {dogBreedImages.length > 0 &&
              dogBreedImages.map(({ breedName, images }) => {
                const imagesData: ImageData[] = images.map((url, index) => ({
                  url: url,
                  title: `${breedName}-${index}`,
                }));

                return (
                  <Box
                    sx={{
                      display: "flex",
                      flex: "wrap",
                      flexDirection: "row",
                      width: "100%",
                      mb: "2rem",
                    }}
                  >
                    {imagesData.map(({ url, title }) => {
                      const isLiked = likedPhotos[url] !== undefined;

                      return (
                        <CardImage
                          url={url}
                          title={title}
                          liked={isLiked}
                          onClick={() => {
                            if (isLiked) {
                              handleUnlikePhoto(url, user.uid);
                            } else {
                              handleLikePhoto(url, user.uid);
                              //
                            }
                          }}
                        />
                      );
                    })}
                  </Box>
                );
              })}
          </Box>
        </>
      )}
    </Container>
  );
}

export default Feed;
