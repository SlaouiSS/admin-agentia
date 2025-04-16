import { useState, useEffect } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { Textarea } from "../Textarea";

export default function FaqForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        question: "",
        reponse: "",
    });

    useEffect(() => {
        if (initialData && typeof initialData === "object") {
            setFormData({
                question: initialData.question || "",
                reponse: initialData.reponse || "",
            });
        } else {
            // reset si aucun initialData
            setFormData({ question: "", reponse: "" });
        }
    }, [initialData?.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof onSubmit === "function") {
            onSubmit(formData);
        } else {
            console.warn("❗ onSubmit is not a function");
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

            <Textarea
                label="Réponse"
                name="reponse"
                value={formData.reponse}
                onChange={handleChange}
                required
            />

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Annuler
                </Button>
                <Button type="submit" variant="success">
                    {initialData?.id ? "Mettre à jour" : "Ajouter"}
                </Button>
            </div>
        </form>
    );
}
