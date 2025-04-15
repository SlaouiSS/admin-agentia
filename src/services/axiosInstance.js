import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/admin", // ou juste /api si tu fais un proxy
});

// 🔐 Ajout automatique du token
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
