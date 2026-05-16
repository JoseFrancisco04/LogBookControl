import Structure from "../components/Structure";
import Button from "../components/Button"
import styles from "./Login.module.css";
import { replace, useNavigate } from "react-router-dom";
import CardMap from "../components/CardMap";
import type { ILaboratoryData } from "../models/ILaboratoryData";
import { getScheduleFrom } from "../services/ScheduleService";
import { useState } from "react";
// import type { ISchedule } from "../models/ISchedule";

export default function MapLaboratory() {
    const [navigating, setNavigating] = useState(false);

    // Objeto encargado de la navegación
    const navigate = useNavigate();
    
    const viewHorary = (labNumber: string) => {
        console.log("Navegando al lab " + labNumber);
        setNavigating(true);
        getScheduleFrom(labNumber).then((data) => {

            // Enviamos solo los horarios de hoy del laboratorio selecionado
            const today = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
            data = data!.filter(schedule => schedule.dia_semana.toLocaleLowerCase() == today);

            const laboratoryData: ILaboratoryData = {
                schedules: data
            };
            console.log(data);

            navigate(`/horario/${labNumber}`, { state: laboratoryData });
        }).catch(() => {
            setNavigating(false);
        });
    }

    return (
        <Structure title='HORARIOS' footerText='© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Horarios'
            navbarActions={<>
                <Button texto="Iniciar Sesión" variante="inverso" iconIzquierdo="fal fa-sign-in-alt" onclick={() => navigate("/login")}></Button>
            </>}>
            <section className={`section ${styles.section}`}>
                {navigating ?
                    (
                        <i className="fa-solid fa-spinner fa-spin-pulse fa-2xl"></i>
                    ) : (
                        <div className={`container`}>
                            <div className='columns is-centered is-mobile'>
                                <CardMap laboratoryNumber="1" classInProgress="32" onClick={() => viewHorary("1")} />
                                <CardMap laboratoryNumber="2" classInProgress="25" onClick={() => viewHorary("2")} />
                            </div>

                            <div className='columns is-centered is-mobile'>
                                <CardMap laboratoryNumber="3" classInProgress="25" onClick={() => viewHorary("3")} />
                                <CardMap laboratoryNumber="4" classInProgress="30" onClick={() => viewHorary("4")} />
                            </div>
                        </div>
                    )}
            </section>
        </Structure>
    );
}