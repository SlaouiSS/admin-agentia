import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FAQAdmin from "./pages/FAQAdmin";
import ClientManagement from "./pages/ClientManagement";
import LogsPage from "./pages/LogPage";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login"; // 👈 AJOUT

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} /> {/* 👈 AJOUT */}

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
                            <ProtectedRoute> <ClientManagement /></ProtectedRoute>
                        </AdminLayout>
                    }
                />
                <Route
                    path="/logs"
                    element={
                        <AdminLayout>
                            <ProtectedRoute> <LogsPage /></ProtectedRoute>
                        </AdminLayout>
                    }
                />
            </Routes>
        </Router>
    );
}
