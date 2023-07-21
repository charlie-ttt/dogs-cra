import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import * as React from "react";
import CardList, { ImageData } from "../components/CardList";
import { useAuthContext } from "../firebase/auth/AuthContext";
import { db } from "../firebase/config";

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
  const [dogBreedImages, setDogBreedImages] = React.useState<DogBreedImages[]>(
    []
  );

  // fetch user fav breeds
  React.useEffect(() => {
    async function fetchFavoriteBreeds() {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBreeds(docSnap.data().favorite_breeds);
          console.log("Document data:", docSnap.data());
        }
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
            return <CardList images={imagesData} />;
          })}
      </Box>
    </Container>
  );
}

export default Feed;
