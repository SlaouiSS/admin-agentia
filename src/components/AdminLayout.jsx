import { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import useAuth from "../hooks/useAuth";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isSuperAdmin } = useAuth();

    const toggleSidebar = () => setSidebarOpen((o) => !o);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar pour desktop & mobile */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
                isSuperAdmin={isSuperAdmin}
            />

            {/* Contenu principal */}
            <div className="flex-1 flex flex-col">
                <Topbar onToggleSidebar={toggleSidebar} />

                <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
