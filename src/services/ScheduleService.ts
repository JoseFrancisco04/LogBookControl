import type { ISchedule } from "../models/ISchedule";
import apiClient from "./ApiClient";

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
    //console.log("Data to Save:", JSON.stringify(schedule))
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

/**
 * Elimina un registro de horario o clase específico.
 * 
 * @param {ISchedule} schedule - El objeto de la clase a eliminar.
 * @returns {Promise<any>} Confirmación de eliminación.
 * @throws {Error} Si falla la petición de eliminación.
 */
export const deleteSchedule = async (schedule: ISchedule) => {
    //console.log(schedule)
    const dataToDelete: ISchedulePayload = parseData(schedule);
    //console.log("deleteShcedule", dataToDelete)
    try {
        const response = await apiClient.delete(
            `/api/horarios/eliminar`,
            { data: dataToDelete });
        return response.data;
    } catch (error) {
        throw new Error("Error al eliminar la clase. " + error);
    }
}
