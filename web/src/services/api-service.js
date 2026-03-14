import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost/3000/api",
  withCredentials: true
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

//--- Autenticación --------------------

export function register(user) {
  return http.post("/users", user);
}

export function login(email, password) {
  return http.post("/sessions", {email, password});
}

export function logout() {
  return http.delete("/sessions");
}