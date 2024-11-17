// src/app/layout.js
"use client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/styles/theme";
import "@/app/globals.css";

export const metadata = {
    title: "AgroSense",
    description: "Soluciones innovadoras para la agricultura",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
        <body>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </body>
        </html>
    );
}
