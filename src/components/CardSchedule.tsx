import type { ISchedule } from "../models/ISchedule";
import styles from "./CardSchedule.module.css";

interface Props {
    schedule: ISchedule;
}

export default function CardSchedule({ schedule }: Props) {

    const grupo_id = schedule.grupo_id.toLocaleLowerCase();
    const career = grupo_id.includes("sis") ? "sis" : "inf";

    return (
        <div className="card mb-4">
            <div className={`card-content py-4 ${styles.cardContent}`}>
                <div className="media is-align-items-center">

                    <div className="media-left">
                        <div className={`box has-text-centered py-2 px-3 shadow-none ${styles.hours}`}
                            style={{
                                backgroundColor: career == "sis" ?
                                    "#f0f340" : career == "inf" ?
                                        "#669fe0" : career == "ind" ?
                                            "#58c46f" : "var(--color-neutral-2)"
                            }}>
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