// Main State stored here and Routes
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import localforage from "localforage";
import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Trainer from "./containers/trainer";
import Student from "./containers/student";
import Home from "./components/Home/Home";

function App() {
  // Store global state like user here
  const [student, setStudent] = useState({});
  const [trainer, setTrainer] = useState({});

  useEffect(() => {
    localforage.getItem("usertype").then(type => {
      localforage.getItem("user").then(storedUser => {
        type === "trainer" ? setTrainer(storedUser) : setStudent(storedUser);
      });
    });
  }, []);

  return (
    <Router>
      <Navbar
        setTrainer={setTrainer}
        trainerData={trainer}
        setStudent={setStudent}
        studentData={student}
      />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">
          <Login setTrainer={setTrainer} setStudent={setStudent} />
        </Route>

        <Route path="/trainer/">
          <Trainer trainerData={trainer} />
          <Redirect to="/trainer/dashboard" />
        </Route>

        <Route path="/student/">
          <Student studentData={student} />
          <Redirect to="/student/dashboard" />
        </Route>

        
      </Switch>
    </Router>
  );
}

export default App;
