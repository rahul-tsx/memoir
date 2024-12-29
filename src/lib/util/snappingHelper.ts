import { Canvas, FabricObject, Line } from 'fabric';
import { Dispatch, SetStateAction } from 'react';

interface IobjectMoving {
	canvas: Canvas;
	obj: FabricObject;

	setGuidelines: Dispatch<SetStateAction<Line[]>>;
}
export type guidelineObject = FabricObject & { id: string };
const snappingDistance = 10;

export const handleObjectMoving = ({
	canvas,
	obj,

	setGuidelines,
}: IobjectMoving) => {
	const canvasHeight = canvas.height;
	const canvasWidth = canvas.width;
	const left = obj.left;
	const top = obj.top;
	const right = left + obj.width * obj.scaleX;
	const bottom = top + obj.height * obj.scaleY;
	const centerX = left + (obj.width * obj.scaleX) / 2;
	const centerY = top + (obj.height * obj.scaleY) / 2;

	let newGuidelines: Line[] = [];
	clearGuidelines(canvas);
	let snapped = false;

	if (Math.abs(left) < snappingDistance) {
		obj.set({ left: 0 });
		
		if (!guidelinesExists(canvas, 'vertical-left')) {
			const line = createVerticalGuidelines(canvas, 0, 'vertical-left');
		
			newGuidelines.push(line);
			canvas.add(line);
		}
		snapped = true;
	}
	if (Math.abs(top) < snappingDistance) {

		obj.set({ top: 0 });
		if (!guidelinesExists(canvas, 'horizontal-top')) {
			const line = createHorizontalGuidelines(canvas, 0, 'horizontal-top');
			newGuidelines.push(line);
			canvas.add(line);
		}
		snapped = true;
	}
	if (Math.abs(right - canvasWidth) < snappingDistance) {
		
		obj.set({ left: canvasWidth - obj.width * obj.scaleX });
		if (!guidelinesExists(canvas, 'vertical-right')) {
			const line = createVerticalGuidelines(
				canvas,
				canvasWidth,
				'vertical-right'
			);
			newGuidelines.push(line);
			canvas.add(line);
		}
		snapped = true;
	}
	if (Math.abs(bottom - canvasHeight) < snappingDistance) {
	
		obj.set({ top: canvasHeight - obj.height * obj.scaleY });
		if (!guidelinesExists(canvas, 'horizontal-bottom')) {
			const line = createHorizontalGuidelines(
				canvas,
				canvasHeight,
				'horizontal-bottom'
			);
			newGuidelines.push(line);
			canvas.add(line);
		}
		snapped = true;
	}
	if (Math.abs(centerX - canvasWidth / 2) < snappingDistance) {
	
		obj.set({ left: canvasWidth / 2 - (obj.width * obj.scaleX) / 2 });
		if (!guidelinesExists(canvas, 'vertical-center')) {
			const line = createVerticalGuidelines(
				canvas,
				canvasWidth / 2,
				'vertical-center'
			);
		
			newGuidelines.push(line);
	
			canvas.add(line);
		}
		snapped = true;
	}
	if (Math.abs(centerY - canvasHeight / 2) < snappingDistance) {
		obj.set({ top: canvasHeight / 2 - (obj.height * obj.scaleY) / 2 });
		if (!guidelinesExists(canvas, 'horizontal-center')) {
			const line = createHorizontalGuidelines(
				canvas,
				canvasHeight / 2,
				'horizontal-center'
			);
			newGuidelines.push(line);
			canvas.add(line);
		}
		snapped = true;
	}
	if (!snapped) {
		clearGuidelines(canvas);
	} else {
		setGuidelines(newGuidelines);
	}
	canvas.renderAll();
};

const createVerticalGuidelines = (canvas: Canvas, x: number, id: string) => {
	return new Line([x, 0, x, canvas.height], {
		id,
		stroke: 'red',
		strokeWidth: 1,
		selectable: false,
		strokeDashArray: [5, 5],
		opacity: 0.8,
	});
};
const createHorizontalGuidelines = (canvas: Canvas, y: number, id: string) => {
	return new Line([0, y, canvas.width, y], {
		id,
		stroke: 'red',
		strokeWidth: 1,
		selectable: false,
		strokeDashArray: [5, 5],
		opacity: 0.8,
	});
};

export const clearGuidelines = (canvas: Canvas) => {
	const objects = canvas.getObjects('line') as guidelineObject[];
	objects.forEach((element) => {
		if (
			element.id &&
			(element.id.startsWith('vertical-') ||
				element.id.startsWith('horizontal-'))
		) {
			canvas.remove(element);
		}
	});
};
const guidelinesExists = (canvas: Canvas, id: string) => {
	const objects = canvas.getObjects('line') as guidelineObject[];
	return objects.some((obj) => {
		obj.id === id;
	});
};
