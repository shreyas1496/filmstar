import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Films from "./films/Films";

function App() {
  return (
    <Router>
    <Route path="/" exact component={Films} />
    <Route path="/film-detail/" component={About} />
    <Route path="/users/" component={Users} />
</Router>
  );
}

export default App;
