import Structure from "../components/Structure"
import Styles from "./FormLogBook.module.css"
import Button from "../components/Button"
import SearchableInput from "../components/SearchableInput";
import InputField from "../components/InputField";
import YesNoToggle from "../components/YesNoToggle";
import { useState } from "react";
import ConfirmModal from "../components/ConfirmModal";


export default function FormLogBook() {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const mockDocentes = ["Ing. Juan Pérez", "Mtra. Luz Mendoza", "Dr. Hugo Hernández", "Ing. Eduardo Herrera"];
    const mockMaterias = ["Redes de Computadoras / ISC", "Autómatas / INF", "Matemáticas Discretas / INF", "Taller de SO"];
    const mockLaboratorios = ["Laboratorio 1", "Laboratorio 2", "Laboratorio 3", "Laboratorio 4"];
    return (
        <Structure title="REGISTRO DE ASISTENCIA" footerText="© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Computo | Registro de Asistencia"
            navbarActions={<>
                <Button texto="Volver a Bitácora" variante="inverso" iconIzquierdo="fa-arrow-left" />

            </>}
        >
            <div className={Styles.mainContainer}>
                <div className={Styles.formCard}>
                    <div className={Styles.formBody}>
                        <div className={Styles.gridRow3}>
                            <InputField label="Fecha:" placeholder="dd/mm/aaaa" type="date" icon="" />
                            <InputField label="Hora de Entrada:" placeholder="--:--" type="time" icon="" />
                            <InputField label="Hora de Salida:" placeholder="--:--" type="time" icon="" />
                        </div>
                        <div className={Styles.gridRow3}>
                            <SearchableInput label="Nombre del Docente:" placeholder="Buscar docente..." icon="fa-user-tie" options={mockDocentes} />
                            <SearchableInput label="Carrera:" placeholder="Buscar Carrera..." icon="fa-graduation-cap" options={mockMaterias} />
                            <SearchableInput label="Materia:" placeholder="Buscar materia..." icon="fa-book" options={mockMaterias} />

                        </div>
                        <div className={Styles.gridRow3}>
                            <InputField label="Unidad:" placeholder="ej. 3" type="number" icon="fa-list-ol" />
                            <SearchableInput label="Laboratorio:" placeholder="Buscar Laboratorio" icon="fa-desktop" options={mockLaboratorios} />
                            <InputField label="¿Cantidad de alumnos?" placeholder="0" type="number" icon="fa-users" />

                        </div>
                        <div className={Styles.gridRow2}>
                            <InputField label="Práctica a realizar:" placeholder="Describe brevemente la actividad..." type="text" icon="fa-flask" />
                            <YesNoToggle label="¿Registrada en ID?" />
                        </div>
                    </div>
                    <div className={Styles.actionsContainer}>
                        <Button texto="Cancelar Registro" variante="secundario" icono="fa-circle-xmark" />
                        <Button texto="Registrar actividad" variante="primario" icono="fa-check-circle" onclick={() => setIsModelOpen(true)} />

                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={isModelOpen}
                onClose={() => setIsModelOpen(false)}
                onConfirm={() => alert("Asistencia registrada")}
                datosResumen={{
                    docente: "Ing. Coopertino Luna Trejo", 
                    materia: "Full Stack / ISC",
                    laboratorio: "Laboratorio 1"
                }}
            />
        </Structure>
    )
}

