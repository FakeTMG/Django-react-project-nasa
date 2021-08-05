export const access = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access"),
  },
};

export const refresh = {
  refresh: localStorage.getItem("refresh"),
};
