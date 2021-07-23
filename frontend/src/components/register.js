import React, { Component } from "react";
import axios from "axios";
import NasaNav from "./Nav";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  // Add componentDidMount()
  componentDidMount() {}
  // Main variable to render items on the screen
  // Submit an item
  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/register/", this.state)
      .then((respose) => {
        window.location = "/login";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Create item
  // -I- Start by visual effects to viewer
  render() {
    const { username, email, password } = this.state;
    return (
      <div>
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
              <span className="input-group-addon">
                <i
                  className="glyphicon glyphicon-user"
                  style={{ color: "red" }}
                >
                  Required. 150 characters or fewer. Letters, digits and
                  @/./+/-/_ only.
                </i>
              </span>
            </div>
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
