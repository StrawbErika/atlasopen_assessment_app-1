import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Grid, Paper } from "@material-ui/core";

export default function Message({ user, message, timestamp, rowDirection }) {
  const reformatDate = () => {
    const dateObject = new Date(timestamp * 1000);
    const splitDate = dateObject.toLocaleString().split(" "); //2019-12-9 10:30:15
    const month = dateObject.toLocaleString("en-US", { month: "long" });
    const day = dateObject.toLocaleString("en-US", { day: "numeric" });
    const year = dateObject.toLocaleString("en-US", { year: "numeric" });
    const formattedDate = splitDate[1] + " " + month + " " + day + ", " + year;
    return formattedDate;
  };
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
        <Grid container direction={rowDirection}>
          <img
            src={user.photoURL}
            alt={user.displayName}
            className={styles.userImg}
          />
          <Paper className={styles.message}> {message} </Paper>
        </Grid>
        {reformatDate()}
      </Grid>
      {/* </div> */}
    </Grid>
  );
}
