import React, { Component } from "react";
import NasaNav from "./Nav";
import axios from "axios";
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      redirect_url: "http://localhost:3000/change",
    };
  }

  handleSubmit = (e) => {
    axios.post("auth/request-reset-email/", this.state).then((res) => {
      document.getElementById(
        "message"
      ).innerText = `An E-Mail was sent to ${this.state.email} to recover your password \n If you did not receive an e-mail please verify the information you provided ! `;
    });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <NasaNav />
        <br />
        <br />
        <br />
        <br />
        <div>
          <ModalHeader> Password Recovery </ModalHeader>
          <p style={{ marginLeft: "1%" }}>
            Enter your E-Mail to receive the instructions for your password
            recovery
          </p>
          <p id="message" style={{ color: "red", marginLeft: "1%" }}></p>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="description">E-Mail</Label>
                <Input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.changeHandler}
                  placeholder="Enter Your E-Mail"
                />
              </FormGroup>
            </Form>
          </ModalBody>
          {/* create a modal footer */}
          <ModalFooter>
            <Button color="success" onClick={this.handleSubmit}>
              Send
            </Button>
          </ModalFooter>
        </div>
      </div>
    );
  }
}

export default Forgot;
