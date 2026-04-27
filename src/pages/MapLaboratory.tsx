import Structure from "../components/Structure";
import styles from "./Login.module.css";
import logoTec from "../assets/logoTec.png";
import { Link, useNavigate } from "react-router-dom";
import CardMap from "../components/CardMap";
import type { ILaboratoryData } from "../models/ILaboratoryData";
import { getSchedules } from "../services/ScheduleService";

function loadSchedules () {
    return getSchedules();
}

export default function MapLaboratory() {
    // Objeto encargado de la navegación
    const navigate = useNavigate();
    // Navegar y enviar datos a un destino, en este caso ScheduleL...
    const viewHorary = (labNumber: number, labData: ILaboratoryData) => {
        // Enviamos solo los horarios del laboratorio selecionado
        const laboratoryData: ILaboratoryData = {
            schedules: labData.schedules.filter(data => data.laboratory == labNumber)
        };
        console.log(laboratoryData)
        navigate(`/horario/${labNumber}`, { state: laboratoryData });
    }
    // Plantilla de los datos que van a enviar
    const dataToSend: ILaboratoryData = {
        schedules: loadSchedules()
    };

    return (
        <Structure>
            <nav className={`navbar ${styles.navbar}`}>
                <div className={styles.navbarInner}>
                    <img src={logoTec} alt="Logo Tec" className={styles.navbarLogo} />
                    <strong className={styles.navbarTitle}>
                        CENTRO DE CÓMPUTO -{' '}
                        <span className={styles.navbarAccent}>HORARIOS</span>
                    </strong>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link to="/login" className="button is-primary">
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <section className={`section ${styles.section}`}>
                <div className={`container`}>
                    <div className='columns is-centered is-mobile'>
                        <CardMap laboratoryNumber="1" classInProgress="POO" onClick={() => viewHorary(1, dataToSend)} />
                        <CardMap laboratoryNumber="2" classInProgress="Pistología" onClick={() => viewHorary(2, dataToSend)} />
                    </div>

                    <div className='columns is-centered is-mobile'>
                        <CardMap laboratoryNumber="3" classInProgress="Pistología" onClick={() => viewHorary(3, dataToSend)} />
                        <CardMap laboratoryNumber="4" classInProgress="Pistología" onClick={() => viewHorary(4, dataToSend)} />
                    </div>
                </div>
            </section>
        </Structure>
    );
}