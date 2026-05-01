import { Link, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
    const error = useRouteError() as any;
    console.error("Error en:", error);

    return (
        <section className="section">
            <div className="container is-max-tablet" style={{textAlign: "center"}}>
                <h1>¡Ups! Algo salió mal en el laboratorio.</h1>
                <p>Lo sentimos, no pudimos cargar esta pantalla.</p>

                <Link to="/" className="button is-warning mt-5">
                    Volver al Mapa de Laboratorios
                </Link>
            </div>
        </section>
    );

}