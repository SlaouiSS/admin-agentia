
import { modalStyles } from "./theme";
import { Button } from "./Button";

export default function Modal({ title, children, onClose, onConfirm }) {
    return (
        <>
            <div className={modalStyles.backdrop} onClick={onClose}></div>
            <div className={modalStyles.container}>
                <div className={modalStyles.content}>
                    <h3 className="text-lg font-semibold mb-4">{title}</h3>
                    <div className="space-y-4">{children}</div>
                    <div className="flex justify-end gap-2 mt-6">
                        <Button variant="ghost" onClick={onClose}>Annuler</Button>
                        <Button variant="destructive" onClick={onConfirm}>Confirmer</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
