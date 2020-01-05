import React from "react";
import { Navbar } from "react-bootstrap";
import logo from "../logo.svg";
class Navigation extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Twitter Sentiment Analysis
        </Navbar.Brand>
      </Navbar>
    );
  }
}
export default Navigation;
