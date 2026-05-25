import { useEffect, useState } from "react";
import type { ISchedule } from "../models/ISchedule";
import Structure from "../components/Structure";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { getScheduleFrom } from "../services/ScheduleService";
import ModalAdmin from "../components/ModalAdmin";
import TableAdmin from "../components/TableAdmin";
import { obtenerNombresMaestros } from "../services/TeacherService";

type CellKey = string;

export default function Admin() {
    const navigate = useNavigate();

    // Mostrar/Ocultar el modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Saber que celda está abriendo
    const [selectedCell, setSelectedCell] = useState<CellKey | null>(null);
    // Todos los horarios de la tabla
    const [scheduleData, setScheduleData] = useState<Record<CellKey, ISchedule>>({});

    // Pidiendo horarios
    const [loading, setLoading] = useState(false);

    // Hooks para buscar maestros
    const [listTeachers, setListTeachers] = useState<string[]>([]);
    const [loadingTeachers, setLoadingTeachers] = useState<boolean>(true);

    // Mostrar los horarios del laboratorio n
    const loadScheduleFrom = async (labNumber: string) => {
        setLoading(true);
        setScheduleData({});

        try {
            const schedules = await getScheduleFrom(labNumber);

            if (schedules && schedules.length > 0) {
                const newData = parseSchedules(schedules);
                setScheduleData(newData);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Limpiar los datos devueltos por el backend y generar la cellkey
    function parseSchedules(schedules: ISchedule[]): Record<string, any> {
        const newScheduleData: Record<string, any> = {};

        schedules.forEach((s) => {
            const horaInicio = s.hora_inicio.slice(0, -3);
            const horaFin = s.hora_fin.slice(0, -3);
            const cellKey = `${s.dia_semana}-${horaInicio}-${horaFin}`;
            const classData = {
                materia: s.materia,
                dia_semana: s.dia_semana,
                hora_inicio: horaInicio,
                hora_fin: horaFin,
                maestro: s.maestro,
                grupo_id: s.grupo_id,
            };
            newScheduleData[cellKey] = classData;
        });
        return newScheduleData;
    }

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('num_control');

        navigate('/', { replace: true });

    }

    useEffect(() => {
        // Cargar horarios
        loadScheduleFrom("1");

        // Cargar maestros
        const cargarMaestros = async () => {
            const names = await obtenerNombresMaestros();
            setListTeachers(names);
            setLoadingTeachers(false);
        };
        cargarMaestros();
    }, []);

    return (
        <Structure title='DEFINIR HORARIOS' footerText={`© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Administrador`}
            navbarActions={<>
                <Button texto="Maestros" variante="inverso" icono="fa-regular fa-chalkboard-user" onclick={() => {
                    navigate("/teachers")
                }}></Button>
                <Button texto="Cerrar Sesión" variante="inverso" icono="fal fa-sign-out-alt" onclick={logOut}></Button>
            </>}>


            <section className={`section`}>
                <div className={`container`}>

                    <nav className="level">

                        <div className="level-left">
                            <div className="level-item">
                                <div>
                                    <span className="heading icon-text">
                                        <span className="icon is-medium">
                                            <i className="fas fa-calendar-week fa-2x" style={{ color: "var(--color-iconos)" }}></i>
                                        </span>
                                        <span className={`title has-text-centered ml-4`}
                                            style={{ color: "var(--color-fuente)" }}>
                                            Laboratorio de Cómputo
                                        </span>
                                    </span>
                                    <p style={{ color: "var(--color-fuente)" }}>
                                        Programación de prácticas en laboratorios.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="level-right">
                            <div className="level-item">
                                <div className="field">
                                    <label className="label has-text-centered" style={{ color: "var(--color-fuente)" }}>Laboratorio</label>
                                    <div className="control has-icons-left is-expanded">
                                        <span className="select is-mobile">
                                            <select
                                                id="sLaboratoryNumber"
                                                className="has-text-black"
                                                style={{ backgroundColor: "var(--color-fondo)" }}
                                                onChange={(e) => loadScheduleFrom(e.target.value)}>
                                                <option value="1">Laboratorio 1</option>
                                                <option value="2">Laboratorio 2</option>
                                                <option value="3">Laboratorio 3</option>
                                                <option value="4">Laboratorio 4</option>
                                            </select>
                                        </span>
                                        <span className="icon is-small is-left">
                                            <i className={`${loading ? 'fa-solid fa-spinner fa-spin-pulse' : 'fas fa-computer'} has-text-black`}></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </nav>

                    <div>

                        <TableAdmin
                            scheduleData={scheduleData}
                            setIsModalOpen={setIsModalOpen}
                            setSelectedCell={setSelectedCell}
                        />

                        <ModalAdmin
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            scheduleData={scheduleData}
                            selectedCell={selectedCell}
                            setScheduleData={setScheduleData}
                            listTeachers={listTeachers}
                            loadingTeachers={loadingTeachers}
                        />

                        {/* <Button texto={`${isSaved ? "Guardado" : "Guardar"}`} iconIzquierdo={`${isSaved ? 'fa-regular fa-square-check' : 'fas fa-save'}`} onclick={saveSchedule} /> */}

                    </div>

                </div>
            </section>
        </Structure >
    );
}