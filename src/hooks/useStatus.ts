import { useContext } from 'react';
import StatusContext from '../context/statusContext';

const useStatus = () => {
	const context = useContext(StatusContext);

	if (!context) {
		throw new Error('useStatus must be used within a StatusProvider');
	}
	const { changeStatus } = context;
	return changeStatus;
};

export default useStatus;
