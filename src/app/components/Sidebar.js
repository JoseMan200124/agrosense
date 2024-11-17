"use client";

import { useState } from "react";
import { Box, VStack, IconButton, Flex, Text } from "@chakra-ui/react";
import { FaBars, FaTimes, FaHome, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Botón de Menú */}
            <IconButton
                icon={isOpen ? <FaTimes /> : <FaBars />}
                aria-label="Toggle Sidebar"
                position="fixed"
                top="1rem"
                left="0"
                zIndex="1001"
                onClick={toggleSidebar}
                display={{ base: "block", md: "none" }}
                bg="teal.500"
                color="white"
                _hover={{ bg: "teal.600" }}
            />

            {/* Sidebar */}
            <Box
                as="nav"
                bg="gray.800"
                color="white"
                h="100vh"
                p={4}
                w={{ base: isOpen ? "100%" : "0", md: "200px" }}
                position="fixed"
                top="0"
                left="0"
                transition="width 0.3s ease-in-out"
                zIndex="1000"
                overflow="hidden"
            >
                <VStack
                    align="flex-start"
                    spacing={4}
                    display={{ base: isOpen ? "flex" : "none", md: "flex" }}
                    width="100%"
                >
                    <Flex
                        align="center"
                        p={3}
                        w="full"
                        bg="teal.600"
                        rounded="md"
                        cursor="pointer"
                        onClick={() => router.push("/")}
                    >
                        <FaHome /> <Text ml={2}>Inicio</Text>
                    </Flex>
                    <Flex
                        align="center"
                        p={3}
                        w="full"
                        bg="blue.600"
                        rounded="md"
                        cursor="pointer"
                        onClick={() => router.push("/dashboard")}
                    >
                        <FaChartBar /> <Text ml={2}>Dashboard</Text>
                    </Flex>
                    <Flex
                        align="center"
                        p={3}
                        w="full"
                        bg="red.600"
                        rounded="md"
                        cursor="pointer"
                        onClick={() => router.push("/login")}
                    >
                        <FaSignOutAlt /> <Text ml={2}>Cerrar Sesión</Text>
                    </Flex>
                </VStack>
            </Box>
        </>
    );
}
