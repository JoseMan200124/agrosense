// CustomPieChart.jsx
"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Box } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';

const data = [
    { name: 'Agua', value: 400 },
    { name: 'Fertilizantes', value: 300 },
    { name: 'Pesticidas', value: 300 },
    { name: 'Electricidad', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function CustomPieChart() {
    const legendColor = useColorModeValue('#000', '#fff');

    return (
        <Box>
            <PieChart width={400} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ color: legendColor }} />
            </PieChart>
        </Box>
    );
}
