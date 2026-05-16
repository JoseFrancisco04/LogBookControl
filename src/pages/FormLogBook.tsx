import Structure from "../components/Structure"
import Styles from "./FormLogBook.module.css"
import Button from "../components/Button"
import SearchableInput from "../components/SearchableInput";
import InputField from "../components/InputField";
import YesNoToggle from "../components/YesNoToggle";
import { useEffect, useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import { obtenerNombresMaestros } from "../services/TeacherService";
import { obtenerMaterias } from "../services/SubjectService";
import { useNavigate } from "react-router-dom";
import { recordActivity } from "../services/LogBookService";
import type { LogBookData } from "../services/LogBookService";
import NotificationModal from "../components/NotificationModal";

const CARRERAS_DISPONIBLES = ["IND", "INF", "ISC", "ADM", "ELE", "MEC"];
const LABORATORIOS_DISPONIBLES = ["Laboratorio 1", "Laboratorio 2", "Laboratorio 3", "Laboratorio 4"];

export default function FormLogBook() {
    const navigate = useNavigate();
    const [isModelOpen, setIsModelOpen] = useState(false);


    const [listaMaestros, setListaMaestros] = useState<string[]>([]);
    const [maestroSeleccionado, setMaestroSeleccionado] = useState<string>("");
    const [cargandoMaestros, setCargandoMaestros] = useState<boolean>(true);

    const [listaMateria, setListaMaterias] = useState<string[]>([]);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState<string>("");
    const [cargandoMateria, setCargandoMateria] = useState<boolean>(true);

    const [carreraSeleccionada, setCarreraSeleccionada] = useState<string>("");
    const [laboratorioSeleccionada, setLaboratorioSeleccionada] = useState<string>("");

    const [horaEntrada, setHoraEntrada] = useState("");
    const [horaSalida, setHoraSalida] = useState("");
    const [unidad, setUnidad] = useState("");
    const [alumnos, setAlumnos] = useState("");
    const [practica, setPractica] = useState("");
    const [registradaId, setRegistradaId] = useState(false);
    const [enviando, setEnviando] = useState(false);

    const getDate = () => {
        const hoy = new Date();
        const year = hoy.getFullYear();
        const month = String(hoy.getMonth() + 1).padStart(2, '0');
        const day = String(hoy.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [notification, setNotification] = useState({
        isOpen: false,
        type: 'success' as 'success' | 'error',
        title: '',
        message: ''
    });

    const showNotify = (type: 'success' | 'error', title: string, message: string) => {
        setNotification({ isOpen: true, type, title, message });
    }

    useEffect(() => {
        const cargarMaestros = async () => {
            const nombres = await obtenerNombresMaestros();
            setListaMaestros(nombres);
            setCargandoMaestros(false);
        };
        cargarMaestros();

        const cargarMaterias = async () => {
            const materias = await obtenerMaterias();
            setListaMaterias(materias);
            setCargandoMateria(false);
        };
        cargarMaterias();
    }, []);

    const handleSaveLogBook = async (firmaConfirmacion: string) => {
        try {
            setEnviando(true);
            const numLaboratorio = parseInt(laboratorioSeleccionada.replace(/\D/g, ''));


            const dataPacket: LogBookData = {
                fecha: getDate(),
                nombre_docente: maestroSeleccionado,
                materia: materiaSeleccionada,
                practica_nombre: practica,
                unidad: Number(unidad),
                registrada: registradaId,
                alumnos_atendidos: Number(alumnos),
                hora_entrada: horaEntrada,
                hora_salida: horaSalida,
                laboratorio: numLaboratorio,
                firma: firmaConfirmacion,
                carrera: carreraSeleccionada
            };

            const response = await recordActivity(dataPacket);

            if (response.data && response.data.success === false) {
                showNotify('error', 'Validación Incorrecta', response.data.error || "No se pudo registrar");
                setIsModelOpen(false);
                return;

            }

            if (response.data && response.data.success === true) {
                showNotify('success', "¡Registro Exitoso", response.data.status || "La bitácora se guardó correctamente.");
                setIsModelOpen(false);
            }

        } catch (error: any) {
            console.error("Error capturado:", error);

            //const mensajeError = error.response?.data?.mensaje || error.response?.data?.error || "Ocurrió un error de conexión al guardar.";
            showNotify('error', 'Error de Conexión', "No pudimos contactar al servidor.");
            setIsModelOpen(false);
        } finally {
            setEnviando(false);
        }
    }

    const handleCloseNotify = () => {
        const wasSuccess = notification.type === 'success';
        setNotification(prev => ({ ...prev, isOpen: false }));
        if (wasSuccess) {
            navigate(-1);
        }
    };

    return (
        <Structure title="REGISTRO DE ASISTENCIA" footerText="© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Computo | Registro de Asistencia">
            <div className={Styles.mainContainer}>
                <div className={Styles.formCard}>
                    <div className={Styles.formBody}>
                        <div className={Styles.gridRow3}>
                            <InputField label="Hora de Entrada:" placeholder="--:--" type="time" icon="" value={horaEntrada} onChange={setHoraEntrada} />
                            <InputField label="Hora de Salida:" placeholder="--:--" type="time" icon="" value={horaSalida} onChange={setHoraSalida} />
                            <SearchableInput label="Laboratorio:" placeholder="Buscar Laboratorio" icon="fa-desktop" options={LABORATORIOS_DISPONIBLES} value={laboratorioSeleccionada} onChange={setLaboratorioSeleccionada} />
                        </div>
                        <div className={Styles.gridRow3}>
                            <SearchableInput label="Carrera:" placeholder="Buscar Carrera..." icon="fa-graduation-cap" options={CARRERAS_DISPONIBLES} value={carreraSeleccionada} onChange={setCarreraSeleccionada} />
                            <SearchableInput label="Nombre del Docente:" placeholder={cargandoMaestros ? "Cargando Docentes..." : "Buscando docentes..."} icon="fa-user-tie" options={listaMaestros} value={maestroSeleccionado} onChange={setMaestroSeleccionado} />
                            <SearchableInput label="Materia:" placeholder={cargandoMateria ? "Cargando Materias..." : "Buscando Materias..."} icon="fa-book" options={listaMateria} value={materiaSeleccionada} onChange={setMateriaSeleccionada} />

                        </div>
                        <div className={Styles.gridRow3}>
                            <InputField label="Unidad:" placeholder="ej. 3" type="number" icon="fa-list-ol" value={unidad} onChange={setUnidad} />
                            <InputField label="¿Cantidad de alumnos?" placeholder="0" type="number" icon="fa-users" value={alumnos} onChange={setAlumnos} />
                            <YesNoToggle label="¿Registrada en ID?" value={registradaId} onChanged={setRegistradaId} />

                        </div>
                        <div className={Styles.gridRow1}>
                            <InputField label="Práctica a realizar:" placeholder="Describe brevemente la actividad..." type="text" icon="fa-flask" value={practica} onChange={setPractica} />
                            
                        </div>
                    </div>
                    <div className={Styles.actionsContainer}>
                        <Button texto="Cancelar Registro" variante="secundario" icono="fa-circle-xmark" onclick={() => navigate(-1)} />
                        <Button texto="Registrar Actividad" variante="primario" icono="fa-check-circle" onclick={() => setIsModelOpen(true)} />
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={isModelOpen}
                onClose={() => setIsModelOpen(false)}
                onConfirm={handleSaveLogBook}
                datosResumen={{
                    docente: maestroSeleccionado,
                    materia: materiaSeleccionada,
                    laboratorio: laboratorioSeleccionada
                }}

                isLoading={enviando}
            />

            <NotificationModal
                isOpen={notification.isOpen}
                type={notification.type}
                title={notification.title}
                message={notification.message}
                onClose={handleCloseNotify}
            />
        </Structure>
    )
}

