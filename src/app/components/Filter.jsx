// /app/components/Filter.jsx
"use client";

import { Box, Select, useColorModeValue } from "@chakra-ui/react";

export default function Filter({ selectedMonth, setSelectedMonth }) {
    return (
        <Box
            position="absolute"
            top="20px"
            right="20px"
            bg={useColorModeValue("white", "gray.800")}
            p={3}
            rounded="md"
            shadow="md"
            zIndex="100"
        >
            <Select
                placeholder="Filtrar por Mes"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                size="sm"
                color="black" // Añade esta línea para cambiar el color del texto a negro
            >
                <option value="Enero">Enero</option>
                <option value="Febrero">Febrero</option>
                <option value="Marzo">Marzo</option>
                <option value="Abril">Abril</option>
                <option value="Mayo">Mayo</option>
                <option value="Junio">Junio</option>
                <option value="Julio">Julio</option>
                <option value="Agosto">Agosto</option>
                <option value="Septiembre">Septiembre</option>
                <option value="Octubre">Octubre</option>
                <option value="Noviembre">Noviembre</option>
                <option value="Diciembre">Diciembre</option>
            </Select>
        </Box>
    );
}
