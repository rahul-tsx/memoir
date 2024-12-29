import { useCanvasStore } from '@/store/canvasStore';
import { FabricObject, Rect } from 'fabric';
import { FC } from 'react';
import { CgCrop } from 'react-icons/cg';
import { frameObject } from './CropperMenu';

interface CropperProps {
	onFramesUpdated: () => void;
}

const Cropper: FC<CropperProps> = ({ onFramesUpdated }) => {
	const { canvas } = useCanvasStore();
	const addFrameToCanvas = () => {
		if (!canvas) return;
		const framesFromCanvas = canvas.getObjects('rect') as frameObject[];
		const filteredFrames = framesFromCanvas.filter(
			(obj) => obj.name && obj.name.startsWith('Frame')
		);
		const frameName = `Frame ${filteredFrames.length + 1}`;
		const frame = new Rect({
			left: 100,
			top: 100,
			width: 200,
			height: 200,
			fill: 'transparent',
			store: '#07FE3D',
			strokeWidth: 1,
			selectable: true,
			evented: true,
			name: frameName,
		});
		canvas.add(frame);
		canvas.renderAll();

		const maintainStrokeWidth = (object: FabricObject) => {
			const scaleX = object.scaleX || 1;
			const scaleY = object.scaleY || 1;
			object.set({
				width: object.width * scaleX,
				height: object.height * scaleY,
				scaleX: 1,
				scaleY: 1,
				strokeWidth: 1,
				strokeColor: 'var(--text-primary)',
			});
			object.setCoords();

			frame.on('scaling', () => {
				maintainStrokeWidth(frame);
				canvas.renderAll();
			});

			frame.on('modified', () => {
				maintainStrokeWidth(frame);
				canvas.renderAll();
			});
		};
		onFramesUpdated();
	};
	return (
		
			<button
				onClick={addFrameToCanvas}
				className='hover:bg-app_card_primary_bg bg-app_card_primaryshadow p-2 rounded-lg shadow-xl aspect-square  h-fit'>
				<CgCrop size={25} />
			</button>
		
	);
};

export default Cropper;
