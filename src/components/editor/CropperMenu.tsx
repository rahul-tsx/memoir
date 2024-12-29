import { useCanvasStore } from '@/store/canvasStore';
import { Label } from '@radix-ui/react-label';
import { FabricObject } from 'fabric';
import { saveAs } from 'file-saver';
import { FC, useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';

interface CropperMenuProps {
	refreshKey: number;
}
export type frameObject = FabricObject & { name: string };
const CropperMenu: FC<CropperMenuProps> = ({ refreshKey }) => {
	// const [frames, setFrames] = useState<frameObject[]>([]);
	// const [selectedFrame, setSelectedFrame] = useState<frameObject | null>(null);
	const { canvas, frames, setFrames, selectedFrame, setSelectedFrame } =
		useCanvasStore();

	const updateFrames = () => {
		if (canvas) {
			const framesFromCanvas = canvas.getObjects('rect') as frameObject[];
			const filteredFrames = framesFromCanvas.filter(
				(obj) => obj.name && obj.name.startsWith('Frame')
			);
			setFrames(filteredFrames);
			if (filteredFrames.length > 0) {
				setSelectedFrame(filteredFrames[0]);
			}
		}
	};
	useEffect(() => {
		updateFrames();
	}, [canvas, refreshKey]);

	const handleFrameSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		if (!frames) return;
		const selected = frames.find((frame) => frame.name === value);
		if (!selected || !canvas) return;
		setSelectedFrame(selected);
		canvas.setActiveObject(selected);
		canvas.renderAll();
	};

	const exportFrameAsPng = () => {
		if (!selectedFrame || !frames) return;
		frames.forEach((frame) => {
			frame.set('visible', false);
		});
		selectedFrame.set({ visible: true, strokeWidth: 0 });
		const dataUrl = canvas!.toDataURL({
			left: selectedFrame.left,
			top: selectedFrame.top,
			width: selectedFrame.width * selectedFrame.scaleX,
			height: selectedFrame.height * selectedFrame.scaleY,
			multiplier: 1,
			format: 'png',
		});
		selectedFrame.set({ strokeWidth: 1 });
		frames.forEach((frame) => {
			frame.set('visible', true);
		});
		canvas?.renderAll();
		saveAs(dataUrl, `${selectedFrame.name}.png`);
	};
	return (
		<div>
			<div className='mb-4'>
				{frames && frames.length > 0 && (
					<>
						<Label htmlFor='font-weight'>Frames</Label>{' '}
						<select
							value={selectedFrame?.name}
							onChange={(event) => handleFrameSelect(event)}
							className='w-full p-2 border rounded'>
							{frames.map((frame, index) => (
								<option
									key={index}
									value={frame.name}>
									{frame.name}
								</option>
							))}
						</select>
					</>
				)}
			</div>
			<button
				onClick={exportFrameAsPng}
				className='primaryButton w-full flex space-x-4 '>
				<FaDownload size={25} />
				<span>Export as PNG</span>
			</button>
		</div>
	);
};

export default CropperMenu;
