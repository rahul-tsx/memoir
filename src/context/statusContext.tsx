'use client';
import { statusObj, variantTypes } from '@/types/utilityTypes';
import { createContext } from 'react';

interface StatusContextType {
	status: statusObj | null;
	changeStatus: (message: string, variant?: variantTypes) => void;
	isCopy?: boolean;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export default StatusContext;
