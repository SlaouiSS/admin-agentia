import axios from "./axiosInstance";

// 📊 Récupère les statistiques globales
export const getAdminStats = async () => {
    const res = await axios.get("/clients/stats");
    return res.data;
};

// 🥇 Récupère les 3 clients les plus actifs
export const getTopClients = async () => {
    const res = await axios.get("/clients/top");
    return res.data;
};
