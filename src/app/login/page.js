"use client";

import { useState, useEffect } from "react";
import { Box, VStack, Heading, Input, Button, FormControl, FormLabel, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast();
    const router = useRouter();

    // Función para manejar el inicio de sesión
    const handleLogin = (emailInput, passwordInput) => {
        if (emailInput === "jmancaste@gmail.com" && passwordInput === "24dejunio") {
            toast({ title: "Bienvenido", description: "Inicio de sesión exitoso", status: "success", duration: 3000 });
            router.push("/dashboard");
        } else {
            toast({ title: "Error", description: "Correo o contraseña incorrectos", status: "error", duration: 3000 });
        }
    };

    // useEffect para iniciar sesión automáticamente al cargar la página
    useEffect(() => {
        const autoLogin = () => {
            const predefinedEmail = "jmancaste@gmail.com";
            const predefinedPassword = "24dejunio";
            setEmail(predefinedEmail);
            setPassword(predefinedPassword);
            handleLogin(predefinedEmail, predefinedPassword);
        };

        autoLogin();
    }, []);

    return (
        <>
            <Navbar />
            <Box minH="100vh" display="flex" justifyContent="center" alignItems="center" bg="url('/images/agriculture-bg.jpg')" bgSize="cover">
                <VStack spacing={6} bg="rgba(0, 0, 0, 0.8)" p={8} rounded="lg" shadow="lg" w={{ base: "90%", md: "400px" }}>
                    <Heading color="white">Iniciar Sesión</Heading>
                    <FormControl>
                        <FormLabel color="white">Correo Electrónico</FormLabel>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} bg="white" />
                    </FormControl>
                    <FormControl>
                        <FormLabel color="white">Contraseña</FormLabel>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} bg="white" />
                    </FormControl>
                    <Button colorScheme="teal" width="full" onClick={() => handleLogin(email, password)}>Iniciar Sesión</Button>
                </VStack>
            </Box>
            <Footer />
        </>
    );
}
