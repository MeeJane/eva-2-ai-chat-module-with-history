import axios from "axios";

const BASE_URL =
    window.location.hostname === "localhost"
        ? "http://127.0.0.1:8005/api/"
        : "https://jafawais0330.pythonanywhere.com/api/";

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;
