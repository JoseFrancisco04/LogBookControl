import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Structure from "../components/Structure";
import { RechartsDevtools } from '@recharts/devtools';
import { BarChart, CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';

const data = [
    {
        laboratory: 'Laboratory 1',
        visits: 400
    },
    {
        laboratory: 'Laboratory 2',
        visits: 300
    },
    {
        laboratory: 'Laboratory 3',
        visits: 320
    },
    {
        laboratory: 'Laboratory 4',
        visits: 200
    }
];

export default () => {
    const navigate = useNavigate();

    return (
        <Structure title='ASISTENTE' footerText='© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Estadisticas'
            navbarActions={<>
                <Button texto="Horarios" variante="inverso" icono="fal fa-table" onclick={() => navigate("/admin")}></Button>
            </>}>
            <section className="section">
                <div className="container has-background-black">
                    <h1 className="title">Pura grafica claro que sí</h1>
                    <div className="hero">
                        <BarChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }} responsive data={data}>
                            <CartesianGrid />
                            <Line dataKey="visits" />
                            <XAxis dataKey="laboratory" />
                            <YAxis />
                            <Legend />
                            <RechartsDevtools />
                        </BarChart>
                    </div>
                </div>
            </section>
        </Structure>
    );
}