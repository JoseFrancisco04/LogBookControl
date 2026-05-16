import axios from "axios";


export interface LoginCredencials {
    num_control: string;
    contraseña: string;
}

export interface AuthResponse {
    ok: boolean;
    mensaje: string;
    token: string;
    usuario: {
        num_control: string;
        nombre_completo: string;
        rol: string;
    }
}

export interface AuthResponseLogout{
    ok: boolean;
    mensaje: string;
}

const API_URL = 'https://791q1zh4-3000.usw3.devtunnels.ms'

export const login = async (credencials: LoginCredencials): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/api/login`, credencials);

        return response.data;

    } catch (error) {
        console.error('Error en la autenticación: ', error)

        throw new Error("Usuario o Contraseña incorrectas");

    }
};


export const logout = async (credencials:LoginCredencials): Promise <AuthResponseLogout> =>{
    try{
        const response = await axios.post<AuthResponseLogout>(`${API_URL}/api/logout`, credencials);
        return response.data;

    }catch(error){
        console.error('Error en la autenticación: ', error)

        throw new Error ("Contraseña incorrecta");
    }
};