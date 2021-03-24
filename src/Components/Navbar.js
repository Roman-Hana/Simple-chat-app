import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Grid, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import "./btn.css";

const Navbar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  return (
    <AppBar color="secondary" position="static">
      <Toolbar variant="dense">
        <Grid container justify={"space-around"} style={{ padding: 5 }}>
          <h1 style={{ fontFamily: "Pacifico, cursive" }}>Simple chat room</h1>
          {user ? (
            <Button onClick={() => auth.signOut()} className="btn-grad">
              Log out
            </Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button className="btn-grad">Login page</Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
