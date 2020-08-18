import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";

class Auth extends Component {
  constructor(props) {
    super();
    this.state = {
      redirect: false,
    };
  }

  componentWillMount() {
    const token = sessionStorage.getItem("token");
    if (token) {
      this.setState({
        loggedIn: true,
      });
    } else {
      this.setState({
        msgBanner: {
          message: "You are not authorised. Please log in",
          show: true,
          type: "warning",
        },
        loggedIn: false,
      });
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <Dashboard />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default Auth;
