// src/components/ui/Select.jsx
import { ChevronDown } from "lucide-react";

export default function Select({ label, name, value, onChange, options = [], required }) {
    return (
        <div className="space-y-1">
            {label && <label className="block font-medium">{label}</label>}
            <div className="relative">
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full border rounded px-3 py-2 appearance-none pr-8"
                >
                    <option value="">-- Sélectionner --</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
        </div>
    );
}
