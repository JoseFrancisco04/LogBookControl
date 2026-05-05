// import { useNavigate } from "react-router-dom";
// import Button from "../components/Button";
// import Structure from "../components/Structure";
// import CardSchedule from "../components/CardSchedule";
// import type { ISchedule } from "../models/ISchedule";
// import styles from "./LaboratorySchedule.module.css"

import { useState } from "react";
import type { ISchedule } from "../models/ISchedule";
import Structure from "../components/Structure";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import adminS from "./Admin.module.css"
// import { saveScheduleData } from "../services/ScheduleService";

function getCareer(grupo_id: string): string {
    return grupo_id.includes("sis") ? "var(--color-sistemas)" :
        grupo_id.includes("inf") ? "var(--color-informatica)" :
            grupo_id.includes("ind") ? "var(--color-industrial)" :
                grupo_id.includes("adm") ? "var(--color-administracion)" :
                    grupo_id.includes("ele") ? "var(--color-electrica)" :
                        grupo_id.includes("mec") ? "var(--color-mecatronica)" :
                            "var(--color-neutral-2";
}

// Clave única por celda, ej: "lunes-8:00"
type CellKey = string;

export default function Admin() {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCell, setSelectedCell] = useState<CellKey | null>(null);
    const [scheduleData, setScheduleData] = useState<Record<CellKey, ISchedule>>({});

    // Estado local del formulario
    const [formData, setFormData] = useState<ISchedule>({
        materia: "",
        dia_semana: "",
        hora_inicio: "",
        hora_fin: "",
        maestro: "",
        grupo_id: "",
    });

    // --- HANDLERS ---

    // Al hacer click en una celda
    const handleCellClick = (cellKey: CellKey) => {
        setSelectedCell(cellKey);         // recuerda cuál celda
        setIsModalOpen(true);             // abre el modal

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

        // Guarda los datos usando la celda como "llave"
        setScheduleData((prev) => ({
            ...prev,
            [selectedCell]: formData,
        }));

        setIsModalOpen(false); // cierra el modal
    };

    const saveSchedule = () => {

        console.log(Object.keys(scheduleData));
    }

    // DATOS DE EJEMPLO 
    const hours = ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado"];

    return (
        <Structure title='DEFINIR HORARIOS' footerText={`© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Administrador`}
            navbarActions={<>
                <Button texto="Log Out" variante="inverso" icono="fal fa-sign-in-alt" onclick={() => {
                    localStorage.setItem('isLoggedIn', 'false');
                    navigate("/login")
                }}></Button>
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
                                            <select className="has-text-black" style={{ backgroundColor: "var(--color-fondo)" }}>
                                                <option value="0">Selecciona una opción</option>
                                                <option value="1">Laboratorio 1</option>
                                                <option value="2">Laboratorio 2</option>
                                                <option value="3">Laboratorio 3</option>
                                                <option value="4">Laboratorio 4</option>
                                            </select>
                                        </span>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-computer has-text-black"></i>
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
                                        <th className="has-text-centered" key={day} style={{ color: "var(--color-fuente)" }}>{day}</th>
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
                                                        backgroundColor: cellInfo ? getCareer(cellInfo.grupo_id.toLocaleLowerCase()) : ""
                                                    }}
                                                    className={cellInfo ? `has-text-black ${adminS.cellInfoVisible}` : "has-text-centered"}
                                                >
                                                    {/* Falta agregar el color por carrera */}
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
                            <div className="modal-background" onClick={() => setIsModalOpen(false)} />
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
                                        onClick={() => setIsModalOpen(false)}
                                    />
                                </header>

                                <section className="modal-card-body" style={{ backgroundColor: "var(--color-fondo)", borderBlockEnd: "2px solid var(--color-neutral-2)" }}>
                                    {/* Formulario */}
                                    {/* <div className="field">
                                        <label className="label" style={{ color: "var(--color-fuente)" }}>Carrera</label>
                                        <div className="control has-icons-left is-expanded">
                                            <span className="select is-fullwidth">
                                                <select className="has-text-black" style={{ backgroundColor: "var(--color-fondo)" }}>
                                                    <option>Selecciona una opción</option>
                                                    <option>Sistemas Computacionales</option>
                                                    <option>Industrial</option>
                                                    <option>Informatica</option>
                                                </select>
                                            </span>
                                            <span className="icon is-small is-left">
                                                <i className="fas fa-graduation-cap has-text-black"></i>
                                            </span>
                                        </div>
                                    </div>
 */}

                                    <InputField
                                        label={"Materia"}
                                        placeholder={"Ej: Cálculo diferencial"}
                                        type={"text"} icon={"fas fa-book"}
                                        value={formData.materia}
                                        onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
                                    />
                                    {/*
                                    <div className="field">
                                         <label className="label has-text-black">Materia</label>
                                        <div className="control">
                                            <input
                                                className="input "
                                                type="text"
                                                value={formData.materia}
                                                onChange={(e) => setFormData({ ...formData, materia: e.target.value })}
                                                placeholder="Ej: Cálculo diferencial"
                                            />
                                        </div> 
                                    </div>
                                        */}

                                    <InputField
                                        label={"Docente"}
                                        placeholder={"Ej: Ing. Jesus"}
                                        type={"text"} icon={"fas fa-user"}
                                        value={formData.maestro}
                                        onChange={(e) => setFormData({ ...formData, maestro: e.target.value })}
                                    />
                                    {/* 
                                    <div className="field">
                                        <label className="label">Docente</label>
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                value={formData.maestro}
                                                onChange={(e) => setFormData({ ...formData, maestro: e.target.value })}
                                                placeholder="Ej: Dr. García"
                                            />
                                        </div> 
                                    </div>
                                        */}

                                    <InputField
                                        label={"Grupo"}
                                        placeholder={"Ej: G1MSIS08"}
                                        type={"text"} icon={"fas fa-users"}
                                        value={formData.grupo_id}
                                        onChange={(e) => setFormData({ ...formData, grupo_id: e.target.value })}
                                    />
                                    {/*
                                    <div className="field">
                                         <label className="label">Grupo</label>
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                value={formData.grupo_id}
                                                onChange={(e) => setFormData({ ...formData, grupo_id: e.target.value })}
                                                placeholder="Ej: 3A"
                                            />
                                        </div> 
                                    </div>
                                        */}
                                </section>

                                <footer className="modal-card-foot" style={{ backgroundColor: "var(--color-fondo)" }}>
                                    <div className="field is-grouped">

                                        <p className="control">
                                            <button className={`button ${adminS.buttonHover}`} style={{ backgroundColor: "var(--color-secundario)", border: "0px" }} onClick={handleSubmit}>
                                                <span className="icon is-small">
                                                    <i className="fas fa-save"></i>
                                                </span>
                                                <span>Guardar</span>
                                            </button>
                                        </p>

                                        <p className="control">
                                            <button className={`button is-danger is-outlined ${adminS.buttonHover}`} onClick={() => setIsModalOpen(false)}>
                                                <span className="icon is-small">
                                                    <i className="fas fa-times"></i>
                                                </span>
                                                <span>Cancelar</span>
                                            </button>
                                        </p>

                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>

                    <div className="buttons">
                        <button className={`button ${adminS.buttonHover}`} style={{ backgroundColor: "var(--color-secundario)", border: "0px" }}
                            onClick={saveSchedule}>
                            <span className="icon">
                                <i className="fas fa-save"></i>
                            </span>
                            <span>Guardarr</span>
                        </button>

                        <button className={`button is-danger is-outlined ${adminS.buttonHover}`}>
                            <span className="icon">
                                <i className="fas fa-times"></i>
                            </span>
                            <span>Cancelar</span>
                        </button>
                    </div>

                </div>
            </section >
        </Structure >

    );
}