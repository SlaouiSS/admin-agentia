import { useState, useEffect } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { addFaqEntry, updateFaq } from "../../../services/faqService";

export default function AddFaqDrawer({ onClose, onFaqAdded, clientId, existingFaq }) {
    const [formData, setFormData] = useState({ question: "", reponse: "" });
    const [error, setError] = useState("");

    useEffect(() => {
        if (existingFaq) {
            setFormData({
                question: existingFaq.question || "",
                reponse: existingFaq.reponse || "",
            });
        } else {
            setFormData({ question: "", reponse: "" });
        }
    }, [existingFaq]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (existingFaq) {
                await updateFaq(existingFaq.id, formData);
            } else {
                await addFaqEntry(clientId, formData);
            }
            onFaqAdded();
            onClose();
        } catch (err) {
            console.error("Erreur ajout/modif FAQ:", err);
            setError("Erreur lors de la soumission.");
        }
    };

    return (
        <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 overflow-auto animate-slide-in">
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold">
                    {existingFaq ? "Modifier une FAQ" : "Ajouter une FAQ"}
                </h2>
                <Button variant="ghost" onClick={onClose}>Fermer</Button>
            </div>
            <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                <Input label="Question" name="question" value={formData.question} onChange={handleChange} required />
                <Input label="Réponse" name="reponse" value={formData.reponse} onChange={handleChange} required />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit">
                    {existingFaq ? "Mettre à jour" : "Enregistrer"}
                </Button>
            </form>
        </div>
    );
}
