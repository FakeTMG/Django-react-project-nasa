import React, { Component } from "react";
import Nav from "./Nav";

class login extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div class="container">
          <br />
          <br />
          <br />
          <br />
          <br />
          <h3>Login </h3>
          <p>Please enter your email and password as explained.</p>
          <form>
            <div class="input-group">
              <input
                id="email"
                type="text"
                class="form-control"
                name="email"
                placeholder="Email"
              />
              <span class="input-group-addon">
                <i class="glyphicon glyphicon-user"></i>
              </span>
            </div>
            <div class="input-group">
              <input
                id="password"
                type="password"
                class="form-control"
                name="password"
                placeholder="Password"
              />
              <span class="input-group-addon">
                <i class="glyphicon glyphicon-lock"></i>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default login;
