import axios from "axios";

// 🔥 Dynamic BASE URL (local + production)
const BASE_URL =
    window.location.hostname === "localhost"
        ? "http://127.0.0.1:8005/api/"
        : "https://jafawais0330.pythonanywhere.com/api/";

// 🔥 Axios instance
const api = axios.create({
    baseURL: BASE_URL,
});

export default api;