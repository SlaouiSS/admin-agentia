
import { Card, CardContent } from "../ui/Card";

const logs = [
    '🔧 Client "Client Santé" ajouté',
    '✏️ FAQ modifiée pour "Client Éducation"',
    '🗑️ FAQ supprimée pour "Client Dev"',
];

export default function RecentLogs() {
    return (
        <Card>
            <CardContent>
                <h3 className="text-md font-semibold mb-4">Dernières actions</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                    {logs.map((log, i) => (
                        <li key={i}>{log}</li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
