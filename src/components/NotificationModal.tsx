import styles from "./NotificationModal.module.css";
import Button from "./Button";

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'success' | 'error';
    title: string;
    message: string;
}

export default function NotificationModal({ isOpen, onClose, type, title, message }: NotificationModalProps) {
    if (!isOpen) return null;

    const isSuccess = type === 'success';
    return (
        <div className={styles.overlay}>
            <div className={styles.modalCard}>
                <div className={`${styles.iconContainer} ${isSuccess ? styles.successIcon : styles.errorIcon}`}>
                    <i className={`fas ${isSuccess ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                </div>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.message}>{message}</p>
                <div className={styles.footer}>
                    <Button texto="Aceptar" variante={isSuccess ? "primario" : "secundario"} onclick={onClose} anchoCompleto={true} />
                </div>
            </div>
        </div>

    )
}