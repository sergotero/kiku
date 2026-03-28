import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api",
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
  return http.post("/sessions", { email, password });
}

export function logout() {
  return http.delete("/sessions");
}

// --- Words ---------------

export function listWords(queryParams) {
  return http.get(`/words`, { params: queryParams, paramsSerializer: { indexes: null } });
}

export function getWordDetail(id) {
  return http.get(`/words/${id}`);
}

// --- Kanjis --------------------

export function listKanjis(queryParams){
  return http.get("/kanjis", { params: queryParams, paramsSerializer: { indexes: null } });
}

export function getKanjiDetail(id) {
  return http.get(`/kanjis/${id}`);
}

//--- Reports ----------------

export function createReport(report){
  return http.post(`/reports`, report);
}