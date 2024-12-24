'use client';
import StatusContext from '@/context/statusContext';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { FC, useEffect, useState } from 'react';
import { statusObj, variantTypes } from '@/types/utilityTypes';
import { CgClose } from 'react-icons/cg';
interface ToastProviderProps {
	children: React.ReactNode;
}

const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
	const [status, setStatus] = useState<statusObj | null>(null);
	const changeStatus = (message: string, variant: variantTypes = 'default') => {
		setStatus({ msg: message, variant });
	};
	useEffect(() => {
		if (status) {
			switch (status.variant) {
				case 'success':
					toast.success(status.msg, {
						cancel: {
							label: <CgClose size={10} />,
							onClick: () => {},
						},

						style: {
							backgroundColor: 'black',
							color: '#4caf50',
						},
					});
					break;

				case 'error':
					toast.error(status.msg, {
						cancel: {
							label: <CgClose size={10} />,
							onClick: () => {},
						},
						style: {
							backgroundColor: 'black',
							color: '#f44336',
						},
					});
					break;
				case 'warning':
					toast.error(status.msg, {
						cancel: {
							label: <CgClose size={10} />,
							onClick: () => {},
						},
						style: {
							backgroundColor: 'black',
							color: 'orange',
						},
					});
					break;

				default:
					toast(status.msg, {
						cancel: {
							label: <CgClose size={10} />,
							onClick: () => {},
						},
						style: {
							backgroundColor: 'black',
							color: 'white',
						},
					});
					break;
			}

			const timeout = setTimeout(() => {
				setStatus(null);
			}, 2000);

			return () => clearTimeout(timeout);
		}
	}, [status, setStatus]);
	return (
		<>
			<StatusContext.Provider value={{ status, changeStatus }}>
				{children}
				<Toaster />
			</StatusContext.Provider>
		</>
	);
};

export default ToastProvider;
