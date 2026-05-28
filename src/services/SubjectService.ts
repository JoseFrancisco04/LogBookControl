import axios, { AxiosError } from 'axios';


export interface IMateriasRespuesta{
    materia: string;
}

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000, // Si el backend no responde en 10 segundos, se cancela todo
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

export const obtenerMaterias =  async (): Promise<string[]> =>{
 
    try{
        const respuesta = await apiClient.get<IMateriasRespuesta[]>(`/api/horarios/materias`);
        const materiasLimpias = respuesta.data.map(materia => materia.materia);
        return materiasLimpias;

    }catch(error){
        console.error("Fallo al obtener todas las materias", error);
        return[];

    }

}