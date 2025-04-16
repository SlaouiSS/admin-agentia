import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Contenu principal */}
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                {/* Topbar */}
                <Topbar onToggleSidebar={() => setSidebarOpen(true)} />

                {/* Contenu */}
                <main className="flex-1 p-4 bg-gray-50">{children}</main>
            </div>
        </div>
    );
}
