import Structure from "../components/Structure";
import Button from "../components/Button"
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import CardMap from "../components/CardMap";
import type { ILaboratoryData } from "../models/ILaboratoryData";
import { getScheduleFrom } from "../services/ScheduleService";

export default function MapLaboratory() {
    // Objeto encargado de la navegación
    const navigate = useNavigate();
    // Navegar y enviar datos a un destino, en este caso ScheduleL...
    const viewHorary = (labNumber: number) => {
        console.log("Navegando al lab " + labNumber);
        getScheduleFrom(labNumber.toString()).then((data) => {
            // Enviamos solo los horarios del laboratorio selecionado
            const laboratoryData: ILaboratoryData = {
                schedules: data
            };
            navigate(`/horario/${labNumber}`, { state: laboratoryData });
        });
    }

    return (
        <Structure title='HORARIOS' footerText='© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Horarios'
            navbarActions={<>
                <Button texto="Log In" variante="inverso" icono="fal fa-sign-in-alt" onclick={() => navigate("/login")}></Button>
            </>}>
            <section className={`section ${styles.section}`}>
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
            </section>
        </Structure>
    );
}