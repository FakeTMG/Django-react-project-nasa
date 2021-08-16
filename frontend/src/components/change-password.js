import React, { Component } from "react";
import NasaNav from "./Nav";
import axios from "axios";
import Cookies from "js-cookie";
const config = {
  headers: {
    Authorization: "Bearer " + Cookies.get("access"),
  },
};

export class ChangePass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      old_password: "",
      new_password: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    if (
      document.getElementById("password1").value ===
      document.getElementById("password2").value
    ) {
      e.preventDefault();
      axios
        .patch("auth/change-password/", this.state, config)
        .then((res) => {
          document.getElementById("error").innerText = res.data.message;
        })
        .catch((err) => {
          console.log(err.response.data.old_password);
          {
            err.response.data.old_password
              ? (document.getElementById("error").innerText =
                  err.response.data.old_password)
              : (document.getElementById("error").innerText =
                  err.response.data.new_password);
          }
        });
    } else {
      e.preventDefault();
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
                  type="password"
                  className="form-control"
                  name="old_password"
                  value={this.state.old_password}
                  placeholder="Enter Your Old Password !"
                  onChange={this.changeHandler}
                />
              </div>
              <div className="input-group">
                <input
                  id="password1"
                  type="password"
                  className="form-control"
                  name="new_password"
                  value={this.state.new_password}
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

export default ChangePass;
