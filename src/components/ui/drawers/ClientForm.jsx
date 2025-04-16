import { useState, useEffect } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { createClient, updateClient } from "../../../services/clientService";

export default function ClientForm({ existingClient, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        nom: "",
        secteur: "",
        langue: "fr",
    });

    useEffect(() => {
        if (existingClient) {
            setFormData(existingClient);
        }
    }, [existingClient]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (existingClient) {
                await updateClient(existingClient.id, formData);
            } else {
                await createClient(formData);
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Erreur client:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
            />
            <Input
                label="Secteur"
                name="secteur"
                value={formData.secteur}
                onChange={handleChange}
                required
            />
            <div>
                <label className="block mb-1 text-sm font-medium">Langue</label>
                <select
                    name="langue"
                    value={formData.langue}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded w-full"
                >
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                </select>
            </div>
            <Button type="submit">
                {existingClient ? "Mettre à jour" : "Ajouter"}
            </Button>
        </form>
    );
}