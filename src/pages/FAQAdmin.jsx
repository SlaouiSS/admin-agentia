import {useEffect, useState} from "react";
import {
    getClients,
    getFaqsByClient,
    deleteFaq, updateFaq, createFaq,
} from "../services/faqService";
import {Button} from "../components/ui/Button";
import {Card, CardContent} from "../components/ui/Card";
import {useToasts} from "../hooks/useToasts";
import {Pencil, Trash2} from "lucide-react";
import ConfirmModal from "../components/ui/ConfirmModal";
import GenericDrawer from "../components/ui/drawers/GenericDrawer";
import FaqForm from "../components/ui/forms/FaqForm";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";

export default function FAQAdmin() {
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [faqs, setFaqs] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const {success, error} = useToasts();

    const {isLoggedIn, role} = useAuth();
    const navigate = useNavigate();

    // 🔐 Redirection si non connecté ou non admin
    useEffect(() => {
        if (!isLoggedIn || (role !== "ADMIN" && role !== "SUPER_ADMIN")) {
            navigate("/login");
        }
    }, [isLoggedIn, role, navigate]);

    useEffect(() => {
        getClients()
            .then((res) => {
                if (Array.isArray(res)) setClients(res);
                else setClients([]);
            })
            .catch((err) => {
                error("Erreur chargement clients");
                setClients([]);
            });
    }, []);

    useEffect(() => {
        if (selectedClientId) {
            const client = clients.find((c) => c.id === selectedClientId);
            setSelectedClient(client);

            getFaqsByClient(selectedClientId)
                .then((res) => setFaqs(res))
                .catch((err) => {
                    console.error("Erreur chargement FAQs:", err);
                    setFaqs([]);
                });
        } else {
            setFaqs([]);
            setSelectedClient(null);
        }
    }, [selectedClientId]);

    const refreshFaqs = async () => {
        if (selectedClientId) {
            const updatedFaqs = await getFaqsByClient(selectedClientId);
            setFaqs(updatedFaqs);
        }
    };

    const handleFaqSubmit = async (formData) => {
        try {
            if (editingFaq) {
                await updateFaq(editingFaq.id, formData);
                success("FAQ mise à jour !");
            } else {
                await createFaq(selectedClientId, formData);
                success("FAQ ajoutée !");
            }
            handleFaqSuccess();
        } catch (err) {
            console.error("Erreur enregistrement FAQ :", err);
            error("Erreur lors de l'enregistrement");
        }
    };


    const handleDelete = async () => {
        try {
            await deleteFaq(confirmDeleteId);
            success("FAQ supprimée !");
            refreshFaqs();
        } catch (err) {
            console.error("Erreur suppression FAQ:", err);
            error("Erreur lors de la suppression.");
        }
        setConfirmDeleteId(null);
    };

    const handleEdit = (faq) => {
        setEditingFaq(faq);
        setDrawerOpen(true);
    };

    const handleFaqSuccess = () => {
        setDrawerOpen(false);
        setEditingFaq(null);
        refreshFaqs();
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">FAQ par client</h2>

            <div>
                <label htmlFor="client" className="block mb-1 font-medium">
                    Choisir un client :
                </label>
                <select
                    id="client"
                    className="border border-gray-300 rounded px-3 py-2"
                    value={selectedClientId || ""}
                    onChange={(e) => setSelectedClientId(Number(e.target.value))}
                >
                    <option value="">-- Sélectionner --</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.nom} ({client.langue} - {client.secteur})
                        </option>
                    ))}
                </select>
            </div>

            {selectedClient && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">
                            FAQ de {selectedClient.nom}
                        </h3>
                        <Button variant="success" onClick={() => setDrawerOpen(true)}>
                            Ajouter une FAQ
                        </Button>
                    </div>

                    {faqs.length === 0 ? (
                        <p className="text-gray-500">Aucune FAQ disponible.</p>
                    ) : (
                        faqs.map((faq) => (
                            <Card key={faq.id}>
                                <CardContent>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold mb-1">{faq.question}</p>
                                            <p className="text-gray-600 text-sm">{faq.reponse}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Button
                                                variant="warning"
                                                title="Modifier la FAQ"
                                                onClick={() => handleEdit(faq)}
                                            >
                                                <Pencil size={18}/>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                title="Supprimer la FAQ"
                                                onClick={() => setConfirmDeleteId(faq.id)}
                                            >
                                                <Trash2 size={18}/>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}

            {/* Drawer */}
            {drawerOpen && selectedClientId && (
                <GenericDrawer
                    title={editingFaq ? "Modifier une FAQ" : "Ajouter une FAQ"}
                    isOpen={drawerOpen}
                    onClose={() => {
                        setDrawerOpen(false);
                        setEditingFaq(null);
                    }}
                >
                    <FaqForm
                        clientId={selectedClientId}
                        initialData={editingFaq}
                        onSubmit={handleFaqSubmit} // ✅ maintenant c’est la bonne fonction
                        onCancel={() => {
                            setDrawerOpen(false);
                            setEditingFaq(null);
                        }}
                    />
                </GenericDrawer>
            )}

            {/* Modal de confirmation */}
            {confirmDeleteId && (
                <ConfirmModal
                    title="Confirmation"
                    description="Voulez-vous vraiment supprimer cette FAQ ?"
                    onConfirm={handleDelete}
                    onCancel={() => setConfirmDeleteId(null)}
                    actionType="delete"
                />
            )}
        </div>
    );
}
