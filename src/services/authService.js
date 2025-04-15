import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/auth",
});

export const register = (data) => API.post("/register", data);

export const login = async ({ username, password }) => {
    const res = await API.post("/login", { username, password });

    if (!res.data?.token) {
        throw new Error("Aucun token reçu");
    }

    return res.data; // { token: "..." }
};