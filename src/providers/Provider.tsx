'use client';
import { FC } from 'react';
// import { ModalProvider } from '@/components/ui/custom/animated-modal';

import { ThemeProvider } from './ThemeProvider';
import ToastProvider from './ToastProvider';

interface ProviderProps {
	children: React.ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }) => {
	return (
		<>
			<ToastProvider>
				<ThemeProvider
					attribute='class'
					defaultTheme='dark'
					enableSystem
					storageKey='theme'
					disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</ToastProvider>
		</>
	);
};

export default Provider;
