"use client";

import { Stat, StatLabel, StatNumber, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function IndicadorAnimado({ label, value, icon }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(value);
        const duration = 2000;
        const increment = end / (duration / 16);

        const animate = () => {
            start += increment;
            if (start >= end) {
                setCount(end);
            } else {
                setCount(Math.floor(start));
                requestAnimationFrame(animate);
            }
        };

        animate();
    }, [value]);

    return (
        <Stat>
            <Icon as={icon} boxSize={6} color="white" />
            <StatLabel>{label}</StatLabel>
            <StatNumber fontSize="2xl">{count}</StatNumber>
        </Stat>
    );
}
