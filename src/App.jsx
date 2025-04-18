// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FAQAdmin from "./pages/FAQAdmin";
import ClientManagement from "./pages/ClientManagement";
import LogsPage from "./pages/LogPage";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminUsers from "./pages/AdminUsers";
import Unauthorized from "./pages/Unauthorized";


export default function App() {
    return (
        <>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    {/* Redirect / to /dashboard */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <AdminLayout>
                                <ProtectedRoute roles={["ADMIN", "SUPER_ADMIN"]}>
                                    <Dashboard />
                                </ProtectedRoute>
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/faq"
                        element={
                            <AdminLayout>
                                <ProtectedRoute roles={["ADMIN", "SUPER_ADMIN"]}>
                                    <FAQAdmin />
                                </ProtectedRoute>
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/clients"
                        element={
                            <AdminLayout>
                                <ProtectedRoute roles={["ADMIN", "SUPER_ADMIN"]}>
                                    <ClientManagement />
                                </ProtectedRoute>
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/logs"
                        element={
                            <AdminLayout>
                                <ProtectedRoute roles={["SUPER_ADMIN"]}>
                                    <LogsPage />
                                </ProtectedRoute>
                            </AdminLayout>
                        }
                    />
                    <Route
                        path="/admin-users"
                        element={
                            <AdminLayout>
                                <ProtectedRoute roles={["SUPER_ADMIN"]}>
                                    <AdminUsers />
                                </ProtectedRoute>
                            </AdminLayout>
                        }
                    />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />

                </Routes>
            </Router>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}
