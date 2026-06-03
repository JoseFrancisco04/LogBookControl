import axios, { AxiosError } from "axios";
import type { ISchedule } from "../models/ISchedule";

// Modelo de como enviamos la info
interface ISchedulePayload {
    maestro: string;
    materia: string;
    dia_semana: string;
    hora_inicio: string;
    hora_fin: string;
    fase: number;
    laboratorio: number;
    grupo_id: string;
}

// Instancia de axios, con parametros predefinidos
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000, // Si el backend no responde en 5 segundos, se cancela todo
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
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
        "maestro": data.maestro.toUpperCase(),
        "materia": data.materia.toUpperCase(),
        "dia_semana": data.dia_semana,
        "hora_inicio": data.hora_inicio,
        "hora_fin": data.hora_fin,
        "fase": data.fase || 1,
        "laboratorio": data.laboratorio!,
        "grupo_id": data.grupo_id.toUpperCase(),
    };
};

/**
 * Obtiene el horario completo asignado a un laboratorio específico.
 * 
 * @param {string} labNumber - El identificador o número del laboratorio (ej. '1', '2', 'A').
 * @returns {Promise<ISchedule[]>} Arreglo con todas las clases/horarios asignados a ese laboratorio.
 */
export const getScheduleFrom = async (labNumber: number): Promise<ISchedule[]> => {
    try {
        const response = await apiClient.get<ISchedule[]>(
            `/api/horarios/${labNumber}`
        );
        return response.data;
    } catch (error) {
        return [];
    }
}

/**
 * Guarda o actualiza un bloque de horarios en la base de datos.
 * 
 * @param {ISchedule[]} schedule - Arreglo de horarios a guardar. Se parsean automáticamente al formato requerido por el backend.
 * @returns {Promise<void>} 
 * @throws {Error} Si la operación falla.
 */
export const saveScheduleData = async (schedule: ISchedule[]): Promise<void> => {
    console.log("Data to Save:" ,JSON.stringify(schedule))
    try {
        const dataSend: ISchedulePayload[] = schedule.map(parseData);

        const response = await apiClient.post(
            `/api/horarios/registrar_horario`,
            dataSend
        );
        
        const res = response.data;
        console.log("Response Submit:", res)

        return res;
    } catch (error) {
        throw new Error("Error al guardar el horario");
    }
}

/**
 * Elimina un registro de horario o clase específico.
 * 
 * @param {ISchedule} schedule - El objeto de la clase a eliminar.
 * @returns {Promise<any>} Confirmación de eliminación.
 * @throws {Error} Si falla la petición de eliminación.
 */
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
