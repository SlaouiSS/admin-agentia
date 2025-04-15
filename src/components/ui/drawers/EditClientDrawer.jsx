import { useState, useEffect } from "react";
import { Button } from "../Button";
import { Input } from "../Input";

export default function EditClientDrawer({ client, onClose, onClientUpdated }) {
    const [formData, setFormData] = useState({ nom: "", langue: "", secteur: "" });

    useEffect(() => {
        if (client) {
            setFormData({
                nom: client.nom || "",
                langue: client.langue || "",
                secteur: client.secteur || "",
            });
        }
    }, [client]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onClientUpdated({ ...client, ...formData });
    };

    return (
        <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-50 overflow-auto transform transition-transform duration-300">
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold">Modifier le client</h2>
                <Button variant="ghost" onClick={onClose}>Fermer</Button>
            </div>
            <form className="p-6 space-y-5" onSubmit={handleSubmit}>
                <Input label="Nom" name="nom" value={formData.nom} onChange={handleChange} required />
                <Input label="Langue" name="langue" value={formData.langue} onChange={handleChange} required />
                <Input label="Secteur" name="secteur" value={formData.secteur} onChange={handleChange} required />
                <div className="pt-4 flex justify-end gap-2">
                    <Button variant="outline" type="button" onClick={onClose}>Annuler</Button>
                    <Button type="submit" variant="success">Enregistrer</Button>
                </div>
            </form>
        </div>
    );
}
