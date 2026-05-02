import axios from "axios";
import type { ISchedule } from "../models/ISchedule";

const API_URL = "https://791q1zh4-3000.usw3.devtunnels.ms";

export const getScheduleFrom = async (labNumber: string): Promise<ISchedule[] | undefined> => {
    try {
        const response = await axios.get(`${API_URL}/api/horarios/lab/${labNumber}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

// export const getScheduleFromTest = async (labNumber: string) => {
//     try {
//         console.log(labNumber);
        
//         const data: ISchedule[] = [
//             {
//                 hora_inicio: "14:23",
//                 hora_fin: "15:30",
//                 materia: "POO",
//                 maestro: "clau",
//                 grupo_id: "G1MSIS08",
//                 career: "sistemas",
//             },
//             {
//                 hora_inicio: "14:23",
//                 hora_fin: "15:30",
//                 materia: "Logica",
//                 maestro: "sabdiel",
//                 grupo_id: "G1MSIS08",
//                 career: "informatica",
//             },
//         ];

//         return await data;
//     } catch (error) {
//         console.log(error);
//     }
// }