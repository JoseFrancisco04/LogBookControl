import axios, { AxiosError } from 'axios';
import type { ITeacher } from '../models/ITeacher';

export interface IMaestrosRespuesta {
    nombre_completo: string;
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

export const obtenerNombresMaestros = async (): Promise<string[]> => {
    try {
        const respuesta = await apiClient.get<IMaestrosRespuesta[]>(`/api/bitacora/maestros`);
        const nombresLimpios = respuesta.data.map(maestro => maestro.nombre_completo);
        return nombresLimpios;

    } catch (error) {
        console.error("Fallo al obtener los maestros:", error);
        return [];
    }
};

export const getTeachersData = async (): Promise<ITeacher[]> => {
    try {
        const res = await apiClient.get<ITeacher[]>(`/api/bitacora/obtener_maestros`);
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const saveTeacher = async (dataToSave: any) => {
    try {
        const res = await apiClient.post(
            `/api/registrar_docentes`,
            dataToSave
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteTeacher = async (dataToDelete: any) => {
    try {
        //console.log("Borrando: ",JSON.stringify(dataToDelete)); 
        const res = await apiClient.delete(
            `/api/eliminar_usuario`,
            {
                data: dataToDelete
            }
        );
        return res.data;
    } catch (error) {
        throw new Error("Error al eliminar al docente. " + error);
    }
}