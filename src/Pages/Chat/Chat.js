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
  useEffect(() => {
    updateScroll();
  }, []);

  const updateScroll = () => {
    var element = document.getElementById("chat");
    if (element) {
      element.scrollTo(0, element.scrollHeight);
    }
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
      <div className={styles.chatContainer} id="chat">
        {user.emailVerified ? (
          <div>
            {msg.length < 1 ? (
              <div></div>
            ) : (
              <Grid container direction="column-reverse">
                {_.sortBy(msg, "timestamp")
                  .reverse()
                  .map((message, index) => {
                    if (message.user === user.uid) {
                      return (
                        <Grid key={index}>
                          <Message
                            user={user}
                            message={message}
                            messageStyle={{
                              rowDirection: "row-reverse",
                              alignment: "flex-end",
                              marginDirection: "marginLeft",
                              color: "pink",
                            }}
                          />
                        </Grid>
                      );
                    } else {
                      return (
                        <Grid key={index}>
                          <Message
                            user={
                              userDB.filter(
                                (users) => users.id === message.user
                              )[0]
                            }
                            message={message}
                            messageStyle={{
                              rowDirection: "row",
                              alignment: "flex-start",
                              marginDirection: "marginRight",
                              color: "#f1f0f0",
                            }}
                          />
                        </Grid>
                      );
                    }
                  })}
              </Grid>
            )}
          </div>
        ) : (
          <div> Yeah verify ur email bruh then refresh</div>
        )}
      </div>
      <Grid container direction="column" justify="space-evenly" spacing={1}>
        <Grid>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
        </Grid>
        <Grid>
          <Grid>
            <Button
              variant="contained"
              onClick={() => {
                if (newMessage !== "") {
                  messageCollection.doc(uuidv4()).set({
                    user: user.uid,
                    message: newMessage,
                    timestamp: Math.floor(Date.now() / 1000),
                  });
                  setNewMessage("");
                }
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Logout />
    </div>
  );
}
