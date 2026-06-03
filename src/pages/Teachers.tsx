import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Structure from "../components/Structure";
import InputField from "../components/InputField";
import SearchableInput from "../components/SearchableInput";
import { useEffect, useState } from "react";
import { deleteTeacher, getTeachersData, obtenerNombresMaestros, saveTeacher } from "../services/TeacherService";
import style from "./Teachers.module.css"
import Toast from "../components/Toast";

export default () => {
    const CARRERS = ["IND", "INF", "SIS", "ADM", "ELE", "MEC"];

    const navigate = useNavigate();

    // Hook para saber si está editando o no
    const [isEditing, setIsEditing] = useState(false);

    // Hooks de "Editar docente"
    const [listTeachers, setListTeachers] = useState<string[]>([]);
    const [teacher, setTeacher] = useState<string>("");
    const [loadingTeachers, setLoadingTeachers] = useState<boolean>(true);

    // Hooks del formulario
    const [numberControl, setNumberControl] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [selectedCareer, setSelectedCareer] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Hooks del toast
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "danger" | "warning">("success");

    // Ayudante para mostrar toast
    const showToast = (message: string, type: "success" | "danger" | "warning") => {
        setToastMessage(message);
        setToastType(type);
    };

    const cargarMaestros = async () => {
        const names = await obtenerNombresMaestros();
        setListTeachers(names);
        setLoadingTeachers(false);
    };

    const isFormEmty = (): boolean => {
        const numControl = numberControl.trim();
        const nameComplete = name.trim();
        const career = selectedCareer.trim();
        const pass = password.trim();

        return numControl == "" &&
            nameComplete == "" &&
            career == "" &&
            pass == "" ?
            true : false;
    }

    const handleSave = () => {
        if (!isFormEmty()) {
            saveTeacher({
                num_control: numberControl,
                nombre_completo: name,
                contraseña: password,
                carrera: selectedCareer
            })
                .then((res) => {
                    if (res.ok) {
                        showToast("Docente Registrado Correctamente", "success");
                        handleCancel();
                        cargarMaestros();
                    }
                })
                .catch((err) => {
                    console.error(err);
                    showToast("Error al Registrar Docente", "danger");
                });
        }
        else
            showToast("Datos invalidos", "danger");
    }

    const handleCancel = () => {
        setNumberControl("");
        setName("");
        setSelectedCareer("");
        setPassword("");
        setIsEditing(false);
    }

    const handleSearch = async (value: string) => {
        if (value.trim() == "") return;

        const teachers = await getTeachersData();
        const teacher = teachers.find((t) => t.nombre_completo == value);
        if (!teacher) return;

        //console.log(teacher.carrera)
        setNumberControl(teacher.num_control);
        setName(teacher.nombre_completo);
        setSelectedCareer(teacher.carrera);
        setPassword(teacher.contraseña);
        setTeacher("");
        setIsEditing(true);
    }

    const handleDelete = () => {
        if (!isFormEmty()) {
            deleteTeacher({
                num_control: numberControl,
                nombre_completo: name,
                contraseña: password,
                carrera: selectedCareer
            }).then((res) => {
                console.log(res);
                showToast("Docente Eliminado Correctamente", "success");
                handleCancel();
                cargarMaestros();
            }).catch((error) => {
                console.error(error);
                showToast("Docente Relacionado, No se Puede Eliminar","danger");
            });
        }
    }

    useEffect(() => {
        cargarMaestros();
    }, []);

    return (
        <Structure title='DEFINIR HORARIOS' footerText={`© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Asignar Docentes`}
            navbarActions={<>
                <Button texto="Horarios" variante="inverso" icono="fa-regular fa-calendar-plus" onclick={() => {
                    navigate("/admin")
                }} />
                <Button texto="Estadisticas" variante="inverso" icono="fal fa-chart-column" onclick={() => {
                    navigate("/statistics")
                }} />
            </>}>

            <div className={style.mainContainer}>
                <div className={style.formCard}>

                    <div className={style.headerSection}>
                        <div className={style.titleContainer}>
                            <h2 className={style.titleS}>Registro de Nuevo Docente</h2>
                            <p className={style.subtitleS}>Ingresa los datos requeridos para dar de alta a un maestro en el sistema.</p>
                        </div>

                        <div className={style.searchSection}>
                            <SearchableInput
                                label={"Editar Docente"}
                                placeholder={loadingTeachers ? "Buscando Docentes..." : "Buscar para editar..."}
                                icon={"fa-solid fa-user-tie"}
                                options={listTeachers}
                                value={teacher}
                                onChange={setTeacher}
                            />
                            <Button
                                texto={"Buscar"}
                                variante="secundario"
                                onclick={() => { handleSearch(teacher) }}
                            />
                        </div>
                    </div>

                    <Toast
                        message={toastMessage}
                        type={toastType}
                        onClose={() => setToastMessage("")}
                    />

                    <div className={style.formGrid}>
                        <InputField
                            label={"Número de Control:"}
                            placeholder={"X22390045"}
                            type={"text"}
                            icon={"fas fa-id-badge"}
                            value={numberControl}
                            // No se puede editar el número de control
                            onChange={isEditing ? () => { } :
                                (value) => setNumberControl(value.toUpperCase())
                            }
                        />

                        <InputField
                            label={"Nombre del Docente:"}
                            placeholder={"Jesus Orlando"}
                            type={"text"}
                            icon={"fa-solid fa-user-tie"}
                            value={name}
                            onChange={(value) => setName(value.toUpperCase())}
                        />

                        <SearchableInput
                            label={"Carrera:"}
                            placeholder={"Seleccione o escriba..."}
                            icon={"fas fa-graduation-cap"}
                            options={CARRERS}
                            value={selectedCareer}
                            onChange={setSelectedCareer}
                        />

                        <InputField
                            label={"Contraseña de Acceso:"}
                            placeholder={"Asigna una contraseña segura"}
                            type={"password"}
                            icon={"fas fa-lock"}
                            iconRight='fa-eye'
                            value={password}
                            onChange={setPassword}
                        />
                    </div>

                    <div className={style.actionsContainer}>
                        {isEditing ?
                            <Button
                                texto={"Eliminar"}
                                iconIzquierdo="fas fa-trash"
                                variante="secundario"
                                onclick={handleDelete}
                            />
                            : <></>}
                        <Button
                            texto="Cancelar"
                            iconIzquierdo="fas fa-x"
                            variante="secundario"
                            onclick={handleCancel}
                        />
                        <Button
                            texto={isEditing ? "Guardar Cambios" : "Registrar Docente"}
                            iconIzquierdo="fas fa-save"
                            variante="primario"
                            onclick={handleSave}
                        />
                    </div>

                </div>
            </div>

        </Structure >
    );
}