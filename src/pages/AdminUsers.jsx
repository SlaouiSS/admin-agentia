import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useToasts } from "../hooks/useToasts";
import useAuth from "../hooks/useAuth";
import axios from "../services/axiosInstance";
import ConfirmModal from "../components/ui/ConfirmModal";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ username: "", email: "", password: "", role: "ADMIN" });
    const [loading, setLoading] = useState(false);
    const [confirmUser, setConfirmUser] = useState(null);

    const { user: currentUser, role: currentRole } = useAuth();
    const { success, error } = useToasts();
    const fetchUsers = async () => {
        try {
            const res = await axios.get("/users");
            setUsers(res.data);
        } catch (err) {
            error("Erreur lors du chargement des utilisateurs");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (form.role === "SUPER_ADMIN" && currentRole !== "SUPER_ADMIN") {
                error("Seul un SUPER_ADMIN peut créer un autre SUPER_ADMIN");
                return;
            }

            await axios.post("/users", form);
            success("Utilisateur ajouté avec succès");
            setForm({ username: "", email: "", password: "", role: "ADMIN" });
            fetchUsers();
        } catch (err) {
            error("Erreur: " + (err.response?.data || "création impossible"));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirmUser) return;
        try {
            await axios.delete(`/users/${confirmUser.id}`);
            success("Utilisateur supprimé avec succès");
            fetchUsers();
        } catch (err) {
            if (err.response?.status === 403) {
                error("❌ Vous ne pouvez pas vous supprimer vous-même.");
            } else {
                error("Erreur lors de la suppression");
            }
        } finally {
            setConfirmUser(null);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Gestion des administrateurs</h2>

            <form className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" onSubmit={handleCreate}>
                <Input name="username" placeholder="Nom d'utilisateur" value={form.username} onChange={handleChange} required />
                <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <Input name="password" placeholder="Mot de passe" type="password" value={form.password} onChange={handleChange} required />
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="border rounded px-3 py-2"
                    disabled={currentRole !== "SUPER_ADMIN"}
                >
                    <option value="ADMIN">ADMIN</option>
                    {currentRole === "SUPER_ADMIN" && <option value="SUPER_ADMIN">SUPER_ADMIN</option>}
                </select>
                <Button type="submit" variant="success" className="col-span-full md:col-span-1" disabled={loading}>
                    Ajouter
                </Button>
            </form>

            <table className="w-full text-left border rounded shadow text-sm">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-2">Nom</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Rôle</th>
                    <th className="p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id} className="border-t">
                        <td className="p-2">{user.username}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">{user.role}</td>
                        <td className="p-2">
                            {user.username !== currentUser.sub ? (
                                <Button
                                    variant="ghost"
                                    className="text-red-600"
                                    onClick={() => setConfirmUser(user)}
                                >
                                    Supprimer
                                </Button>
                            ) : (
                                <span className="text-gray-400 text-sm italic">Vous</span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {confirmUser && (
                <ConfirmModal
                    title="❌ Supprimer l’utilisateur"
                    message={`Es-tu sûr de vouloir supprimer ${confirmUser.username} ?`}
                    actionType="delete"
                    onCancel={() => setConfirmUser(null)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
}
