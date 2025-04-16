import { Button } from "../Button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GenericDrawer({ title, children, onClose }) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50 overflow-auto"
            >
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <Button variant="ghost" onClick={onClose}>
                        <X />
                    </Button>
                </div>
                <div className="p-6">{children}</div>
            </motion.div>
        </AnimatePresence>
    );
}