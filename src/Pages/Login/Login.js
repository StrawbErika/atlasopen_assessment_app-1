import React, { useState, Component } from "react";
import { useFirebaseApp } from "reactfire";
import "firebase/auth";
// import './Signup.css';

// const firebase = useFirebaseApp();

//TODO convert this to a functional component to use firebase hooks
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  handleSubmit = (e) => {
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

  render() {
    return (
      <>
        <h1>Log In</h1>
        <form onSubmit={() => alert("AGHHHH I CANT FIX THIS HELP ME")}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
          />
          <br />
          <button type="submit">Log in</button>
        </form>
        {this.state.error && <h4>{this.state.error}</h4>}
      </>
    );
  }
}

export default Login;
