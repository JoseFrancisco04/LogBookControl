import type { ISchedule } from "../models/ISchedule";
import styles from "./CardSchedule.module.css";

interface Props {
    schedule: ISchedule;
}

function getCareer(grupo_id: string): string {
    // Terminar las carreras
    return grupo_id.includes("sis") ? "var(--color-sistemas)" :
        grupo_id.includes("inf") ? "var(--color-informatica)" :
            grupo_id.includes("ind") ? "var(--color-industrial)" :
                "var(--color-neutral-2";
}

export default function CardSchedule({ schedule }: Props) {

    const grupo_id = schedule.grupo_id.toLocaleLowerCase();

    return (
        <div className="card mb-4">
            <div className={`card-content py-4 ${styles.cardContent}`}>
                <div className="media is-align-items-center">

                    <div className="media-left">
                        <div className={`box has-text-centered py-2 px-3 shadow-none ${styles.hours}`}
                            style={{ backgroundColor: getCareer(grupo_id) }}>
                            <p className="has-text-weight-bold has-text-grey-dark is-size-5 mb-0">{schedule.hora_inicio.substring(0, 5)}</p>
                            <p className="is-size-7 has-text-grey">{schedule.hora_fin.substring(0, 5)}</p>
                        </div>
                    </div>


                    <div className={`media-content`}>
                        <p className="title is-5 mb-1" style={{ color: "var(--color-fuente)" }}>{schedule.materia}</p>
                        <p className="subtitle is-6 has-text-grey mb-1">{schedule.maestro}</p>
                    </div>


                    <div className="media-right">
                        <span className="tag is-light is-medium" style={{ color: "var(--color-fuente)" }}>{schedule.grupo_id}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}