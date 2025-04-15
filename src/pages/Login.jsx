import { useEffect, useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { Button } from "../components/ui/Button";
import { login } from "../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    // Redirige si déjà connecté
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/"); // ou une autre page d'accueil
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await login(form);

            if (!res || !res.token) {
                toast.error("Erreur : token manquant");
                return;
            }

            localStorage.setItem("token", res.token);
            toast.success("Connexion réussie !");
            window.location.href = "/";
        } catch (err) {
            console.error("Login failed:", err);
            toast.error("Identifiants invalides");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-lg flex w-full max-w-5xl overflow-hidden">
                {/* Partie gauche (image) */}
                <div className="hidden md:block w-1/2">
                    <img
                        src="/assets/login-preview.jpg"
                        alt="login preview"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Partie droite (formulaire) */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="flex justify-center mb-6">
                        <img src="/logo.svg" alt="Logo" className="h-10" />
                    </div>

                    <h2 className="text-xl font-semibold text-center mb-4">Connectez-vous à votre compte</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex items-center border rounded px-3 py-2">
                            <User className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Nom d’utilisateur"
                                className="w-full outline-none"
                                required
                            />
                        </div>

                        <div className="flex items-center border rounded px-3 py-2">
                            <Lock className="text-gray-400 mr-2" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Mot de passe"
                                className="w-full outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="ml-2 text-gray-400"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span></span>
                            <a href="#" className="text-blue-600 hover:underline">Mot de passe oublié</a>
                        </div>

                        <Button type="submit" variant="destructive" className="w-full">
                            Connexion
                        </Button>
                    </form>

                    <div className="mt-8 text-sm text-center text-gray-500">
                        <span>Langue :</span>
                        <select className="ml-2 border rounded px-2 py-1 text-sm">
                            <option value="fr">🇫🇷 FR</option>
                            <option value="en">🇬🇧 EN</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
