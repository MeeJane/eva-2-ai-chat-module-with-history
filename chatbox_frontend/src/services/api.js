import axios from "axios";

function getCSRFToken() {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith("csrftoken="))
        ?.split("=")[1];
}

// 🔥 Dynamic URL
const BASE_URL =
    window.location.hostname === "localhost"
        ? "http://127.0.0.1:8005/api/"
        : "https://jafawais0330.pythonanywhere.com/api/";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// 🔥 CSRF interceptor
api.interceptors.request.use((config) => {
    const csrfToken = getCSRFToken();
    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
});

export default api;