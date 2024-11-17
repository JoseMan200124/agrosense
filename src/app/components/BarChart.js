// components/charts/BarChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Fertilizante", value: 25 },
    { name: "Plaguicidas", value: 35 },
    { name: "Agua", value: 20 },
    { name: "Herbicidas", value: 15 },
];

const CustomBarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#28a745" />
        </BarChart>
    </ResponsiveContainer>
);

export default CustomBarChart;
