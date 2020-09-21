import React from "react";
import styles from "./style.module.scss";
import { Grid, Paper } from "@material-ui/core";

export default function Message({ user, message, messageStyle }) {
  // TODO: Check if prev message same user, if yes, dont show user
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
        alignItems={messageStyle.alignment}
        spacing={1}
      >
        <Grid item xs={12}>
          <p className={styles.displayName}>{user.displayName}</p>
        </Grid>
        <Grid item xs={12} className={styles.wholeMessage}>
          <Grid container direction={messageStyle.rowDirection}>
            <div
              className={styles.imgContainer}
              style={{ [messageStyle.marginDirection]: "10px" }}
            >
              <img src={user.photoURL} alt={user.displayName} />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: `${messageStyle.alignment}`,
              }}
            >
              <Paper
                elevation={0}
                style={{ backgroundColor: messageStyle.color }}
                className={styles.message}
              >
                {message.message}
              </Paper>
              <p className={styles.timestamp}>{reformatDate()}</p>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
