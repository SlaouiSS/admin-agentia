import { useEffect, useState } from "react";
import { Eye, EyeOff, User, Lock, Mail } from "lucide-react";
import { Button } from "../components/ui/Button";
import { register } from "../services/authService";
import { useToasts } from "../hooks/useToasts";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Register() {
    const { success, error } = useToasts();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
    });

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/", { replace: true });
        }
    }, [isLoggedIn, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(form);
            if (!res || !res.token) {
                error("Erreur : token manquant");
                return;
            }

            localStorage.setItem("token", res.token);
            success("✅ Inscription réussie !");
            navigate("/login");
        } catch (err) {
            console.error("Register failed:", err);
            error("Erreur lors de l'inscription !");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-lg flex w-full max-w-5xl overflow-hidden">
                {/* Left side (image) */}
                <div className="hidden md:block w-1/2">
                    <img
                        src="/assets/register-preview.jpg"
                        alt="register preview"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right side (form) */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="flex justify-center mb-6">
                        <img src="/logo.svg" alt="Logo" className="h-10" />
                    </div>

                    <h2 className="text-xl font-semibold text-center mb-4">Créer un compte</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex items-center border rounded px-3 py-2">
                            <User className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Nom d'utilisateur"
                                className="w-full outline-none"
                                required
                            />
                        </div>

                        <div className="flex items-center border rounded px-3 py-2">
                            <Mail className="text-gray-400 mr-2" />
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Adresse email"
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

                        <Button type="submit" variant="success" className="w-full">
                            S'inscrire
                        </Button>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-600">
                        Vous avez déjà un compte ?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Se connecter
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
