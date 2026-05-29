import { useState, useEffect, useRef } from "react";
import Styles from "./FloatingCalendar.module.css";

interface Props {
    label: string;
    selectedDate: string; // Formato YYYY-MM-DD
    onDateSelect: (date: string) => void;
}

/**
 * Componente de calendario flotante tipo Dropdown.
 * Permite al usuario seleccionar una fecha de manera interactiva.
 * Rediseñado para encajar con el diseño del sistema (UI/UX).
 * 
 * @param {Props} props - Propiedades: label del input, fecha seleccionada y callback al cambiar fecha.
 * @returns {JSX.Element} Un input que despliega un calendario interactivo al hacer clic.
 */
export default function FloatingCalendar({ label, selectedDate, onDateSelect }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    
    // Estado interno para saber qué mes/año estamos viendo en el calendario
    const [currentViewDate, setCurrentViewDate] = useState(new Date());
    
    // Referencia para poder cerrar el calendario si el usuario hace clic afuera
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Días de la semana para la cabecera
    const weekDays = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

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

    // Funciones matemáticas para el calendario
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    // Formateador exacto a YYYY-MM-DD para evitar problemas de zona horaria
    const formatToYYYYMMDD = (year: number, month: number, day: number) => {
        const y = year;
        const m = String(month + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    // Generar la cuadrícula del calendario
    const renderCalendarGrid = () => {
        const year = currentViewDate.getFullYear();
        const month = currentViewDate.getMonth();
        
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        
        const days = [];
        // Espacios vacíos antes del primer día del mes
        for (let i = 0; i < firstDay; i++) {
            days.push(<td key={`empty-${i}`}></td>);
        }

        // Días reales del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = formatToYYYYMMDD(year, month, day);
            const isSelected = dateString === selectedDate;

            days.push(
                <td key={day}>
                    <button 
                        type="button"
                        className={`${Styles.dayButton} ${isSelected ? Styles.selected : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            onDateSelect(dateString);
                            setIsOpen(false);
                        }}
                    >
                        {day}
                    </button>
                </td>
            );
        }

        // Agrupar en filas de 7 días (Semanas)
        const rows: any[] = [];
        let cells: any[] = [];
        
        days.forEach((day, index) => {
            if (index % 7 !== 0) {
                cells.push(day);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(day);
            }
            if (index === days.length - 1) {
                rows.push(cells);
            }
        });

        return rows.map((d, i) => <tr key={i}>{d}</tr>);
    };

    const handlePrevMonth = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 1));
    };

    return (
        <div className={Styles.field} ref={dropdownRef}>
            <label className={Styles.label}>{label}</label>
            
            <button 
                type="button"
                className={`${Styles.input} ${isOpen ? Styles.isActive : ''}`} 
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedDate ? selectedDate : "Seleccionar Fecha"}</span>
            </button>
            <span className={Styles.iconLeft}>
                <i className="fas fa-calendar-alt"></i>
            </span>

            {isOpen && (
                <div className={Styles.dropdown}>
                    <div className={Styles.header}>
                        <button type="button" className={Styles.navButton} onClick={handlePrevMonth}>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <span>
                            {monthNames[currentViewDate.getMonth()]} {currentViewDate.getFullYear()}
                        </span>
                        <button type="button" className={Styles.navButton} onClick={handleNextMonth}>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>

                    <table className={Styles.calendarTable}>
                        <thead>
                            <tr>
                                {weekDays.map(day => (
                                    <th key={day}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {renderCalendarGrid()}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}