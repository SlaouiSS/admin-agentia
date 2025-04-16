import { useEffect, useState } from "react";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { addFaqEntry, updateFaq } from "../../../services/faqService";

export default function FaqForm({ clientId, existingFaq, onSuccess }) {
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
            onSuccess();
        } catch (err) {
            console.error("Erreur FAQ:", err);
            setError("Erreur lors de la soumission.");
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
                label="Question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
            />
            <Textarea
                label="Réponse"
                name="reponse"
                value={formData.reponse}
                onChange={handleChange}
                required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="btn btn-primary">
                {existingFaq ? "Mettre à jour" : "Ajouter"}
            </button>
        </form>
    );
}
