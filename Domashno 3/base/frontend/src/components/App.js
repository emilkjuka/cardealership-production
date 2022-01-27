import React, { Component } from "react";
import { render } from "react-dom";
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
