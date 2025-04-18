import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onToggleSidebar }) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // 🔐 On nettoie aussi le nom
        navigate("/login");
    };

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <header className="bg-white border-b px-4 py-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button onClick={onToggleSidebar} className="lg:hidden text-gray-600">
                    <Menu />
                </button>
            </div>

            <div className="flex items-center gap-2">
                {/* 👤 Affichage dynamique du nom utilisateur */}
                <span className="text-sm text-gray-700 hidden md:inline">
                    Bonjour, <strong>{user?.username || "Invité"}</strong>
                </span>
                <button
                    onClick={logout}
                    title="Se déconnecter"
                    className="text-red-500 hover:text-red-600"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </header>
    );
}
