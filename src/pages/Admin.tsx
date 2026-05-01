import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Structure from "../components/Structure";

export default function Admin() {
    const navigate = useNavigate();
    return (
        <Structure title='INICIO DE SESIÓN' footerText='© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Inicio de Sesión'
            navbarActions={
                <>
                    <Button texto="Ver Horarios" variante="inverso" icono="fas fa-map-signs" onclick={() => navigate("/")}></Button>
                    <Button texto="Cerrar Sesion" variante="inverso" icono="fa fa-times" onclick={() => {
                        localStorage.setItem('isLoggedIn', 'false');
                        navigate("/")
                    }}></Button>
                </>}>
            <section className="section">
                <div className="container">
                </div>
            </section>
        </Structure >
    );
}