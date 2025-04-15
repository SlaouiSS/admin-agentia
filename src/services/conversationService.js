import axios from "./axiosInstance";

export const getRecentConversations = async () => {
    const res = await axios.get("/clients/recent-conversations"); // endpoint fictif
    return res.data;
};