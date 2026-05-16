import Button from "../components/Button";
import Structure from "../components/Structure";
import styles from "./LogBook.module.css";
//import logoTec from "../assets/logoTec.png";
import { useEffect, useState } from "react";
import LogoutModal from "../components/LogoutModal";
import { useNavigate } from "react-router-dom";
import { getLogBookForDate } from "../services/LogBookService";
import type { LogBookRecord } from "../services/LogBookService";


export default function LogBook() {
    const [isLogoutModal, setIsLogoutModal] = useState(false);
    const navigate = useNavigate();

    const [registros, setRegistros] = useState<LogBookRecord[]>([]);
    const [charging, setCharging] = useState<boolean>(true);

    const getDate = () => {
        const hoy = new Date();
        const year = hoy.getFullYear();
        const month = String(hoy.getMonth() + 1).padStart(2, '0');
        const day = String(hoy.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const cargarHistorial = async () => {
            try {
                setCharging(true);
                const fechaHoy = getDate();
                const data = await getLogBookForDate(fechaHoy);
                setRegistros(data);

            } catch (error) {
                console.error("Error al cargar la bitácora", error);

            } finally {
                setCharging(false);
            }
        };
        cargarHistorial();
    }, []);

    return (
        <Structure title='BITÁCORA' footerText='© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Computo | Bitácora'
            navbarActions={<>
                {/*<Button texto="Imprimir Bítacora" variante="inverso" icono="fas fa-print"></Button>*/}
                <Button texto="Cerrar Sesión" variante="inverso" iconIzquierdo="fa-sign-out-alt" onclick={() => setIsLogoutModal(true)}></Button>
            </>}>
            <div className={styles.mainContainer}>

                {/* <div className={styles.headerCard}>
                    <img src={logoTec} alt="Logo TEC" className={styles.logo} />
                    <div className={styles.headerCenter}>
                        <h1 className={styles.title}>
                            Formato de seguimiento de prácticas en laboratorio del Centro de Cómputo
                        </h1>
                        <div className={styles.division}>
                            <p className={styles.subtitle}>
                                <strong className={styles.subtitle}>Referencia a la Norma ISO 9001:2008</strong>  7.1, 7.2.1, 7.5.1, 7.6, 8.1, 8.2.4
                            </p>
                        </div>
                    </div>
                    <div className={styles.headerRight}>
                        <p><strong className={styles.subtitle}>Código:</strong> ITSH-ACP-PO-003-12</p>
                        <p><strong className={styles.subtitle}>Versión:</strong> 0</p>
                        <p><strong className={styles.subtitle}>Página:</strong> 1 de 1</p>

                    </div>
                </div>*/}

                <div className={styles.sectionTitleContainer}>
                    <div className={styles.titleGroup}>
                        <span className={styles.protocolText}>EJECUCIÓN DE PROTOCOLO INSTITUCIONAL</span>
                        <span className={styles.mainHadding}>Registro de Actividad</span>
                    </div>
                    <div>
                        <Button texto="Agregar Asistencia" icono="fas fa-plus" variante="primario" onclick={() => navigate("/bitacora/FormLogBook")}></Button>
                    </div>
                </div>

                <div className={styles.tableCard}>
                    <div className={styles.tableResponsive}>
                        <table className={styles.modernTable}>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Nombre del Docente</th>
                                    <th>Materia</th>
                                    <th>Carrera</th>
                                    <th>Práctica a Realizar</th>
                                    <th>Unidad</th>
                                    <th>¿Registrada en ID?</th>
                                    <th>Alumnos atendidos</th>
                                    <th>Hora Entrada</th>
                                    <th>Hora Salida</th>
                                    <th>Laboratorio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {charging ? (
                                    <tr>
                                        <td colSpan={11} style={{ textAlign: 'center', padding: '3rem' }}>
                                            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--color-primario)' }}></i>
                                            <p style={{ marginTop: '1rem', color: 'var(--color-neutral-3)' }}>Cargando registros...</p>
                                        </td>
                                    </tr>
                                ) : registros.length === 0 ? (
                                    <tr>
                                        <td colSpan={11} className={styles.emptyStates}>
                                            <i className="fas fa-clipboard-list"></i>
                                            <p>No hay registros de asistencia para el día de hoy</p>
                                        </td>
                                    </tr>
                                ): (
                                    registros.map((registro) =>(
                                        <tr key={registro.id}>
                                            <td>{registro.fecha}</td>
                                            <td>{registro.nombre_docente}</td>
                                            <td>{registro.materia}</td>
                                            <td>{registro.carrera || 'N/A'}</td>
                                            <td>{registro.practica_nombre}</td>
                                            <td>{registro.unidad}</td>
                                            <td>{registro.registrada ? 'Si':'No'}</td>
                                            <td>{registro.alumnos_atendidos}</td>
                                            <td>{registro.hora_entrada}</td>
                                            <td>{registro.hora_salida}</td>
                                            <td>{registro.laboratorio}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <LogoutModal
                isOpen={isLogoutModal}
                onClose={() => { setIsLogoutModal(false) }}
            />

        </Structure>
    )
}