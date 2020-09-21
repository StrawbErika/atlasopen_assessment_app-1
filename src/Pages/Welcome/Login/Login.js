import React, { useState } from "react";
import { useFirebaseApp } from "reactfire";
import { TextField, Button } from "@material-ui/core";
import styles from "./style.module.scss";

import "firebase/auth";

//TODO convert this to a functional component to use firebase hooks
export default function Login() {
  const firebase = useFirebaseApp();
  const [user, setUser] = useState({
    email: "",
    password: "",
    error: "",
  });

  // onChange function
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signedIn = await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password);
      if (!signedIn.user.emailVerified) {
        setUser({
          ...user,
          error: "Please verify your email before to continue",
        });
      }
    } catch (error) {
      setUser({
        ...user,
        error: error.message,
      });
    }
  };
  return (
    <div className={styles.login}>
      <p>Log In</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          className={styles.input}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="text"
          name="email"
          onChange={handleChange}
        />
        <TextField
          className={styles.input}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <Button variant="outlined" color="primary" type="submit">
          Log in
        </Button>
      </form>
      {user.error && <h4>{user.error}</h4>}
    </div>
  );
}
