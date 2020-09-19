import React, { useEffect, useState } from "react";

//HINT https://github.com/FirebaseExtended/reactfire
import { useUser, useFirestoreCollectionData, useFirestore } from "reactfire";
import Logout from "./../Login/Logout";
import Message from "./Message/Message";
import styles from "./style.module.scss";
import "firebase/auth";

//HINT
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { TextField, Button, Grid } from "@material-ui/core";

export default function Chat() {
  // TODO: Display messages from chat and submit messages
  const user = useUser();
  const { v4: uuidv4 } = require("uuid");

  const messageCollection = useFirestore().collection("messages");
  const msg = useFirestoreCollectionData(messageCollection);

  // const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="flex-start"
      >
        {msg.length < 1 ? (
          <div></div>
        ) : (
          <div>
            {msg.reverse().map((message, index) => {
              return (
                <Message key={index} user={user} message={message.message} />
              );
            })}
          </div>
        )}
        <Grid md={12}>
          <TextField onChange={handleChange} />
        </Grid>
        <Grid md={12}>
          <Button
            variant="contained"
            onClick={() => {
              messageCollection
                .doc(uuidv4())
                .set({ user: user.uid, message: newMessage });
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>

      <Logout />
    </div>
  );
}
