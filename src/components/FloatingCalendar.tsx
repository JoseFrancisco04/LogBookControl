import { useState, useEffect, useRef } from "react";

interface Props {
    label: string;
    selectedDate: string; // Formato YYYY-MM-DD
    onDateSelect: (date: string) => void;
}

/**
 * @returns Un calendario flotante
 * @description La neta se lo pedí a la IA y no sé que show, ahí le dices al autor que lo modifique
 * @author Gemini
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

    // Cerrar el dropdown al hacer clic fuera de él (Práctica Senior de UX)
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
        const m = String(month + 1).padStart(2, '0'); // Los meses en JS empiezan en 0
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
                <td key={day} className="has-text-centered p-1">
                    <button 
                        className={`button is-small ${isSelected ? 'is-info' : 'is-white'}`}
                        style={{ width: '100%', borderRadius: '50%' }}
                        onClick={() => {
                            onDateSelect(dateString);
                            setIsOpen(false); // Cerramos al seleccionar
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

    // Navegación de meses
    const handlePrevMonth = () => {
        setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 1));
    };

    return (
        <div className="field">
            <label className="label" style={{ color: "var(--color-fuente)" }}>{label}</label>
            <div className={`dropdown ${isOpen ? 'is-active' : ''}`} ref={dropdownRef}>
                
                {/* El Input que dispara el calendario flotante */}
                <div className="dropdown-trigger">
                    <button 
                        className="button is-fullwidth" 
                        aria-haspopup="true" 
                        aria-controls="dropdown-menu"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="icon is-small">
                            <i className="fas fa-calendar-alt"></i>
                        </span>
                        <span>{selectedDate ? selectedDate : "Seleccionar Fecha"}</span>
                    </button>
                </div>

                {/* El menú flotante con el calendario */}
                <div className="dropdown-menu" id="dropdown-menu" role="menu" style={{ minWidth: '300px' }}>
                    <div className="dropdown-content p-3">
                        
                        {/* Cabecera del calendario */}
                        <div className="level is-mobile mb-2">
                            <button className="button is-small is-white level-left" onClick={handlePrevMonth}>
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <div className="level-item has-text-weight-bold">
                                {monthNames[currentViewDate.getMonth()]} {currentViewDate.getFullYear()}
                            </div>
                            <button className="button is-small is-white level-right" onClick={handleNextMonth}>
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>

                        {/* Cuadrícula usando la tabla de Bulma */}
                        <table className="table is-narrow is-fullwidth is-borderless mb-0">
                            <thead>
                                <tr>
                                    {weekDays.map(day => (
                                        <th key={day} className="has-text-centered"><small>{day}</small></th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {renderCalendarGrid()}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}