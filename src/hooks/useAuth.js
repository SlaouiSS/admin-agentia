import {jwtDecode} from "jwt-decode";

export default function useAuth() {
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    let user = null;
    let role = null;

    try {
        if (token) {
            const decoded = jwtDecode(token);
            user = decoded;
            role = decoded.role;
        }
    } catch (e) {
        console.warn("Token invalide :", e);
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    const isAdmin      = role === "ADMIN"       || role === "SUPER_ADMIN";
    const isSuperAdmin = role === "SUPER_ADMIN";

    // ✨ Ajout de la méthode hasRole
    const hasRole = (r) => {
        // si on passe un tableau : check multiple
        if (Array.isArray(r)) return r.includes(role);
        return role === r;
    };

    return {
        token,
        isLoggedIn,
        logout,
        user,
        role,
        isAdmin,
        isSuperAdmin,
        hasRole,      // ← on expose hasRole
    };
}
