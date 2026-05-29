import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Structure from "../components/Structure";
import InputField from "../components/InputField";
import SearchableInput from "../components/SearchableInput";
import { useEffect, useState } from "react";
import { deleteTeacher, getTeachersData, obtenerNombresMaestros, saveTeacher } from "../services/TeacherService";
import style from "./Teachers.module.css"

export default () => {
    const CARRERS = ["IND", "INF", "SIS", "ADM", "ELE", "MEC"];

    const navigate = useNavigate();

    // Hooks de "Editar docente"
    const [listTeachers, setListTeachers] = useState<string[]>([]);
    const [teacher, setTeacher] = useState<string>("");
    const [loadingTeachers, setLoadingTeachers] = useState<boolean>(true);

    // Hooks del formulario
    const [numberControl, setNumberControl] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [selectedCareer, setSelectedCareer] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Hooks de validación
    const [dataIsValid, setDataIsValid] = useState(true);

    const [isEditing, setIsEditing] = useState(false);

    const [isSend, setIsSend] = useState(false);

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
            setDataIsValid(true);
            // Preguntar si se puede cambiar el número de control
            saveTeacher({
                num_control: numberControl,
                nombre_completo: name,
                contraseña: password,
                carrera: selectedCareer
            })
                .then((res) => {
                    if (res.ok) {
                        setIsSend(true);
                        handleCancel();
                        cargarMaestros();
                    }
                });
        }
        else
            setDataIsValid(false);
    }

    const handleCancel = () => {
        setNumberControl("");
        setName("");
        setSelectedCareer("");
        setPassword("");
        setDataIsValid(true);
        setIsEditing(false);
        setIsSend(false);
    }

    const handleSearch = async (value: string) => {
        if (value.trim() == "") return;

        const teachers = await getTeachersData();
        const teacher = teachers.find((t) => t.nombre_completo == value);
        if (!teacher) return;

        console.log(teacher.carrera)
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
                console.log(res)
                handleCancel();
                cargarMaestros();
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

                    {dataIsValid ? <></> :
                        <div className="notification is-danger is-light mb-3">
                            <i className="fa-solid fa-triangle-exclamation fa-lg mr-4"></i>
                            Complete todos los campos.
                        </div>}

                    {!isSend ? <></> :
                        <div className="notification is-success is-light mb-3">
                            <i className="fa fa-check fa-lg mr-4"></i>
                            Docente Registrado Correctamente.
                        </div>}

                    <div className={style.formGrid}>
                        <InputField 
                            label={"Número de Control:"} 
                            placeholder={"X22390045"} 
                            type={"text"} 
                            icon={"fas fa-id-badge"}
                            value={numberControl} 
                            onChange={setNumberControl} 
                        />
                        
                        <InputField 
                            label={"Nombre del Docente:"} 
                            placeholder={"Jesus Orlando"} 
                            type={"text"} 
                            icon={"fa-solid fa-user-tie"}
                            value={name} 
                            onChange={setName} 
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
                                variante="inverso" 
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