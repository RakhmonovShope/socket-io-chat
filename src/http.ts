import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: { Authorization: `Bearer ${accessToken}` },
});

export default instance;
