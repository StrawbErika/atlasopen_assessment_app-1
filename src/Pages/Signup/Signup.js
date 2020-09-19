import React, { useState, useEffect } from "react";
import "./Signup.css";
import { useFirebaseApp } from "reactfire";

const Signup = () => {
  const axios = require("axios");
  // Import firebase
  const firebase = useFirebaseApp();

  const [dog, setDog] = useState("");
  // User State
  const [user, setUser] = useState({
    nickname: "",
    email: "",
    password: "",
    avatar: dog,
    error: "",
  });

  const fetchDogImage = async () => {
    let response = "";
    try {
      response = await axios.get("https://random.dog/woof.json");
      return response.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  // onChange function
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  useEffect(() => {
    setDogImage();
  });

  async function setDogImage() {
    let dogImage = await fetchDogImage();
    setDog(dogImage);
  }

  // Submit function (Create account)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        // Update the nickname
        result.user.updateProfile({
          displayName: user.nickname,
        });

        const myURL = { url: "http://localhost:3000/" };

        // Send Email Verification and redirect to my website.
        result.user
          .sendEmailVerification(myURL)
          .then(() => {
            setUser({
              ...user,
              verifyEmail: `Welcome ${user.nickname}. To continue please verify your email.`,
            });
          })
          .catch((error) => {
            setUser({
              ...user,
              error: error.message,
            });
          });

        // Sign Out the user.
        firebase.auth().signOut();
      })
      .catch((error) => {
        // Update the error
        setUser({
          ...user,
          error: error.message,
        });
      });
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
        <button
          type="submit"
          onClick={() => {
            console.log("yeah still clicked dont worri");
          }}
        >
          Sign Up
        </button>
      </form>
      {user.error && <h4>{user.error}</h4>}
    </>
  );
};

export default Signup;
