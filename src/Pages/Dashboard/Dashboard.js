import React from "react";
import { useFirestoreCollectionData, useFirestore } from "reactfire";
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
            <p>Dashboard</p>
          </Grid>
          <Grid>
            <Link style={{ textDecoration: "none" }} to="/chat">
              <p className={styles.link}>Chat Page</p>
            </Link>
          </Grid>
        </Grid>
      </div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid>
          <p className={styles.title}>Analytics</p>
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
