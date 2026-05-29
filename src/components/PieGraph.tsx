import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from 'recharts';

/**
 * Propiedades esperadas para el componente PieGraph.
 */
interface Props {
    /** Arreglo de datos a renderizar en la gráfica. (Ej: [{ name: 'A', value: 400 }]) */
    data: [];
    /** La llave en los datos que contiene el valor numérico (ej. 'value') */
    keyValue: string;
    /** La llave en los datos que contiene el nombre/etiqueta de la porción (ej. 'name') */
    keyName: string;
}

const COLORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

/**
 * Componente funcional que renderiza una gráfica de pastel (estilo Donut) usando Recharts.
 * Se ajusta automáticamente al 100% del contenedor padre.
 * 
 * @param {Props} props - Propiedades para configurar la gráfica.
 * @returns Elemento JSX que contiene la gráfica de pastel responsiva.
 */
export default ({ data, keyName, keyValue }: Props) => {
    return (
        // ResponsiveContainer permite que el gráfico se adapte al tamaño del div padre
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    {/* Componente principal de la gráfica de pastel */}
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={80} // Convert to Donut chart
                        outerRadius={130}
                        paddingAngle={2} // Slight padding between slices
                        dataKey={keyValue}
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={COLORES[index % COLORES.length]} 
                                stroke="var(--color-fondo)"
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>

                    {/* Tooltip con estilos personalizados para verse premium */}
                    <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        itemStyle={{ color: 'var(--color-fuente)', fontWeight: 600 }}
                    />

                    {/* Muestra las etiquetas de los colores al fondo o lados */}
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
