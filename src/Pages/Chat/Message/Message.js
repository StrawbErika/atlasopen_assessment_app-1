import React from "react";
import styles from "./style.module.scss";
import { Grid, Paper, Avatar } from "@material-ui/core";
export default function Message({ user, message, messageStyle, showAvatar }) {
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
          <p
            className={
              showAvatar
                ? styles.displayName
                : `${styles.displayName} ${styles.invisible}`
            }
          >
            {user.displayName}
          </p>
        </Grid>
        <Grid item xs={12} className={styles.wholeMessage}>
          <Grid container direction={messageStyle.rowDirection}>
            {showAvatar ? (
              <div style={{ [messageStyle.marginDirection]: "10px" }}>
                <Avatar src={user.photoURL} alt={user.displayName} />
              </div>
            ) : (
              <div
                style={{
                  [messageStyle.marginDirection]: "10px",
                  opacity: "0",
                }}
              >
                <Avatar src={user.photoURL} alt={user.displayName} />
              </div>
            )}
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

              <p className={styles.timestamp}> {reformatDate()}</p>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
