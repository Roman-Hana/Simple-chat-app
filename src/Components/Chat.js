import React, { useContext, useState } from "react";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase";
import { Container, Grid, Button, TextField, Avatar } from "@material-ui/core";
import { Scrollbars } from "react-custom-scrollbars";
import Loader from "./Loader";
import "./btn.css";

const Chat = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );

  const sendMessage = async () => {
    firestore.collection("messages").add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue("");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 66 }}
        alignItems={"center"}
        justify={"center"}
      >
        <Scrollbars
          style={{
            width: "80%",
            height: "50vh",
            overflowY: "hidden",
            backgroundImage:
              "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
            borderRadius: "15px",
          }}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          universal={true}
        >
          {messages.map((message) => (
            <div
              style={{
                margin: 20,
                padding: 10,
                borderRadius:
                  user.uid === message.uid
                    ? "15px 15px 2px 15px"
                    : "2px 15px 15px 15px",
                marginLeft: user.uid === message.uid ? "auto" : "10px",
                width: "fit-content",
                backgroundImage:
                  user.uid === message.uid
                    ? "linear-gradient(-225deg, #65379B 0%, #886AEA 53%, #6457C6 100%)"
                    : "linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%)",
                color: "white",
              }}
            >
              <Grid container style={{ padding: "10px" }}>
                <Avatar src={message.photoURL} />
                <div style={{ margin: "0px 15px 0px 15px" }}>
                  {message.displayName}
                </div>
              </Grid>
              <div style={{ margin: "0px 15px 0px 15px" }}>{message.text}</div>
            </div>
          ))}
        </Scrollbars>
        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          style={{ width: "80%" }}
        >
          <TextField
            fullWidth
            style={{
              padding: 20,
              borderRadius: "15px",
              backgroundImage:
                "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
            }}
            rowsMax={2}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <Button
            onClick={sendMessage}
            className="btn-grad"
            style={{ marginTop: "5px" }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
