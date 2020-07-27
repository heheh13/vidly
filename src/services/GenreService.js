import http from "./httpRequest";
const apiEndpoint = "http://localhost:3900/api/genres";
export function getGenres() {
  return http.get(apiEndpoint);
}
