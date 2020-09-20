import React, { useState, Component } from "react";
import { useUser, useFirestoreCollectionData, useFirestore } from "reactfire";
import { Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import "firebase/auth";

export default function Dashboard() {
  const messageCollection = useFirestore().collection("messages");
  const msg = useFirestoreCollectionData(messageCollection);
  const userCollection = useFirestore().collection("users");
  const userDB = useFirestoreCollectionData(userCollection);

  return (
    <div>
      <div className={styles.navBar}>
        <Grid container direction="row" justify="space-between">
          <Grid>
            <h1>Dashboard</h1>
          </Grid>
          <Grid>
            <Link to="/chat">
              <h1>Chat Page</h1>
            </Link>
          </Grid>
        </Grid>
      </div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid>
          <h2 className={styles.title}>Analytics</h2>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid>
            <Paper className={styles.paper}>
              <p className={styles.name}>Messages</p>
              <p>{msg.length}</p>
            </Paper>
          </Grid>
          <Grid>
            <Paper className={styles.paper}>
              <p className={styles.name}>Users</p>
              <p>{userDB.length}</p>{" "}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
