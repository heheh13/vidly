import http from "./httpRequest";
import { api } from "../config.json";
export function register(user) {
  return http.post(api + "users", {
    email: user.userName,
    password: user.password,
    name: user.name,
  });
}
