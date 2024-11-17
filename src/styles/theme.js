// src/styles/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        green: {
            500: "#28a745",
            700: "#1c7430",
        },
    },
    fonts: {
        heading: "Arial, sans-serif",
        body: "Arial, sans-serif",
    },
});

export default theme;
