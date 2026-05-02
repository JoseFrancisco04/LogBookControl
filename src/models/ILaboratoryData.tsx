//Los datos que son enviados desde MapLaboratory a LaboratorySchedule

import type { ISchedule } from "./ISchedule";


export interface ILaboratoryData {
    //laboratoryNumber: string;

    schedules: ISchedule[];
}