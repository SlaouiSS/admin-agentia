// src/services/axiosInstance.js
import axios from "axios";
import { toast } from "react-toastify";

// 🔗 Crée l'instance axios
const instance = axios.create({
    baseURL: "http://localhost:8080/api/admin", // ✅ à adapter si nécessaire
});

// 🔐 Ajoute automatiquement le token JWT
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 🧱 Gestion des erreurs globales
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 401) {
            toast.error("🔐 Session expirée. Veuillez vous reconnecter.");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        } else if (status === 403) {
            toast.error("⛔ Accès refusé.");
        } else if (status === 404) {
            toast.error("🚫 Ressource introuvable.");
        } else {
            toast.error("❌ Une erreur s'est produite.");
        }

        return Promise.reject(error);
    }
);

export default instance;
