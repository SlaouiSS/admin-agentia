// src/pages/LogPage.jsx
import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import { Loader } from "../components/ui/Loader";
import { Button } from "../components/ui/Button";
import { useToasts } from "../hooks/useToasts";
import useAuth from "../hooks/useAuth";

export default function LogPage() {
    const { isSuperAdmin } = useAuth();
    const { success, error } = useToasts();
    const [logs, setLogs] = useState([]);
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [lastUpdated, setLastUpdated] = useState(null);

    // Charger la liste des clients (uniquement pour SUPER_ADMIN)
    useEffect(() => {
        if (!isSuperAdmin) return;
        fetchClients();
    }, [isSuperAdmin]);

    // Charger / rafraichir les logs toutes les 15s
    useEffect(() => {
        if (!isSuperAdmin) return;
        fetchLogs();
        const interval = setInterval(fetchLogs, 15000);
        return () => clearInterval(interval);
    }, [isSuperAdmin, selectedClient, startDate, endDate, page, searchTerm]);

    const fetchClients = async () => {
        try {
            const res = await axios.get("/clients");
            setClients(res.data);
        } catch (err) {
            error("❌ Impossible de charger les clients");
        }
    };

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const params = { page };
            if (selectedClient) params.clientId = selectedClient;
            if (startDate) params.start = startDate;
            if (endDate) params.end = endDate;

            const res = await axios.get("/logs", { params });
            const filtered = searchTerm.trim()
                ? res.data.content.filter(log =>
                    log.message.toLowerCase().includes(searchTerm.toLowerCase())
                )
                : res.data.content;

            setLogs(filtered);
            setTotalPages(res.data.totalPages);
            setLastUpdated(new Date());
        } catch (err) {
            error("❌ Erreur lors du chargement des logs");
        } finally {
            setLoading(false);
        }
    };

    const handleExportCSV = () => {
        const csvContent = [
            ["Client", "Numéro", "Message", "Date", "Statut"],
            ...logs.map(log => [
                log.clientNom,
                log.whatsappNumber,
                `"${log.message.replace(/"/g, '""')}"`,
                new Date(log.date).toLocaleString(),
                log.bloque ? "Bloqué" : "OK"
            ])
        ]
            .map(row => row.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "logs.csv";
        a.click();
        URL.revokeObjectURL(url);
        success("✅ Export CSV généré");
    };

    if (!isSuperAdmin) {
        return (
            <div className="p-6">
                <p className="text-red-600">⛔ Accès réservé aux SUPER_ADMIN.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">📜 Historique des accès</h2>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                        Dernière mise à jour : {lastUpdated ? lastUpdated.toLocaleTimeString() : "–"}
                    </span>
                    <Button onClick={handleExportCSV}>📤 Exporter CSV</Button>
                </div>
            </div>

            <div className="grid md:grid-cols-5 gap-4 items-end">
                <div>
                    <label className="block mb-1">Client</label>
                    <select
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                        className="border rounded px-3 py-2 w-full"
                    >
                        <option value="">-- Tous --</option>
                        {clients.map((c) => (
                            <option key={c.id} value={c.id}>{c.nom}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Début</label>
                    <input
                        type="date"
                        className="border rounded px-3 py-2 w-full"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1">Fin</label>
                    <input
                        type="date"
                        className="border rounded px-3 py-2 w-full"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1">Recherche</label>
                    <input
                        type="text"
                        placeholder="Message..."
                        className="border rounded px-3 py-2 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <Button onClick={fetchLogs} className="w-full">🔍 Filtrer</Button>
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : logs.length === 0 ? (
                <p className="text-gray-500">Aucun log trouvé.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border text-sm bg-white rounded shadow">
                        <thead className="bg-gray-50 text-left">
                        <tr>
                            <th className="p-3">Client</th>
                            <th className="p-3">Numéro</th>
                            <th className="p-3">Message</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Statut</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logs.map((log, i) => (
                            <tr key={i} className="border-t hover:bg-gray-50">
                                <td className="p-3">{log.clientNom}</td>
                                <td className="p-3">{log.whatsappNumber}</td>
                                <td className="p-3 text-gray-700">{log.message}</td>
                                <td className="p-3 text-gray-500">{new Date(log.date).toLocaleString()}</td>
                                <td className="p-3 font-semibold">
                                    {log.bloque
                                        ? <span className="text-red-600">⛔ Bloqué</span>
                                        : <span className="text-green-600">✅ OK</span>
                                    }
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`px-3 py-1 rounded ${i === page ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
