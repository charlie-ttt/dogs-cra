import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import useAxios from "axios-hooks";
import * as React from "react";
import MultiselectInput from "../components/MultiselectInput";

interface ListAllDogBreedsResponse {
  message: {};
  status: string;
}

export default function Main() {
  const [options, setOptions] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);

  const [{ data, loading }] = useAxios<ListAllDogBreedsResponse>(
    "https://dog.ceo/api/breeds/list/all"
  );

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
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Dog App
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
      </Box>
    </Container>
  );
}
