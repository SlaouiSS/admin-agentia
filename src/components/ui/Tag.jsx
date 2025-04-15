
export default function Tag({ children, color = "gray" }) {
    const base = "inline-block text-xs font-medium px-2 py-1 rounded-full";
    const colors = {
        gray: "bg-gray-100 text-gray-700",
        green: "bg-green-100 text-green-700",
        red: "bg-red-100 text-red-700",
        blue: "bg-blue-100 text-blue-700",
        yellow: "bg-yellow-100 text-yellow-700",
    };

    return <span className={base + " " + (colors[color] || colors.gray)}>{children}</span>;
}
