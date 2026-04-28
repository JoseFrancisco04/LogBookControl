import Button from "../components/Button"
import Structure from "../components/Structure"
import styles from "./LogBook.module.css"
import logoTec from "../assets/logoTec.png"


export default function LogBook() {
    return (
        <Structure title='BITÁCORA' footerText='© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Computo | Bitácora'
            navbarActions={<>
                <Button texto="Imprimir Bítacora" variante="inverso" icono="fas fa-print"></Button>
                <Button texto="Cerrar Sesión" variante="inverso" iconIzquierdo="fa-sign-out-alt"></Button>
            </>}>
            <div className={styles.mainContainer}>
                <div className={styles.headerCard}>
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
                </div>

                <div className={styles.sectionTitleContainer}>
                    <div className={styles.titleGroup}>
                        <span className={styles.protocolText}>EJECUCIÓN DE PROTOCOLO INSTITUCIONAL</span>
                        <span className={styles.mainHadding}>Registro de Actividad</span>
                    </div>
                    <div>
                        <Button texto="Agregar Asistencia" icono="fas fa-plus" variante="primario" onclick={()=> alert('Aqui se tiene que abrir el formulario')}></Button>
                    </div>
                </div>

                <div className={styles.tableCard}>
                    <div className={styles.tableResponsive}>
                        <table className={styles.modernTable}>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Nombre del Docente</th>
                                    <th>Materia/Carrera</th>
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
                                <tr>
                                    <td colSpan={10} className={styles.emptyStates}>
                                        <i className="fas fa-clipboard-list"></i>
                                        <p>No hay registros de asistencia para el día de hoy</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </Structure>
    )
}