import React from "react";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Chat from "./Pages/Chat/Chat";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { useUser } from "reactfire";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useParams,
} from "react-router-dom";

//TODO: Add stats dashboard
function App() {
  const user = useUser();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!user ? (
            <div>
              <Signup />
              <Login />
            </div>
          ) : (
            <Redirect to="/chat" />
          )}
        </Route>
        <Route exact path="/chat">
          {user ? <Chat /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/dashboard">
          {user ? <Dashboard /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
