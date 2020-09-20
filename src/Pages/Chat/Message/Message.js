import React from "react";
import styles from "./style.module.scss";
import { Grid, Paper } from "@material-ui/core";

export default function Message({ user, message, rowDirection, alignment }) {
  const reformatDate = () => {
    const dateObject = new Date(message.timestamp * 1000);
    const splitDate = dateObject.toLocaleString().split(" "); //2019-12-9 10:30:15
    const month = dateObject.toLocaleString("en-US", { month: "long" });
    const day = dateObject.toLocaleString("en-US", { day: "numeric" });
    const year = dateObject.toLocaleString("en-US", { year: "numeric" });
    const formattedDate = splitDate[1] + " " + month + " " + day + ", " + year;
    return formattedDate;
  };
  return (
    <div className={styles.messageContainer}>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems={alignment}
        spacing={1}
      >
        <Grid item xs={12}>
          {user.displayName}
        </Grid>
        <Grid item xs={12}>
          <Grid container direction={rowDirection}>
            <div className={styles.imgContainer}>
              <img src={user.photoURL} alt={user.displayName} />
            </div>
            <Paper className={styles.message}> {message.message} </Paper>
          </Grid>
        </Grid>
        {reformatDate()}
      </Grid>
    </div>
  );
}
