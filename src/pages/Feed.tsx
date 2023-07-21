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
  getUserData,
  likePhoto,
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
  console.log("🚀 ~ Feed ~ likedPhotos:", likedPhotos);
  const [dogBreedImages, setDogBreedImages] = React.useState<DogBreedImages[]>(
    []
  );

  // fetch user fav breeds
  React.useEffect(() => {
    async function fetchFavoriteBreeds() {
      if (!user) return;
      const data = await getUserData(user.uid);
      console.log("data: ", data);
      setBreeds(data["favorite_breeds"]);
      setLikedPhotos(data["liked_photos"]);
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

  console.log("dogBreedImages", dogBreedImages);

  return (
    <Container>
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
        {dogBreedImages.length &&
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
                {imagesData.map(({ url, title }) => (
                  <CardImage
                    url={url}
                    title={title}
                    onClick={() => {
                      if (user) {
                        likePhoto(user.uid, { hello: "123" });
                      }
                    }}
                  />
                ))}
              </Box>
            );
          })}
      </Box>
    </Container>
  );
}

export default Feed;
