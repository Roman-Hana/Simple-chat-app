import React, { useContext } from "react";
import { Container, Grid, Box } from "@material-ui/core";
import { Context } from "../index";
import firebase from "firebase";
import "./Login.css";
import logo from "../google-plus-4.svg";

const Login = () => {
  const { auth } = useContext(Context);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
  };
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 66 }}
        alignItems="center"
        justify="center"
      >
        <Grid
          style={{ width: 400, backgroundColor: "lightgray", borderRadius: 10 }}
          container
          alignItems="center"
          direction="column"
        >
          <Box p={5}>
            <button onClick={login} className="btnGoogle">
              <img src={logo} alt="logo" style={{ marginLeft: 5 }} />
              &nbsp;&nbsp;Sign In with Google
            </button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
