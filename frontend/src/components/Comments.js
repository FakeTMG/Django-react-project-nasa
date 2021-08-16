import React, { Component } from "react";
import Modal from "./Modal";
import axios from "axios";
import NasaNav from "./Nav";
import { access } from "../redux/tokens";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      CommentsList: [],
      activeItem: {
        message: "",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios //Axios to send and receive HTTP requests
      .get("api/comments/")
      .then((res) => {
        this.setState({ CommentsList: res.data });
      });
  };
  // Main variable to render items on the screen
  renderItems = () => {
    return this.state.CommentsList.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2 `}>
          <h4 id={item.id}>
            Created by : {item.created_by}
            <span style={{ fontSize: "12px" }}> {item.created_dt}</span>
          </h4>
          {item.message}
        </span>
        <span>
          {item.created_by === this.props.userData.users ? (
            <div>
              <button
                onClick={() => this.editItem(item)}
                className="btn btn-secondary mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => this.handleDelete(item)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          ) : null}
        </span>
      </li>
    ));
  };
  ////add this after modal creation
  toggle = () => {
    //add this after modal creation
    this.setState({ modal: !this.state.modal }); //add this after modal creation
  };
  // Submit an item
  handleSubmit = (item) => {
    this.toggle();
    if (item.id) {
      // if old post to edit and submit
      axios
        .put(`api/comments/${item.id}/`, item, access)
        .then((res) => this.refreshList());
      return;
    }
    // if new post to submit
    axios
      .post("api/comments/", item, access)
      .then((res) => {
        this.refreshList();
      });
  };

  // Delete item
  handleDelete = (item) => {
    if (item.id) {
      axios
        .delete(`api/comments/${item.id}/`, access)
        .then((res) => this.refreshList());
    } else {
      window.location = "/login";
    }
  };

  // Create item
  createItem = () => {
    if (this.props.userData.users) {
      const item = {
        message: "",
      };
      this.setState({ activeItem: item, modal: !this.state.modal });
    } else {
      window.location = "/login";
    }
  };

  //Edit item
  editItem = (item) => {
    if (this.props.userData.users) {
      this.setState({ activeItem: item, modal: !this.state.modal });
    } else {
      window.location = "/login";
    }
  };

  // -I- Start by visual effects to viewer
  render() {
    return (
      <div>
        <NasaNav comment="active" />
        <br />
        <br />
        <main className="content">
          <h1 className="text-black text-uppercase text-center my-4">
            Comments
          </h1>
          <div className="row ">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add Comment
                </button>
              </div>
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
          {this.state.modal ? (
            <Modal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
        </main>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Comments);
