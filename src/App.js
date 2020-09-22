import React from "react";
import Welcome from "./Pages/Welcome/Welcome";
import Chat from "./Pages/Chat/Chat";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { useUser } from "reactfire";
import { Helmet } from "react-helmet";

import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import welcome from "./Assets/Images/welcome.png";

//TODO: Add stats dashboard
function App() {
  const user = useUser();

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chatterbox </title>
        <meta property="og:title" content="Chatterbox" />

        <meta
          property="og:description"
          content="Chatterbox is a massive chat website where you can converse with people online. Just sign up and start talking!."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={welcome} />
        <meta
          property="og:url"
          content="https://assessment-app-41d0b.web.app"
        />
        <meta property="og:image:width" content="1835" />
        <meta property="og:image:height" content="948" />
        <meta property="twitter:image" content={welcome} />
      </Helmet>

      <Router>
        <Switch>
          <Route exact path="/">
            {!user ? (
              <div>
                <Welcome />
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
    </div>
  );
}

export default App;
