import React, { useEffect, useState } from "react";
import { useUser, useFirestoreCollectionData, useFirestore } from "reactfire";
import Logout from "./../Welcome/Login/Logout";
import Message from "./Message/Message";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { TextField, Grid } from "@material-ui/core";
import { SendRounded } from "@material-ui/icons";

import "firebase/auth";
import _ from "lodash";

export default function Chat() {
  const user = useUser();
  const { v4: uuidv4 } = require("uuid");
  const [newMessage, setNewMessage] = useState("");

  const messageCollection = useFirestore().collection("messages");
  const msg = _.sortBy(
    useFirestoreCollectionData(messageCollection),
    "timestamp"
  ).reverse();

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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage !== "") {
      messageCollection.doc(uuidv4()).set({
        user: user.uid,
        message: newMessage,
        timestamp: Math.floor(Date.now() / 1000),
      });
      setNewMessage("");
    }
  };

  return (
    <div className={styles.chatPage}>
      <div className={styles.navBar}>
        <Grid container direction="row" justify="space-between">
          <Grid>
            <p>Chat page of {user.displayName}</p>
          </Grid>
          <Grid>
            <Link
              style={{ textDecoration: "none", color: "#B7F8DB" }}
              to="/dashboard"
            >
              <p>Dashboard</p>
            </Link>
          </Grid>
        </Grid>
      </div>
      <div className={styles.chatContainer} id="chat">
        {msg.length < 1 ? (
          <div> No messages here! </div>
        ) : (
          <Grid container direction="column-reverse">
            {msg.map((message, index) => {
              if (message.user === user.uid) {
                return (
                  <Grid key={index}>
                    <Message
                      user={user}
                      message={message}
                      showAvatar={
                        msg[index + 1]
                          ? msg[index + 1].user !== msg[index].user
                          : true
                      }
                      messageStyle={{
                        rowDirection: "row-reverse",
                        alignment: "flex-end",
                        marginDirection: "marginLeft",
                        color: " #B7F8DB",
                      }}
                    />
                  </Grid>
                );
              } else {
                return (
                  <Grid key={index}>
                    <Message
                      user={
                        userDB.filter((users) => users.id === message.user)[0]
                      }
                      message={message}
                      showAvatar={
                        msg[index + 1]
                          ? msg[index + 1].user !== msg[index].user
                          : true
                      }
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
      <Grid container direction="row" alignItems="center">
        <Grid>
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <TextField
              disabled={!user.emailVerified}
              className={styles.message}
              id="outlined-basic"
              label={
                user.emailVerified
                  ? "Message"
                  : "Kindly verify your email and refresh!"
              }
              variant="outlined"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
            />
          </form>
        </Grid>
        <Grid>
          <SendRounded
            fontSize="large"
            onClick={handleSubmit}
            className={styles.sendButton}
            style={{ color: " #B7F8DB" }}
          />
        </Grid>
      </Grid>

      <Logout />
    </div>
  );
}
