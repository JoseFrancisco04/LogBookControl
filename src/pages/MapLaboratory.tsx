import Structure from "../components/Structure.tsx";
import styles from "./Login.module.css";
import styleMap from "./MapLaboratory.module.css";
import logoTec from "../assets/logoTec.png";
import { useNavigate } from "react-router-dom";
import CardMap from "../components/CardMap.tsx";


export default function MapLaboratory() {
    const navigate = useNavigate();

    const viewHorary = (labNumber: number) => {
        navigate("/horario/" + labNumber);
    }

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
                            <a className="button is-primary">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <section className={`section ${styles.section}`}>
                <div className={`container`}>
                    <div className='columns is-centered is-mobile'>
                        <CardMap laboratoryNumber="1" classInProgress="POO" onClick={() => viewHorary(1)} />
                        <CardMap laboratoryNumber="2" classInProgress="Pistología" onClick={() => viewHorary(2)} />
                    </div>

                    <div className='columns is-centered is-mobile'>
                        <CardMap laboratoryNumber="3" classInProgress="Pistología" onClick={() => viewHorary(2)} />
                        <CardMap laboratoryNumber="4" classInProgress="Pistología" onClick={() => viewHorary(4)} />
                    </div>
                </div>
            </section>
        </Structure>
    );
}