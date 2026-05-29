import { useState, useEffect, useRef } from "react";
import Styles from "./FloatingTimePicker.module.css";

interface Props {
    label: string;
    selectedTime: string; // Formato HH:MM
    onTimeSelect: (time: string) => void;
}

export default function FloatingTimePicker({ label, selectedTime, onTimeSelect }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initialize hours and minutes from selectedTime or default to current time/00:00
    const initialHour = selectedTime ? selectedTime.split(":")[0] : "12";
    const initialMinute = selectedTime ? selectedTime.split(":")[1] : "00";

    const [currentHour, setCurrentHour] = useState(initialHour);
    const [currentMinute, setCurrentMinute] = useState(initialMinute);

    // Cerrar el dropdown al hacer clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Actualizar el estado interno si la prop cambia desde afuera
    useEffect(() => {
        if (selectedTime) {
            setCurrentHour(selectedTime.split(":")[0]);
            setCurrentMinute(selectedTime.split(":")[1]);
        }
    }, [selectedTime]);

    // Generar horas del 00 al 23
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    // Generar minutos del 00 al 59
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    const handleConfirm = () => {
        onTimeSelect(`${currentHour}:${currentMinute}`);
        setIsOpen(false);
    };

    return (
        <div className={Styles.field} ref={dropdownRef}>
            <label className={Styles.label}>{label}</label>
            
            <button 
                type="button"
                className={`${Styles.input} ${isOpen ? Styles.isActive : ''}`} 
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedTime ? selectedTime : "--:--"}</span>
            </button>
            <span className={Styles.iconLeft}>
                <i className="fas fa-clock"></i>
            </span>

            {isOpen && (
                <div className={Styles.dropdown}>
                    <div className={Styles.header}>
                        <span>Selecciona la Hora</span>
                    </div>

                    <div className={Styles.timeContainer}>
                        <div className={Styles.column}>
                            <div className={Styles.columnTitle}>Hora</div>
                            {hours.map(h => (
                                <button
                                    key={`h-${h}`}
                                    type="button"
                                    className={`${Styles.timeButton} ${currentHour === h ? Styles.selected : ''}`}
                                    onClick={() => setCurrentHour(h)}
                                >
                                    {h}
                                </button>
                            ))}
                        </div>
                        <div className={Styles.column}>
                            <div className={Styles.columnTitle}>Minuto</div>
                            {minutes.map(m => (
                                <button
                                    key={`m-${m}`}
                                    type="button"
                                    className={`${Styles.timeButton} ${currentMinute === m ? Styles.selected : ''}`}
                                    onClick={() => setCurrentMinute(m)}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={Styles.footer}>
                        <button type="button" className={Styles.confirmButton} onClick={handleConfirm}>
                            Aceptar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
