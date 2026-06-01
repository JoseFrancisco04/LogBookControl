import Structure from "../components/Structure";
import Button from "../components/Button"
import styles from "./MapLaboratory.module.css";
import { useNavigate } from "react-router-dom";
import CardMap from "../components/CardMap";
import type { ILaboratoryData } from "../models/ILaboratoryData";
import { getScheduleFrom } from "../services/ScheduleService";
import { useState } from "react";
import NotificationModal from "../components/NotificationModal";
// import type { ISchedule } from "../models/ISchedule";

export default function MapLaboratory() {
    const [navigating, setNavigating] = useState(false);
    // Objeto encargado de la navegación
    const navigate = useNavigate();

    const [notification, setNotification] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'success' as 'success' | 'error'
    })

    const viewHorary = (labNumber: string) => {
        console.log("Navegando al lab " + labNumber);
        setNavigating(true);
        getScheduleFrom(labNumber).then((data) => {

            // Enviamos solo los horarios de hoy del laboratorio selecionado
            const today = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
            const horariosHoy = (data || []).filter(schedule => schedule.dia_semana.toLocaleLowerCase() == today);

            if (horariosHoy.length === 0) {
                setNavigating(false);
                setNotification({
                    isOpen: true,
                    title: `Laboratorio ${labNumber}`,
                    message: "No hay horarios definidos en el laboratorio en este momento.",
                    type: 'success'
                });

            } else {
                const laboratoryData: ILaboratoryData = {
                    schedules: horariosHoy
                };
                //console.log(data);

                navigate(`/horario/${labNumber}`, { state: laboratoryData });

            }

        }).catch(() => {
            setNavigating(false);
            setNotification({
                isOpen: true,
                title: "Error de Conexión",
                message: "No pudimos consultar los horarios. Inténtalo más tarde.",
                type: 'error'
            });
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
                        <div className={styles.loadContainer}>
                            <i className="fa-solid fa-spinner fa-spin-pulse fa-3x" style={{ color: 'var(--color-primario)' }}></i>
                        </div>
                    ) : (
                        <div className={styles.mapContainer}>
                            <div className='columns is-centered is-multiline'>
                                <CardMap laboratoryNumber="1" classInProgress="32" onClick={() => viewHorary("1")} />
                                <CardMap laboratoryNumber="2" classInProgress="25" onClick={() => viewHorary("2")} />

                                <CardMap laboratoryNumber="3" classInProgress="25" onClick={() => viewHorary("3")} />
                                <CardMap laboratoryNumber="4" classInProgress="30" onClick={() => viewHorary("4")} />
                            </div>
                        </div>
                    )}
            </section>
            <NotificationModal
             isOpen = {notification.isOpen}
             type={notification.type}
             title={notification.title}
             message={notification.message}
             onClose={()=> setNotification({...notification, isOpen:false})}
            />
        </Structure>
    );
}