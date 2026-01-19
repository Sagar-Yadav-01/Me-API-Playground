'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="p-2 w-10 h-10" />;

    const isDark = resolvedTheme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 90, scale: isDark ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'backOut' }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
                <Moon size={20} />
            </motion.div>
            <motion.div
                initial={false}
                animate={{ rotate: isDark ? -90 : 0, scale: isDark ? 0 : 1 }}
                transition={{ duration: 0.3, ease: 'backOut' }}
                className="flex items-center justify-center"
            >
                <Sun size={20} />
            </motion.div>
        </button>
    );
}
