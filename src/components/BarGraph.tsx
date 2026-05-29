import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell } from "recharts";

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
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />

                    {/* Configuración de los ejes */}
                    <XAxis dataKey={dataX} axisLine={false} tickLine={false} tick={{fill: 'var(--color-neutral-3)'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--color-neutral-3)'}} dx={-10} />

                    {/* Cuadro interactivo que se muestra al pasar el cursor */}
                    <Tooltip 
                        cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />

                    {/* Leyenda de los colores del gráfico */}
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />

                    {/* Definición de las barras */}
                    <Bar dataKey={dataY} name={nameBar} radius={[6, 6, 0, 0]} maxBarSize={60}>
                        {graphData.map((entry, index) => {
                            const COLORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6B6B'];
                            return <Cell key={`cell-${index}`} fill={COLORES[index % COLORES.length]} />;
                        })}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}