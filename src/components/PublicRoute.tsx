import { Navigate, Outlet } from "react-router-dom";


export const PublicRoute = () =>{
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol')?.toLowerCase().trim();

    if(token){
        return <Navigate to={rol ==='administrador' ? '/admin' : '/bitacora'} replace />;
    }

    return <Outlet/>;
}