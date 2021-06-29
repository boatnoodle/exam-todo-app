import fetch from "isomorphic-unfetch";
import { API_ENDPOINT } from "utils/constant";

export const usePostApi = (endpoint, payload) => {
  return fetch(`${API_ENDPOINT} ${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  });
};

export const useGetApi = (endpoint) => {
  return fetch(`${API_ENDPOINT} ${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
