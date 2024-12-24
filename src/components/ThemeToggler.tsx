'use client';

import * as React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export function ModeToggle() {
	const { setTheme, theme } = useTheme();

	const toggleTheme = () => {
		if (theme === 'dark') {
			setTheme('light');
		} else {
			setTheme('dark');
		}
	};

	return (
		<motion.button
			whileTap={{ scale: 0.95 }}
			onClick={toggleTheme}
			className='p-2 rounded-full bg-app_bg_secondary text-app_text_secondary'>
			{theme === 'light' ? <FaSun size={20} /> : <FaMoon size={20} />}
			<span className='sr-only'>Toggle theme</span>
		</motion.button>
	);
}
