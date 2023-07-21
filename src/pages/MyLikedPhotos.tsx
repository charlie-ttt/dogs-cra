import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CardImage from "../components/CardImage";
import { useAuthContext } from "../firebase/auth/AuthContext";
import { LikedPhotos, getUserDataAction } from "../firebase/firestore-action";

interface ApiListDogImagesByBreedsResponse {
  message: string[];
  status: string;
}

interface DogBreedImages {
  breedName: string;
  images: string[];
}

function MyLikedPhotos() {
  const user = useAuthContext();

  const [likedPhotos, setLikedPhotos] = React.useState<LikedPhotos>({});

  // fetch user fav breeds
  React.useEffect(() => {
    async function fetchFavoriteBreeds() {
      if (!user) return;
      const data = await getUserDataAction(user.uid);
      if (data["liked_photos"]) {
        setLikedPhotos(data["liked_photos"] || {});
      }
    }
    fetchFavoriteBreeds();
  }, []);

  return (
    <Box>
      {user && (
        <Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 8 }}>
              Photos I liked
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {Object.keys(likedPhotos).map((url) => {
              return <CardImage url={url} title={url} liked={true} />;
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MyLikedPhotos;
