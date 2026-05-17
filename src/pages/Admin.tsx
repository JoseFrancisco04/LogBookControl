import { useEffect, useState } from "react";
import type { ISchedule } from "../models/ISchedule";
import Structure from "../components/Structure";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import adminS from "./Admin.module.css"
import { deleteClass, getScheduleFrom, saveScheduleData } from "../services/ScheduleService";
// import { saveScheduleData } from "../services/ScheduleService";

function getCareerColor(grupo_id: string): string {
    return grupo_id.includes("sis") ? "var(--color-sistemas)" :
        grupo_id.includes("inf") ? "var(--color-informatica)" :
            grupo_id.includes("ind") ? "var(--color-industrial)" :
                grupo_id.includes("adm") ? "var(--color-administracion)" :
                    grupo_id.includes("ele") ? "var(--color-electrica)" :
                        grupo_id.includes("mec") ? "var(--color-mecatronica)" :
                            "var(--color-neutral-2";
}

type CellKey = string;

export default function Admin() {
    const navigate = useNavigate();

    useEffect(() => {
        loadScheduleFrom("1");
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCell, setSelectedCell] = useState<CellKey | null>(null);
    const [scheduleData, setScheduleData] = useState<Record<CellKey, ISchedule>>({});
    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(true);

    // Estado local del formulario
    const [formData, setFormData] = useState<ISchedule>({
        materia: "",
        dia_semana: "",
        hora_inicio: "",
        hora_fin: "",
        maestro: "",
        grupo_id: "",
    });

    const loadScheduleFrom = async (labNumber: string) => {
        setLoading(true);
        setIsSaved(true);
        setScheduleData({});
        const schedules = await getScheduleFrom(labNumber);

        if (schedules) {
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
                //console.log(cellKey, classData);
                newScheduleData[cellKey] = classData;
            });

            setScheduleData((prev) => ({
                ...prev,
                ...newScheduleData,
            }));
            setLoading(false);
        }
    };

    function parseData(): ISchedule[] {
        let schedulesForSave: ISchedule[] = [];

        Object.keys(scheduleData).forEach((sd, index) => {
            schedulesForSave.push(scheduleData[sd]);
            const dataTemp = sd.split("-");
            schedulesForSave[index].dia_semana = dataTemp[0];
            schedulesForSave[index].hora_inicio = dataTemp[1].concat(":00");
            schedulesForSave[index].hora_fin = dataTemp[2].concat(":00");
            schedulesForSave[index].fase = 1;
            const select = document.getElementById("sLaboratoryNumber") as HTMLSelectElement;
            schedulesForSave[index].laboratorio = parseInt(select.value);
        });

        return schedulesForSave;
    }

    const modalIsEmpty = (): boolean => {
        return formData.materia.trim() == "" &&
            formData.maestro.trim() == "" &&
            formData.grupo_id.trim() == "" ?
            true : false;
    }

    const closeModal = () => {
        setFormData({
            materia: "",
            dia_semana: "",
            hora_inicio: "",
            hora_fin: "",
            maestro: "",
            grupo_id: "",
        });
        setIsModalOpen(false);
        setIsSaved(true);
    };


    // Al hacer click en una celda
    const handleCellClick = (cellKey: CellKey) => {
        setSelectedCell(cellKey);         // recuerda cuál celda
        setIsModalOpen(true);             // abre el modal
        setIsSaved(false);

        // Si ya había datos en esa celda, los precarga en el form
        if (scheduleData[cellKey]) {
            setFormData(scheduleData[cellKey]);
        } else {
            setFormData({
                materia: "",
                dia_semana: "",
                hora_inicio: "",
                hora_fin: "",
                maestro: "",
                grupo_id: "",
            });
        }
    };

    // Al hacer submit del formulario
    const handleSubmit = () => {
        if (!selectedCell) return;

        if (!modalIsEmpty())
            setScheduleData((prev) => ({ // Guarda los datos usando la celda como "llave"
                ...prev,
                [selectedCell]: formData,
            }));

        setIsModalOpen(false); // cierra el modal
        setIsSaved(false); // Hay cambios sin guardar
    };

    const handleDelete = () => {
        if (!selectedCell) return;

        const dataCell = scheduleData[selectedCell];
        let dataToSentd = parseData().filter(c => c.dia_semana == dataCell.dia_semana).find(c => c.hora_inicio == dataCell.hora_inicio);
        deleteClass(dataToSentd).then((res) => {
            console.log("handleDelete", res.data)
        });

        setIsModalOpen(false);

        delete scheduleData[selectedCell];
        setScheduleData(scheduleData);

        setIsSaved(true);
    }

    const saveSchedule = () => {
        saveScheduleData(parseData()).then(() => {
            setIsSaved(true);
        });
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('num_control');

        navigate('/', { replace: true });

    }

    // DATOS DE EJEMPLO 
    const hours = ["07:00-08:00", "08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00",
        "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00"];
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    return (
        <Structure title='DEFINIR HORARIOS' footerText={`© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Administrador`}
            navbarActions={<>
                <Button texto="Maestros" variante="inverso" icono="fa-regular fa-chalkboard-user" onclick={() => {
                    navigate("/teachers")
                }}></Button>
                <Button texto="Cerrar Sesión" variante="inverso" icono="fal fa-sign-in-alt" onclick={handleLogout}></Button>
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
                        {/* ====== TABLA ====== */}
                        <table className="table is-bordered is-fullwidth " style={{ backgroundColor: "var(--color-fondo)" }}>
                            <thead>
                                <tr>
                                    <th className="has-text-centered" style={{ color: "var(--color-fuente)" }}>Hora</th>
                                    {days.map((day) => (
                                        <th className="has-text-centered"
                                            key={day} style={{ color: "var(--color-fuente)" }}
                                            colSpan={day == "Sabado" ? 2 : 1}>
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {hours.map((hour) => (
                                    <tr key={hour}>
                                        <td className="has-text-centered" style={{ color: "var(--color-fuente)" }}>{hour}</td>
                                        {days.map((day) => {
                                            const cellKey = `${day}-${hour}`;        // clave única
                                            const cellInfo = scheduleData[cellKey];  // busca si hay datos
                                            return (
                                                <td
                                                    key={cellKey}
                                                    onClick={() => handleCellClick(cellKey)}
                                                    style={{
                                                        cursor: "pointer", minWidth: "120px",
                                                        backgroundColor: cellInfo ? getCareerColor(cellInfo.grupo_id.toLocaleLowerCase()) : ""
                                                    }}
                                                    className={cellInfo ? `has-text-black ${adminS.cellInfoVisible}` : "has-text-centered"}
                                                >
                                                    {/* Falta agregar el color por carrera - IA quedó*/}
                                                    {cellInfo ? (
                                                        <div>
                                                            <small><b>{cellInfo.materia}</b></small>
                                                            <br />
                                                            <small>{cellInfo.maestro}</small>
                                                            <br />
                                                            <small>{cellInfo.grupo_id}</small>
                                                        </div>
                                                    ) : (
                                                        <span className="has-text-grey-light">
                                                            <i className="fa-solid fa-plus"></i>
                                                        </span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* ====== MODAL DE BULMA ====== */}
                        {/* La clase "is-active" es lo que lo hace visible en Bulma */}
                        <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
                            <div className="modal-background" onClick={closeModal} />
                            <div className="modal-card">
                                <header className="modal-card-head" style={{ backgroundColor: "var(--color-primario)" }}>
                                    <span className={`icon is-medium mr-5 ${adminS.iconHead}`}>
                                        <i className="far fa-calendar fa-2x"></i>
                                    </span>
                                    <p className="modal-card-title">
                                        Agregar clase • {selectedCell}
                                    </p>
                                    <button
                                        className="delete is-large"
                                        onClick={closeModal}
                                    />
                                </header>

                                <section className="modal-card-body" style={{ backgroundColor: "var(--color-fondo)", borderBlockEnd: "2px solid var(--color-neutral-2)" }}>

                                    <InputField
                                        label={"Materia"}
                                        placeholder={"Ej: Cálculo diferencial"}
                                        type={"text"} icon={"fas fa-book"}
                                        value={formData.materia}
                                        onChange={(e) => setFormData({ ...formData, materia: e.toUpperCase() })}
                                    />

                                    <InputField
                                        label={"Docente"}
                                        placeholder={"Ej: Ing. Jesus"}
                                        type={"text"} icon={"fas fa-user"}
                                        value={formData.maestro}
                                        onChange={(e) => setFormData({ ...formData, maestro: e.toUpperCase() })}
                                    />

                                    <InputField
                                        label={"Grupo"}
                                        placeholder={"Ej: G1MSIS08"}
                                        type={"text"} icon={"fas fa-users"}
                                        value={formData.grupo_id}
                                        onChange={(e) => setFormData({ ...formData, grupo_id: e.toUpperCase() })}
                                    />

                                </section>

                                <footer className="modal-card-foot" style={{ backgroundColor: "var(--color-fondo)" }}>
                                    <div className="field is-grouped">
                                        <Button texto={"Guardar"} iconIzquierdo="fas fa-save" onclick={handleSubmit} />
                                        <Button texto={"Cancelar"} iconIzquierdo="fas fa-times" variante="secundario" onclick={closeModal} />
                                        {formData.grupo_id && isSaved ?
                                            <Button texto={"Eliminar"} iconIzquierdo="fas fa-trash" variante="secundario" onclick={handleDelete} />
                                            : <></>
                                        }

                                    </div>
                                </footer>
                            </div>
                        </div>

                        <Button texto={`${isSaved ? "Guardado" : "Guardar"}`} iconIzquierdo={`${isSaved ? 'fa-regular fa-square-check' : 'fas fa-save'}`} onclick={saveSchedule} />

                    </div>

                </div>
            </section>
        </Structure >
    );
}