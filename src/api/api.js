import axios from "axios";

// Allows get requests to be written in /... format without localhost and .json

const api = axios.create({
  baseURL: "http://localhost:3000", 
  withCredentials: true,  
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },         
});

export default api;
