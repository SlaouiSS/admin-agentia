export default function NotFound() {
    return (
        <div className="p-10 text-center">
            <h1 className="text-4xl font-bold text-red-600">404</h1>
            <p className="mt-2">Oups, cette page n'existe pas.</p>
            <a href="/" className="text-blue-600 underline">Retour au tableau de bord</a>
        </div>
    );
}
