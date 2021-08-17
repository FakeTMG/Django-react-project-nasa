import React, { Component } from "react";
import axios from "axios";
import NasaNav from "./Nav";
import Cookies from "js-cookie";
import TwitterLogin from "react-twitter-login";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  TwitterauthHandler = (err, data) => {
    console.log(err, data);
    if (data) {
      const TwitterLogin = {
        access_token_key: data.oauth_token,
        access_token_secret: data.oauth_token_secret,
      };
      axios
        .post("social_auth/twitter/", TwitterLogin)
        .then((res) => {
          Cookies.set("access", res.data.tokens.access);
          Cookies.set("refresh", res.data.tokens.refresh);
          window.location = "/";
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      document.getElementById("error").innerText = err;
    }
  };

  responseFacebook = (response) => {
    console.log(response);
    const FacebookLogin = {
      auth_token: response.accessToken,
    };
    axios
      .post("social_auth/facebook/", FacebookLogin)
      .then((res) => {
        Cookies.set("access", res.data.tokens.access);
        Cookies.set("refresh", res.data.tokens.refresh);
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  responseGoogle = (response) => {
    console.log(response);
    const GoogleLogin = {
      auth_token: response.tokenId,
    };
    axios
      .post("social_auth/google/", GoogleLogin)
      .then((res) => {
        Cookies.set("access", res.data.tokens.access);
        Cookies.set("refresh", res.data.tokens.refresh);
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  displayResend = () => {
    document.getElementById("wait").innerText =
      "Wait 60 seconds to be able to resend the verification email again";
    setTimeout(() => {
      document.getElementById(
        "resend"
      ).innerText = `Click here to resend the e-mail.`;
      document.getElementById("wait").innerText = "";
    }, 60000);
    setTimeout(() => {
      document.getElementById("error").innerText = "";
    }, 30000);
  };

  Resend = (e) => {
    e.preventDefault();
    axios.post("auth/request-resend-email/", this.state).then((response) => {});
    this.setState({ error: "" });
    document.getElementById(
      "error"
    ).innerText = `We have resent you the verification link !`;
    document.getElementById("resend").innerText = "";
    this.displayResend();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("auth/login/", this.state)
      .then((res) => {
        Cookies.set("access", res.data.tokens.access);
        Cookies.set("refresh", res.data.tokens.refresh);
        window.location = "/";
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data.detail) {
          if (error.response.data.detail === "Email is not verified") {
            document.getElementById("or").innerText = "or ";
            document.getElementById(
              "resend"
            ).innerText = `Click here to resend the e-mail.`;
            document.getElementById("error").innerText =
              error.response.data.detail +
              "! Click Resend Verification E-mail to resend the email";
            document.getElementById("EmailSpan").innerText = "";
          } else {
            document.getElementById("error").innerText =
              error.response.data.detail;
            document.getElementById("EmailSpan").innerText = "";
          }
        } else if (error.response.data.email) {
          document.getElementById("EmailSpan").innerText =
            error.response.data.email;
        } else {
          document.getElementById("error").innerText =
            "Wrong E-mail or Password! ";
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
        {Cookies.get("access") ? (
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
                  <span
                    id="EmailSpan"
                    className="input-group-addon"
                    style={{ color: "red" }}
                  ></span>
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
                  <span
                    id="PassworSpan"
                    className="input-group-addon"
                    style={{ color: "red" }}
                  ></span>
                </div>
                <div>
                  <a href="forgot">Forgot Password ? </a>
                  <span id="or"></span>
                  <div>
                    <a href="#" id="resend" onClick={this.Resend}>
                      <i aria-hidden="true"></i>
                    </a>
                    <p id="wait"></p>
                  </div>
                </div>
                <button onClick={this.handleSubmit} className="btn btn-primary">
                  Submit
                </button>
              </form>
              <br />
              <div>
                <TwitterLogin
                  authCallback={this.TwitterauthHandler}
                  consumerKey="umw1Y8WgJKEh1Uzx9bIcWutoZ"
                  consumerSecret="asba"
                />
                <FacebookLogin
                  appId="asba"
                  fields="name,email,picture"
                  callback={this.responseFacebook}
                  icon="fa-facebook"
                />
                <GoogleLogin
                  clientId="asba"
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default login;
