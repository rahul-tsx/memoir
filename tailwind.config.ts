import type { Config } from 'tailwindcss';

export default {
	darkMode: ['selector'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				app_bg_primary: 'var(--bg-primary)',
				app_bg_secondary: 'var(--bg-secondary)',
				app_bg_dark: 'var(--bg-dark)',
				app_text_primary: 'var(--text-primary)',
				app_text_secondary: 'var(--text-secondary)',
				app_text_muted: 'var(--text-muted)',
				app_text_hover: 'var(--text-hover)',
				app_text_light: 'var(--text-light)',
				app_btn_primary_bg: 'var(--btn-primary-bg)',
				app_btn_primary_hover_bg: 'var(--btn-primary-hover-bg)',
				app_btn_secondary_bg: 'var(--btn-secondary-bg)',
				app_btn_secondary_hover_bg: 'var(--btn-secondary-hover-bg)',
				app_border_color: 'var(--border-color)',
				app_card_primary_bg: 'var(--card-bg)',
				app_card_primaryshadow: 'var(--card-shadow)',
				app_card_primaryborder: 'var(--card-border)',

				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;
