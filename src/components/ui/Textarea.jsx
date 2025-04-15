export function Textarea({ label, name, value, onChange, required }) {
    return (
        <div className="flex flex-col space-y-1">
            <label htmlFor={name} className="font-medium">{label}</label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="border border-gray-300 rounded px-3 py-2 w-full"
                rows="4"
            />
        </div>
    );
}