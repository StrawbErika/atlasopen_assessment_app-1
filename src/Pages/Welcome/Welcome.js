import React, { useState } from "react";
import { Tabs, Tab, Paper } from "@material-ui/core";
import styles from "./style.module.scss";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

// Welcome page has renders login and signup depending on the tab that is selected
export default function Welcome() {
  const [selected, setSelected] = useState("login");
  const handleChange = (event, newValue) => {
    setSelected(newValue);
  };

  return (
    <div className={styles.welcome}>
      <div className={styles.textContainer}>
        <p>Welcome to</p>
        <p className={styles.chatterbox}> Chatterbox</p>
      </div>
      <div className={styles.tab}>
        <Paper square style={{ backgroundColor: "#B7F8DB" }}>
          <Tabs
            value={selected}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" value={"login"} index={0} />
            <Tab label="Signup" value={"signup"} index={1} />
          </Tabs>
        </Paper>
        <div hidden={selected !== "login"}>
          <Login />
        </div>
        <div hidden={selected !== "signup"}>
          <Signup />{" "}
        </div>
      </div>
    </div>
  );
}
