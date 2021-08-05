import React, { Component } from "react";
import axios from "axios";
import NasaNav from "./Nav";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("auth/login/", this.state)
      .then((res) => {
        localStorage.setItem("access", res.data.tokens.access);
        localStorage.setItem("refresh", res.data.tokens.refresh);
        window.location = "/";
      })
      .catch((error) => {
        document.getElementById("error").innerText = "Wrong E-mail or Password! ";
        if (error.response.data.detail) {
          document.getElementById("or").innerText = "or ";
          document.getElementById("resend").innerText =
            "Resend Verification E-mail ?";
        } else if (error.response.data.email) {
          document.getElementById("EmailSpan").innerText = error.response.data.email;
        }
      });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        {localStorage.getItem("access") ? (
          (window.location = "/")
        ) : (
          <React.Fragment>
            <NasaNav login="active" />
            <div className="container">
              <br />
              <br />
              <br />
              <br />
              <br />
              <h3>Log in</h3>
              <p>Please enter the following details as explained to login.</p>
              <p id="error" style={{ color: "red" }}></p>
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    placeholder="email"
                    onChange={this.changeHandler}
                  />
                  <span id='EmailSpan' className="input-group-addon" style={{ color: "red" }}>
                  </span>
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={this.changeHandler}
                  />
                  <span id='PassworSpan' className="input-group-addon" style={{ color: "red" }}>
                  </span>
                </div>
                <div>
                  <a href="forgot">Forgot Password ? </a>
                  <span id="or"></span>
                  <a href="resendemail" id="resend"></a>
                </div>
                <button onClick={this.handleSubmit} className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default login;
