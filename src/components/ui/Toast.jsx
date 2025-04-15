import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ToastProvider() {
    useEffect(() => {
        toast.success("Bienvenue dans l'interface !");
    }, []);

    return <Toaster position="top-right" />;
}