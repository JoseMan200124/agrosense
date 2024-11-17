import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';

const data = [
    { name: 'Lun', humedad: 65 },
    { name: 'Mar', humedad: 59 },
    { name: 'Mié', humedad: 80 },
    { name: 'Jue', humedad: 81 },
    { name: 'Vie', humedad: 56 },
    { name: 'Sáb', humedad: 55 },
    { name: 'Dom', humedad: 40 },
];

export default function CustomAreaChart() {
    const gridStroke = useColorModeValue('#ccc', '#555');
    const textColor = useColorModeValue('#000', '#fff');

    return (
        <Box width="100%" height={300}>
            <ResponsiveContainer>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorHumedad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke={textColor}/>
                    <YAxis stroke={textColor}/>
                    <CartesianGrid stroke={gridStroke} />
                    <Tooltip />
                    <Area type="monotone" dataKey="humedad" stroke="#82ca9d" fillOpacity={1} fill="url(#colorHumedad)" />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
}
