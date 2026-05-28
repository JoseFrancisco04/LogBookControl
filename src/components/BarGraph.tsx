import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

interface Props {
    graphData: [];
    dataX: string;
    dataY: string;
    nameBar: string;
}

export default ({ graphData, dataX, dataY, nameBar }: Props) => {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart
                    data={graphData}
                >
                    {/* Cuadrícula de fondo opcional */}
                    <CartesianGrid strokeDasharray="3 3" />

                    {/* Configuración de los ejes */}
                    <XAxis dataKey={dataX} />
                    <YAxis />

                    {/* Cuadro interactivo que se muestra al pasar el cursor */}
                    <Tooltip />

                    {/* Leyenda de los colores del gráfico */}
                    <Legend />

                    {/* Definición de las barras (puedes agregar más de una) */}
                    <Bar dataKey={dataY} fill="#8884d8" name={nameBar} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}