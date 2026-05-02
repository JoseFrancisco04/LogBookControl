// import { useNavigate } from "react-router-dom";
// import Button from "../components/Button";
// import Structure from "../components/Structure";
// import CardSchedule from "../components/CardSchedule";
// import type { ISchedule } from "../models/ISchedule";
// import styles from "./LaboratorySchedule.module.css"
// import adminS from "./Admin.module.css"

import { useState } from "react";
import type { ISchedule } from "../models/ISchedule";
import Structure from "../components/Structure";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

// 1. Defines la forma de tus datos con TypeScript
// interface ScheduleEntry {
//   subject: string;
//   teacher: string;
//   group: string;
// }

// Clave única por celda, ej: "lunes-8:00"
type CellKey = string;

export default function Admin() {
    const navigate = useNavigate();

    // 2. Los tres estados clave
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCell, setSelectedCell] = useState<CellKey | null>(null);
    const [scheduleData, setScheduleData] = useState<Record<CellKey, ISchedule>>({});

    // 3. Estado local del formulario
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

    // --- DATOS DE EJEMPLO (adáptalos a tu horario real) ---
    const hours = ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

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

                    <h1 className={`title has-text-centered mb-6 has-text-grey-dark`}>Laboratorio de Cómputo 1</h1>
                    <div>
                        {/* ====== TABLA ====== */}
                        <table className="table is-bordered is-fullwidth" style={{ backgroundColor: "var(--color-fondo)" }}>
                            <thead>
                                <tr style={{ backgroundColor: "var(--color-primario)" }}>
                                    <th>Hora</th>
                                    {days.map((day) => (
                                        <th key={day}>{day}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {hours.map((hour) => (
                                    <tr key={hour}>
                                        <td style={{ backgroundColor: "var(--color-primario)" }}>{hour}</td>
                                        {days.map((day) => {
                                            const cellKey = `${day}-${hour}`;        // clave única
                                            const cellInfo = scheduleData[cellKey];  // busca si hay datos

                                            return (
                                                <td
                                                    key={cellKey}
                                                    onClick={() => handleCellClick(cellKey)}
                                                    style={{ cursor: "pointer", minWidth: "120px" }}
                                                    className={cellInfo ? " has-background-info has-text-black has-text-centered" : "has-text-centered"}
                                                >
                                                    {/* Si hay datos los muestra, si no muestra un hint */}
                                                    {cellInfo ? (
                                                        <div>
                                                            <strong>{cellInfo.materia}</strong>
                                                            <br />
                                                            <small>{cellInfo.maestro}</small>
                                                            <br />
                                                            <small>{cellInfo.grupo_id}</small>
                                                        </div>
                                                    ) : (
                                                        <span className="has-text-grey-light">+ Agregar</span>
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
                                    <span className="icon is-medium mr-2">
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

                                <section className="modal-card-body" style={{ backgroundColor: "var(--color-fondo)" }}>
                                    {/* Formulario */}
                                    <div className="field">
                                        <label className="label" style={{color: "var(--color-fuente)"}}>Carrera</label>
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
                                            <button className="button" style={{ backgroundColor: "var(--color-secundario)", border: "0px" }} onClick={handleSubmit}>
                                                <span className="icon is-small">
                                                    <i className="fas fa-save"></i>
                                                </span>
                                                <span>Guardar</span>
                                            </button>
                                        </p>

                                        <p className="control">
                                            <button className="button is-danger is-outlined" onClick={() => setIsModalOpen(false)}>
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
                </div>
            </section >
        </Structure >

    );
}