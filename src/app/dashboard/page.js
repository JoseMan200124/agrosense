// /app/dashboard/page.jsx
"use client";

import {
    Box,
    VStack,
    Heading,
    SimpleGrid,
    HStack,
    Icon,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    Card,
    Button,
    Divider,
    Input,
    Flex,
    Avatar,
    useColorModeValue,
    Tooltip,
} from "@chakra-ui/react";
import {
    FaTemperatureHigh,
    FaCloudRain,
    FaWind,
    FaTint,
    FaSun,
    FaSeedling,
    FaBug,
    FaComments,
    FaPaperPlane,
    FaTimes,
    FaCommentsDollar,
} from "react-icons/fa";
import Sidebar from "@/app/components/Sidebar";
import Filter from "@/app/components/Filter";
import dynamic from 'next/dynamic';
import { useState, useEffect, useRef, useMemo } from "react";

// Importar los componentes de gráficos de manera dinámica con SSR deshabilitado
const CustomBarChart = dynamic(() => import('@/app/components/BarChart'), { ssr: false });
const CustomLineChart = dynamic(() => import('@/app/components/LineChart'), { ssr: false });
const CustomPieChart = dynamic(() => import('@/app/components/CustomPieChart'), { ssr: false });
const CustomAreaChart = dynamic(() => import('@/app/components/CustomAreaChart'), { ssr: false });

