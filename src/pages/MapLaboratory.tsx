import Structure from "../components/Structure";
import Button from "../components/Button"
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import CardMap from "../components/CardMap";
import type { ILaboratoryData } from "../models/ILaboratoryData";
import { getScheduleFrom } from "../services/ScheduleService";
import { useEffect, useState } from "react";
import type { ISchedule } from "../models/ISchedule";

export default function MapLaboratory() {
    const [navigating, setNavigating] = useState(false);
    // const [loading, setLoading] = useState(true);
    // const [schedules, setSchedules] = useState<ISchedule[]>([]);

    // Objeto encargado de la navegación
    const navigate = useNavigate();
    // Navegar y enviar datos a un destino, en este caso ScheduleL...
    const viewHorary = (labNumber: number) => {
        console.log("Navegando al lab " + labNumber);
        setNavigating(true);
        getScheduleFrom(labNumber.toString()).then((data) => {
            // Enviamos solo los horarios del laboratorio selecionado
            const laboratoryData: ILaboratoryData = {
                schedules: data
            };
            navigate(`/horario/${labNumber}`, { state: laboratoryData });
        }).catch(() => {
            setNavigating(false);
        });
    }

    // const loadSchedules = async () => {
    //     setLoading(true);
    //     const schedulesLab1 = await getScheduleFrom("1") as ISchedule[];
    //     const schedulesLab2 = await getScheduleFrom("2") as ISchedule[];
    //     const schedulesLab3 = await getScheduleFrom("3") as ISchedule[];
    //     const schedulesLab4 = await getScheduleFrom("4") as ISchedule[];
    //     if (!schedulesLab1 && !schedulesLab2 && !schedulesLab3) {
    //         setSchedules(prev => prev.concat(schedulesLab1, schedulesLab2, schedulesLab3, schedulesLab4));
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     loadSchedules();
    // }, []);

    return (
        <Structure title='HORARIOS' footerText='© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Horarios'
            navbarActions={<>
                <Button texto="Log In" variante="inverso" icono="fal fa-sign-in-alt" onclick={() => navigate("/login")}></Button>
            </>}>
            <section className={`section ${styles.section}`}>
                {navigating ?
                    (
                        <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
                    ) : (
                        <div className={`container`}>
                            <div className='columns is-centered is-mobile'>
                                <CardMap laboratoryNumber="1" classInProgress="POO" onClick={() => viewHorary(1)} />
                                <CardMap laboratoryNumber="2" classInProgress="Pistología" onClick={() => viewHorary(2)} />
                            </div>

                            <div className='columns is-centered is-mobile'>
                                <CardMap laboratoryNumber="3" classInProgress="Pistología" onClick={() => viewHorary(3)} />
                                <CardMap laboratoryNumber="4" classInProgress="Pistología" onClick={() => viewHorary(4)} />
                            </div>
                        </div>
                    )}
            </section>
        </Structure>
    );
}