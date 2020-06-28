import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Films from "./films/Films";
import FilmDetail from "./film-detail/FilmDetail";

function App() {
  axios.defaults.baseURL = "https://swapi.dev/api/";
  return (
    <Router>
      <Route path="/" exact component={Films} />
      <Route path="/film-detail/:id" component={FilmDetail} />
    </Router>
  );
}

export default App;
