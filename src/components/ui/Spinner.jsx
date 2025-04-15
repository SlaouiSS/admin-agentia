// src/components/ui/Spinner.jsx
export default function Spinner({ size = 40, color = "text-blue-600" }) {
    return (
        <div className="flex justify-center items-center py-10">
            <div
                className={`animate-spin rounded-full border-4 border-t-transparent ${color}`}
                style={{
                    width: size,
                    height: size,
                    borderColor: "rgba(59, 130, 246, 0.2)",
                    borderTopColor: "#3b82f6"
                }}
            ></div>
        </div>
    );
}
