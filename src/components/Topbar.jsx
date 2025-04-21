import {Menu, LogOut} from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function Topbar({onToggleSidebar}) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <header className="bg-white border-b px-4 py-5 shadow-sm flex items-center justify-between">
            <button
                onClick={onToggleSidebar}
                className="lg:hidden text-gray-600"
                aria-label="Ouvrir le menu"
            >
                <Menu/>
            </button>

            <div className="flex items-center gap-4 ml-auto">
                <span className="text-sm text-gray-700 hidden sm:inline">
                  Bonjour, <strong>{user?.username || "Invité"}</strong>
                </span>
                <button
                    onClick={logout}
                    title="Se déconnecter"
                    className="text-red-500 hover:text-red-600"
                >
                    <LogOut size={20}/>
                </button>
            </div>
        </header>
    );
}
