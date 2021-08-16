import Cookies from "js-cookie";

export const access = {
  headers: {
    Authorization: "Bearer " + Cookies.get("access"),
  },
};

export const refresh = {
  refresh: Cookies.get("refresh"),
};
