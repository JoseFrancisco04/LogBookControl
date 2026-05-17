import axios from 'axios';


export interface IMaestrosRespuesta {
    nombre_completo: string;
}

const API_URL = "https://791q1zh4-3000.usw3.devtunnels.ms";

export const obtenerNombresMaestros = async (): Promise<string[]> => {
    try {
        const respuesta = await axios.get<IMaestrosRespuesta[]>(`${API_URL}/api/bitacora/maestros`);
        const nombresLimpios = respuesta.data.map(maestro => maestro.nombre_completo);
        return nombresLimpios;

    } catch (error) {
        console.error("Fallo al obtener los maestros:", error);
        return [];

    }
};

export const saveTeacher = async (dataToSave: any) => {
    try {
        const res = await axios.post(
            `${API_URL}/api/registrar_docentes`,
            JSON.stringify(dataToSave),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteTeacher = async (dataToDelete: any) => {
    try {
        //console.log("Borrando: ",JSON.stringify(dataToDelete));
        const res = await axios.delete(
            `${API_URL}/api/horarios/eliminar`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(dataToDelete)
            }
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}