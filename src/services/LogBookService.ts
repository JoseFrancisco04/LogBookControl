import axios from "axios";

export interface LogBookData {
    fecha: string;
    nombre_docente: string;
    materia: string;
    practica_nombre: string;
    unidad: number;
    registrada: boolean;
    alumnos_atendidos: number;
    hora_entrada: string;
    hora_salida: string;
    laboratorio: number;
    firma: string;
    carrera: string;
}

export interface ResponseLogBook {
    ok: boolean;
    mensaje: string;
    data: {
        success: boolean;
        id?: number;
        status?: string;
        error?: string;
    }
}

export interface LogBookRecord{
    id: number;
    fecha: string;
    nombre_docente: string;
    num_control: string;
    materia:string;
    laboratorio: number;
    practica_nombre: string;
    unidad: number;
    alumnos_atendidos: number;
    hora_entrada: string;
    hora_salida: string;
    firma?:string;
    carrera?:string;
    registrada?: boolean;

}


const API_URL = 'https://791q1zh4-3000.usw3.devtunnels.ms';

export const recordActivity = async (datos: LogBookData): Promise<ResponseLogBook> => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post<ResponseLogBook>(
            `${API_URL}/api/bitacora/registrar`,
            datos,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error) {
        //console.error("Error al registrar la actividad", error);
        //throw new Error("No se pudo registrar la actividad. Verifica los datos o tu conexión.");
        if (axios.isAxiosError(error)) {
            throw error;
        }
        // Si es otro tipo de error (ej. se fue el internet), lanzamos el genérico
        throw new Error("Error de conexión. Verifica tu internet.");
    }
};

export const getLogBookForDate = async (fecha: string): Promise<LogBookRecord[]> =>{
    try{
        const token = localStorage.getItem('token');

        const response = await axios.get<LogBookRecord[] | null>(
            `${API_URL}/api/bitacora/${fecha}`,
            {
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            }
        );
        return response.data ?? [];

    }catch(error){
        if(axios.isAxiosError(error)){
            throw error;
        }
        throw new Error("Error al obtener los registros de la bitácora");

    }
};