export default function Dashboard() {
    const [showDiscussion, setShowDiscussion] = useState(true);
    const [tempMax, setTempMax] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [rainProb, setRainProb] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [uvIndex, setUvIndex] = useState(0);
    const [soilLevel, setSoilLevel] = useState(0);
    const [pestStatus, setPestStatus] = useState("Despejado");
    const [messages, setMessages] = useState([
        { user: "Juan", text: "Lluvia intensa mañana.", avatar: "J" },
        { user: "María", text: "Humedad alta.", avatar: "M" },
        { user: "Carlos", text: "Temperatura en aumento.", avatar: "C" },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [aiMessageAdded, setAiMessageAdded] = useState(false); // Nueva variable para controlar IA message

    const messagesEndRef = useRef(null);

    // Datos simulados por mes para filtrar
    const allData = {
        Enero: {
            indicators: { tempMax: 30, humidity: 80, rainProb: 50, windSpeed: 15, uvIndex: 6, soilLevel: 35, pestStatus: "Bajo" },
            barChart: [
                { name: 'Enero', recursos: 400 },
                { name: 'Febrero', recursos: 300 },
                { name: 'Marzo', recursos: 500 },
            ],
            lineChart: [
                { name: 'Lun', temperatura: 22 },
                { name: 'Mar', temperatura: 24 },
                { name: 'Mié', temperatura: 19 },
            ],
            pieChart: [
                { name: 'Agua', value: 400 },
                { name: 'Fertilizantes', value: 300 },
                { name: 'Pesticidas', value: 300 },
                { name: 'Electricidad', value: 200 },
            ],
            areaChart: [
                { name: 'Lun', humedad: 65 },
                { name: 'Mar', humedad: 59 },
                { name: 'Mié', humedad: 80 },
            ],
        },
        Febrero: {
            indicators: { tempMax: 28, humidity: 75, rainProb: 60, windSpeed: 18, uvIndex: 5, soilLevel: 40, pestStatus: "Moderado" },
            barChart: [
                { name: 'Enero', recursos: 350 },
                { name: 'Febrero', recursos: 320 },
                { name: 'Marzo', recursos: 450 },
            ],
            lineChart: [
                { name: 'Jue', temperatura: 23 },
                { name: 'Vie', temperatura: 25 },
                { name: 'Sáb', temperatura: 20 },
            ],
            pieChart: [
                { name: 'Agua', value: 380 },
                { name: 'Fertilizantes', value: 310 },
                { name: 'Pesticidas', value: 290 },
                { name: 'Electricidad', value: 220 },
            ],
            areaChart: [
                { name: 'Jue', humedad: 70 },
                { name: 'Vie', humedad: 65 },
                { name: 'Sáb', humedad: 75 },
            ],
        },
        // Añade más meses según sea necesario
    };

    // Obtener datos filtrados usando useMemo
    const filteredData = useMemo(() => {
        return selectedMonth ? allData[selectedMonth] : {
            indicators: { tempMax: 35, humidity: 85, rainProb: 60, windSpeed: 20, uvIndex: 7, soilLevel: 40, pestStatus: "Moderado" },
            barChart: [
                { name: 'Enero', recursos: 400 },
                { name: 'Febrero', recursos: 300 },
                { name: 'Marzo', recursos: 500 },
                { name: 'Abril', recursos: 200 },
                { name: 'Mayo', recursos: 278 },
                { name: 'Junio', recursos: 189 },
            ],
            lineChart: [
                { name: 'Lun', temperatura: 22 },
                { name: 'Mar', temperatura: 24 },
                { name: 'Mié', temperatura: 19 },
                { name: 'Jue', temperatura: 23 },
                { name: 'Vie', temperatura: 25 },
                { name: 'Sáb', temperatura: 20 },
                { name: 'Dom', temperatura: 21 },
            ],
            pieChart: [
                { name: 'Agua', value: 400 },
                { name: 'Fertilizantes', value: 300 },
                { name: 'Pesticidas', value: 300 },
                { name: 'Electricidad', value: 200 },
            ],
            areaChart: [
                { name: 'Lun', humedad: 65 },
                { name: 'Mar', humedad: 59 },
                { name: 'Mié', humedad: 80 },
                { name: 'Jue', humedad: 81 },
                { name: 'Vie', humedad: 56 },
                { name: 'Sáb', humedad: 55 },
                { name: 'Dom', humedad: 40 },
            ],
        };
    }, [selectedMonth, allData]);

    // Definir colores fuera de los objetos
    const scrollbarThumbColor = useColorModeValue("#CBD5E0", "#4A5568");
    const cardBg = useColorModeValue("gray.700", "gray.800");
    const cardHoverBg = useColorModeValue("gray.600", "gray.700");
    const chatBg = useColorModeValue("white", "gray.800");
    const chatText = useColorModeValue("black", "white");

    useEffect(() => {
        const animateNumbers = () => {
            if (filteredData.indicators) {
                setTempMax(filteredData.indicators.tempMax);
                setHumidity(filteredData.indicators.humidity);
                setRainProb(filteredData.indicators.rainProb);
                setWindSpeed(filteredData.indicators.windSpeed);
                setUvIndex(filteredData.indicators.uvIndex);
                setSoilLevel(filteredData.indicators.soilLevel);
                setPestStatus(filteredData.indicators.pestStatus);
            }
        };
        animateNumbers();

        // Simular un comentario de IA después de 5 segundos, solo una vez
        if (!aiMessageAdded) {
            const aiMessageTimeout = setTimeout(() => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { user: "IA Predictiva", text: "Se espera un aumento del 10% en la humedad durante la próxima semana, considera ajustar el riego.", avatar: "IA" },
                ]);
                setAiMessageAdded(true); // Marcar que ya se agregó el mensaje
            }, 5000);

            return () => clearTimeout(aiMessageTimeout);
        }

    }, [filteredData, aiMessageAdded]);

    useEffect(() => {
        // Scroll to the latest message
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            setMessages([
                ...messages,
                { user: "Tú", text: newMessage, avatar: "T" },
            ]);
            setNewMessage("");
        }
    };

    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")} color="white" p={6} position="relative">
            <Sidebar />
            {/* Filtro en la esquina superior derecha */}
            <Filter selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />

            <VStack spacing={8} ml={{ base: "0", md: "220px" }} align="stretch">
                {/* Título */}
                <Heading textAlign="center" color={useColorModeValue("teal.600", "teal.300")}>
                    Dashboard de Indicadores Climáticos
                </Heading>

                {/* Indicadores Numéricos en la Parte Superior */}
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 6 }} spacing={6}>
                    <Tooltip label="Máxima temperatura registrada hoy" aria-label="Temperatura Máxima">
                        <Card
                            bg="teal.500"
                            color="white"
                            p={6}
                            rounded="lg"
                            shadow="md"
                            _hover={{ bg: cardHoverBg, transform: "scale(1.05)", transition: "0.3s" }}
                        >
                            <HStack>
                                <Icon as={FaTemperatureHigh} boxSize={6} />
                                <Stat>
                                    <StatLabel>Temp. Máx</StatLabel>
                                    <StatNumber>{tempMax}°C</StatNumber>
                                </Stat>
                            </HStack>
                        </Card>
                    </Tooltip>

                    <Tooltip label="Porcentaje de humedad relativa" aria-label="Humedad Relativa">
                        <Card
                            bg="blue.500"
                            color="white"
                            p={6}
                            rounded="lg"
                            shadow="md"
                            _hover={{ bg: cardHoverBg, transform: "scale(1.05)", transition: "0.3s" }}
                        >
                            <HStack>
                                <Icon as={FaTint} boxSize={6} />
                                <Stat>
                                    <StatLabel>Humedad</StatLabel>
                                    <StatNumber>{humidity}%</StatNumber>
                                </Stat>
                            </HStack>
                        </Card>
                    </Tooltip>

                    <Tooltip label="Probabilidad de lluvia hoy" aria-label="Probabilidad de Lluvia">
                        <Card
                            bg="orange.500"
                            color="white"
                            p={6}
                            rounded="lg"
                            shadow="md"
                            _hover={{ bg: cardHoverBg, transform: "scale(1.05)", transition: "0.3s" }}
                        >
                            <HStack>
                                <Icon as={FaCloudRain} boxSize={6} />
                                <Stat>
                                    <StatLabel>Lluvia</StatLabel>
                                    <StatNumber>{rainProb}%</StatNumber>
                                </Stat>
                            </HStack>
                        </Card>
                    </Tooltip>

                    <Tooltip label="Velocidad del viento actual" aria-label="Velocidad del Viento">
                        <Card
                            bg="green.500"
                            color="white"
                            p={6}
                            rounded="lg"
                            shadow="md"
                            _hover={{ bg: cardHoverBg, transform: "scale(1.05)", transition: "0.3s" }}
                        >
                            <HStack>
                                <Icon as={FaWind} boxSize={6} />
                                <Stat>
                                    <StatLabel>Viento</StatLabel>
                                    <StatNumber>{windSpeed} km/h</StatNumber>
                                </Stat>
                            </HStack>
                        </Card>
                    </Tooltip>

                    <Tooltip label="Índice UV actual" aria-label="Índice UV">
                        <Card
                            bg="yellow.400"
                            color="white"
                            p={6}
                            rounded="lg"
                            shadow="md"
                            _hover={{ bg: "yellow.500", transform: "scale(1.05)", transition: "0.3s" }}
                        >
                            <HStack>
                                <Icon as={FaSun} boxSize={6} />
                                <Stat>
                                    <StatLabel>Índice UV</StatLabel>
                                    <StatNumber>{uvIndex}</StatNumber>
                                </Stat>
                            </HStack>
                        </Card>
                    </Tooltip>

                    <Tooltip label="Nivel actual del suelo" aria-label="Nivel de Suelo">
                        <Card
                            bg="purple.500"
                            color="white"
                            p={6}
                            rounded="lg"
                            shadow="md"
                            _hover={{ bg: "purple.600", transform: "scale(1.05)", transition: "0.3s" }}
                        >
                            <HStack>
                                <Icon as={FaSeedling} boxSize={6} />
                                <Stat>
                                    <StatLabel>Suelo</StatLabel>
                                    <StatNumber>{soilLevel}%</StatNumber>
                                </Stat>
                            </HStack>
                        </Card>
                    </Tooltip>

                    <Tooltip label="Estado actual de plagas" aria-label="Estado de Plagas">
                        <Card
                            bg="red.500"
                            color="white"
                            p={6}
                            rounded="lg"
                            shadow="md"
                            _hover={{ bg: "red.600", transform: "scale(1.05)", transition: "0.3s" }}
                        >
                            <HStack>
                                <Icon as={FaBug} boxSize={6} />
                                <Stat>
                                    <StatLabel>Plagas</StatLabel>
                                    <StatNumber>{pestStatus}</StatNumber>
                                </Stat>
                            </HStack>
                        </Card>
                    </Tooltip>
                </SimpleGrid>

                {/* Mapas en Vivo */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {/* Mapa de Temperatura */}
                    <Card bg={cardBg} p={4} rounded="lg" shadow="md">
                        <Heading size="md" mb={4} color={useColorModeValue("teal.600", "teal.200")}>
                            Mapa de Temperatura
                        </Heading>
                        <iframe
                            src="https://embed.windy.com/embed2.html?overlay=temp&..." // Asegúrate de completar los parámetros necesarios
                            width="100%"
                            height="300"
                            frameBorder="0"
                            title="Mapa de Temperatura"
                            style={{ border: "none", borderRadius: "8px" }}
                        ></iframe>
                    </Card>

                    {/* Mapa de Viento */}
                    <Card bg={cardBg} p={4} rounded="lg" shadow="md">
                        <Heading size="md" mb={4} color={useColorModeValue("blue.600", "blue.200")}>
                            Mapa de Viento
                        </Heading>
                        <iframe
                            src="https://embed.windy.com/embed2.html?overlay=wind&..." // Asegúrate de completar los parámetros necesarios
                            width="100%"
                            height="300"
                            frameBorder="0"
                            title="Mapa de Viento"
                            style={{ border: "none", borderRadius: "8px" }}
                        ></iframe>
                    </Card>

                    {/* Mapa de Humedad */}
                    <Card bg={cardBg} p={4} rounded="lg" shadow="md">
                        <Heading size="md" mb={4} color={useColorModeValue("blue.600", "blue.200")}>
                            Mapa de Humedad
                        </Heading>
                        <iframe
                            src="https://embed.windy.com/embed2.html?overlay=rh&..." // Asegúrate de completar los parámetros necesarios
                            width="100%"
                            height="300"
                            frameBorder="0"
                            title="Mapa de Humedad"
                            style={{ border: "none", borderRadius: "8px" }}
                        ></iframe>
                    </Card>

                    {/* Mapa de Precipitación */}
                    <Card bg={cardBg} p={4} rounded="lg" shadow="md">
                        <Heading size="md" mb={4} color={useColorModeValue("orange.600", "orange.200")}>
                            Mapa de Precipitación
                        </Heading>
                        <iframe
                            src="https://embed.windy.com/embed2.html?overlay=rainAccu&..." // Asegúrate de completar los parámetros necesarios
                            width="100%"
                            height="300"
                            frameBorder="0"
                            title="Mapa de Precipitación"
                            style={{ border: "none", borderRadius: "8px" }}
                        ></iframe>
                    </Card>
                </SimpleGrid>

                {/* Gráficas */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <Card bg={cardBg} p={4} rounded="lg" shadow="md">
                        <Heading size="md" mb={4} color={useColorModeValue("teal.600", "teal.200")}>
                            Consumo de Recursos
                        </Heading>
                        <CustomBarChart filteredData={filteredData.barChart} />
                    </Card>
                    <Card bg={cardBg} p={4} rounded="lg" shadow="md">
                        <Heading size="md" mb={4} color={useColorModeValue("blue.600", "blue.200")}>
                            Tendencia de Temperatura
                        </Heading>
                        <CustomLineChart filteredData={filteredData.lineChart} />
                    </Card>
                </SimpleGrid>

                {/* Gráficos Adicionales */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <Card bg={cardBg} p={4} rounded="lg" shadow="md">
                        <Heading size="md" mb={4} color={useColorModeValue("yellow.600", "yellow.200")}>
                            Distribución de Recursos
                        </Heading>
                        <CustomPieChart filteredData={filteredData.pieChart} />
                    </Card>
                    <Card bg={cardBg} p={4} rounded="lg" shadow="md">
                        <Heading size="md" mb={4} color={useColorModeValue("purple.600", "purple.200")}>
                            Tendencia de Humedad
                        </Heading>
                        <CustomAreaChart filteredData={filteredData.areaChart} />
                    </Card>
                </SimpleGrid>

                {/* Panel de Discusión Mejorado con Burbuja de Reapertura */}
                {/* Burbuja para abrir el chat */}
                {!showDiscussion && (
                    <Button
                        position="fixed"
                        bottom="20px"
                        right="20px"
                        colorScheme="teal"
                        borderRadius="full"
                        size="lg"
                        leftIcon={<FaCommentsDollar />}
                        onClick={() => setShowDiscussion(true)}
                        boxShadow="lg"
                    >
                        Abrir Chat
                    </Button>
                )}

                {/* Panel de Chat */}
                {showDiscussion && (
                    <Box
                        position="fixed"
                        bottom="20px"
                        right="20px"
                        bg={chatBg}
                        color={chatText}
                        p={4}
                        rounded="lg"
                        shadow="lg"
                        width={{ base: "90%", md: "350px" }}
                        maxH="400px"
                        overflow="hidden"
                        zIndex="1000"
                    >
                        <Flex justify="space-between" align="center" mb={2}>
                            <HStack>
                                <Icon as={FaComments} />
                                <Heading size="md">Chat Agricultores</Heading>
                            </HStack>
                            <Button size="sm" onClick={() => setShowDiscussion(false)} leftIcon={<FaTimes />}>
                                Cerrar
                            </Button>
                        </Flex>
                        <Divider />
                        <Box
                            mt={2}
                            mb={2}
                            maxH="250px"
                            overflowY="auto"
                            pr={2}
                            css={{
                                "&::-webkit-scrollbar": {
                                    width: "4px",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    background: scrollbarThumbColor,
                                    borderRadius: "24px",
                                },
                            }}
                        >
                            {messages.map((msg, index) => (
                                <HStack key={index} align="start" mb={3}>
                                    <Avatar size="sm" name={msg.user} src="" bg="teal.500">
                                        {msg.avatar}
                                    </Avatar>
                                    <Box bg={useColorModeValue("gray.200", "gray.700")} p={2} rounded="md" w="100%">
                                        <Text fontWeight="bold">{msg.user}</Text>
                                        <Text>{msg.text}</Text>
                                    </Box>
                                </HStack>
                            ))}
                            <div ref={messagesEndRef} />
                        </Box>
                        <HStack mt={2}>
                            <Input
                                placeholder="Escribe un mensaje..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                bg={useColorModeValue("gray.100", "gray.600")}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSendMessage();
                                }}
                            />
                            <Button
                                colorScheme="teal"
                                onClick={handleSendMessage}
                                leftIcon={<FaPaperPlane />}
                            >
                                Enviar
                            </Button>
                        </HStack>
                    </Box>
                )}
            </VStack>
        </Box>
    );
}
