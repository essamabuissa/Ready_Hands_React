import jwt_decode from "jwt-decode";

import { instance } from "./instance";
import { SET_CURRENT_USER, SET_ERRORS } from "./actionTypes";

export const checkForExpiredToken = () => {
  return dispatch => {
    // Check for token expiration
    const token = localStorage.getItem("token");

    if (token) {
      const currentTimeInSeconds = Date.now() / 1000;

      // Decode token and get user info
      const user = jwt_decode(token);

      // Check token expiration
      if (user.exp >= currentTimeInSeconds) {
        // Set user
        dispatch(setCurrentUser(token));
      } else {
        return logout();
      }
    }
  };
};

export const login = (userData, history) => {
  return async dispatch => {
    try {
      const res = await instance.post("login", userData);
      console.log(res);
      const user = res.data;
      dispatch(setCurrentUser(user.access, history));
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

export const signup = (userData, history, clientorworker, type) => {
  return async dispatch => {
    try {
      console.log(userData);
      const res = await instance.post("register", userData);
      const user = res.data;
      instance.defaults.headers.common.Authorization = `Bearer ${user.tokens.access}`;
      if (type === "worker") {
        await instance.post("worker/create/", clientorworker);
      } else if (type === "client") {
        await instance.post("client/create/", clientorworker);
      }
      dispatch(setCurrentUser(user.tokens.access, history));
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  };
};

const setCurrentUser = (token, history) => {
  return async dispatch => {
    let user = null;
    if (token) {
      localStorage.setItem("token", token);
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      const res = await instance.get("user/profile/");
      user = res.data;
    } else {
      localStorage.removeItem("token");
      delete instance.defaults.headers.common.Authorization;
    }
    dispatch({
      type: SET_CURRENT_USER,
      payload: user,
    });
    if (history) {
      if (user.user.type === "is_worker") {
        history.replace("/worker/dashboard");
      } else {
        history.replace("/client/dashboard");
      }
    }
    dispatch({
      type: SET_ERRORS,
      payload: null,
    });
  };
};

export const logout = () => {
  return setCurrentUser();
};
