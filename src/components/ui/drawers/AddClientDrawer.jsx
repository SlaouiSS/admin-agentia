import { useState } from "react";
import { createClient } from "../../../services/clientService";
import { Button } from "../Button";
import { Input } from "../Input";
import { toast } from "react-hot-toast";

export default function AddClientDrawer({ onClose, onClientAdded }) {
    const [formData, setFormData] = useState({ nom: "", langue: "", secteur: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createClient(formData);
            toast.success("Client ajouté avec succès");
            onClientAdded();
            onClose();
        } catch (err) {
            console.error("Erreur ajout client:", err);
            setError("Erreur lors de la création du client.");
            toast.error("Impossible d'ajouter le client");
        }
    };

    return (
        <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-50 overflow-auto transform transition-transform duration-300">
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold">Ajouter un client</h2>
                <Button variant="outline" onClick={onClose}>Fermer</Button>
            </div>
            <form className="p-6 space-y-5" onSubmit={handleSubmit}>
                <Input label="Nom" name="nom" value={formData.nom} onChange={handleChange} required />
                <Input label="Langue" name="langue" value={formData.langue} onChange={handleChange} required />
                <Input label="Secteur" name="secteur" value={formData.secteur} onChange={handleChange} required />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="pt-4 flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
                    <Button type="submit" variant="success">Créer</Button>
                </div>
            </form>
        </div>
    );
}
