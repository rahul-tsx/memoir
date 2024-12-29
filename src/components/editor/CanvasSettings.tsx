import { useCanvasStore } from '@/store/canvasStore';
import { Label } from '@radix-ui/react-label';
import { FC, useEffect } from 'react';
import { Input } from '../ui/input';

interface CanvasSettingsProps {}

const CanvasSettings: FC<CanvasSettingsProps> = ({}) => {
	const {
		canvas,
		canvasHeight,
		canvasWidth,
		backgroundColor,
		setBackgroundColor,
		setCanvasHeight,
		setCanvasWidth,
	} = useCanvasStore();
	useEffect(() => {
		if (canvas) {
			canvas.setDimensions({
				width: canvasWidth * 0.8,
				height: canvasHeight * 0.8,
			});
			canvas.backgroundColor = backgroundColor;
		}
	}, [canvasHeight, canvasWidth, backgroundColor]);

	const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const intValue = parseInt(value, 10);

		if (intValue >= 0) {
			setCanvasHeight(intValue);
		}
	};
	const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const intValue = parseInt(value, 10);
		if (intValue >= 0) {
			setCanvasWidth(intValue);
		}
	};
	const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setBackgroundColor(value);
	};
	return (
		<div>
			{' '}
			<div className='my-6 flex flex-col gap-5'>
				<Label>Canvas Height</Label>
				<Input
					type='text'
					value={canvasHeight}
					onChange={handleHeightChange}
				/>
				<Label>Canvas Width</Label>
				<Input
					type='text'
					value={canvasWidth}
					onChange={handleWidthChange}
				/>
				<Label>Canvas Color</Label>
				<input
					type='color'
					value={backgroundColor}
					onChange={handleColorChange}
				/>
			</div>
		</div>
	);
};

export default CanvasSettings;
