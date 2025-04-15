import { Button } from "../Button";
import AddFaqForm from "../forms/AddFaqForm";
import { motion } from "framer-motion";

export default function AddFaqDrawer({ onClose, onFaqAdded, clientId, existingFaq }) {
    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 overflow-auto"
        >
            <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold">
                    {existingFaq ? "Modifier une FAQ" : "Ajouter une FAQ"}
                </h2>
                <Button variant="ghost" onClick={onClose}>Fermer</Button>
            </div>

            <div className="p-6">
                <AddFaqForm
                    clientId={clientId}
                    existingFaq={existingFaq}
                    onSuccess={() => {
                        onFaqAdded();
                        onClose();
                    }}
                />
            </div>
        </motion.div>
    );
}