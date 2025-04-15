// src/services/logService.js
import axios from "./axiosInstance";

export const fetchLogs = async ({ page = 0, size = 10, clientId, start, end }) => {
    const params = new URLSearchParams({ page, size });
    if (clientId) params.append("clientId", clientId);
    if (start) params.append("start", start);
    if (end) params.append("end", end);
    const res = await axios.get(`/logs?${params.toString()}`);
    return res.data; // { content: [], totalPages, totalElements, number }
};
