import React from "react";
import signUp from "../../src/firebase/auth/signup";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { FirebaseError } from "@firebase/util";

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const { result, error } = await signUp(email, password);
    if (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("something went wrong. please try again later");
      }
      return console.log(error);
    }
    // else successful
    console.log(result);
    // return router.push("/");
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleForm} className="form">
          <Stack spacing={2} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              required
              id="email"
              label="email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              required
              id="password"
              type="password"
              label="password"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                type="submit"
                disabled={email === "" || password === ""}
              >
                Sign up
              </Button>
            </Box>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </Stack>
        </form>
      </Box>
    </Container>
  );
}

export default SignUp;
