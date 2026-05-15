import axios from "axios";
import type { ISchedule } from "../models/ISchedule";

const API_URL = "https://791q1zh4-3000.usw3.devtunnels.ms";

function parseData(data: any) {
    return {
        "maestro_nombre": data.maestro.toUpperCase(),
        "materia": data.materia.toUpperCase(),
        "dia_semana": data.dia_semana,
        "hora_inicio": data.hora_inicio,
        "hora_fin": data.hora_fin,
        "fase": data.fase,
        "laboratorio": data.laboratorio,
        "grupo_id": data.grupo_id.toUpperCase(),
    };
}

export const getScheduleFrom = async (labNumber: string): Promise<ISchedule[] | undefined> => {
    try {
        const response = await axios.get(`${API_URL}/api/horarios/${labNumber}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const saveScheduleData = async (schedule: ISchedule[]): Promise<void> => {
    const dataSend: any[] = [];
    schedule.forEach(s => {
        dataSend.push(parseData(s));
    });

    //console.log("Enviando: \n", JSON.stringify(dataSend));

    const response = await axios.post(
        `${API_URL}/api/horarios/registrar_horario`,
        JSON.stringify(dataSend),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    console.log(response.data);
    return response.data;
}

export const deleteClass = async (dataToDelete: any) => {
    //console.log("delete",parseData(dataToDelete))
    try {
        const response = await axios.delete(
            `${API_URL}/api/horarios/eliminar`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dataToDelete
            });
        return response;
    } catch (error) {
        console.error(error);
    }
    return {data: "Error al eliminar"};
}
