import http from "./httpRequest";

import jwtDecode from "jwt-decode";
const apiEndpoint = "/auth";
const token = "token";

http.setJwt(getJwt());

export async function login(user) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email: user.userName,
    password: user.password,
  });
  localStorage.setItem(token, jwt);
}

export function logout() {
  localStorage.removeItem(token);
}
export function loginWithJwt(jwt) {
  localStorage.setItem(token, jwt);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(token);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(token);
}
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
