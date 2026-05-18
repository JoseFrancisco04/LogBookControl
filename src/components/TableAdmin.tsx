import type { ISchedule } from "../models/ISchedule";
import style from "./TableAdmin.module.css"

interface Props {
    scheduleData: Record<CellKey, ISchedule>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedCell: React.Dispatch<React.SetStateAction<string | null>>
}

type CellKey = string;

function getCareerColor(grupo_id: string): string {
    return grupo_id.includes("sis") ? "var(--color-sistemas)" :
        grupo_id.includes("inf") ? "var(--color-informatica)" :
            grupo_id.includes("ind") ? "var(--color-industrial)" :
                grupo_id.includes("adm") ? "var(--color-administracion)" :
                    grupo_id.includes("ele") ? "var(--color-electrica)" :
                        grupo_id.includes("mec") ? "var(--color-mecatronica)" :
                            "var(--color-neutral-2";
}

export default ({ setSelectedCell, setIsModalOpen, scheduleData }: Props) => {

    // Columnas
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    // Filas
    const hours = ["07:00-08:00", "08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00",
        "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00"];

    // Al hacer click en una celda
    const handleCellClick = (cellKey: CellKey) => {
        setSelectedCell(cellKey);         // recuerda cuál celda
        setIsModalOpen(true);             // abre el modal
    };

    return (<>
        <table className={`table is-bordered is-fullwidth ${style.tableAdmin}`}>
            <thead>
                <tr>
                    <th className={`has-text-centered ${style.fontColor}`}>Hora</th>
                    {days.map((day) => (
                        <th className={`has-text-centered ${style.fontColor}`}
                            key={day}
                            colSpan={day == "Sabado" ? 2 : 1}>
                            {day}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {hours.map((hour) => (
                    <tr key={hour}>
                        <td className={`has-text-centered ${style.fontColor}`}>{hour}</td>
                        {days.map((day) => {
                            const cellKey = `${day}-${hour}`;        // clave única
                            const cellInfo = scheduleData[cellKey];  // busca si hay datos
                            return (
                                <td
                                    key={cellKey}
                                    onClick={() => handleCellClick(cellKey)}
                                    style={{
                                        backgroundColor: cellInfo ? getCareerColor(cellInfo.grupo_id.toLocaleLowerCase()) : ""
                                    }}
                                    className={`${style.cell} ${cellInfo ? `${style.fontColor}` : "has-text-centered"}`}
                                >
                                    {cellInfo ? (
                                        <div>
                                            <small><b>{cellInfo.materia}</b></small>
                                            <br />
                                            <small>{cellInfo.maestro}</small>
                                            <br />
                                            <small>{cellInfo.grupo_id}</small>
                                        </div>
                                    ) : (
                                        <span className="has-text-grey-light">
                                            <i className="fa-solid fa-plus"></i>
                                        </span>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    </>);
}