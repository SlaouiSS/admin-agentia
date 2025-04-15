import instance from './axiosInstance';

// 📦 Récupère la liste des clients
export const fetchClients = () => {
  return instance.get('/clients');
};

// 📦 Récupère les infos d’un client par ID
export const fetchClientById = (id) => {
  return instance.get(`/clients/${id}`);
};

// 🔄 Met à jour un client
export const updateClient = (id, clientData) => {
  return instance.put(`/clients/${id}`, clientData);
};

// ✅ Active/Désactive un client
export const toggleClientStatus = (id, actif) => {
  return instance.patch(`/clients/${id}/status`, { actif });
};

// 🗑 Supprime un client
export const deleteClient = (id) => {
  return instance.delete(`/clients/${id}`);
};

export const createClient = (data) => {
  return instance.post("/clients", data);
};
