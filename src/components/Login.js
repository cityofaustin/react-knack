import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  formStyles,
  pageStyles,
  buttonStyles,
  inputStyles,
  labelStyles,
  errorMessageStyles
} from "../styles/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestMade: false,
      email: "",
      password: "",
      loginError: false,
      isLoggedIn: false
    };
  }

  knackRemoteLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const headers = { "Content-type": "application/json" };
    axios
      .post(
        `https://api.knack.com/v1/applications/${this.props.appId}/session`,
        { email, password, headers }
      )
      .then(res => this.props.setKnackUserToken(res.data.session.user.token))
      .then(this.setState({ isLoggedIn: true }))
      .catch(error => {
        this.setState({ loginError: true });
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (this.props.knackUserToken) {
      return <Redirect to="/" />;
    }
    return (
      <div className={pageStyles}>
        <p className={errorMessageStyles}>
          {this.state.loginError ? "Email or password incorrect." : ""}
        </p>
        <h1>Login</h1>
        <form
          className={formStyles}
          onSubmit={this.knackRemoteLogin.bind(this)}
        >
          <label className={labelStyles} htmlFor="email">
            Email
          </label>
          <input
            className={inputStyles}
            onChange={this.handleChange}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
          <label className={labelStyles} htmlFor="password">
            Password
          </label>
          <input
            className={inputStyles}
            onChange={this.handleChange}
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <button className={buttonStyles} type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
