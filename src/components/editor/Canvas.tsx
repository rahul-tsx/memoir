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
import { useCanvasStore } from '@/store/canvasStore';

interface CanvasComponentProps {
	deleteComponent: React.RefObject<HTMLButtonElement | null>;
}

const CanvasComponent: FC<CanvasComponentProps> = ({ deleteComponent }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const {
		backgroundColor,
		canvas,
		canvasHeight,
		canvasWidth,
		fontSize,
		fontStyle,
		isBold,
		isItalic,
		color,
		text,
		setCanvas,
		textColor,
		textObjects,
		setTextObjects,
	} = useCanvasStore();
	useEffect(() => {
		console.log('My canvas', canvas);
		if (canvasRef.current && !canvas) {
			const fabricCanvas = new Canvas(canvasRef.current, {
				backgroundColor: backgroundColor,
			});
			setCanvas(fabricCanvas);
		}

		return () => {
			if (canvas) {
				canvas.dispose();
				-setCanvas(null);
			}
		};
	}, [canvasRef, canvas, setCanvas, backgroundColor]);

	useEffect(() => {
		if (canvas) {
			canvas.setDimensions({
				width: canvasWidth * 0.8,
				height: canvasHeight * 0.8,
			});

			// canvas.setBackgroundColor(backgroundColor, canvas.renderAll.bind(canvas));
		}
	}, [canvas, canvasWidth, canvasHeight]);



	
	const deleteSelectedItem = () => {
		if (canvas) {
			const activeObject = canvas.getActiveObject();
			if (activeObject) {
				console.log('My Active object', activeObject);
				// if (textObjects && textObjects[activeObject.get('id')]) {
				// 	setTextObjects((prev) => {
				// 		const newObj = Object.fromEntries(
				// 			Object.entries(prev).filter(
				// 				([key]) => key !== activeObject.get('id')
				// 			)
				// 		);
				// 		console.log('New obj', newObj);
				// 		return newObj;
				// 	});
				// }

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
	// const addShapeToCanvas = (shape: string) => {
	// 	if (canvas) {
	// 		let newShape;
	// 		switch (shape) {
	// 			case 'rectangle':
	// 				newShape = new Rect({
	// 					width: 100,
	// 					height: 60,
	// 					fill: shapeColor,
	// 					left: 150,
	// 					top: 150,
	// 				});
	// 				break;
	// 			case 'circle':
	// 				newShape = new Circle({
	// 					radius: 50,
	// 					fill: shapeColor,
	// 					left: 200,
	// 					top: 200,
	// 				});
	// 				break;
	// 			case 'triangle':
	// 				newShape = new Triangle({
	// 					width: 100,
	// 					height: 100,
	// 					fill: shapeColor,
	// 					left: 250,
	// 					top: 250,
	// 				});
	// 				break;
	// 		}
	// 		if (newShape) {
	// 			canvas.add(newShape);
	// 			canvas.renderAll();
	// 		}
	// 	}
	// };

	// // Add Image
	// const addImageToCanvas = (imageSrc: string) => {
	// 	if (canvas) {
	// 		const img = new Image();
	// 		img.onload = () => {
	// 			const fabricImage = new FabricImage(img, {
	// 				left: 100,
	// 				top: 100,
	// 				scaleX: 0.5,
	// 				scaleY: 0.5,
	// 			});
	// 			canvas.add(fabricImage);
	// 			canvas.renderAll();
	// 		};
	// 		img.src = imageSrc;
	// 	}
	// };

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
