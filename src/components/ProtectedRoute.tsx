import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  // Aquí simula tu lógica de autenticación. 
  // Por ahora leeremos un valor de localStorage, pero en el futuro
  // podrías usar Context API, Zustand, o un token de tu backend.
  const isLogged = localStorage.getItem('isLoggedIn') === 'true';

  // Si no está logueado, lo mandamos al login
  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; 
};