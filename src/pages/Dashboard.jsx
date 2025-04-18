import { useEffect, useState } from "react";
import { getAdminStats, getTopClients } from "../services/statsService";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import RecentConversations from "../components/dashboard/RecentConversations";
import { BarChart2, MessageCircle, Users } from "lucide-react";
import useAuth from "../hooks/useAuth";

function StatCard({ icon: Icon, title, value, color }) {
    return (
        <div className="bg-white p-5 rounded-xl shadow border border-gray-200 hover:shadow-md transition w-full">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${color} text-white`}>
                    <Icon size={20} />
                </div>
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-xl font-semibold">{value}</p>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [topClients, setTopClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, topData] = await Promise.all([
                    getAdminStats(),
                    getTopClients(),
                ]);
                setStats(statsData);
                setTopClients(topData);
            } catch (err) {
                console.error("Erreur chargement dashboard:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading || !stats) return <DashboardSkeleton />;

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Tableau de bord</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Users} title="Clients" value={stats.totalClients} color="bg-blue-500" />
                <StatCard icon={Users} title="Clients actifs" value={stats.activeClients} color="bg-green-500" />
                <StatCard icon={MessageCircle} title="Messages" value={stats.totalMessages} color="bg-purple-500" />
                <StatCard icon={BarChart2} title="Réponses IA" value={stats.totalResponses} color="bg-yellow-500" />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Top clients</h3>
                {topClients.length === 0 ? (
                    <p className="text-gray-500 text-sm">Aucun client actif avec messages pour l'instant.</p>
                ) : (
                    <ul className="divide-y border rounded bg-white shadow">
                        {topClients.map((client, index) => (
                            <li key={index} className="px-4 py-3 flex justify-between items-center">
                                <span>{client.client}</span>
                                <span className="text-sm text-gray-500">{client.messages} messages</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
                <RecentConversations />
            </div>
        </div>
    );
}
