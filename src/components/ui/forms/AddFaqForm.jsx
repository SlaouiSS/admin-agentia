import { useState, useEffect } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { addFaqEntry, updateFaq } from "../../../services/faqService";
import { useToasts } from "../../../hooks/useToasts";

export default function AddFaqForm({ clientId, existingFaq, onSuccess }) {
    const { success, error } = useToasts();
    const [formData, setFormData] = useState({ question: "", reponse: "" });
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        try {
            if (existingFaq) {
                await updateFaq(existingFaq.id, formData);
                success("FAQ mise à jour !");
            } else {
                await addFaqEntry(clientId, formData);
                success("FAQ ajoutée !");
            }
            onSuccess();
        } catch (err) {
            console.error("Erreur formulaire FAQ:", err);
            error("Erreur lors de la soumission");
        } finally {
            setLoading(false);
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
            <Button type="submit" disabled={loading}>
                {existingFaq ? "Mettre à jour" : "Ajouter"}
            </Button>
        </form>
    );
}