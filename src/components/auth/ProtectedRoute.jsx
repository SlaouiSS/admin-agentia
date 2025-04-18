// components/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        toast.warning("🔐 Accès refusé. Veuillez vous connecter.");
        return <Navigate to="/login" replace />;
    }

    return children;
}
