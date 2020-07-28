import http from "./httpRequest";
const apiEndpoint = "/genres";
export function getGenres() {
  return http.get(apiEndpoint);
}
