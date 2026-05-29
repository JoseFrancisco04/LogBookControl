import { useParams, Navigate, useLocation, useNavigate } from "react-router-dom";
import Structure from "../components/Structure";
import styles from "./LaboratorySchedule.module.css"
import type { ILaboratoryData } from "../models/ILaboratoryData";
import CardSchedule from "../components/CardSchedule";
import Button from "../components/Button";

function getHours(now: Date): string {
    return (now.getHours() < 9 ? `0${now.getHours()}` : now.getHours().toString()).concat(":00:00");
}

export const LaboratorySchedule = () => {
    const { labNumber } = useParams<{ labNumber: string }>();
    const location = useLocation();
    const navigate = useNavigate();

    const labData = location.state as ILaboratoryData;

    // En algunos casos el if no entra y la pantalla marca error
    if (!labData || !labData.schedules || labData.schedules.length < 1 || parseInt(labNumber!) > 4) {
        return <Navigate to="/" replace />;
    }

    // Fecha actual
    let now = new Date();
    // Obtenemos la hora actual en formato 00:00:00
    const timeNow = getHours(now);
    //console.log(timeNow);

    // Sumamos una hora (siguiente clase)
    now.setHours(now.getHours() + 1);
    // Obtenemos la siguiente hora en formato 00:00:00
    const timeNext = getHours(now);
    //console.log(timeNext);

    const classInProgress = labData.schedules.find(s => s.hora_inicio == timeNow);
    //const classInProgress = labData.schedules.find(s => s.hora_inicio == "07:00:00");
    const nextClass = labData.schedules.find(s => s.hora_inicio == timeNext);
    //const nextClass = labData.schedules.find(s => s.hora_inicio == "08:00:00");


    return (
        <Structure title='HORARIOS' footerText={`© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Laboratorio ${labNumber}`}
            navbarActions={<>
                <Button texto="Ver Horarios" variante="inverso" icono="fas fa-map-signs" onclick={() => navigate("/")}></Button>
            </>}>
            <section className={`section`}>
                <div className={`container`}>

                    <h1 className={`title has-text-centered mb-6 has-text-grey-dark`}>Laboratorio de Cómputo {labNumber}</h1>

                    <div className={`columns is-centered`}>
                        <div className={`column is-12-mobile is-8-tablet is-6-desktop`}>

                            <div className={`card mb-6 has-background-info-light ${styles.cardBorder}`}>
                                <div className={`card-content ${styles.cardContent}`}>
                                    <div className={`columns is-vcentered is-mobile`}>

                                        {/* Clase Actual */}
                                        <div className={`column`}>
                                            {/* Agregar el if para cuando no hayan clases */}
                                            {classInProgress ? <>
                                                <p className={`heading has-text-weight-bold ${styles.title}`}>En Curso ({`${classInProgress?.hora_inicio.slice(0, -3)} - ${classInProgress?.hora_fin.slice(0, -3)}`})</p>
                                                <p className={`title is-4 mb-2 ${styles.title}`}>{classInProgress?.materia}</p>
                                                <p className={`subtitle is-6 mb-0 ${styles.title}`}>{classInProgress?.maestro}</p>
                                                <span className={`tag is-info is-light mt-2 ${styles.title}`}>{classInProgress?.grupo_id}</span>
                                            </> : <>
                                                <p className={`heading has-text-weight-bold ${styles.title}`}>Ninguna clase en curso</p>
                                                <p className={`title is-4 mb-2 ${styles.title}`}>Laboratorio libre</p>
                                            </>}

                                        </div>

                                        {/* Clase siguiente */}
                                        <div className={`column is-narrow has-text-right is-one-third`} style={{ borderLeft: "1px solid var(--color-secundario)" }}>
                                            <p className={`heading`} style={{ color: "var(--color-fuente)" }}>Siguiente</p>
                                            <p className={`subtitle is-6 mb-1`} style={{ color: "var(--color-fuente)" }}>{nextClass?.materia}</p>
                                            <p className={`is-size-7`} style={{ color: "var(--color-fuente)" }}>{
                                                nextClass ?
                                                    `${nextClass?.hora_inicio.slice(0, -3)} - ${nextClass?.hora_fin.slice(0, -3)}` :
                                                    "Sin clases a continuación"
                                            }</p>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <h2 className={`title is-5 has-text-grey mb-4`}>Programación del Día {labData?.schedules[0].dia_semana}</h2>

                            {labData?.schedules?.map((hour) => (
                                <CardSchedule schedule={hour} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Structure>
    )
}


// <h1 className={`title has-text-centered mb-6 has-text-grey-dark`}>Laboratorio de Cómputo A</h1>

// <div className={`columns is-centered`}>
// <div className={`column is-12-mobile is-8-tablet is-6-desktop`}>

//                             <div className={`card mb-6 has-background-info-light ${styles.cardBorder}`}>
//                                 <div className={`card-content ${styles.cardContent}`}>
//                                     <div className={`columns is-vcentered is-mobile`}>

//                                         {/* Clase Actual */}
//                                         <div className={`column`}>
//                                             <p className={`heading has-text-weight-bold ${styles.title}`}>En Curso (10:00 - 11:30)</p>
//                                             <p className={`title is-4 mb-2 ${styles.title}`}>Arquitectura de Software</p>
//                                             <p className={`subtitle is-6 mb-0 ${styles.title}`}>Prof. Hernández</p>
//                                             <span className={`tag is-info is-light mt-2 ${styles.title}`}>Grupo 8B</span>
//                                         </div>

//                                         {/* Clase siguiente */}
//                                         <div className={`column is-narrow has-text-right`} style={{ borderLeft: "1px solid var(--color-secundario)" }}>
//                                             <p className={`heading`} style={{color: "var(--color-fuente)"}}>Siguiente</p>
//                                             <p className={`subtitle is-6 mb-1`} style={{color: "var(--color-fuente)"}}>Bases de Datos</p>
//                                             <p className={`is-size-7`} style={{color: "var(--color-fuente)"}} >11:30 - 13:00</p>
//                                         </div>

//                                     </div>
//                                 </div>
//                             </div>


//                             <h2 className={`title is-5 has-text-grey mb-4`}>Programación del Día</h2>

//                             <CardSchedule schedule={dataTemp}/>
//                             <CardSchedule schedule={dataTemp}/>
//                         </div>
//                     </div>