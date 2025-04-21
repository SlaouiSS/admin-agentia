import { useState, useEffect } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import Select from "../Select";
import { langues } from "../../utils/langues";
import { metiers } from "../../utils/metiers";
import { tons } from "../../utils/tons";
import { promptsParMetier } from "../../utils/prompts";

export default function ClientForm({ initialData = {}, onSubmit, onCancel }) {
    const isEditMode = !!initialData?.id;

    const [formData, setFormData] = useState({
        nom: "",
        whatsappNumber: "",
        nomMagasin: "",
        secteur: "",
        langue: "",
        ton: "",
        promptBase: "",
        actif: true,
    });

    // ⚡ Pré-remplir si modification
    useEffect(() => {
        if (initialData && typeof initialData === "object") {
            setFormData({
                nom: initialData.nom || "",
                whatsappNumber: initialData.whatsappNumber || "",
                nomMagasin: initialData.nomMagasin || "",
                secteur: initialData.secteur || "",
                langue: initialData.langue || "",
                ton: initialData.ton || "",
                promptBase: initialData.promptBase || "",
                actif: initialData.actif ?? true,
            });
        }
    }, [initialData?.id]);

    // 📌 Changement de champ
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // 🧠 Génère le prompt automatiquement si nouveau secteur
        if (name === "secteur" && !isEditMode) {
            const autoPrompt = promptsParMetier[value];
            setFormData((prev) => ({
                ...prev,
                secteur: value,
                promptBase: autoPrompt || "",
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof onSubmit === "function") {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Nom" name="nom" value={formData.nom} onChange={handleChange} required />
            <Input label="Nom Magasin" name="nomMagasin" value={formData.nomMagasin} onChange={handleChange} required />

            <Select
                label="Secteur"
                name="secteur"
                value={formData.secteur}
                onChange={handleChange}
                options={metiers}
                required
            />

            <Select
                label="Langue"
                name="langue"
                value={formData.langue}
                onChange={handleChange}
                options={langues}
                required
            />

            <Input label="Numéro WhatsApp" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} />

            <Select
                label="Ton"
                name="ton"
                value={formData.ton}
                onChange={handleChange}
                options={tons}
                required
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prompt de base</label>
                <textarea
                    name="promptBase"
                    value={formData.promptBase}
                    readOnly
                    className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-800 text-sm resize-none"
                    rows={4}
                />
            </div>

            <label className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    name="actif"
                    checked={formData.actif}
                    onChange={handleChange}
                />
                <span>Actif</span>
            </label>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>Annuler</Button>
                <Button type="submit" variant="success">{isEditMode ? "Mettre à jour" : "Ajouter"}</Button>
            </div>
        </form>
    );
}
