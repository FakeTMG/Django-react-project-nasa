/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import axios from "axios";
import NasaNav from "./Nav";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      error: "",
    };
  }

  // Add componentDidMount()
  componentDidMount() {}
  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("auth/register/", this.state)
      .then((response) => {
        this.setState({ error: "" });
        document.getElementById(
          "verification"
        ).innerText = `We have sent you a verification link to activate your account, please verify otherwise you won't be able to log in ! 
          If you did not receive it, please verify the e-mail you provided or check your spam !`;
        this.displayResend();
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data.errors) {
          this.setState({ error: error.response.data });
          document.getElementById("userspan").innerText = "";
        } else if (!error.response.data.errors) {
          document.getElementById("userspan").innerText =
            "This username already exists.";
          this.setState({ error: "" });
        }
      });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  displayResend = () => {
    document.getElementById("resendtext").innerText =
      "Wait 60 seconds to be able to resend the verification email again";
    setTimeout(() => {
      document.getElementById(
        "resend"
      ).innerText = `Click here to resend the e-mail.`;
      document.getElementById("resendtext").innerText = "";
    }, 60000);
    setTimeout(() => {
      document.getElementById("verification").innerText = "";
    }, 30000);
  };

  Resend = (e) => {
    e.preventDefault();
    axios.post("auth/request-resend-email/", this.state).then((response) => {});
    this.setState({ error: "" });
    document.getElementById(
      "verification"
    ).innerText = "We have resent you the verification link !";
    document.getElementById("resend").innerText = "";
    this.displayResend();
  };

  // Create item
  // -I- Start by visual effects to viewer
  render() {
    const { username, email, password } = this.state;
    return (
      <div>
        {localStorage.getItem("access") ? (
          (window.location = "/")
        ) : (
          <React.Fragment>
            <NasaNav register="active" />
            <div className="container">
              <br />
              <br />
              <br />
              <br />
              <br />
              <h3>Register </h3>
              <p>
                Please enter the following details as explained to finish your
                registration.
              </p>
              <p id="verification" style={{ color: "green" }}></p>
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    placeholder="Email address"
                    onChange={this.changeHandler}
                  />
                  <span className="input-group-addon" style={{ color: "red" }}>
                    {this.state.error ? this.state.error.errors.email : null}
                  </span>
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={this.changeHandler}
                  />
                  <span
                    className="input-group-addon"
                    style={{ color: "red" }}
                    id="userspan"
                  >
                    {this.state.error ? this.state.error.errors.username : null}
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
                  <span className="input-group-addon" style={{ color: "red" }}>
                    {this.state.error ? this.state.error.errors.password : null}
                  </span>
                </div>
                <button onClick={this.handleSubmit} className="btn btn-primary">
                  Submit
                </button>
                <div>
                  <a href="#" id="resend" onClick={this.Resend}>
                    <i className="fa fa-phone" aria-hidden="true"></i>
                  </a>
                  <p id="resendtext"></p>
                </div>
              </form>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default App;
