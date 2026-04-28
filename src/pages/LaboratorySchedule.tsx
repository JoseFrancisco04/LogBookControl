import { useParams, Navigate, useLocation } from "react-router-dom";
import Structure from "../components/Structure";
import styles from "./Login.module.css";
import type { ILaboratoryData } from "../models/ILaboratoryData";

export const LaboratorySchedule = () => {
    const { labNumber } = useParams<{ labNumber: string }>();
    const location = useLocation();

    const labData = location.state as ILaboratoryData;

    if (!labData || parseInt(labNumber!) > 4) {
        return <Navigate to="/" replace />;
    }

    return (
        <Structure>
            <section className={`section ${styles.section}`}>
                <div className={`container`}>
                    <div className='columns is-centered is-mobile'>
                        <div className='column is-half'>
                            <h1>Laboratorio {labNumber} 🥵</h1>
                            <table className="table is-striped">
                                <thead>
                                    <tr>
                                        <th>Horario</th>
                                        <th>Clase</th>
                                        <th>Docente</th>
                                        <th>Grupo</th>
                                        <th>Carrera</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {labData.schedules.map((hour, index) => (
                                        <tr key={index}>
                                            <th>{hour.hora_inicio + ' - ' + hour.hora_fin}</th>
                                            <th>{hour.materia}</th>
                                            <th>{hour.maestro}</th>
                                            <th>{hour.grupo_id}</th>
                                            <th>{hour.career}</th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </Structure>
    )
}
