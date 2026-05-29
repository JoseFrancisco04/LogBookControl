import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Structure from "../components/Structure";
import { useState, useEffect } from "react";
import { getHoursPerCareer, getHoursPerLaboratory, getHoursPerSubject, getHoursPerTeacher, getLaboratoryDetails } from "../services/StatisticsService";
import FloatingCalendar from "../components/FloatingCalendar";
import BarGraph from "../components/BarGraph";
import SearchableInput from "../components/SearchableInput";
import Select from "../components/Select";
import PieGraph from "../components/PieGraph";
import { obtenerNombresMaestros, getTeachersData } from "../services/TeacherService";
import { obtenerMaterias } from "../services/SubjectService";
import Styles from "./Statistics.module.css";

interface GraphParams {
    graphData: [];
    dataX: string;
    dataY: string;
    nameBar: string;
}

export default () => {
    const optionsGraph = [
        "Horas por Carrera",
        "Horas por Laboratorio",
        "Horas por Docente",
        "Horas por Materia"
    ];
    const optionsLaboratory = [
        "Laboratorio 1",
        "Laboratorio 2",
        "Laboratorio 3",
        "Laboratorio 4",
    ];

    const navigate = useNavigate();

    // Fecha de inicio y fin para la solicitud
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const [typeGraph, setTypeGraph] = useState("1");
    const [graphParams, setGraphParams] = useState<GraphParams>({
        graphData: [],
        dataX: "",
        dataY: "",
        nameBar: "",
    });

    const [paramFilter, setParamFilter] = useState<string>("");
    const [hasSearched, setHasSearched] = useState<boolean>(false);

    const [listaMaestros, setListaMaestros] = useState<string[]>([]);
    const [cargandoMaestros, setCargandoMaestros] = useState<boolean>(true);

    const [listaMateria, setListaMaterias] = useState<string[]>([]);
    const [cargandoMateria, setCargandoMateria] = useState<boolean>(true);

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

    const loadPerCareer = async () => {
        const data = await getHoursPerCareer({
            fecha_inicio: startDate,
            fecha_fin: endDate
        });
        if (data.length > 0)
            setGraphParams({
                graphData: data,
                dataX: "carrera",
                dataY: "total_horas",
                nameBar: "Horas por Carrera"
            });
        else {
            setGraphParams({ graphData: [], dataX: "", dataY: "", nameBar: "" });
        }
    }

    const loadPerLaboratory = async () => {
        const labId = paramFilter.replace("Laboratorio ", "") || "1";
        const data = await getLaboratoryDetails(labId, {
            fecha_inicio: startDate,
            fecha_fin: endDate
        });
        if (data.length > 0)
            setGraphParams({
                graphData: data,
                dataX: "carrera",
                dataY: "total_sesiones",
                nameBar: `Sesiones en Laboratorio ${labId} por Carrera`
            });
        else {
            setGraphParams({ graphData: [], dataX: "", dataY: "", nameBar: "" });
        }
    }

    const loadPerTeacher = async () => {
        if (!paramFilter) return;

        const teachers = await getTeachersData();
        const teacher = teachers.find((t) => t.nombre_completo == paramFilter);
        const numberControl = teacher ? teacher.num_control : paramFilter;

        const data = await getHoursPerTeacher(numberControl, {
            fecha_inicio: startDate,
            fecha_fin: endDate
        });
        if (data && data.length > 0)
            setGraphParams({
                graphData: data,
                dataX: "materia",
                dataY: "total_horas",
                nameBar: `Clases de ${paramFilter}`
            });
        else {
            setGraphParams({
                graphData: [],
                dataX: "",
                dataY: "",
                nameBar: ""
            });
            console.log("No hay datos:", data);
        }
    }

    const loadPerSubject = async () => {
        if (!paramFilter) return;
        const data = await getHoursPerSubject(paramFilter, {
            fecha_inicio: startDate,
            fecha_fin: endDate
        });
        if (data && data.length > 0)
            setGraphParams({
                graphData: data,
                dataX: "materia",
                dataY: "total_horas",
                nameBar: `Horas de ${paramFilter}`
            });
        else {
            setGraphParams({
                graphData: [],
                dataX: "",
                dataY: "",
                nameBar: ""
            });
            console.log("No hay datos:", data);
        }
    }

    const handleFilter = () => {
        if (!startDate && !endDate) return;

        setHasSearched(true);

        switch (typeGraph) {
            case "1":
                loadPerCareer();
                break;
            case "2":
                loadPerLaboratory();
                break;
            case "3":
                loadPerTeacher();
                break;
            case "4":
                loadPerSubject();
                break;
        }

    }

    return (
        <Structure title='ASISTENTE' footerText='© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Estadisticas'
            navbarActions={<>
                <Button texto="Horarios" variante="inverso" icono="fal fa-table" onclick={() => navigate("/admin")}></Button>
            </>}>
            <div className={Styles.mainContainer}>
                
                <div className={Styles.filterCard}>
                    <h2 className={Styles.sectionTitle}>Filtros de Búsqueda</h2>
                    <div className={Styles.gridFilters}>
                        <FloatingCalendar
                            label={"Fecha de Inicio"}
                            selectedDate={startDate}
                            onDateSelect={setStartDate} />
                        <FloatingCalendar
                            label={"Fecha Final"}
                            selectedDate={endDate}
                            onDateSelect={setEndDate} />
                        <Select
                            options={optionsGraph}
                            onChange={(val) => {
                                setTypeGraph(val);
                                setParamFilter("");
                            }}
                            title="Tipo de Gráfica"
                            icon="fas fa-chart-line"
                        />
                        {typeGraph == "2" ?
                            <Select 
                                options={optionsLaboratory}
                                onChange={setParamFilter}
                                title="Laboratorio"
                                icon="fas fa-computer"
                            /> :
                            typeGraph == "3" ?
                                <SearchableInput
                                    label={"Docente"}
                                    placeholder={cargandoMaestros ? "Cargando Docentes..." : "Buscando docentes..."}
                                    options={listaMaestros}
                                    value={paramFilter}
                                    onChange={setParamFilter}
                                    icon={"fa-user-tie"} /> :
                                typeGraph == "4" ?
                                    <SearchableInput
                                        label={"Materia"}
                                        placeholder={cargandoMateria ? "Cargando Materias..." : "Buscando Materias..."}
                                        options={listaMateria}
                                        value={paramFilter}
                                        onChange={setParamFilter}
                                        icon={"fa-book"} /> :
                                    <div />
                        }
                    </div>
                    <div className={Styles.actionsContainer}>
                        <Button
                            texto={"Filtrar Resultados"}
                            variante="primario"
                            iconIzquierdo="fas fa-filter"
                            onclick={handleFilter} />
                    </div>
                </div>

                {graphParams.dataX != "" ?
                    <div className={Styles.chartsContainer}>
                        <div className={Styles.chartCard}>
                            <PieGraph
                                data={graphParams.graphData}
                                keyValue={graphParams.dataY}
                                keyName={graphParams.dataX}
                            />
                        </div>
                        <div className={Styles.chartCard}>
                            <BarGraph
                                graphData={graphParams.graphData}
                                dataX={graphParams.dataX}
                                dataY={graphParams.dataY}
                                nameBar={graphParams.nameBar}
                            />
                        </div>
                    </div>
                    :
                    <div className={Styles.emptyState}>
                        {hasSearched ? (
                            <div className="has-text-centered">
                                <i className="fa-solid fa-folder-open fa-3x mb-4" style={{color: "var(--color-neutral-3)"}}></i>
                                <p className="has-text-grey title is-5 mb-2">No se encontraron datos</p>
                                <p className="has-text-grey">Intenta seleccionar un rango de fechas diferente o cambiar los parámetros de búsqueda.</p>
                            </div>
                        ) : (
                            <div className="has-text-centered">
                                <i className="fa-solid fa-chart-pie fa-beat-fade fa-3x mb-4" style={{color: "var(--color-primario)"}}></i>
                                <p className="has-text-grey title is-5 mb-2">Listo para graficar</p>
                                <p className="has-text-grey">Aplica los filtros para visualizar las estadísticas del sistema.</p>
                            </div>
                        )}
                    </div>
                }

            </div>
        </Structure>
    );
}