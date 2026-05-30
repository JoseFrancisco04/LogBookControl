import {useState, useEffect} from "react";
import styles from "./ConfirmModal.module.css";
import Button from "./Button";
import InputField from "./InputField";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (firma: string) => void;
    isLoading?: boolean;

    datosResumen: {
        docente: string;
        materia: string;
        laboratorio: string;
    };
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, datosResumen, isLoading }: ConfirmModalProps) {
    const [firma, setFirma] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        if(!isOpen){
            setError("");
            setFirma("");
        }
    },[isOpen])

    if (!isOpen) return null;

    const handleConfirmClick = ()=>{
        if(isLoading) return;

        if(!firma.trim()){
            setError("Por favor ingrese la clave de asistencia para confirmar. ");
            return;
        }

        onConfirm(firma);
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modalCard}>
                <div className={styles.modalHeader}>
                    <div className={styles.titleContainer}>
                        <i className={`fas fa-clipboard-check ${styles.titleIcon}`}></i>
                        <h2 className={styles.title}>Confirmar Registro de Actividades</h2>
                    </div>
                    <p className={styles.subtitle}>
                        Revise los detalles de la sesión antes de confirmar la asistencia y finalizar el registro.
                    </p>
                </div>
                {error &&(
                    <div className={styles.error}>
                        {error}
                    </div>
                )}
                <div className={styles.modalBody}>
                    <div className={styles.summaryContainer}>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Docente:</span>
                            <span className={styles.summaryValue}>{datosResumen.docente || 'No especificado'}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Materia:</span>
                            <span className={styles.summaryValue}>{datosResumen.materia || 'No especificado'}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Laboratorio:</span>
                            <span className={styles.summaryValue}>{datosResumen.laboratorio || 'No especificado'}</span>
                        </div>
                    </div>
                    <InputField label="Clave de asistencia" placeholder="Ingrese la clave" type="password" icon="fa-key" value={firma} iconRight='fa-eye' onChange={(val)=> setFirma(val)}/>
                    <span className={styles.helperText}>
                        <i className={`fas fa-info-circle`}></i>Requerido para validar la sesión.
                    </span>
                </div>
                <div className={styles.modalFooter}>
                    <Button texto="Cancelar" variante="secundario" onclick={onClose}/>
                    <Button texto={isLoading ? "Confirmando...":"Confirmar Asistencia"} variante="primario" icono={isLoading ?"fa-spinner fa-spin":"fa-check-circle"} onclick={handleConfirmClick}/>
                </div>
            </div>

        </div>

    )
}