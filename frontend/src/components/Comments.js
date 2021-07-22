import React, { Component } from "react";
import Modal from "./Modal";
import axios from "axios";
import NasaNav from "./Nav";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal:false,
      activeItem: {
        message: "",
        created_dt: "",
      },
      taskList: [],
    };
  }

  // Add componentDidMount()
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios //Axios to send and receive HTTP requests
      .get("http://localhost:8000/api/tasks/")
      .then((res) => this.setState({ taskList: res.data }))
      .catch((err) => console.log(err));
  };
  // Main variable to render items on the screen
  renderItems = () => {
    return this.state.taskList.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span className={`todo-title mr-2 `}>
          <h4>Created by : Anonymous<span style={{fontSize: "12px"}}> {item.created_dt}</span> </h4> {item.message}
        </span>
        <span>
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
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    // if new post to submit
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then((res) => this.refreshList());
  };

  // Delete item
  handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then((res) => this.refreshList());
  };

  // Create item
  createItem = () => {
    const item = { message: "", created_dt: "" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  //Edit item
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  // -I- Start by visual effects to viewer
  render() {
    return (
      <div>
        <NasaNav comment='active' />
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
export default App;
