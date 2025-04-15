import { useEffect, useState } from "react";
import {
    fetchClients,
    toggleClientStatus,
} from "../services/clientService";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Power, PowerOff, Pencil, Plus } from "lucide-react";
import toast from "react-hot-toast";
import EditClientDrawer from "../components/ui/drawers/EditClientDrawer";
import AddClientDrawer from "../components/ui/drawers/AddClientDrawer";

export default function ClientManagement() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingClient, setEditingClient] = useState(null);
    const [addDrawerOpen, setAddDrawerOpen] = useState(false);

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = () => {
        setLoading(true);
        fetchClients()
            .then((res) => setClients(res.data))
            .catch((err) => {
                console.error("Erreur chargement clients:", err);
                toast.error("Impossible de charger les clients.");
            })
            .finally(() => setLoading(false));
    };

    const handleToggle = async (client) => {
        try {
            await toggleClientStatus(client.id, !client.actif);
            setClients((prev) =>
                prev.map((c) =>
                    c.id === client.id ? { ...c, actif: !c.actif } : c
                )
            );
            toast.success(`Client ${client.actif ? "désactivé" : "activé"} avec succès`);
        } catch (err) {
            console.error("Erreur toggle:", err);
            toast.error("Erreur lors de l'activation.");
        }
    };

    const handleClientUpdated = (updatedClient) => {
        setClients((prev) =>
            prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
        );
        setEditingClient(null);
        toast.success("Client modifié !");
    };

    const handleClientAdded = () => {
        setAddDrawerOpen(false);
        loadClients();
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gestion des clients</h2>
                <Button variant="success" onClick={() => setAddDrawerOpen(true)}>
                    Ajouter un client
                </Button>
            </div>

            {loading ? (
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse p-4 border rounded bg-white">
                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                            <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                        </div>
                    ))}
                </div>
            ) : clients.length === 0 ? (
                <p className="text-gray-500">Aucun client trouvé.</p>
            ) : (
                clients.map((client) => (
                    <Card key={client.id}>
                        <CardContent>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{client.nom}</p>
                                    <p className="text-sm text-gray-500">
                                        {client.langue} - {client.secteur}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="warning"
                                        onClick={() => setEditingClient(client)}
                                        title="Modifier ce client"
                                    >
                                        <Pencil size={18} />
                                    </Button>
                                    <Button
                                        variant={client.actif ? "default" : "success"}
                                        onClick={() => handleToggle(client)}
                                        title={client.actif ? "Désactiver ce client" : "Activer ce client"}
                                    >
                                        {client.actif ? <PowerOff size={18} /> : <Power size={18} />}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}

            {editingClient && (
                <EditClientDrawer
                    client={editingClient}
                    onClose={() => setEditingClient(null)}
                    onClientUpdated={handleClientUpdated}
                />
            )}

            {addDrawerOpen && (
                <AddClientDrawer
                    onClose={() => setAddDrawerOpen(false)}
                    onClientAdded={handleClientAdded}
                />
            )}
        </div>
    );
}
