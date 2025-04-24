import useIAStats from "../../hooks/useIAStats";
import { BarChart, AlertCircle, Bot, Search, Meh } from "lucide-react";

export default function IAInsights() {
    const { loading, intentStats, sentimentStats, misunderstood, fallbacks } = useIAStats();

    if (loading) return null;

    return (
        <div className="bg-white rounded-xl shadow p-5 border border-gray-200 space-y-4 h-full">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                <BarChart size={20} className="text-blue-600" />
                Analyse IA
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                    <p className="text-gray-500 mb-1 flex items-center gap-1">
                        <Search size={14} /> Intentions détectées
                    </p>
                    {Object.entries(intentStats).map(([intent, count]) => (
                        <div key={intent} className="text-gray-800">{intent} : {count}</div>
                    ))}
                </div>

                <div>
                    <p className="text-gray-500 mb-1 flex items-center gap-1">
                        <Meh size={14} /> Sentiments analysés
                    </p>
                    {Object.entries(sentimentStats).map(([sentiment, count]) => (
                        <div key={sentiment} className="text-gray-800">{sentiment} : {count}</div>
                    ))}
                </div>

                <div>
                    <p className="text-gray-500 mb-1 flex items-center gap-1">
                        <AlertCircle size={14} /> Messages mal compris
                    </p>
                    <p className="text-lg font-semibold text-red-500">{misunderstood.length}</p>
                </div>

                <div>
                    <p className="text-gray-500 mb-1 flex items-center gap-1">
                        <Bot size={14} /> Réponses fallback
                    </p>
                    <p className="text-lg font-semibold text-orange-500">{fallbacks.length}</p>
                </div>
            </div>
        </div>
    );
}
