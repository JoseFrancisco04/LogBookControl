import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Structure from "../components/Structure";
import InputField from "../components/InputField";
import SearchableInput from "../components/SearchableInput";
import { useEffect, useState } from "react";
import { deleteTeacher, obtenerNombresMaestros, saveTeacher } from "../services/TeacherService";
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
    }

    const handleSearch = (value: string) => {
        if (value.trim() != "") {
            setName(value);
            setTeacher("");
            setIsEditing(true);
        }
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
                setIsEditing(false);
            });
        }
    }

    useEffect(() => {
        const cargarMaestros = async () => {
            const names = await obtenerNombresMaestros();
            setListTeachers(names);
            setLoadingTeachers(false);
        };
        cargarMaestros();
    }, []);

    return (
        <Structure title='DEFINIR HORARIOS' footerText={`© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Asignar Docentes`}
            navbarActions={<>
                <Button texto="Horarios" variante="inverso" icono="fa-regular fa-calendar-plus" onclick={() => {
                    navigate("/admin")
                }} />
                <Button texto="Log Out" variante="inverso" icono="fal fa-sign-in-alt" onclick={() => {
                    navigate("/")
                }} />
            </>}>

            <section className="section">
                <div className="container">
                    <div className={`p-6`}>

                        <nav className="level">

                            <div className="level-left">
                                <div className="level-item">
                                    <div>
                                        <h2 className={`heading ${style.titleS}`}>Registro de Nuevo Docente</h2>
                                        <p className={`title ${style.subtitleS}`}>Ingresa los datos requeridos para dar de alta a un maestro en el sistema.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="level-right">
                                <div className="level-item">
                                    <SearchableInput label={"Editar Docente"}
                                        placeholder={loadingTeachers ? "Buscando Docentes..." : "Editar Docente..."}
                                        icon={"fa-solid fa-user-tie"} //sin icono porque se ve feo
                                        options={listTeachers}
                                        value={teacher} onChange={setTeacher} />
                                    <Button texto={"Buscar"} tamaño="pequeño" variante="secundario" onclick={() => { handleSearch(teacher) }} />
                                </div>
                            </div>

                        </nav>

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

                        <div className="columns is-multiline">
                            <div className="column is-half">
                                <div className="field">
                                    <InputField label={"Número de Control:"} placeholder={"X22390045"} type={"text"} icon={"fas fa-id-badge"}
                                        value={numberControl} onChange={setNumberControl} />
                                </div>
                            </div>

                            <div className="column is-half">
                                <div className="field">
                                    <InputField label={"Nombre del Docente:"} placeholder={"Jesus Orlando"} type={"text"} icon={"fa-solid fa-user-tie"}
                                        value={name} onChange={setName} />
                                </div>
                            </div>

                            <div className="column is-half">
                                <div className="field">
                                    <SearchableInput label={"Carrera:"} placeholder={"SIS"} icon={"fas fa-graduation-cap"} options={CARRERS} value={selectedCareer} onChange={setSelectedCareer} />
                                </div>
                            </div>

                            <div className="column is-half">
                                <div className="field">
                                    <InputField label={"Contraseña de Acceso:"} placeholder={"Asigna una contraseña segura"} type={"text"} icon={"fas fa-lock"}
                                        value={password} onChange={setPassword} />
                                </div>
                            </div>
                        </div>

                        <div className="buttons">
                            <div className="control">
                                <Button texto={"Registrar Docente"} iconIzquierdo="fas fa-save" onclick={handleSave} />
                            </div>
                            <div className="control">
                                <Button texto="Canelar" iconIzquierdo="fas fa-x" variante="secundario" onclick={handleCancel} />
                            </div>
                            {isEditing ?
                                <div className="control">
                                    <Button texto={"Eliminar"} iconIzquierdo="fas fa-trash" variante="primario" onclick={handleDelete} />
                                </div>
                                : <></>}
                        </div>

                    </div>
                </div>
            </section>

        </Structure >
    );
}