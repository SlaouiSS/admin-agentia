
import { inputStyles } from "./theme";

export function Input({ label, ...props }) {
    return (
        <div className="space-y-1">
            {label && <label className="text-sm font-medium">{label}</label>}
            <input className={inputStyles.base} {...props} />
        </div>
    );
}
