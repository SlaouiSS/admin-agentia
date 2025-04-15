import toast from "react-hot-toast";

export const useToasts = () => {
    const success = (message) =>
        toast.success(message, {
            position: "top-right",
            duration: 3000,
            style: {
                background: "#e0f7ec",
                color: "#065f46",
                border: "1px solid #34d399",
                fontWeight: "500",
            },
            icon: "✅",
        });

    const error = (message) =>
        toast.error(message, {
            position: "top-right",
            duration: 4000,
            style: {
                background: "#fef2f2",
                color: "#991b1b",
                border: "1px solid #f87171",
                fontWeight: "500",
            },
            icon: "⛔",
        });

    return { success, error };
};
