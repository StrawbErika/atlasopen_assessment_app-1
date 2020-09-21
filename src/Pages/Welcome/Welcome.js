import React, { useState } from "react";
import { Tabs, Tab, Paper } from "@material-ui/core";
import styles from "./style.module.scss";

import Login from "./Login/Login";
import Signup from "./Signup/Signup";
export default function Welcome() {
  const [value, setValue] = useState("login");
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  console.log(value);
  return (
    <div className={styles.welcome}>
      <div className={styles.tab}>
        <Paper square style={{ backgroundColor: "#B7F8DB" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" value={"login"} index={0} />
            <Tab label="Signup" value={"signup"} index={1} />
          </Tabs>
        </Paper>
        {value === "login" ? <Login /> : <Signup />}
      </div>
    </div>
  );
}
