import axios, { AxiosError } from "axios";

interface DateRange {
    fecha_inicio: string;
    fecha_fin: string;
    laboratorio?: string;
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
 * Obtiene el total de horas utilizadas agrupadas por carrera dentro de un rango de fechas.
 * 
 * @param {DateRange} dates - Objeto con la fecha de inicio, fin y opcionalmente el laboratorio.
 * @returns {Promise<[]>} Arreglo con la información estadística por carrera.
 */
export const getHoursPerCareer = async (dates: DateRange): Promise<[]> => {
    try {
        const url = `/api/estadisticas/carreras`;
        const response = await apiClient.get(url, {
            params: dates
        });
        console.log("perCareer", response.data.data)
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener por carrera:", error);
        return [];
    }
}

/**
 * Obtiene el total de horas utilizadas agrupadas por cada laboratorio.
 * 
 * @param {DateRange} dates - Objeto con la fecha de inicio, fin y opcionalmente el laboratorio.
 * @returns {Promise<[]>} Arreglo con la información estadística por laboratorio.
 */
export const getHoursPerLaboratory = async (dates: DateRange): Promise<[]> => {
    try {
        const url = `/api/estadisticas/laboratorios`;
        const response = await apiClient.get(url, {
            params: dates
        });
        console.log("perLaboratory", response.data.data)
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener por laboratorio:", error);
        return [];
    }
}

/**
 * Obtiene las horas que un docente específico ha utilizado el laboratorio en un periodo.
 * 
 * @param {string} numberControl - El número de control o identificador único del docente.
 * @param {DateRange} dates - Rango de fechas a consultar.
 * @returns {Promise<[]>} Arreglo con las estadísticas del docente.
 */
export const getHoursPerTeacher = async (numberControl: string, dates: DateRange): Promise<[]> => {
    try {
        const url = `/api/estadisticas/docente/${numberControl}`;
        const response = await apiClient.get(url, {
            params: dates
        });

        return response.data.data || response.data;
    } catch (error) {
        console.error("Error al obtener horas por docente:", error);
        return [];
    }
}

/**
 * Obtiene la cantidad de horas que se ha impartido una materia específica en el laboratorio.
 * 
 * @param {string} subject - El nombre o identificador de la materia.
 * @param {DateRange} dates - Rango de fechas a consultar.
 * @returns {Promise<[]>} Arreglo con las horas de uso agrupadas por la materia.
 */
export const getHoursPerSubject = async (subject: string, dates: DateRange): Promise<[]> => {
    try {
        const url = `/api/estadisticas/materia/${subject}`;
        const response = await apiClient.get(url, {
            params: dates
        });

        return response.data.data || response.data;
    } catch (error) {
        console.error("Error al obtener horas por materia:", error);
        return [];
    }
}

/**
 * Obtiene detalles específicos sobre el uso de un laboratorio en concreto.
 * 
 * @param {string} id - El ID o nombre del laboratorio a consultar.
 * @param {DateRange} dates - Rango de fechas.
 * @returns {Promise<[]>} Arreglo con los detalles detallados del uso del laboratorio.
 */
export const getLaboratoryDetails = async (id: string, dates: DateRange): Promise<[]> => {
    try {
        const url = `/api/estadisticas/laboratorio/${id}/detalles`;
        const response = await apiClient.get(url, {
            params: dates
        });
        
        return response.data.data || response.data;
    } catch (error) {
        console.error("Error al obtener detalles por laboratorio:", error);
        return [];
    }
}