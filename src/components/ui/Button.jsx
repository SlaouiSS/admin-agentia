
import clsx from "clsx";
import { buttonVariants } from "./theme";

export function Button({ children, type = "button", variant = "default", className = "", ...props }) {
    const base = "inline-flex items-center justify-center px-3 py-2 rounded text-sm font-medium transition duration-200 focus:outline-none";
    return (
        <button
            type={type}
            className={clsx(base, buttonVariants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
}
