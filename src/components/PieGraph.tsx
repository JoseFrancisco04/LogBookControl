import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from 'recharts';

interface Props {
    data: [];
    keyValue: string;
    keyName: string;
}

const COLORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default ({ data, keyName, keyValue }: Props) => {
    return (
        // ResponsiveContainer permite que el gráfico se adapte al tamaño del div padre
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    {/* Componente principal de la gráfica de pastel */}
                    <Pie
                        data={data}
                        cx="50%" // Posición del centro en el eje X
                        cy="50%" // Posición del centro en el eje Y
                        labelLine={true}
                        label={({ payload, percent }) => `${payload[keyName]} ${(percent! * 100).toFixed(0)}%`} // Muestra nombre y porcentaje
                        outerRadius={120} // Radio exterior del pastel
                        fill="#8884d8"
                        dataKey={keyValue} 
                    >
                        {/* Asigna un color único a cada segmento mapeando los datos */}
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORES[index % COLORES.length]}/>
                        ))}
                    </Pie>

                    {/* Muestra información detallada al pasar el cursor (hover) */}
                    <Tooltip />

                    {/* Muestra las etiquetas de los colores al fondo o lados */}
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
