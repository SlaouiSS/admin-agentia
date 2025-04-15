
import { cardStyles } from "./theme";

export function Card({ children, className = "" }) {
    return <div className={cardStyles.base + " " + className}>{children}</div>;
}

export function CardContent({ children }) {
    return <div className="p-4">{children}</div>;
}
