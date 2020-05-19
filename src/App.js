import React from 'react';
import './App.css';
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";
function App() {
  return (
    <div>
    
    <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/chat" component={Chat} />
      </Switch>

    </div>
  );
}

export default App;
