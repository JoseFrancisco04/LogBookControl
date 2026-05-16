import axios from 'axios';


export interface IMateriasRespuesta{
    materia: string;
}

const API_URL= "https://791q1zh4-3000.usw3.devtunnels.ms";

export const obtenerMaterias =  async (): Promise<string[]> =>{
 
    try{
        const respuesta = await axios.get<IMateriasRespuesta[]>(`${API_URL}/api/horarios/materias`);
        const materiasLimpias = respuesta.data.map(materia => materia.materia);
        return materiasLimpias;

    }catch(error){
        console.error("Fallo al obtener todas las materias", error);
        return[];

    }

}