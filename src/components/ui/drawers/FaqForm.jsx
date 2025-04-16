import { useState, useEffect } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { addFaqEntry, updateFaq } from "../../../services/faqService";

export default function FaqForm({ clientId, existingFaq, onClose, onSuccess }) {
    const [formData, setFormData] = useState({ question: "", reponse: "" });

    useEffect(() => {
        if (existingFaq) {
            setFormData(existingFaq);
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
            onSuccess();
            onClose();
        } catch (err) {
            console.error("Erreur enregistrement FAQ:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
            />
            <Input
                label="Réponse"
                name="reponse"
                value={formData.reponse}
                onChange={handleChange}
                required
            />
            <Button type="submit">
                {existingFaq ? "Mettre à jour" : "Ajouter"}
            </Button>
        </form>
    );
}