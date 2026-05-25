export interface ISchedule {
    materia: string;
    dia_semana: string;
    hora_inicio: string;
    hora_fin: string;
    maestro: string;
    grupo_id: string; 

    fase?: number;
    laboratorio?: string;
}