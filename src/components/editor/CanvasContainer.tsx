'use cleint';
import { FC, useRef } from 'react';
import CanvasComponent from './Canvas';
import { FaTrash } from 'react-icons/fa';

interface CanvasContainerProps {}

const CanvasContainer: FC<CanvasContainerProps> = ({}) => {
	const deleteButtonRef = useRef<HTMLButtonElement | null>(null);

	const handleDelete = () => {
		if (deleteButtonRef.current) {
			deleteButtonRef.current.click();
		}
	};
	return (
		<div className='flex justify-center my-10 flex-col items-center'>
			<div className='w-full flex justify-end px-10'>
				<FaTrash
					size={25}
					color='red'
					className='my-5'
					onClick={handleDelete}
				/>
			</div>

			<CanvasComponent deleteComponent={deleteButtonRef} />
		</div>
	);
};

export default CanvasContainer;
