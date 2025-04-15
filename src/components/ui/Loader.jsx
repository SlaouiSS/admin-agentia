// src/components/ui/Loader.jsx
export function Loader() {
    return (
        <div className="flex justify-center items-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
    );
}
