// src/pages/Unauthorized.jsx
export default function Unauthorized() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-bold text-red-600 mb-4">⛔ Accès refusé</h1>
            <p className="text-gray-600 mb-6">
                Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
            </p>
            <a
                href="/"
                className="text-blue-600 hover:underline text-sm"
            >
                Retour au tableau de bord
            </a>
        </div>
    );
}
