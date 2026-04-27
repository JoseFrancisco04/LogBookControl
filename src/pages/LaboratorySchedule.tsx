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
                        <div className='column is-half is-offset-one-quarter'>
                            <table className="table is-striped">
                        <thead>
                            <tr>
                                <th>Laboratorio {labNumber} 🥵</th>
                            </tr>
                        </thead>

                        <tbody>
                            {labData.schedules.map((hour, index) => (
                                <tr><th key={index}>{hour}</th></tr>
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
