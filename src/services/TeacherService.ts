import axios from 'axios';


export interface IMaestrosRespuesta{
    nombre_completo: string;
}

const API_URL= "https://791q1zh4-3000.usw3.devtunnels.ms";

export const obtenerNombresMaestros = async (): Promise<string[]> => {
    try{
        const respuesta = await axios.get<IMaestrosRespuesta[]>(`${API_URL}/api/bitacora/maestros`);
        const nombresLimpios = respuesta.data.map(maestro => maestro.nombre_completo);
        return nombresLimpios;

    }catch(error){
        console.error("Fallo al obtener los maestros:", error);
        return[];

    }
};