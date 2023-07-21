import { FirebaseError } from "@firebase/util";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";
import { useNavigate } from "react-router-dom";
import signUp from "../../src/firebase/auth/signup";

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const { error } = await signUp(email, password);

    if (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("something went wrong. please try again later");
      }
      return console.log(error);
    }
    // else successful
    navigate("/");
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
            <Typography variant="h4" component="h1" textAlign="center">
              Sign Up
            </Typography>
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
