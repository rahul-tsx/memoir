'use cleint';
import {
	Canvas,
	FabricText,
	ObjectEvents,
	SerializedTextProps,
	TextProps,
} from 'fabric';
import { FC, useRef } from 'react';
import CanvasComponent from './Canvas';
import { FaTrash } from 'react-icons/fa';

interface CanvasContainerProps {
	canvasWidth: number;
	canvasHeight: number;
	rectColor: string;
	text: string;
	fontSize: number;
	textColor: string;
	isBold: boolean;
	isItalic: boolean;
	backgroundColor: string;
	onCanvasUpdate?: (canvas: Canvas) => void;
	textObjects?: {
		[key: string]: FabricText<
			Partial<TextProps>,
			SerializedTextProps,
			ObjectEvents
		>;
	};
	setTextObjects: React.Dispatch<
		React.SetStateAction<{
			[key: string]: FabricText<
				Partial<TextProps>,
				SerializedTextProps,
				ObjectEvents
			>;
		}>
	>;
}

const CanvasContainer: FC<CanvasContainerProps> = ({
	canvasHeight,
	canvasWidth,
	fontSize,
	isBold,
	isItalic,
	backgroundColor,
	rectColor,
	text,
	textObjects,
	textColor,
	setTextObjects,
	onCanvasUpdate,
}) => {
	const deleteButtonRef = useRef<HTMLButtonElement | null>(null);

	// Handle delete button click in parent component
	const handleDelete = () => {
		// Trigger the click event on the button inside the child component
		if (deleteButtonRef.current) {
			deleteButtonRef.current.click(); // This will trigger the button's onClick in CanvasComponent
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

			<CanvasComponent
				canvasHeight={canvasHeight}
				canvasWidth={canvasWidth}
				fontSize={fontSize}
				isBold={isBold}
				isItalic={isItalic}
				text={text}
				rectColor={rectColor}
				textColor={textColor}
				onCanvasUpdate={onCanvasUpdate}
				textObjects={textObjects}
				backgroundColor={backgroundColor}
				deleteComponent={deleteButtonRef}
				setTextObjects={setTextObjects}
			/>
		</div>
	);
};

export default CanvasContainer;
