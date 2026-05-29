import React, { useState, useEffect } from "react";
import styles from "./LogoutModal.module.css";
import Button from "./Button";
import InputField from "./InputField";
import { logout } from "../services/AuthService";
import { replace, useNavigate } from "react-router-dom";

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    // onConfirm: (password: string) => void;
}

export default function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
    const navigate = useNavigate();
    const num_control = localStorage.getItem('num_control');
    const [contraseña, setContraseña] = useState('');

    const [error, setError] = useState<string | null>(null);
    const [charging, setCharging] = useState(false);

    useEffect(()=>{
        if(!isOpen){
            setError("");
            setContraseña("");
        }
    },[isOpen])


    if (!isOpen) return null;

    const handleConfirm = async () => {
        if (!contraseña.trim()) {
            setError("Por favor, completa todos los campos.");
            return;
        }
        try {
            setCharging(true);
            setError(null);
            if (num_control) {
                const response = await logout({ num_control, contraseña });
                if (response.ok) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('rol');
                    localStorage.removeItem('num_control');

                    navigate('/', { replace: true });

                    console.log("cierre de sesion exitoso");
                }
            } else {
                setError("Estado corrupto detectado: Forzando cierre local.")
                localStorage.removeItem('token');
                localStorage.removeItem('rol');
                localStorage.removeItem('num_control');

                navigate('/', { replace: true });
            }
        } catch (err: any) {
            setError(err.message || "Contraseña Incorrecta")
        } finally {
            setCharging(false);
        }
    };
    return (
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
                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}
                <div className={styles.modalBody}>
                    <InputField label="Contraseña de autorización" placeholder="••••••••" type="password" value={contraseña} icon="fa-key" iconRight="fa-eye" onChange={(val) => setContraseña(val)} />
                </div>
                <div className={styles.modalFooter}>
                    <Button texto="Cancelar" variante="secundario" onclick={onClose} />
                    <Button texto={charging ? "Saliendo..." : "Confirmar Salida"} variante="primario" icono={ charging ? "fa-spinner fa-spin":"fa-sign-out-alt"} onclick={handleConfirm} />
                </div>
            </div>
        </div>

    )
}