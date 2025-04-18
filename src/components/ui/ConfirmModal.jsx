import { Trash2, Power, AlertTriangle } from "lucide-react";

const iconMap = {
    delete: <Trash2 className="text-red-600" size={32} />,
    toggle: <Power className="text-yellow-500" size={32} />,
    warning: <AlertTriangle className="text-orange-500" size={32} />,
};

const colorMap = {
    delete: "bg-red-600 hover:bg-red-700",
    toggle: "bg-yellow-500 hover:bg-yellow-600",
    warning: "bg-orange-500 hover:bg-orange-600",
};

const labelMap = {
    delete: "Supprimer",
    toggle: "Confirmer",
    warning: "Valider",
};


export default function ConfirmModal({ title, message, onConfirm, onCancel, actionType = "delete" }) {
    const color = colorMap[actionType] || "bg-gray-600";
    const label = labelMap[actionType] || "Valider";
    const icon = iconMap[actionType] || null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg p-6 max-w-md shadow-lg text-center">
                <div className="flex justify-center mb-4">
                    {icon}
                </div>
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-gray-700 mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={onCancel}
                    >
                        Annuler
                    </button>
                    <button
                        className={`px-4 py-2 text-white rounded ${color}`}
                        onClick={onConfirm}
                    >
                        {label}
                    </button>
                </div>
            </div>
        </div>
    );
}
