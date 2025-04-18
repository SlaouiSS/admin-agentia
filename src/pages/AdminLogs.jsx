// src/pages/AdminLogs.jsx
import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import { format } from "date-fns";
import { Button } from "../components/ui/Button";

export default function AdminLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await axios.get("/users/admin-logs");
                console.log(res.data)
                setLogs(res.data);
            } catch (err) {
                console.error("Erreur chargement logs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    if (loading) return <p className="p-4">Chargement des logs...</p>;

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Logs d'administration</h2>

            {logs.length === 0 ? (
                <p className="text-gray-500">Aucun log disponible.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border text-sm bg-white rounded shadow">
                        <thead className="bg-gray-50 text-left">
                        <tr>
                            <th className="p-3">Date</th>
                            <th className="p-3">Admin</th>
                            <th className="p-3">Action</th>
                            <th className="p-3">Cible</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} className="border-t hover:bg-gray-50">
                                <td className="p-3 text-gray-500">
                                    {format(new Date(log.date), "dd/MM/yyyy HH:mm")}
                                </td>
                                <td className="p-3">{log.adminUsername || "Inconnu"}</td>
                                <td className="p-3 font-semibold">
                                    {log.action === "CREATED_USER" && <span className="text-green-600">🟢 Création</span>}
                                    {log.action === "MODIFIED_USER" && <span className="text-blue-600">✏️ Modification</span>}
                                    {log.action === "DELETED_USER" && <span className="text-red-600">🗑️ Suppression</span>}
                                </td>
                                <td className="p-3">{log.target}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
