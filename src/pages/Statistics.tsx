import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Structure from "../components/Structure";
import { useState } from "react";
import { getHoursPerCareer, getHoursPerLaboratory, getHoursPerSubject, getHoursPerTeacher } from "../services/StatisticsService";
import FloatingCalendar from "../components/FloatingCalendar";
import BarGraph from "../components/BarGraph";

interface GraphParams {
    graphData: [];
    dataX: string;
    dataY: string;
    nameBar: string;
}

export default () => {
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

    const loadPerCareer = async () => {
        const data = await getHoursPerCareer({
            fecha_inicio: startDate,
            fecha_fin: endDate
        });
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
        setGraphParams({
            graphData: data,
            dataX: "carrera",
            dataY: "total_sesiones",
            nameBar: "Sesiones en N Laboratorio por Carrera"
        });
    }

    // Pendiente: buscar la forma de agregar el docente
    const loadPerTeacher = async () => {
        const data = await getHoursPerTeacher("alansukii", {
            fecha_inicio: startDate,
            fecha_fin: endDate
        });
        if (data.length > 0)
            setGraphParams({
                graphData: data,
                dataX: "",
                dataY: "",
                nameBar: ""
            });
        else console.log(data);
    }

    // Pendiente: Lo mismo de Teacher
    const loadPerSubject = async () => {
        const data = await getHoursPerSubject("SIMULACION", {
            fecha_inicio: startDate,
            fecha_fin: endDate
        });
        if (data.length > 0)
            setGraphParams({
                graphData: data,
                dataX: "laboratorio",
                dataY: "total_horas",
                nameBar: "Horas por Materia"
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
                                <span className="select is-mobile">
                                    <select
                                        className="has-text-black"
                                        style={{ backgroundColor: "var(--color-fondo)" }}
                                        onChange={(e) => setTypeGraph(e.target.value)}>
                                        <option value="1">Horas por Carrera</option>
                                        <option value="2">Horas por Laboratorio</option>
                                        <option value="3">Horas por Docente</option>
                                        <option value="4">Horas por Materia</option>
                                    </select>
                                </span>
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
                    <div className="graph">
                        <BarGraph
                            graphData={graphParams.graphData}
                            dataX={graphParams.dataX}
                            dataY={graphParams.dataY}
                            nameBar={graphParams.nameBar}
                        />
                    </div>
                </div>
            </section>
        </Structure>
    );
}