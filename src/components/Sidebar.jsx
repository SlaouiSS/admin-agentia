import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

export default function Sidebar({ isOpen, onClose, isSuperAdmin }) {
    return (
        <>
            {/* Fond semi‑opaque en mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed lg:static top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200
          transition-transform duration-300 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                    <span className="text-xl font-bold text-gray-800">🧠 Admin Panel</span>
                    <button
                        className="text-gray-500 lg:hidden"
                        onClick={onClose}
                        aria-label="Fermer le menu"
                    >
                        <X />
                    </button>
                </div>

                <nav className="flex flex-col px-4 py-4 space-y-2 text-sm text-gray-700">
                    <SidebarLink to="/" label="🏠 Tableau de bord" />
                    <SidebarLink to="/clients" label="👥 Clients" />
                    <SidebarLink to="/faq" label="❓ FAQ" />

                    {isSuperAdmin && (
                        <>
                            <SidebarLink to="/logs" label="📜 Logs" />
                            <SidebarLink to="/admin-users" label="🛠️ Gestion des admins" />
                        </>
                    )}
                </nav>
            </div>
        </>
    );
}

function SidebarLink({ to, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                "flex items-center px-3 py-2 rounded transition " +
                (isActive
                    ? "bg-gray-100 font-semibold"
                    : "hover:bg-gray-50")
            }
        >
            <span>{label}</span>
        </NavLink>
    );
}
