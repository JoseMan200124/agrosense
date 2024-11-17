"use client";

import { Box, Heading, Text, Button, VStack, HStack, Image, SimpleGrid, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BarChart from "@/app/components/BarChart";
import LineChart from "@/app/components/LineChart";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { FaTractor, FaChartLine, FaRobot, FaLeaf } from "react-icons/fa";

const MotionBox = motion(Box);

const Counter = ({ end, label }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 3000;
        const step = Math.ceil(end / (duration / 16));

        const counter = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(counter);
            } else {
                setCount(start);
            }
        }, 16);

        return () => clearInterval(counter);
    }, [end]);

    return (
        <VStack>
            <Heading size={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" color="white">
                {count}
            </Heading>
            <Text color="white" fontSize={{ base: "md", md: "lg" }}>{label}</Text>
        </VStack>
    );
};

export default function Home() {
    return (
        <>
            <Navbar />
            <Box as="main" w="100vw" minH="100vh" overflowY="auto">
                {/* Hero Section con Overlay */}
                <MotionBox
                    position="relative"
                    w="full"
                    h="100vh"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    bgImage="url('/images/hero-bg.jpg')"
                    bgSize="cover"
                    bgPos="center"
                >
                    {/* Overlay */}
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="rgba(0, 0, 0, 0.65)"
                        zIndex={1}
                    />

                    {/* Contenido del Hero */}
                    <VStack spacing={4} zIndex={2}>
                        <Image src="/images/logo.png" alt="AgroSense Logo" width={{ base: "120px", md: "150px" }} mb={4} />
                        <Text color="white" fontSize={{ base: "lg", md: "2xl" }} textAlign="center" mb={6}>
                            Tecnología de vanguardia para agricultores empoderados
                        </Text>
                        <Button size={{ base: "md", md: "lg" }} colorScheme="green" mb={6}>
                            Aprende Más
                        </Button>

                        {/* Contadores Animados */}
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={10}>
                            <Counter end={5000} label="Agricultores usando AgroSense" />
                            <Counter end={1200} label="Viveros Satisfechos" />
                            <Counter end={300} label="Proyectos Completados" />
                        </SimpleGrid>
                    </VStack>
                </MotionBox>

                {/* Sección Ventajas */}
                <VStack spacing={8} align="center" py={10} px={4}>
                    <Heading as="h2" size={{ base: "lg", md: "xl" }} textAlign="center">
                        Ventajas de AgroSense
                    </Heading>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
                        {[
                            { icon: FaTractor, title: "Agricultura de Precisión", description: "Monitorea y controla tus campos con precisión." },
                            { icon: FaChartLine, title: "Análisis de Datos", description: "Decisiones informadas basadas en datos." },
                            { icon: FaRobot, title: "Automatización", description: "Ahorra tiempo con flujos de trabajo automatizados." },
                            { icon: FaLeaf, title: "Sostenibilidad", description: "Prácticas amigables con el medio ambiente." },
                        ].map((item, index) => (
                            <MotionBox
                                key={index}
                                bg="green.600"
                                color="white"
                                p={6}
                                rounded="lg"
                                shadow="lg"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                textAlign="center"
                                initial={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <item.icon size={50} mb={4} />
                                <Heading size="md">{item.title}</Heading>
                                <Text>{item.description}</Text>
                            </MotionBox>
                        ))}
                    </SimpleGrid>
                </VStack>

                {/* Sección Gráficas */}
                <VStack spacing={8} align="center" py={10}>
                    <Heading as="h2" size={{ base: "lg", md: "xl" }}>
                        Impacto de AgroSense
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="90%">
                        <BarChart />
                        <LineChart />
                    </SimpleGrid>
                </VStack>
            </Box>
            <Footer />
        </>
    );
}
