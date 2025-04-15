export default function LogSkeleton() {
    return (
        <div className="animate-pulse space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="overflow-x-auto border rounded bg-white">
                <table className="w-full">
                    <thead>
                    <tr className="bg-gray-100 text-left text-sm text-gray-600">
                        <th className="p-3">Numéro</th>
                        <th className="p-3">Message</th>
                        <th className="p-3">Bloqué</th>
                        <th className="p-3">Client</th>
                        <th className="p-3">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {[...Array(5)].map((_, i) => (
                        <tr key={i} className="border-b">
                            <td className="p-3">
                                <div className="h-4 bg-gray-200 rounded w-24" />
                            </td>
                            <td className="p-3">
                                <div className="h-4 bg-gray-200 rounded w-40" />
                            </td>
                            <td className="p-3">
                                <div className="h-4 bg-gray-200 rounded w-12" />
                            </td>
                            <td className="p-3">
                                <div className="h-4 bg-gray-200 rounded w-24" />
                            </td>
                            <td className="p-3">
                                <div className="h-4 bg-gray-200 rounded w-32" />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
