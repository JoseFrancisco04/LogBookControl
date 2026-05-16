import { Navigate, Outlet } from "react-router-dom";


export const PublicRoute = () =>{
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol')?.toLowerCase();

    if(token){
        return <Navigate to={rol ==='admin' ? '/admin' : '/bitacora'} replace />;
    }

    return <Outlet/>;
}