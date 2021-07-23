import React, { Component } from "react";
import axios from "axios";
import NasaNav from "./Nav";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/login/", this.state)
      .then((respose) => {
        localStorage.setItem("status", "logged");
        localStorage.setItem(
          "username",
          JSON.parse(respose.config.data).username
        );
        window.location = "/";
      })
      .catch((error) => {
        document.getElementById("error").innerText =
          "Wrong email/password (email,password are required )";
        this.setState({ username: "", password: "" });
      });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
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
                name="username"
                value={username}
                placeholder="Username"
                onChange={this.changeHandler}
              />
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
            </div>
            <button onClick={this.handleSubmit} className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default App;
