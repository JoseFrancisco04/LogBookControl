import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Structure from "../components/Structure";
import { useState } from "react";
import { getHoursPerCareer, getHoursPerLaboratory, getHoursPerSubject, getHoursPerTeacher } from "../services/StatisticsService";
import FloatingCalendar from "../components/FloatingCalendar";
import BarGraph from "../components/BarGraph";
import InputField from "../components/InputField";
import Select from "../components/Select";
import PieGraph from "../components/PieGraph";

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
    }

    // Pendiente: Ver bien que se necesita graficar
    const loadPerLaboratory = async () => {
        const data = await getHoursPerLaboratory({
            fecha_inicio: startDate,
            fecha_fin: endDate
        });
        if (data.length > 0)
            setGraphParams({
                graphData: data,
                dataX: "carrera",
                dataY: "total_sesiones",
                nameBar: `Sesiones en Laboratorio ${paramFilter} por Carrera`
            });
    }

    // Pendiente: buscar la forma de agregar el docente
    const loadPerTeacher = async () => {
        const data = await getHoursPerTeacher(paramFilter, {
            fecha_inicio: startDate,
            fecha_fin: endDate
        });
        if (data.length > 0)
            setGraphParams({
                graphData: data,
                dataX: "",
                dataY: "",
                nameBar: `Clases de ${paramFilter}`
            });
        else console.log(data);
    }

    // Pendiente: Lo mismo de Teacher
    const loadPerSubject = async () => {
        const data = await getHoursPerSubject(paramFilter, {
            fecha_inicio: startDate,
            fecha_fin: endDate
        });
        if (data.length > 0)
            setGraphParams({
                graphData: data,
                dataX: "laboratorio",
                dataY: "total_horas",
                nameBar: `Horas de ${paramFilter}`
            });
        else console.log(data);
    }

    const handleFilter = () => {
        if (!startDate && !endDate) return;

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
            <section className="section">
                <div className="container">
                    <nav className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <FloatingCalendar
                                    label={"Fecha de Inicio"}
                                    selectedDate={startDate}
                                    onDateSelect={setStartDate} />
                            </div>
                            <div className="level-item">
                                <FloatingCalendar
                                    label={"Fecha Final"}
                                    selectedDate={endDate}
                                    onDateSelect={setEndDate} />
                            </div>
                            <div className="level-item">
                                <Select
                                    options={optionsGraph}
                                    onChange={setTypeGraph}
                                    title="Tipo de Grafica"
                                    icon="fas fa-chart-line"
                                />
                            </div>
                            <div className="level-item">
                                {typeGraph == "2" ?
                                    <Select
                                        options={optionsLaboratory}
                                        onChange={setParamFilter}
                                        title="Laboratorio"
                                        icon="fas fa-computer"
                                    /> :
                                    typeGraph == "3" ?
                                        <InputField
                                            label={"Docente"}
                                            placeholder={"ej. Alano"}
                                            type={"text"}
                                            icon={"fas fa-user-tie"} /> :
                                        typeGraph == "4" ?
                                            <InputField
                                                label={"Materia"}
                                                placeholder={"ej. PistoLogia"}
                                                type={"text"}
                                                icon={"fas fa-book"} /> :
                                            <></>
                                }

                            </div>
                        </div>

                        <div className="level-right">
                            <div className="level-item">
                                <Button
                                    texto={"Filtrar"}
                                    variante="primario"
                                    iconIzquierdo="fas fa-filter"
                                    onclick={handleFilter} />

                            </div>
                        </div>
                    </nav>

                    {graphParams.dataX != "" ?
                        <div className="hero is-fullheight">
                            <div className="hero-body p-0">
                                <div className="container is-fluid w-100">
                                    <div className="columns is-desktop is-marginless is-vcentered">
                                        <div className="column is-6-desktop">
                                            <div className="card">
                                                <PieGraph
                                                    data={graphParams.graphData}
                                                    keyValue={"total_horas"}
                                                    keyName={"carrera"}
                                                />
                                            </div>
                                        </div>

                                        <div className="column is-6-desktop">
                                            <div className="card p-4">
                                                <BarGraph
                                                    graphData={graphParams.graphData}
                                                    dataX={graphParams.dataX}
                                                    dataY={graphParams.dataY}
                                                    nameBar={graphParams.nameBar}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        // Icono de espera en lo que filtra las graficas
                        <section className="section is-medium">
                            <nav className="level">
                                <div className="level-item has-text-centered">
                                    <i className="fa-solid fa-cloud-arrow-down fa-beat-fade fa-2xl"></i>
                                </div>
                            </nav>
                        </section>
                    }
                                        
                </div>
            </section>
        </Structure>
    );
}