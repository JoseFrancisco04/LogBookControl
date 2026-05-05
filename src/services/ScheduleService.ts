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

export const saveScheduleData = async (schedule: ISchedule[]): Promise<void> => {
    await console.log(JSON.stringify(schedule));
}
