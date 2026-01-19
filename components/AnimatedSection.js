'use client';

import { motion } from 'framer-motion';

export default function AnimatedSection({ children, delay = 0, direction = 'up' }) {
    const directions = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { y: 0, x: 40 },
        right: { y: 0, x: -40 },
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: directions[direction].y,
                x: directions[direction].x
            }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
        >
            {children}
        </motion.div>
    );
}
