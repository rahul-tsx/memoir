'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
	Canvas,
	Rect,
	FabricText,
	FabricImage,
	Triangle,
	Circle,
	TextProps,
	SerializedTextProps,
	ObjectEvents,
} from 'fabric';

interface CanvasComponentProps {
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
	deleteComponent: React.RefObject<HTMLButtonElement | null>;
}

const CanvasComponent: FC<CanvasComponentProps> = ({
	canvasWidth,
	canvasHeight,
	rectColor,
	text,
	fontSize,
	textColor,
	isBold,
	isItalic,
	onCanvasUpdate,
	setTextObjects,
	backgroundColor,
	deleteComponent,
	textObjects,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [canvas, setCanvas] = useState<Canvas | null>(null);

	useEffect(() => {
		// Initialize Canvas
		if (canvasRef.current) {
			if (canvas) {
				canvas.dispose();
			}

			const newCanvas = new Canvas(canvasRef.current, {
				width: canvasWidth * 0.8,
				height: canvasHeight * 0.8,
				backgroundColor,
			});

			setCanvas(newCanvas);
			if (onCanvasUpdate) {
				onCanvasUpdate(newCanvas);
			}
		}
	}, [canvasWidth, canvasHeight, backgroundColor, onCanvasUpdate]);

	// Update Rectangle Color
	useEffect(() => {
		if (canvas) {
			canvas.getObjects('rect').forEach((obj) => {
				obj.set('fill', rectColor);
			});
			canvas.renderAll();
		}
	}, [canvas, rectColor]);

	// Update/Add Text
	useEffect(() => {
		if (canvas) {
			// Remove existing text objects
			// canvas.getObjects('text').forEach((obj) => {
			// 	const objProps = obj.toObject();
			// 	console.log('my object', objProps.text);
			// 	if (textObjects && !textObjects[objProps.text]) canvas.remove(obj);
			// });
			canvas.getObjects('text').forEach((obj) => {
				if (textObjects && !textObjects[obj.get('id')]) canvas.remove(obj);
			});
			// canvas.getObjects('text').forEach((obj) => canvas.remove(obj));

			// Add new text
			if (textObjects) {
				Object.values(textObjects).forEach((textObj) => {
					canvas.add(textObj);
				});
				canvas.renderAll();
			}
			// if (text) {
			// 	const fabricText = new FabricText(text, {
			// 		left: 100,
			// 		top: 100,
			// 		fontSize,
			// 		fill: textColor,
			// 		fontWeight: isBold ? 'bold' : 'normal',
			// 		fontStyle: isItalic ? 'italic' : 'normal',
			// 	});
			// 	canvas.add(fabricText);
			// 	canvas.renderAll();
			// }
		}
	}, [canvas, text, fontSize, textColor, isBold, isItalic]);
	const deleteSelectedItem = () => {
		if (canvas) {
			const activeObject = canvas.getActiveObject();
			if (activeObject) {
				if (textObjects && textObjects[activeObject.get('id')]) {
					setTextObjects((prev) => {
						const newObj = { ...prev };
						delete newObj[activeObject.get('id')];
						return newObj;
					});
				}
				console.log('my active Object', activeObject);
				canvas.remove(activeObject);
				canvas.renderAll();
			}
		}
	};

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Delete') {
				deleteSelectedItem();
			}
		};

		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [canvas]);
	// Add Shapes dynamically
	const addShapeToCanvas = (shape: string) => {
		if (canvas) {
			let newShape;
			switch (shape) {
				case 'rectangle':
					newShape = new Rect({
						width: 100,
						height: 60,
						fill: rectColor,
						left: 150,
						top: 150,
					});
					break;
				case 'circle':
					newShape = new Circle({
						radius: 50,
						fill: rectColor,
						left: 200,
						top: 200,
					});
					break;
				case 'triangle':
					newShape = new Triangle({
						width: 100,
						height: 100,
						fill: rectColor,
						left: 250,
						top: 250,
					});
					break;
			}
			if (newShape) {
				canvas.add(newShape);
				canvas.renderAll();
			}
		}
	};

	// Add Image
	const addImageToCanvas = (imageSrc: string) => {
		if (canvas) {
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
			img.src = imageSrc;
		}
	};

	return (
		<>
			<button
				className='hidden'
				ref={deleteComponent}
				onClick={deleteSelectedItem}>
				delete
			</button>
			<canvas
				ref={canvasRef}
				className='w-full h-full border'
			/>
		</>
	);
};

export default CanvasComponent;
