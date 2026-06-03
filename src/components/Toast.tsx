import { useEffect } from "react";

interface Props {
    message: string;
    type: "success" | "danger" | "warning" | "info";
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: Props) {

    // Icono que será mostrado
    let icon: string = ""
    const chooseIcon = () => {
        switch (type) {
            case "success":
                icon = "fa-solid fa-thumbs-up";
                break;
            case "danger":
                icon = "fa-solid fa-skull-crossbones";
                break;
            case "warning":
                icon = "fa-solid fa-triangle-exclamation";
                break;
            case "info":
                icon = "fa-solid fa-circle-info";
                break;
            default:
                icon = "fa-solid fa-question";
                break;
        }
    }

    // Cerrar la notificación después de n segundos
    useEffect(() => {
        // Si no hay mensaje, no iniciamos el temporizador
        if (!message) return;

        const timer = setTimeout(() => {
            onClose();
        }, 3500);
        // Si el componente se desaparece antes de los n segundos,
        // cancelamos el timer para evitar fugas de memoria (memory leaks).
        return () => clearTimeout(timer);
    }, [message, onClose]);

    // Si el mensaje está vacío, no renderizamos nada
    if (!message) return null;
    // Precargamos el icono
    chooseIcon();

    return (
        <div className={`notification is-${type} is-light mb-3`}>
            <button className="delete" onClick={onClose}></button>
            <i className={`${icon} fa-lg mr-4`}></i>
            <strong>{message}</strong>
        </div>
    );
}