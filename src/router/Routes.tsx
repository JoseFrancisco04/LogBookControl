import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import MapLaboratory from "../pages/MapLaboratory";
import { LaboratorySchedule } from "../pages/LaboratorySchedule";
import LogBook from "../pages/LogBook";
import { ErrorPage } from "../pages/ErrorPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import Admin from "../pages/Admin";
import FormLogBook from "../pages/FormLogBook";
import { PublicRoute } from "../components/PublicRoute";
import Teachers from "../pages/Teachers";
import Statistics from "../pages/Statistics";

export const router = createBrowserRouter([
    {
        element: <PublicRoute />,
        children: [
            {
                path: '/',
                element: <MapLaboratory />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/login',
                element: <Login />
            },

        ]
    },
    {
        path: '/horario/:labNumber',
        element: <LaboratorySchedule />,
        errorElement: <ErrorPage />
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
                path: '/teachers',
                element: <Teachers />,
            },
            {
                path: '/statistics',
                element: <Statistics />,
            },
            {
                path: '/bitacora',
                element: <LogBook />
            },
            {
                path: '/bitacora/FormLogBook',
                element: <FormLogBook />
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