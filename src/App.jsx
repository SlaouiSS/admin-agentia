import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FAQAdmin from "./pages/FAQAdmin";
import ClientManagement from "./pages/ClientManagement";
import LogsPage from "./pages/LogPage";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound"; // 💡 page 404
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminUsers from "./pages/AdminUsers"; // 💡 tout en haut


export default function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/"
                        element={
                            <AdminLayout>
                                <ProtectedRoute><Dashboard /></ProtectedRoute>
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/faq"
                        element={
                            <AdminLayout>
                                <ProtectedRoute><FAQAdmin /></ProtectedRoute>
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/clients"
                        element={
                            <AdminLayout>
                                <ProtectedRoute><ClientManagement /></ProtectedRoute>
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/logs"
                        element={
                            <AdminLayout>
                                <ProtectedRoute><LogsPage /></ProtectedRoute>
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/admin-users"
                        element={
                            <AdminLayout>
                                <ProtectedRoute>
                                    <AdminUsers />
                                </ProtectedRoute>
                            </AdminLayout>
                        }
                    />
                    {/* 🛑 Route inconnue → page 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}
