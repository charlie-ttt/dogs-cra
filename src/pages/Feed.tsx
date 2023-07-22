import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
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
  const [favBreeds, setFavBreeds] = React.useState<string[]>([]);
  const [likedPhotos, setLikedPhotos] = React.useState<LikedPhotos>({});
  const [dogBreedImages, setDogBreedImages] = React.useState<DogBreedImages[]>(
    []
  );
  const user = useAuthContext();
  const navigate = useNavigate();

  // redirect to signin page for unauthorized user
  React.useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, []);

  // fetch user fav breeds
  React.useEffect(() => {
    async function fetchFavoriteBreeds() {
      if (!user) return;
      const data = await getUserDataAction(user.uid);
      if (data["favorite_breeds"]) {
        setFavBreeds(data["favorite_breeds"]);
      }
      if (data["liked_photos"]) {
        setLikedPhotos(data["liked_photos"] || {});
      }
    }
    fetchFavoriteBreeds();
  }, []);

  // fetch images based on user's fav breeds
  React.useEffect(() => {
    if (favBreeds.length) {
      let promises = [];
      for (let i = 0; i < favBreeds.length; i++) {
        const breedname = favBreeds[i];
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
      Promise.all(promises).then(() => {});
    }
  }, [favBreeds]);

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
    setLikedPhotos(newState);
    await updatePhotoAction(userId, newState);
  }

  return (
    <>
      {user && (
        <>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 8 }}>
              View Feed of Your Favorite Breeds
            </Typography>
            <Stack direction="row" spacing={1}>
              {favBreeds.map((n) => (
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
                          showButton
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
    </>
  );
}

export default Feed;
