// src/components/dashboard/DashboardSkeleton.jsx
export default function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Section Statistiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-white p-5 rounded-xl shadow border border-gray-200"
                    >
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-8 bg-gray-300 rounded w-2/3"></div>
                    </div>
                ))}
            </div>

            {/* Section Top Clients */}
            <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white p-4 rounded-xl border border-gray-200 shadow flex justify-between items-center"
                        >
                            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                            <div className="h-4 w-10 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
