// Simulación de petición de los horarios al back

// import axios from "axios";

// const API_URL = "http://localhost:3000/api/students";

// export const getStudents = async () => {
//     try {
//         const response = await axios.get(API_URL + "/getAll");
//         return response.data;
//     }catch (error) {
//         console.log(error);
//     }
// }

export const getSchedules = () => {
    return [
        {
            laboratory: 3,
            hour: "7 a 8",
            class: "POO",
            teacher: "CuperSoft",
            group: "G1MSIS04",
            career: "Sistemas Computacionales"
        },
        {
            laboratory: 1,
            hour: "8 a 9",
            class: "Redes",
            teacher: "Madrigal",
            group: "G1MINF06",
            career: "Informatica"
        }
    ];
}