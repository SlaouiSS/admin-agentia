import axios from "./axiosInstance";

export const getClients = async () => {
  const res = await axios.get("/clients");
  return res.data;
};

export const getFaqsByClient = async (clientId) => {
  const res = await axios.get(`/faq/client/${clientId}`);
  return res.data;
};

export const addFaqEntry = async (clientId, { question, reponse }) => {
  const res = await axios.post("/faq", {
    clientId,
    question,
    reponse,
  });
  return res.data;
};

export const updateFaq = async (id, data) => {
  const res = await axios.put(`/faq/${id}`, data);
  return res.data;
};

export const deleteFaq = async (id) => {
  const res = await axios.delete(`/faq/${id}`);
  return res.data;
};

// ✅ ➕ Ajouter une FAQ (vérifie bien cette fonction ici)
export const addFaq = async (data) => {
  const res = await axios.post("/faq", data);
  return res.data;
};