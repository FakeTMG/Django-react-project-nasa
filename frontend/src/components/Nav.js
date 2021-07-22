import React, { Component } from "react";
import { Link } from "react-router-dom";

class NasaNav extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { isHomePage, filterText, home, creator, comment } = this.props;
    return (
      <div
        style={{ position: "fixed", top: "0", width: "100%", zIndex: "100" }}
      >
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              MohamedFM
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`${home} nav-link`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`${creator} nav-link`} to="creatorinfo">
                    Creator Info
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`${comment} nav-link`}
                    to="comments"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Comments
                  </Link>
                </li>
              </ul>
              {isHomePage ? (
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    onChange={filterText}
                  />
                  <i className="glyphicon glyphicon-search"></i>
                </form>
              ) : null}
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`${home} nav-link`}
                    to="register"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`${home} nav-link`}
                    to="login"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NasaNav;
