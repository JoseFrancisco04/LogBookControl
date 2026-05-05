import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import MapLaboratory from "../pages/MapLaboratory";
import { LaboratorySchedule } from "../pages/LaboratorySchedule";
import LogBook from "../pages/LogBook";
import { ErrorPage } from "../pages/ErrorPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Admin from "../pages/Admin";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MapLaboratory />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/horario/:labNumber',
        element: <LaboratorySchedule />,
        errorElement: <ErrorPage />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        // Envolvemos esta sección con nuestro guardia
        element: <ProtectedRoute />,
        children: [
            {
                path: '/admin',
                element: <Admin />,
            },
            {
                path: '/bitacora',
                element: <LogBook />
            }
            // Si mañana agregas más pantallas para el admin, las pones aquí:
            // { path: '/admin/configuracion', element: <Configuracion /> }
        ],
    },
    {
        path: '*',
        element: <><h1 className="title">No existe esta ruta w</h1></>
    }
]);