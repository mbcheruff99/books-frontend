import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000" // for local dev
    : "https://bookshelf-q8nj.onrender.com"; // your deployed backend

const api = axios.create({
  baseURL,
  withCredentials: true,  
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },         
});

export default api;
