import axios from "axios";
import { toast } from "react-toastify";

// 🔗 Instance axios
const instance = axios.create({
    baseURL: "http://localhost:8080/api/admin",
});

// 🔐 Ajoute token JWT automatiquement
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ❌ Si 401 → toast + logout
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            toast.error("🔐 Session expirée. Veuillez vous reconnecter.");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500); // petit délai pour que le toast s’affiche
        }
        return Promise.reject(error);
    }
);

export default instance;
