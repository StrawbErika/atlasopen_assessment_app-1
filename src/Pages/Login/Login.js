import React, { useState, Component } from "react";
import { useFirebaseApp } from "reactfire";
import "firebase/auth";
// import './Signup.css';

// const firebase = useFirebaseApp();

//TODO convert this to a functional component to use firebase hooks
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
  };
  // handleChange = (e) => {
  //     this.setState({
  //       ...this.state,
  //       [e.target.name]: e.target.value,
  //       error: "",
  //     });
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    // firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    //     .then(result => {
    //         if (!result.user.emailVerified) {
    //             this.setState({
    //                 ...this.state,
    //                 error: 'Please verify your email before to continue',
    //             })
    //             firebase.auth().signOut();
    //         }
    //     })
    //     .catch(error => {
    //         // Update the error
    //         this.setState({
    //             ...this.state,
    //             error: error.message,
    //         })
    //     })
  };
  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={() => alert("AGHHHH I CANT FIX THIS HELP ME")}>
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
        <button type="submit">Log in</button>
      </form>
      {error && <h4>{error}</h4>}
    </>
  );
}
