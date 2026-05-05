import React, {useState} from "react";
import styles from "./ConfirmModal.module.css";
import Button from "./Button";
import InputField from "./InputField";

interface LogoutModalProps{
    isOpen: boolean;
    onClose: ()=> void;
    onConfirm: (password: string) => void;
}

export default function LogoutModal({isOpen, onClose, onConfirm}:LogoutModalProps){
    const [password, setPassword] = useState('');
    if(!isOpen)return null;

    const handleConfirm = ()=>{
        onConfirm(password);
        setPassword('');
    };
    return(
        <div className={styles.overlay}>
            <div className={styles.modalCard}>
                <div className={styles.modalHeader}>
                    <div className={styles.titleContainer}>
                        <i className={`fas fa-lock ${styles.titleIcon}`}></i>
                        <h2 className={styles.title}>Cerrar Sesión</h2>
                    </div>
                    <p className={styles.subtitle}>
                        Por seguridad, ingrese sus contraseña para confirmar que desea salir del sistema.

                    </p>
                </div>

                <div className={styles.modalBody}>
                    <InputField label="Contraseña de autorización" placeholder="••••••••" type="password" icon="fa-key" iconRight="fa-eye"/>
                </div>
                <div className={styles.modalFooter}>
                    <Button texto="Cancelar" variante="secundario" onclick={onClose}/>
                    <Button texto="Confirmar Salida" variante="primario" icono="fa-sign-out-alt" onclick={handleConfirm}/>
                </div>
            </div>
        </div>

    )
}