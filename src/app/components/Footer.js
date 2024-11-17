"use client";

import { Box, Text, Link, Flex } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Box bg="gray.900" color="white" py="4">
            <Flex justify="center" align="center" direction="column">
                <Text>&copy; 2024 AgroSense. Todos los derechos reservados.</Text>
                <Link href="/privacy" color="teal.300" mt="2">Política de Privacidad</Link>
            </Flex>
        </Box>
    );
}
