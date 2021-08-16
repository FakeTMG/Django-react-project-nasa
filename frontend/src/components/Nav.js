import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { fetchUsers } from "../redux";
import { access, refresh } from "../redux/tokens";
import Cookies from "js-cookie";

function NasaNav({
  isHomePage,
  filterText,
  home,
  creator,
  comment,
  login,
  register,
  userData,
  fetchUsers,
}) {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const logout = (e) => {
    e.preventDefault()
    axios
      .post("auth/logout/", refresh, access)
      .then((res) => {
        Cookies.remove("access");
        Cookies.remove("refresh");
        window.location = "/";
      })
      .catch((error) => console.log(error.response));
  };

  return (
    <div style={{ position: "fixed", top: "0", width: "100%", zIndex: "100" }}>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`${home} nav-link`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`${creator} nav-link`} to="/creatorinfo">
                  Creator Info
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${comment} nav-link`}
                  to="/comments"
                  tabIndex="-1"
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
              {userData.users ? (
                <li
                  className="nav-item dropdown"
                  style={{ marginRight: "100px" }}
                >
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userData.users}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/settings/password">
                        Change Password
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a onClick={logout} className="dropdown-item" href="/">
                        Log out
                      </a>
                    </li>
                  </ul>
                </li>
              ) : (
                <React.Fragment>
                  <li className="nav-item">
                    <Link
                      className={`${register} nav-link`}
                      to="register"
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`${login} nav-link`}
                      to="login"
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      Login
                    </Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(NasaNav);
