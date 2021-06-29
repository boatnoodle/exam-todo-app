import fetch from "isomorphic-unfetch";
import { API_ENDPOINT } from "utils/constant";

export const useApi = () => {
  const get = async (endpoint) => {
    return await fetch(`${API_ENDPOINT}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  const post = (endpoint, payload) => {
    return fetch(`${API_ENDPOINT}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });
  };

  const put = (endpoint, payload) => {
    return fetch(`${API_ENDPOINT}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });
  };

  const remove = async (endpoint) => {
    return await fetch(`${API_ENDPOINT}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  return { post, put, get, remove };
};
