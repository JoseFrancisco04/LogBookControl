import axios, { AxiosError } from "axios";


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

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000, // Si el backend no responde en 10 segundos, se cancela todo
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        // Atrapamos solo el error de cuando el servidor está apagado
        if (error.code === 'ERR_NETWORK') {
            console.warn("No se pudo conectar con el servidor.");
        } else {
            console.error(`Error en la API: ${error.response?.status}`, error.message);
        }

        return Promise.reject(error);
    }
);

export const login = async (credencials: LoginCredencials): Promise<AuthResponse> => {
    try {
        const response = await apiClient.post<AuthResponse>(`/api/login`, credencials);

        return response.data;

    } catch (error) {
        console.error('Error en la autenticación: ', error)

        throw new Error("Usuario o Contraseña incorrectas");

    }
};


export const logout = async (credencials:LoginCredencials): Promise <AuthResponseLogout> =>{
    try{
        const response = await apiClient.post<AuthResponseLogout>(`/api/logout`, credencials);
        return response.data;

    }catch(error){
        console.error('Error en la autenticación: ', error)

        throw new Error ("Contraseña incorrecta");
    }
};