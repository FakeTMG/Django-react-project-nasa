import axios from "axios";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./userTypes";
import { access, refresh } from "../tokens";

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios
      .get("http://127.0.0.1:8000/auth/user/", access)
      .then((response) => {
        // response.data is the users
        const users = response.data.username;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        if (localStorage.getItem('refresh')) {
          axios.post("auth/token/refresh/", refresh).then((res) =>{
            localStorage.setItem("access", res.data.access);
            document.location.reload();
          } )
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
