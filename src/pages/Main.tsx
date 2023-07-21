import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import useAxios from "axios-hooks";
import { doc, setDoc } from "firebase/firestore";
import * as React from "react";
import MultiselectInput from "../components/MultiselectInput";
import { useAuthContext } from "../firebase/auth/AuthContext";
import { db } from "../firebase/config";

const apiDogListAllUrl = "https://dog.ceo/api/breeds/list/all";

interface ApiListAllDogBreedsResponse {
  message: {};
  status: string;
}

export default function Main() {
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

  function handleChange(event: SelectChangeEvent<string[]>) {
    const {
      target: { value },
    } = event;

    setSelected(
      typeof value === "string" ? value.split(",") : value // On autofill we get a stringified value.
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
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
        {user && (
          <Button
            onClick={() => {
              handleSave({ userId: user.uid, breeds: selected });
            }}
          >
            SAVE
          </Button>
        )}
      </Box>
    </Container>
  );
}

async function handleSave({
  userId,
  breeds,
}: {
  userId: string;
  breeds: string[];
}) {
  try {
    await setDoc(doc(db, "users", userId), {
      favorite_breeds: breeds,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
