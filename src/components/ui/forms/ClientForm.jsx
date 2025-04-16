import { useEffect, useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";

export default function ClientForm({ onSubmit, onCancel, initialData }) {
    const [form, setForm] = useState({
        nom: "",
        secteur: "",
        langue: "",
        whatsappNumber: "",
        ton: "",
        promptBase: "",
        actif: true,
    });

    useEffect(() => {
        console.log(initialData)
        if (initialData) {
            setForm({
                nom: initialData.nom || "",
                secteur: initialData.secteur || "",
                langue: initialData.langue || "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setForm((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(form);
        } catch (err) {
            console.error("Erreur soumission client:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="nom" label="Nom" value={form.nom} onChange={handleChange} required />
            <Input name="secteur" label="Secteur" value={form.secteur} onChange={handleChange} required />
            <Input name="langue" label="Langue" value={form.langue} onChange={handleChange} required />
            <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={onCancel} type="button">
                    Annuler
                </Button>
                <Button variant="success" type="submit">
                    {initialData ? "Mettre à jour" : "Créer"}
                </Button>
            </div>
        </form>
    );
}
