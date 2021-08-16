import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreatorInfo from "./components/CreatorInfo";
import HomePage from "./components/HomePage";
import WrongPage from "./components/WrongPage";
import Comments from "./components/Comments";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Forgot from "./components/Forgot";
import Change from "./components/Change";
import ChangePass from "./components/change-password";
import login from "./components/login";
import register from "./components/register";
import { connect } from "react-redux";
import { fetchUsers } from "./redux";

class App extends Component {
  componentDidMount() {
    fetchUsers();
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/creatorinfo" component={CreatorInfo} />
          <Route path="/comments" component={Comments} />
          <Route path="/login" component={login} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/change" component={Change} />
          <Route path="/settings/password" component={ChangePass} />
          <Route path="/register" component={register} />
          <Route path="/" component={WrongPage} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
