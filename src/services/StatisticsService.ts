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

export const getHoursPerTeacher = async (numberControl: string, dates: DateRange): Promise<[]> => {
    try {
        const url = `/api/estadisticas/docente/${numberControl}`;
        const response = await apiClient.get<[]>(url, {
            params: dates
        });

        return response.data;
    } catch (error) {
        console.error("Error al obtener horas por docente:", error);
        return [];
    }
}

export const getHoursPerSubject = async (subject: string, dates: DateRange): Promise<[]> => {
    try {
        const url = `/api/estadisticas/materia/${subject}`;
        const response = await apiClient.get<[]>(url, {
            params: dates
        });

        return response.data;
    } catch (error) {
        console.error("Error al obtener horas por materia:", error);
        return [];
    }
}