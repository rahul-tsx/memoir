import { createContext } from 'react';

export interface TimestampContextType {
	timestamp: number;
	setTimestamp: (newTimestamp: number) => void;
}

const TimestampContext = createContext<TimestampContextType | undefined>(
	undefined
);

export default TimestampContext;
