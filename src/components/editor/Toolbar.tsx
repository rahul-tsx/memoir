import { Dispatch, FC, RefObject, SetStateAction, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { useCanvasStore } from '@/store/canvasStore';
import { Circle, FabricImage, FabricText, Rect, Triangle } from 'fabric';

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
		textColor,
		setFontSize,
		toggleBold,
		toggleItalic,
		fontStyle,
		isBold,
		isItalic,
		setTextObjects,
		shapeColor,
		setShapeColor,
		setBackgroundColor,
		setTextColor,
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

	const addText = () => {
		if (canvas) {
			const id = new Date().getTime().toString();
			const fabricText = new FabricText(text, {
				left: 100,
				top: 100,
				fontSize: fontSize,
				fill: textColor,
				fontWeight: isBold ? 'bold' : 'normal',
				fontStyle: isItalic ? 'italic' : 'normal',
			});
			fabricText.set('id', id);
			canvas.add(fabricText);
			canvas.renderAll();

			// Store the new text object in the state

			setTextObjects((prev: { [key: string]: FabricText }) => ({
				...prev,
				[id]: fabricText,
			}));
		}
	};
    useEffect(() => {
        if (canvas) {
            const handleSelection = (event: any) => {
                const activeObject = event.target;
                if (activeObject && activeObject.type === 'text') {
                    const textObject = activeObject as FabricText;
                    updateTextOnCanvas(textObject.get('id'));
                }
            };

            canvas.on('selection:created', handleSelection);
            canvas.on('selection:updated', handleSelection);

            return () => {
                canvas.off('selection:created', handleSelection);
                canvas.off('selection:updated', handleSelection);
            };
        }
    }, [canvas, text, fontSize, textColor]);
	// Update the text on canvas dynamically
	const updateTextOnCanvas = (textId: string) => {
		if (canvas) {
			const activeObject = canvas.getActiveObject();
			if (activeObject) {
				const textObject = activeObject as FabricText;
				if (textObject) {
					textObject.set({
						text,
						fontSize,
						fill: textColor,
					});
					canvas.renderAll();
				}
			}
		}
	};
	// Add Text to Canvas
	// const updateTextOnCanvas = () => {
	// 	if (canvas && textObject) {
	// 		textObject.set({
	// 			text: text,
	// 			left: 100,
	// 			top: 100,
	// 			fontSize: fontSize,
	// 			fill: textColor,
	// 		});
	// 		canvas.renderAll();
	// 	} else if (canvas) {
	// 		const newText = new FabricText(text, {
	// 			left: 100,
	// 			top: 100,
	// 			fontSize: fontSize,
	// 			fill: textColor,
	// 		});
	// 		canvas.add(newText);
	// 		setTextObject(newText);
	// 		canvas.renderAll();
	// 	}
	// };

	// Update Text dynamically when the input changes
	// useEffect(() => {
	// 	if (canvas && textObjects) {
	// 		updateTextOnCanvas();
	// 	}
	// }, [text, fontSize, textColor]);

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
	const addShape = (shape: string) => {
		if (canvas) {
			let newShape;
			switch (shape) {
				case 'rectangle':
					newShape = new Rect({
						width: 100,
						height: 60,
						fill: shapeColor,
						left: 100,
						top: 100,
					});
					break;
				case 'circle':
					newShape = new Circle({
						radius: 50,
						fill: shapeColor,
						left: 150,
						top: 150,
					});
					break;
				case 'triangle':
					newShape = new Triangle({
						width: 100,
						height: 100,
						fill: shapeColor,
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
			<div className='mb-6'>
				<Label htmlFor='text-input'>Add Text</Label>
				<Input
					id='text-input'
					value={text}
					onChange={(e) => setText(e.target.value)}
					className='mb-4'
				/>
			</div>
			<button
				onClick={addText}
				className='primaryButton w-full'>
				Add Text
			</button>

			{/* Font Customizations */}
			<div className='mb-6'>
				<Label htmlFor='font-style'>Font Size</Label>
				<Slider
					id='font-size'
					min={10}
					max={72}
					step={1}
					value={[fontSize]}
					onValueChange={(value) => setFontSize(value[0])}
					className='mb-4'
				/>

				<Label>Font Style</Label>
				<div className='flex gap-2'>
					<button
						onClick={() => toggleBold()}
						className={`py-1 px-2 rounded ${
							isBold ? 'bg-blue-500 text-white' : 'bg-gray-300'
						}`}>
						Bold
					</button>
					<button
						onClick={() => toggleItalic()}
						className={`py-1 px-2 rounded ${
							isItalic ? 'bg-blue-500 text-white' : 'bg-gray-300'
						}`}>
						Italic
					</button>
				</div>
			</div>

			{/* Color Picker */}
			<div className='mb-6 flex space-x-5 items-center'>
				<Label>Text Color</Label>
				<input
					type='color'
					value={textColor}
					onChange={(color) => setTextColor(color.target.value)}
				/>
				{/* <SketchPicker
color={textColor}
onChangeComplete={(color) => setTextColor(color.hex)}
className='shadow-lg rounded-lg'
/> */}
			</div>
			<div className='mb-6 flex space-x-5 items-center'>
				<Label>Background Color</Label>
				<input
					type='color'
					value={backgroundColor}
					onChange={(color) => setBackgroundColor(color.target.value)}
				/>
			</div>

			{/* Add Shape Options */}
			<div className='mb-6'>
				<Label>Add Shapes</Label>
				<div className='flex gap-2'>
					<button
						onClick={() => addShape('rectangle')}
						className='primaryButton'>
						Rectangle
					</button>
					<button
						onClick={() => addShape('circle')}
						className='primaryButton'>
						Circle
					</button>
					<button
						onClick={() => addShape('triangle')}
						className='primaryButton'>
						Triangle
					</button>
				</div>
			</div>
			<div className='mb-6 flex space-x-5 items-center'>
				<Label>Shape Color</Label>
				<input
					type='color'
					value={shapeColor}
					onChange={(color) => setShapeColor(color.target.value)}
				/>
			</div>

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
