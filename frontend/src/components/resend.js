import React, { Component } from "react";
import axios from "axios";
import NasaNav from "./Nav";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      visibility: "display",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  Resend = (e) => {
    e.preventDefault();
    axios.post("auth/request-resend-email/", this.state).then((response) => {
      document.getElementById(
        "verification"
      ).innerText = `We have sent you a verification link to activate your account, please verify otherwise you won't be able to log in ! 
          If you did not receive it, please verify the e-mail you provided or check your spam !`;
      this.setState({ visibility: "hidden" });
      document.getElementById(
        "wait"
      ).innerHTML = `Wait 60 Seconds To Be Able To Resend The Verification E-mail again.`;
      setTimeout(() => {
        this.setState({ display: "display" });
        document.getElementById("wait").innerHTML = "";
      }, 60000);
      console.log('asba')
    });
  };

  // Create item
  // -I- Start by visual effects to viewer
  render() {
    const { email } = this.state;
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
              <h3>Resend E-mail Verification </h3>
              <p>
                Please enter the following details as explained to resend your
                verification e-mail.
              </p>
              <p id="verification" style={{ color: "red" }}></p>
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
                </div>
                <button
                  id="submit"
                  style={{ visibility: this.state.visibility }}
                  onClick={this.Resend}
                  className="btn btn-primary"
                >
                  Submit
                </button>
                <p id="wait"></p>
              </form>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default App;
