import axios from "axios";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./userTypes";
import { access, refresh } from "../tokens";
import Cookies from "js-cookie";

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios
      .get("auth/user/", access)
      .then((response) => {
        // response.data is the users
        const users = response.data.username;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        if (Cookies.get("refresh")) {
          axios.post("auth/token/refresh/", refresh).then((res) => {
            Cookies.set("access", res.data.access);
            document.location.reload();
          });
        } else {
          Cookies.remove("access");
          Cookies.remove("refresh");
        }
      });
  };
};

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};
