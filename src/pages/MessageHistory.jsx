import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { format } from "date-fns";
import { FileDown } from "lucide-react";
import { Button } from "../components/ui/Button";
import axios from "../services/axiosInstance";

export default function MessageLogs() {
    const [logs, setLogs] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get("/message-logs")
            .then(res => setMessages(res.data))
            .catch(err => console.error("Erreur chargement messages:", err));
    }, []);

    // Exemple de headers CSV
    const headers = [
        { label: "Client", key: "clientNom" },
        { label: "Utilisateur", key: "userNumero" },
        { label: "Message", key: "message" },
        { label: "Réponse IA", key: "reponse" },
        { label: "Date", key: "date" }
    ];

    const csvData = messages.map((log) => ({
        clientNom: log.clientNom || "Inconnu",
        userNumero: log.numeroWhatsApp || "N/A",
        message: log.message,
        reponse: log.reponse,
        date: new Date(log.date).toLocaleString()
    }));

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Historique des messages</h2>
                <CSVLink data={csvData} headers={headers} filename={"messages.csv"}>
                    <Button variant="outline">
                        <FileDown size={16} className="mr-2" />
                        Exporter CSV
                    </Button>
                </CSVLink>
            </div>

            <table className="w-full border text-sm bg-white rounded shadow">
                <thead className="bg-gray-50 text-left">
                <tr>
                    <th className="p-3">Client</th>
                    <th className="p-3">Numéro</th>
                    <th className="p-3">Message utilisateur</th>
                    <th className="p-3">Réponse IA</th>
                    <th className="p-3">Date</th>
                </tr>
                </thead>
                <tbody>
                {messages.map((msg) => (
                    <tr key={msg.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">{msg.clientNom || "Inconnu"}</td>
                        <td className="p-3">{msg.numeroWhatsApp || "-"}</td>
                        <td className="p-3 text-gray-800">{msg.message}</td>
                        <td className="p-3 text-gray-600 italic">{msg.reponse}</td>
                        <td className="p-3 text-gray-500">
                            {msg.date && format(new Date(msg.date), "dd/MM/yyyy HH:mm")}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
