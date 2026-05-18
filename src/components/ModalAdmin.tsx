import { useEffect, useState } from "react";
import InputField from "./InputField"
import type { ISchedule } from "../models/ISchedule";
import Button from "./Button";
import style from "./ModalAdmin.module.css"
import SearchableInput from "./SearchableInput";
import { deleteSchedule, saveScheduleData } from "../services/ScheduleService";

interface Props {
    // Hooks de funcionalidad
    // Abrir y cerrar el modal
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

    // Key del modal
    selectedCell: CellKey | null;

    // Guardado de datos
    scheduleData: Record<CellKey, ISchedule>;
    setScheduleData: React.Dispatch<React.SetStateAction<Record<CellKey, ISchedule>>>;

    // Maestros
    listTeachers: string[];
    loadingTeachers: boolean;
}

type CellKey = string;

export default ({ isModalOpen, setIsModalOpen, selectedCell, scheduleData, setScheduleData, listTeachers, loadingTeachers }: Props) => {

    // Hook con los datos del form (solo materia, maestro y grupo_id
    // los demás se obtienen de cellkey)
    const [formData, setFormData] = useState<ISchedule>({
        materia: "",
        dia_semana: "",
        hora_inicio: "",
        hora_fin: "",
        maestro: "",
        grupo_id: "",
    });

    // Mostrar el botón de eliminar solo si está guardado
    const [isSaved, setIsSaved] = useState(false);

    // Mientras se hacen las peticiones
    const [isSending, setIsSending] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const modalIsEmpty = (): boolean => {
        return formData.materia.trim() == "" &&
            formData.maestro.trim() == "" &&
            formData.grupo_id.trim() == "" ?
            true : false;
    }

    const handleSubmit = async () => {
        if (!selectedCell || modalIsEmpty()) return;

        setIsSending(true);

        try {
            const scheduleArray = [scheduleData[selectedCell]];
            await saveScheduleData(scheduleArray);

            // Solo lo guarda si los valores se insertaron
            setScheduleData((prev) => ({
                ...prev,
                [selectedCell]: formData,
            }));
            setIsModalOpen(false); // cierra el modal
        } catch (error) {
            console.error(error);
        } finally {
            setIsSending(false);
        }

    };

    const handleDelete = async () => {
        if (!selectedCell || modalIsEmpty()) return;

        try {
            setIsSending(true);
            const dataCell = scheduleData[selectedCell];
            await deleteSchedule(dataCell);

            // Lo eliminamos del array local si se elimina del remoto
            delete scheduleData[selectedCell];
            setScheduleData(scheduleData);
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSending(false);
        }
    }

    useEffect(() => {
        // Si no hay celda selecionada, pa'tras
        if (!selectedCell) return;

        // Si hay información, la muestra en el modal
        const existingData = scheduleData[selectedCell];

        if (existingData) {
            setFormData(existingData);
            setIsSaved(true);
        } else {
            setFormData({
                materia: "",
                dia_semana: "",
                hora_inicio: "",
                hora_fin: "",
                maestro: "",
                grupo_id: "",
            });
            setIsSaved(false);
        }
    }, [selectedCell, scheduleData]);


    return (
        <div className={`modal ${isModalOpen ? "is-active" : ""}`}>
            <div className="modal-background" onClick={closeModal} />
            <div className="modal-card">
                <header className={`modal-card-head ${style.cardHead}`}>
                    <span className={`icon is-medium mr-5 ${style.iconHead}`}>
                        {isSending ?
                            <i className="fa-solid fa-cloud-arrow-up fa-bounce fa-2x"></i> :
                            <i className="far fa-calendar fa-2x"></i>}
                    </span>
                    <p className="modal-card-title">
                        Agregar clase • {selectedCell}
                    </p>
                    <button
                        className="delete is-large"
                        onClick={closeModal}
                    />
                </header>

                <section className={`modal-card-body ${style.cardBody}`}>

                    <InputField
                        label={"Materia"}
                        placeholder={"Ej: Cálculo diferencial"}
                        type={"text"} icon={"fas fa-book"}
                        value={formData.materia}
                        onChange={(e) => setFormData({ ...formData, materia: e.toUpperCase() })}
                    />


                    <SearchableInput
                        label={"Docente"}
                        placeholder={loadingTeachers ? "Buscando Docentes..." : "Seleccionar Docente..."}
                        icon={"fa-solid fa-user-tie"} //sin icono porque se ve feo
                        options={listTeachers}
                        value={formData.maestro}
                        onChange={(e) => setFormData({ ...formData, maestro: e.toUpperCase() })} />

                    <InputField
                        label={"Grupo"}
                        placeholder={"Ej: G1MSIS08"}
                        type={"text"} icon={"fas fa-users"}
                        value={formData.grupo_id}
                        onChange={(e) => setFormData({ ...formData, grupo_id: e.toUpperCase() })}
                    />

                </section>

                <footer className={`modal-card-foot ${style.cardFoot}`}>
                    <div className="field is-grouped">
                        <Button texto={"Guardar"} iconIzquierdo="fas fa-save" onclick={handleSubmit} />
                        <Button texto={"Cancelar"} iconIzquierdo="fas fa-times" variante="secundario" onclick={closeModal} />
                        {isSaved ?
                            <Button texto={"Eliminar"} iconIzquierdo="fas fa-trash" variante="secundario" onclick={handleDelete} />
                            : <></>
                        }

                    </div>
                </footer>
            </div>
        </div>
    );
}