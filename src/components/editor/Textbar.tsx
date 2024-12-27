import { useCanvasStore } from '@/store/canvasStore';
import { Label } from '@radix-ui/react-label';
import { FC, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { IText } from 'fabric';
import WebFont from 'webfontloader';

interface TextbarProps {}

const Textbar: FC<TextbarProps> = ({}) => {
	const {
		selectedObject,
		canvas,
		setText,
		setFontFamily,
		setColor,
		setFontSize,
		setFontWeight,
		setFontStyle,
		fontFamily,
		fontSize,
		fontStyle,
		fontWeight,
		color,
		text,
	} = useCanvasStore();
	const [fonts, setFonts] = useState<string[]>(['Arial', 'Roboto', 'Lobster']);

	useEffect(() => {
		WebFont.load({
			google: {
				families: fonts,
			},
		});
	}, [fonts]);

	const addText = () => {
		if (canvas) {
			const id = new Date().getTime().toString();
			const fabricText = new IText(text, {
				left: 100,
				top: 100,
				fontSize: fontSize,
				fill: color?.toString(),
			});
			fabricText.set('id', id);
			canvas.add(fabricText);
			canvas.renderAll();

			// Store the new text object in the state

			// setTextObjects((prev: { [key: string]: FabricText | IText }) => ({
			// 	...prev,
			// 	[id]: fabricText,
			// }));
		}
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setText(value);
		if (
			selectedObject &&
			(selectedObject.type === 'text' || selectedObject.type === 'i-text')
		) {
			selectedObject.set({ text: value });
			canvas?.renderAll();
		}
	};
	const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const font = e.target.value;
		setFontFamily(font);
		if (
			selectedObject &&
			(selectedObject.type === 'text' || selectedObject.type === 'i-text')
		) {
			selectedObject.set({ fontFamily: font });
			canvas?.renderAll();
		}
	};
	const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/,/g, '');
		const intValue = parseInt(value, 10);
		setFontSize(intValue);
		if (
			selectedObject &&
			(selectedObject.type === 'text' || selectedObject.type === 'i-text') &&
			intValue >= 0
		) {
			selectedObject.set({ fontSize: intValue });
			canvas?.renderAll();
		}
	};
	const handleFontWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		const fontValue = isNaN(parseInt(value, 10)) ? value : parseInt(value, 10);
		setFontWeight(fontValue);
		if (
			selectedObject &&
			(selectedObject.type === 'text' || selectedObject.type === 'i-text')
		) {
			selectedObject.set({ fontWeight: fontValue });
			canvas?.renderAll();
		}
	};
	const handleFontStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value.replace(/,/g, '');
		setFontStyle(value);
		if (
			selectedObject &&
			(selectedObject.type === 'text' || selectedObject.type === 'i-text')
		) {
			selectedObject.set({ fontStyle: value });
			canvas?.renderAll();
		}
	};
	const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

			{selectedObject &&
				(selectedObject.type === 'text' ||
					selectedObject.type === 'i-text') && (
					<>
						<div className='mb-6'>
							<div>
								<Label htmlFor='font-size'>Font Size</Label>
								<input
									type='range'
									id='font-size'
									min={10}
									max={72}
									step={1}
									value={fontSize}
									onChange={handleFontSizeChange}
									className='mb-4 bg-red-400'
								/>
							</div>
							
								<div className='mb-4'>
									<Label htmlFor='font-weight'>Font</Label>
									<select
										value={fontFamily}
										onChange={handleFontChange}
										className='w-full p-2 border rounded'>
										{fonts.map((font) => (
											<option
												key={font}
												value={font}>
												{font}
											</option>
										))}
									</select>
								</div>

								<div className='mb-4'>
									<Label htmlFor='font-weight'>Font Weight</Label>
									<select
										id='font-weight'
										value={fontWeight}
										onChange={handleFontWeightChange}
										className='w-full p-2 border rounded'>
										{/* <option value='200'>200</option> */}

										<option value='normal'>Normal</option>

										<option value='bold'>Bold</option>
									</select>
								</div>
						

							<div className='mb-4'>
								<Label htmlFor='font-style'>Font Style</Label>
								<select
									id='font-style'
									value={fontStyle}
									onChange={handleFontStyleChange}
									className='w-full p-2 border rounded'>
									<option value='normal'>Normal</option>
									<option value='italic'>Italic</option>
									<option value='oblique'>Oblique</option>
								</select>
							</div>
						</div>
						{/* Color Picker */}
						<div className='mb-6 flex space-x-5 items-center'>
							<Label>Text Color</Label>
							<input
								type='color'
								value={color?.toString()}
								onChange={handleTextColorChange}
							/>
						</div>
					</>
				)}
		</>
	);
};

export default Textbar;
