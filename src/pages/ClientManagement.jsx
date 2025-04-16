import { useEffect, useState } from "react";
import {updateClient, deleteClient, addClient} from "../services/clientService";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Pencil, Trash2, Plus } from "lucide-react";
import GenericDrawer from "../components/ui/drawers/GenericDrawer";
import ClientForm from "../components/ui/forms/ClientForm";
import ConfirmModal from "../components/ui/ConfirmModal";
import { useToasts } from "../hooks/useToasts";
import {getClients} from "../services/faqService";

export default function ClientManagement() {
    const [clients, setClients] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const { success, error } = useToasts();

    const fetchClients = async () => {
        try {
            const data = await getClients();
            setClients(data);
        } catch (err) {
            error("Erreur chargement clients");
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleAddClient = async (clientData) => {
        try {
            await addClient(clientData);
            success("Client ajouté !");
            fetchClients();
            setDrawerOpen(false);
        } catch (err) {
            error("Erreur ajout client");
        }
    };

    const handleEditClient = async (clientData) => {
        try {
            await updateClient(selectedClient.id, clientData);
            success("Client mis à jour !");
            fetchClients();
            setDrawerOpen(false);
            setSelectedClient(null);
        } catch (err) {
            error("Erreur mise à jour");
        }
    };

    const handleDeleteClient = async () => {
        try {
            await deleteClient(confirmDeleteId);
            success("Client supprimé !");
            fetchClients();
        } catch (err) {
            error("Erreur suppression");
        }
        setConfirmDeleteId(null);
    };

    const openEditDrawer = (client) => {
        setSelectedClient(client);
        setDrawerOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Gestion des clients</h2>
                <Button onClick={() => { setDrawerOpen(true); setSelectedClient(null); }}>
                    <Plus className="mr-2" size={16} /> Ajouter
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {clients.map((client) => (
                    <Card key={client.id}>
                        <CardContent>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{client.nom}</p>
                                    <p className="text-gray-500 text-sm">{client.langue} - {client.secteur}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="warning" onClick={() => openEditDrawer(client)} title="Modifier">
                                        <Pencil size={16} />
                                    </Button>
                                    <Button variant="destructive" onClick={() => setConfirmDeleteId(client.id)} title="Supprimer">
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {drawerOpen && (
                <GenericDrawer
                    title={selectedClient ? "Modifier un client" : "Ajouter un client"}
                    onClose={() => {
                        setDrawerOpen(false);
                        setSelectedClient(null);
                    }}
                >
                    <ClientForm
                        initialData={selectedClient}
                        onSubmit={selectedClient ? handleEditClient : handleAddClient}
                        onCancel={() => {
                            setDrawerOpen(false);
                            setSelectedClient(null);
                        }}
                    />
                </GenericDrawer>
            )}

            {confirmDeleteId && (
                <ConfirmModal
                    title="Suppression"
                    description="Voulez-vous vraiment supprimer ce client ?"
                    onConfirm={handleDeleteClient}
                    onCancel={() => setConfirmDeleteId(null)}
                />
            )}
        </div>
    );
}
