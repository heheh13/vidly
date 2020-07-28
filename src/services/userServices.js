import http from "./httpRequest";
const apiEndpoint = "/users";
export function register(user) {
  return http.post(apiEndpoint, {
    email: user.userName,
    password: user.password,
    name: user.name,
  });
}
