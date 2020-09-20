import React, { useState, useEffect } from "react";
import "./Signup.css";
import {
  useFirebaseApp,
  useUser,
  useFirestoreCollectionData,
  useFirestore,
} from "reactfire";

const Signup = () => {
  const axios = require("axios");
  const firebase = useFirebaseApp();
  const { v4: uuidv4 } = require("uuid");

  const userCollection = useFirestore().collection("users");
  const users = useFirestoreCollectionData(userCollection);

  // const [id, setId] = useState("");

  const [dog, setDog] = useState("");
  const [user, setUser] = useState({
    nickname: "",
    email: "",
    password: "",
    error: "",
  });

  // @TODO: WARNING! WILL RUN EVERY RENDER.
  // useEffect(() => {
  //   setDogImage();
  // });

  // @TODO\]=======================================0-pol to fix, add an empty array as dependency so it wil only run once (on initial load)
  useEffect(() => {
    getDogImage();
  }, []);

  async function getDogImage() {
    let dogImage = await fetchDogImage();
    setDog(dogImage);
  }

  const checkDog = (dogImage) => {
    let split = dogImage.split(".");
    let allowed = ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"];
    let x = 0;
    let approved = false;
    while (approved != true) {
      if (split[split.length - 1] === allowed[x]) {
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

    while (checkDog(dogImage) != true) {
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

      // Sign Out the user.
      // firebase.auth().signOut();
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
    <>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nickname"
          name="nickname"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
      {user.error && <h4>{user.error}</h4>}
    </>
  );
};

export default Signup;
