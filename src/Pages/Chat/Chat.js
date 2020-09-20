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
import _ from "lodash";

export default function Chat() {
  const user = useUser();
  const { v4: uuidv4 } = require("uuid");
  const [newMessage, setNewMessage] = useState("");

  const messageCollection = useFirestore().collection("messages");
  const msg = useFirestoreCollectionData(messageCollection);
  const userCollection = useFirestore().collection("users");
  const userDB = useFirestoreCollectionData(userCollection);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };
  return (
    <div>
      <h1>Chat Page</h1>
      {user.emailVerified ? (
        <Grid container direction="column" justify="space-evenly">
          {msg.length < 1 ? (
            <div></div>
          ) : (
            <div>
              {_.sortBy(msg, "timestamp").map((message, index) => {
                if (message.user === user.uid) {
                  return (
                    <Grid
                      container
                      direction="column"
                      justify="space-evenly"
                      alignItems="flex-start"
                    >
                      <Grid>
                        <Message
                          key={index}
                          user={user}
                          message={message.message}
                          timestamp={message.timestamp}
                          rowDirection={"row"}
                        />
                      </Grid>
                    </Grid>
                  );
                } else {
                  return (
                    <Grid
                      container
                      direction="column"
                      justify="space-evenly"
                      alignItems="flex-end"
                    >
                      <Grid>
                        <Message
                          key={index}
                          user={
                            userDB.filter(
                              (users) => users.id === message.user
                            )[0]
                          }
                          message={message.message}
                          timestamp={message.timestamp}
                          rowDirection={"row-reverse"}
                        />
                      </Grid>
                    </Grid>
                  );
                }
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
                messageCollection.doc(uuidv4()).set({
                  user: user.uid,
                  message: newMessage,
                  timestamp: Math.floor(Date.now() / 1000),
                });
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      ) : (
        <div> Yeah verify ur email bruh</div>
      )}
      <Logout />
    </div>
  );
}
