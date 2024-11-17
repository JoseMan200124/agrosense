// components/charts/LineChart.jsx
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
    { name: "Enero", value: 30 },
    { name: "Febrero", value: 20 },
    { name: "Marzo", value: 50 },
    { name: "Abril", value: 40 },
    { name: "Mayo", value: 60 },
    { name: "Junio", value: 70 },
];

const CustomLineChart = () => (
    <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#28a745" strokeWidth={2} dot={{ r: 5 }} />
        </RechartsLineChart>
    </ResponsiveContainer>
);

export default CustomLineChart;
