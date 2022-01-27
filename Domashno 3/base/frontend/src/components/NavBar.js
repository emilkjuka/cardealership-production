import React, { Component } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="navbar">
        <Link to={"/"} className="navbar__item" className="navbar__logo">
          <div className="navbar__item">
            <img src="https://img.icons8.com/fluency/48/000000/car.png" />
          </div>
        </Link>
        <Link
          to={"/"}
          className="navbar__item"
          style={{ textDecoration: "none" }}
        >
          <Button>Home</Button>
        </Link>
        <Link
          to={"/aboutus"}
          className="navbar__item"
          style={{ textDecoration: "none" }}
        >
          <Button>About Us</Button>
        </Link>
        <Link
          to={"/contact"}
          className="navbar__item"
          style={{ textDecoration: "none" }}
        >
          <Button>Contact</Button>
        </Link>
      </header>
    );
  }
}
