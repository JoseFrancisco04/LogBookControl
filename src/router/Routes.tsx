import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login";
import MapLaboratory from "../pages/MapLaboratory";
import { LaboratorySchedule } from "../pages/LaboratorySchedule";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MapLaboratory />
    },
    {
        path: '/horario/:labNumber',
        element: <LaboratorySchedule />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '*',
        element: <><h1 className="title">No existe esta ruta w</h1></>
    }
]);