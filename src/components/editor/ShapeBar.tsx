import { useCanvasStore } from '@/store/canvasStore';
import { Label } from '@radix-ui/react-label';
import { Circle, Rect, Triangle } from 'fabric';
import { FC } from 'react';
import { frameObject } from './CropperMenu';
import {
	CgShapeCircle,
	CgShapeSquare,
	CgShapeTriangle,
	CgSquare,
} from 'react-icons/cg';

interface ShapeBarProps {}

const ShapeBar: FC<ShapeBarProps> = ({}) => {
	const {
		canvas,
		color,
		width,
		setWidth,
		height,
		setHeight,
		diameter,
		setDiameter,
		setColor,
		selectedObject,
		frames,
	} = useCanvasStore();
	const addShape = (shape: string) => {
		if (canvas) {
			let newShape;
			switch (shape) {
				case 'rectangle':
					newShape = new Rect({
						width: 100,
						height: 60,
						fill: color as string,
						left: 100,
						top: 100,
					});
					break;
				case 'circle':
					newShape = new Circle({
						radius: 50,
						fill: color as string,
						left: 150,
						top: 150,
					});
					break;
				case 'triangle':
					newShape = new Triangle({
						width: 100,
						height: 100,
						fill: color as string,
						left: 200,
						top: 200,
					});
					break;
			}
			if (newShape) {
				canvas.add(newShape);
				canvas.renderAll();
			}
		}
	};
	const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/,/g, '');
		const intValue = parseInt(value, 10);
		setWidth(intValue);
		if (
			selectedObject &&
			(selectedObject.type === 'rect' || selectedObject.type === 'triangle') &&
			intValue >= 0
		) {
			selectedObject.set({ width: intValue / selectedObject.scaleX });
			canvas?.renderAll();
		}
	};
	const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/,/g, '');
		const intValue = parseInt(value, 10);
		setHeight(intValue);
		if (
			selectedObject &&
			(selectedObject.type === 'rect' || selectedObject.type === 'triangle') &&
			intValue >= 0
		) {
			selectedObject.set({ height: intValue / selectedObject.scaleY });
			canvas?.renderAll();
		}
	};
	const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/,/g, '');
		const intValue = parseInt(value, 10);
		setDiameter(intValue);
		if (selectedObject && selectedObject.type === 'circle' && intValue >= 0) {
			selectedObject.set({ radius: intValue / 2 / selectedObject.scaleX });
			canvas?.renderAll();
		}
	};
	const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setColor(value);
		if (selectedObject) {
			selectedObject.set({ fill: value });

			canvas?.renderAll();
		}
	};
	return (
		<>
			<div className='mb-6'>
				<Label>Shape Bar</Label>
				{selectedObject &&
					selectedObject.type !== 'i-text' &&
					!frames!.includes(selectedObject as frameObject) && (
						<div>
							<div className='mb-6 flex space-x-5 items-center'>
								<Label>Color</Label>
								<input
									type='color'
									value={color as string}
									onChange={handleColorChange}
								/>
							</div>
							{((!frames!.includes(selectedObject as frameObject) &&
								selectedObject.type === 'rect') ||
								selectedObject.type === 'triangle') && (
								<>
									<div className='mb-6 flex space-x-5 items-center'>
										<Label>Shape Width</Label>
										<input
											type='text'
											value={width}
											onChange={handleWidthChange}
										/>
									</div>
									<div className='mb-6 flex space-x-5 items-center'>
										<Label>Shape Height</Label>
										<input
											type='text'
											value={height}
											onChange={handleHeightChange}
										/>
									</div>
								</>
							)}
							{selectedObject.type === 'circle' && (
								<div className='mb-6 flex space-x-5 items-center'>
									<Label>Shape Diameter</Label>
									<input
										type='text'
										value={diameter}
										onChange={handleDiameterChange}
									/>
								</div>
							)}
						</div>
					)}
				<div className='flex gap-2 my-5'>
					<button
						onClick={() => addShape('rectangle')}
						className='hover:bg-app_card_primary_bg bg-app_card_primaryshadow p-2 rounded-lg shadow-xl'>
						<CgShapeSquare size={25} />
					</button>
					<button
						onClick={() => addShape('circle')}
						className='hover:bg-app_card_primary_bg bg-app_card_primaryshadow p-2 rounded-lg shadow-xl'>
						<CgShapeCircle size={25} />
					</button>
					<button
						onClick={() => addShape('triangle')}
						className='hover:bg-app_card_primary_bg bg-app_card_primaryshadow p-2 rounded-lg shadow-xl'>
						<CgShapeTriangle size={25} />
					</button>
				</div>
			</div>
		</>
	);
};

export default ShapeBar;
