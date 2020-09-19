import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Grid, Paper } from "@material-ui/core";

export default function Message({ user, message }) {
  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="flex-start"
      container
      spacing={1}
    >
      <Grid item xs={12}>
        {user.displayName}
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className={styles.userImg}
          />
          <Paper className={styles.message}> {message} </Paper>
        </Grid>
      </Grid>
      {/* </div> */}
    </Grid>
  );
}
