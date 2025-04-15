
import { Button } from "./Button";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex items-center justify-center gap-2 mt-4">
            <Button variant="ghost" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Précédent
            </Button>
            <span className="text-sm">
                Page {currentPage} sur {totalPages}
            </span>
            <Button variant="ghost" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Suivant
            </Button>
        </div>
    );
}
