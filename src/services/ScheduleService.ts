import axios, { AxiosError } from "axios";
import type { ISchedule } from "../models/ISchedule";

// Modelo de como enviamos la info
interface ISchedulePayload {
    maestro_nombre: string;
    materia: string;
    dia_semana: string;
    hora_inicio: string;
    hora_fin: string;
    fase: number;
    laboratorio: string;
    grupo_id: string;
}

// Instancia de axios, con parametros predefinidos
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000, // Si el backend no responde en 5 segundos, se cancela todo
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        // Atrapamos solo el error de cuando el servidor está apagado
        if (error.code === 'ERR_NETWORK') {
            console.warn("No se pudo conectar con el servidor.");
        } else {
            console.error(`Error en la API: ${error.response?.status}`, error.message);
        }

        return Promise.reject(error);
    }
);

function parseData(data: ISchedule): ISchedulePayload {
    return {
        "maestro_nombre": data.maestro.toUpperCase(),
        "materia": data.materia.toUpperCase(),
        "dia_semana": data.dia_semana,
        "hora_inicio": data.hora_inicio,
        "hora_fin": data.hora_fin,
        "fase": data.fase || 1,
        "laboratorio": data.laboratorio!,
        "grupo_id": data.grupo_id.toUpperCase(),
    };
};

export const getScheduleFrom = async (labNumber: string): Promise<ISchedule[]> => {
    try {
        const response = await apiClient.get<ISchedule[]>(`/api/horarios/${labNumber}`);
        return response.data;
    } catch (error) {
        return [];
    }
}

export const saveScheduleData = async (schedule: ISchedule[]): Promise<void> => {
    console.log(schedule)
    try {
        const dataSend: ISchedulePayload[] = schedule.map(parseData);

        const response = await apiClient.post(
            `/api/horarios/registrar_horario`,
            dataSend
        );
        return response.data;
    } catch (error) {
        throw new Error("Error al guardar el horario");
    }
}

export const deleteSchedule = async (schedule: ISchedule) => {
    const dataToDelete: ISchedulePayload = parseData(schedule);
    console.log("deleteShcedule", dataToDelete)
    try {
        const response = await apiClient.delete(
            `/api/horarios/eliminar`,
            { data: dataToDelete });
        return response.data;
    } catch (error) {
        throw new Error("Error al eliminar la clase. " + error);
    }
}
