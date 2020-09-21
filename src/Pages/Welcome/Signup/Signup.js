import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { useFirebaseApp, useFirestore } from "reactfire";
import { TextField, Button } from "@material-ui/core";

const Signup = () => {
  const axios = require("axios");
  const firebase = useFirebaseApp();
  const { v4: uuidv4 } = require("uuid");

  const userCollection = useFirestore().collection("users");

  const [dog, setDog] = useState("");
  const [user, setUser] = useState({
    nickname: "",
    email: "",
    password: "",
    error: "",
  });

  useEffect(() => {
    getDogImage();
  }, [getDogImage]);

  async function getDogImage() {
    let dogImage = await fetchDogImage();
    setDog(dogImage);
  }

  const checkDog = (dogImage) => {
    let split = dogImage.split(".");
    let allowed = ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"];
    let x = 0;
    let approved = false;
    while (x < allowed.length) {
      if (split.includes(allowed[x])) {
        approved = true;
      }
      x = x + 1;
    }
    return approved;
  };
  const fetchDogImage = async () => {
    let response = "";
    let dogImage = "";
    try {
      response = await axios.get("https://random.dog/woof.json");
      dogImage = response.data.url.toString();
    } catch (err) {
      console.log(err);
    }
    while (checkDog(dogImage) !== true) {
      try {
        response = await axios.get("https://random.dog/woof.json");
        dogImage = response.data.url.toString();
      } catch (err) {
        console.log(err);
      }
    }
    return dogImage;
  };

  // onChange function
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  // Submit function (Create account)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      // Update the nickname
      createdUser.user.updateProfile({
        displayName: user.nickname,
        photoURL: dog,
      });
      await createdUser.user.sendEmailVerification();
      setUser({
        ...user,
        verifyEmail: `Welcome ${user.nickname}. To continue please verify your email.`,
      });

      // Create the user on database
      await userCollection.doc(uuidv4()).set({
        id: createdUser.user.uid,
        photoURL: dog,
        displayName: user.nickname,
      });
    } catch (error) {
      console.log("error!");
      console.error(error);

      // Update the error
      setUser({
        ...user,
        error: error.message,
      });
    }
  };

  return (
    <div className={styles.signUp}>
      <h1>Sign up</h1>

      <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
        <TextField
          className={styles.input}
          id="outlined-basic"
          label="Nickname"
          variant="outlined"
          type="text"
          name="nickname"
          onChange={handleChange}
        />
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
          Sign Up
        </Button>
      </form>
      {user.error && <h4>{user.error}</h4>}
    </div>
  );
};

export default Signup;
