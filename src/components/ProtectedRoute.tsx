import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps{
  allowedRoles?: string[];
}

export const ProtectedRoute = ({allowedRoles}:ProtectedRouteProps) => {
  // Aquí simula tu lógica de autenticación. 
  // Por ahora leeremos un valor de localStorage, pero en el futuro
  // podrías usar Context API, Zustand, o un token de tu backend.

  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol')?.toLowerCase();

  // Si no está logueado, lo mandamos al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if(allowedRoles && rol && !allowedRoles.includes(rol)){
    if(rol === 'administrador'){
      return <Navigate to="/admin" replace/>;
    }else if (rol === 'bitacora'){
      return <Navigate to="/bitacora" replace/>;
    }else{
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      return <Navigate to="/login" replace/>;
    }
  }

  return <Outlet />; 
};