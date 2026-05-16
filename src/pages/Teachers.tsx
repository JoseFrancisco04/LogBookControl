import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Structure from "../components/Structure";

export default () => {
    const navigate = useNavigate();
    return (
        <Structure title='DEFINIR HORARIOS' footerText={`© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Asignar Docentes`}
            navbarActions={<>
                <Button texto="Horarios" variante="inverso" icono="fa-regular fa-calendar-plus" onclick={() => {
                    navigate("/admin")
                }}>
                </Button>
                <Button texto="Log Out" variante="inverso" icono="fal fa-sign-in-alt" onclick={() => {
                    localStorage.setItem('isLoggedIn', 'false');
                    navigate("/login")
                }}>
                </Button>
            </>}>
            <form>
                <label htmlFor="">hola</label>
            </form>
        </Structure>

    );
}