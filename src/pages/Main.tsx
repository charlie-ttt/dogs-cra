import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import useAxios from "axios-hooks";
import * as React from "react";
import MultiselectInput from "../components/MultiselectInput";
import SnackBarAlert from "../components/SnackBarAlert";
import { useAuthContext } from "../firebase/auth/AuthContext";

import {
  getUserDataAction,
  updateFavoriteBreedAction,
} from "../firebase/firestore-action";
const apiDogListAllUrl = "https://dog.ceo/api/breeds/list/all";

interface ApiListAllDogBreedsResponse {
  message: {};
  status: string;
}

export default function Main() {
  const [snackbarSuccessOpen, setSnackBarSuccessOpen] = React.useState(false);
  const [snackbarErrorOpen, setSnackBarErrorOpen] = React.useState(false);
  const [options, setOptions] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
  const user = useAuthContext();

  const [{ data, loading }] =
    useAxios<ApiListAllDogBreedsResponse>(apiDogListAllUrl);

  React.useEffect(() => {
    if (data) {
      const { message } = data;
      setOptions(Object.keys(message));
    }
  }, [data]);

  // fetch user fav breeds
  React.useEffect(() => {
    async function fetchFavoriteBreeds() {
      if (!user) return;
      const data = await getUserDataAction(user.uid);
      if (data["favorite_breeds"]) {
        setSelected(data["favorite_breeds"]);
      }
    }
    fetchFavoriteBreeds();
  }, []);

  function handleChange(event: SelectChangeEvent<string[]>) {
    const {
      target: { value },
    } = event;

    setSelected(
      typeof value === "string" ? value.split(",") : value // On autofill we get a stringified value.
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 8 }}>
        Select Your Favorite Dog Breeds
      </Typography>
      {loading ? (
        <>loading...</>
      ) : (
        <MultiselectInput
          allOptions={options}
          selected={selected}
          handleChange={handleChange}
          maxlimit={3}
        />
      )}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        {user && (
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={async () => {
              const { error } = await updateFavoriteBreedAction({
                userId: user.uid,
                breeds: selected,
              });
              if (error) {
                setSnackBarErrorOpen(true);
              } else {
                setSnackBarSuccessOpen(true);
              }
            }}
          >
            Save
          </Button>
        )}
      </Box>
      <Snackbar
        open={snackbarSuccessOpen}
        autoHideDuration={2000}
        onClose={() => {
          setSnackBarSuccessOpen(false);
        }}
      >
        <SnackBarAlert severity="success" sx={{ width: "100%" }}>
          Preferece Saved Successfully!
        </SnackBarAlert>
      </Snackbar>
      <Snackbar
        open={snackbarErrorOpen}
        autoHideDuration={2000}
        onClose={() => {
          setSnackBarErrorOpen(false);
        }}
      >
        <SnackBarAlert severity="error" sx={{ width: "100%" }}>
          Failed to save
        </SnackBarAlert>
      </Snackbar>
    </Box>
  );
}
