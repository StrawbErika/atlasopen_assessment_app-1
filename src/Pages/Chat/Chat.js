import React, { useEffect, useState } from "react";
import { useUser, useFirestoreCollectionData, useFirestore } from "reactfire";
import Logout from "./../Login/Logout";
import Message from "./Message/Message";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { TextField, Button, Grid } from "@material-ui/core";
import "firebase/auth";
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
    <div className={styles.chatPage}>
      <div className={styles.navBar}>
        <Grid container direction="row" justify="space-between">
          <Grid>
            <h1>Chat Page</h1>
          </Grid>
          <Grid>
            <Link to="/dashboard">
              <h1>Dashboard</h1>
            </Link>
          </Grid>
        </Grid>
      </div>
      <div className={styles.chatContainer}>
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
                        key={index}
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-start"
                      >
                        <Grid>
                          <Message
                            user={user}
                            message={message}
                            rowDirection={"row"}
                            alignment={"flex-start"}
                          />
                        </Grid>
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid
                        key={index}
                        container
                        direction="column"
                        justify="space-evenly"
                        alignItems="flex-end"
                      >
                        <Grid>
                          <Message
                            user={
                              userDB.filter(
                                (users) => users.id === message.user
                              )[0]
                            }
                            message={message}
                            rowDirection={"row-reverse"}
                            alignment={"flex-end"}
                          />
                        </Grid>
                      </Grid>
                    );
                  }
                })}
              </div>
            )}
          </Grid>
        ) : (
          <div> Yeah verify ur email bruh</div>
        )}
      </div>
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

      <Logout />
    </div>
  );
}
