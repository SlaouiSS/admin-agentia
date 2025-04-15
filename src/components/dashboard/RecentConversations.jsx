import { useEffect, useState } from "react";
import { getRecentConversations } from "../../services/conversationService";
import { Card, CardContent } from "../ui/Card";

export default function RecentConversations() {
    const [convos, setConvos] = useState([]);

    useEffect(() => {
        getRecentConversations().then(setConvos).catch(console.error);
    }, []);

    return (
        <Card>
            <CardContent className="space-y-3">
                <h3 className="font-bold text-lg">📌 Dernières conversations</h3>
                {convos.map((c, i) => (
                    <div key={i} className="border rounded p-3 bg-gray-50 text-sm">
                        <p><strong>👤 Utilisateur :</strong> {c.userMessage}</p>
                        <p><strong>🤖 AI :</strong> {c.aiResponse}</p>
                        <p className="text-xs text-gray-500">{new Date(c.respondedAt).toLocaleString()}</p>
                    </div>
                ))}
                {convos.length === 0 && <p className="text-sm text-gray-500">Aucune conversation récente.</p>}
            </CardContent>
        </Card>
    );
}
