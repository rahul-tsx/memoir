import {
	Dispatch,
	FC,
	RefObject,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { saveAs } from 'file-saver';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { useCanvasStore } from '@/store/canvasStore';

import {
	Circle,
	FabricImage,
	FabricObject,
	FabricText,
	IText,
	Rect,
	Triangle,
} from 'fabric';
import ShapeBar from './ShapeBar';
import Textbar from './Textbar';

interface ToolbarProps {
	containerRef: RefObject<HTMLDivElement | null>;
}

const Toolbar: FC<ToolbarProps> = ({ containerRef }) => {
	const {
		text,
		setText,
		setCanvasHeight,
		setCanvasWidth,
		canvas,
		backgroundColor,
		fontSize,
		setFontSize,
		toggleBold,
		toggleItalic,
		fontStyle,
		textColor,
		setTextColor,
		isBold,
		isItalic,
		setTextObjects,
		color,
		width,
		height,
		fontFamily,
		setFontFamily,
		diameter,
		setColor,
		selectedObject,
		setSelectedObject,
		fontWeight,
		setFontStyle,
		setFontWeight,
		setWidth,
		setHeight,
		setDiameter,
		setBackgroundColor,
	} = useCanvasStore();
	useEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				const containerWidth = containerRef.current.offsetWidth;
				const containerHeight = window.innerHeight;
				setCanvasWidth(containerWidth);
				setCanvasHeight(containerHeight);
			}
		};

		const resizeObserver = new ResizeObserver(handleResize);
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		handleResize();
		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	useEffect(() => {
		if (canvas) {
			canvas.on('selection:created', (event) => {
				handleObjectSelection(event.selected[0]);
			});
			canvas.on('selection:updated', (event) => {
				handleObjectSelection(event.selected[0]);
			});
			canvas.on('selection:cleared', (event) => {
				setSelectedObject(null);
				clearSettings();
			});
			canvas.on('object:modified', (event) => {
				handleObjectSelection(event.target);
			});
			canvas.on('object:scaling', (event) => {
				handleObjectSelection(event.target);
			});
		}
	}, [canvas]);
	const clearSettings = () => {
		setWidth(0);
		setHeight(0);
		setDiameter(0);
		setColor('#000000');
	};

	const handleObjectSelection = (object: FabricObject) => {
		if (!object) return;
		setSelectedObject(object);

		if (object.type === 'rect') {
			setWidth(Math.round(object.width * object.scaleX));
			setHeight(Math.round(object.height * object.scaleY));
			setColor(object.fill);
			setDiameter(0);
		} else if (object.type === 'circle') {
			setDiameter(Math.round((object as Circle).radius * 2 * object.scaleX));
			setColor(object.fill);
			setWidth(0);
			setHeight(0);
		} else if (object.type === 'triangle') {
			setWidth(Math.round(object.width * object.scaleX));
			setHeight(Math.round(object.height * object.scaleY));
			setColor(object.fill);
			setDiameter(0);
		} else if (object.type === 'i-text' || object.type === 'text') {
			setText((object as IText).text);
			setFontSize((object as IText).fontSize);
			setTextColor((object as IText).fill);
			setFontStyle((object as IText).fontStyle);
			setFontWeight((object as IText).fontWeight);
		}
	};


	// Add Image to Canvas
	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && canvas) {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				const img = new Image();
				img.onload = () => {
					const fabricImage = new FabricImage(img, {
						left: 100,
						top: 100,
						scaleX: 0.5,
						scaleY: 0.5,
					});
					canvas.add(fabricImage);
					canvas.renderAll();
				};
				img.src = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		}
	};

	// Add Shapes to Canvas

	// Download the Canvas as an Image
	const downloadCard = () => {
		if (canvas) {
			const dataURL = canvas.toDataURL({
				format: 'png',
				quality: 1,
				multiplier: 1,
			});
			saveAs(dataURL, 'greeting-card.png');
		}
	};

	return (
		<div className='w-1/4 p-6 bg-app_bg_secondary h-full overflow-y-auto no-scrollbar'>
			<h1 className='text-3xl font-bold mb-6'>Card Editor</h1>
			{/* Text Input */}
			<Textbar />

			<div className='mb-6 flex space-x-5 items-center'>
				<Label>Background Color</Label>
				<input
					type='color'
					value={backgroundColor}
					onChange={(color) => setBackgroundColor(color.target.value)}
				/>
			</div>
			{/* Add Shape Options */}
			<ShapeBar />
			{/* Image Upload */}
			<div className='mb-6'>
				<Label>Add Image</Label>
				<Input
					type='file'
					accept='image/*'
					onChange={handleImageUpload}
				/>
			</div>
			{/* Download Button */}
			<button
				onClick={downloadCard}
				className='primaryButton w-full'>
				Download Card
			</button>
		</div>
	);
};

export default Toolbar;
