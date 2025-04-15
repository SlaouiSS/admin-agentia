export default function useAuth() {
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login"; // redirection après logout
    };

    return { token, isLoggedIn, logout };
}
