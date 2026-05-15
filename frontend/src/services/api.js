import axios from "axios";

const API = axios.create({
  baseURL: "https://hirehub-job-portal-cwz8.onrender.com",
});

export default API;