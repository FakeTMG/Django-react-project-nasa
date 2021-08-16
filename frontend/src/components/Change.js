import React, { Component } from "react";
import NasaNav from "./Nav";
import axios from "axios";

export class Change extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      token: "",
      uidb64: "",
    };
  }

  componentDidMount() {
    const url = window.location.href;
    const first = url.split("uidb64=");
    first.shift();
    const firststring = first.toString();
    const second = firststring.split("&token=");
    const uidb64Array = second.splice(0, 1);
    const TokenArray = second.splice(0);
    const uidb64 = uidb64Array.toString();
    this.setState({ uidb64: uidb64 });
    const token = TokenArray.toString();
    this.setState({ token: token });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (
      document.getElementById("password1").value ===
      document.getElementById("password2").value
    ) {
      axios.patch("auth/password-reset-complete", this.state).then((res) => {
        localStorage.clear();
        window.location = "/login";
      }).catch((err) =>document.getElementById("error").innerText = err.response.data.password )
    } else {
      document.getElementById("error").innerText =
        "Your passwords do not match !";
    }
  };
  render() {
    return (
      <div>
        <NasaNav />
        <React.Fragment>
          <NasaNav login="active" />
          <div className="container">
            <br />
            <br />
            <br />
            <br />
            <br />
            <h3>Change your password</h3>
            <p id="error" style={{ color: "red" }}></p>
            <form>
              <div className="input-group">
                <input
                  id="password1"
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  placeholder="Enter Your Password !"
                  onChange={this.changeHandler}
                />
              </div>
              <div className="input-group">
                <input
                  id="password2"
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Confirm Your Password !"
                />
              </div>
              <button onClick={this.handleSubmit} className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default Change;
