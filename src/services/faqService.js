import axios from "./axiosInstance";

export const getClients = async () => {
  const res = await axios.get("/clients");
  return res.data;
};

export const getFaqsByClient = async (clientId) => {
  const res = await axios.get(`/faq/client/${clientId}`);
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

export const createFaq = async (clientId, faq) => {
  const res = await axios.post("/faq", {
    clientId,
    question: faq.question,
    reponse: faq.reponse,
  });
  return res.data;
};