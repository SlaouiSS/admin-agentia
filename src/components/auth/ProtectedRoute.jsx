// src/components/auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({ children, roles = [] }) {
    const { isLoggedIn, role } = useAuth();

    // En attendant la validation du token
    if (isLoggedIn === null) return null;

    // Non connecté → login
    if (!isLoggedIn) return <Navigate to="/login" replace />;

    // Rôle non autorisé → retour login
    if (roles.length > 0 && !roles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
