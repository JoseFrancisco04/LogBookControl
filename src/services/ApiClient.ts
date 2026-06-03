import axios, { AxiosError } from "axios";

/** 
 * Cliente con parametros predefinidos, 
 * mantiene la consistencia en las peticiones
 * @returns Instancia de Axios
 */
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000, // Si el backend no responde en 10 segundos, se cancela todo
    headers: {
        'Content-Type': 'application/json'
    }
});


// Interceptar las request (antes de cada petición se ejecuta).
// Se interceptan las request, se configuran y se envian a su destino.
apiClient.interceptors.request.use(
    // Cada nueva petición buscará primero el token
    // Esto evita que tengamos tokens caducados o,
    // aunque cierre sesión, el cliente aún tenga el token
    (config) => {
        const token = localStorage.getItem('token');

        // Si el token existe, se lo inyectamos a los headers
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Retornamos la configuración para que continue la petición
        return config;
    },
    (error) => {
        // En caso de error al hacer la petición
        return Promise.reject(error);
    }
);

// Interceptar los response (cada que responde el servidor).
// Antes de devolver la respuesta, se desmenusa y si todo está bien se regresa.
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            console.warn("El token ha expirado o es inválido.");
        } else {
            console.error(`Error en la API: ${error.response?.status}`, error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;