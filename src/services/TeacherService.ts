import axios, { AxiosError } from 'axios';
import type { ITeacher } from '../models/ITeacher';

export interface IMaestrosRespuesta {
    nombre_completo: string;
}

// Instancia de axios, con parametros predefinidos
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000, // Si el backend no responde en 5 segundos, se cancela todo
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

/**
 * Obtiene únicamente los nombres completos de todos los maestros.
 * Útil para autocompletados o listas desplegables ligeras.
 * 
 * @returns {Promise<string[]>} Un arreglo con los nombres de los maestros. Retorna un arreglo vacío si hay un error.
 */
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

/**
 * Obtiene toda la información detallada de los maestros registrados.
 * 
 * @returns {Promise<ITeacher[]>} Promesa que resuelve un arreglo con los datos completos de los maestros.
 */
export const getTeachersData = async (): Promise<ITeacher[]> => {
    try {
        const res = await apiClient.get<ITeacher[]>(`/api/bitacora/obtener_maestros`);
        return res.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

/**
 * Registra o actualiza la información de un docente en la base de datos.
 * 
 * @param {any} dataToSave - Objeto con los datos del docente a guardar (ej. nombre, departamento, etc.).
 * @returns {Promise<any>} La respuesta del backend tras intentar guardar.
 */
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

/**
 * Elimina un docente de la base de datos.
 * 
 * @param {any} dataToDelete - Datos necesarios para identificar al docente que se va a eliminar (usualmente su ID o número de control).
 * @returns {Promise<any>} La respuesta de confirmación del backend.
 * @throws {Error} Lanza un error si falla la eliminación, útil para mostrar un modal de error en la UI.
 */
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