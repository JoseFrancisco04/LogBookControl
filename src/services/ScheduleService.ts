import axios from "axios";

const API_URL = "https://791q1zh4-3000.usw3.devtunnels.ms";

export const getScheduleFrom = async (labNumber: string) => {
    try {
        const response = await axios.get(`${API_URL}/horario_Lab/${labNumber}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}