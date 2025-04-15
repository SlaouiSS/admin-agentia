// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import { X } from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
    return (
        <>
            {/* Overlay mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

                <div
                    className={`fixed lg:static top-0 left-0 z-50 h-full bg-[#1f2937] text-white w-64 transition-transform duration-300 transform
                ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
                >
                    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
                        <span className="text-xl font-bold">🧠 Admin Panel</span>
                        <button
                            className="text-gray-400 lg:hidden"
                            onClick={onClose}
                            aria-label="Fermer le menu"
                        >
                            <X />
                        </button>
                    </div>

                    <nav className="flex flex-col px-4 py-4 space-y-2">
                        <Link to="/" className="flex items-center gap-2 hover:text-white text-sm">
                            🏠 Dashboard
                        </Link>
                        <Link to="/faq" className="flex items-center gap-2 hover:text-white text-sm">
                            ❓ FAQ
                        </Link>
                        <Link to="/clients" className="flex items-center gap-2 hover:text-white text-sm">
                            👥 Clients
                        </Link>
                        <Link to="/logs" className="flex items-center gap-2 hover:text-white text-sm">
                            🧾 Logs
                        </Link>
                    </nav>
                </div>
        </>
    );
}
