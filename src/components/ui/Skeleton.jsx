// src/components/ui/Skeleton.jsx
export default function Skeleton({ width = "100%", height = "20px", className = "" }) {
    return (
        <div
            className={`bg-gray-200 rounded-md animate-pulse ${className}`}
            style={{ width, height }}
        />
    );
}
