"use client";

import { useState } from "react";
import { Box, Flex, Image, Button, IconButton, VStack, Link } from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <Flex as="nav" align="center" justify="space-between" p="1rem" bg="rgba(0, 0, 0, 0.7)" color="white" position="fixed" w="100%" zIndex="1000">
            <Image src="/images/logo.png" alt="AgroSense Logo" h="40px" onClick={() => router.push("/")} cursor="pointer" />
            <IconButton icon={isOpen ? <FaTimes /> : <FaBars />} onClick={toggleMenu} aria-label="Toggle Navigation" display={{ base: "block", md: "none" }} />
            <Flex display={{ base: isOpen ? "block" : "none", md: "flex" }} flexDirection={{ base: "column", md: "row" }} align="center">
                <Link mx="2" onClick={() => router.push("/")}>Inicio</Link>
                <Button colorScheme="teal" size="sm" mx="2" onClick={() => router.push("/login")}>Iniciar Sesión</Button>
            </Flex>
        </Flex>
    );
}
