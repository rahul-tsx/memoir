import { Canvas, FabricObject, FabricText, IText, TFiller } from 'fabric';
import { create } from 'zustand';

interface CanvasState {
	canvas: Canvas | null;
	canvasWidth: number;
	canvasHeight: number;
	width: number;
	height: number;
	diameter: number;
	text: string;
	fontSize: number;
	fontFamily: string;
	fontStyle: string;
	fontWeight: string | number;
	isBold: boolean;
	isItalic: boolean;
	textColor: ReturnType<TFiller['toObject']> | string | null;
	backgroundColor: string;
	color: ReturnType<TFiller['toObject']> | string | null;

	textObjects: { [key: string]: FabricText | IText };
	selectedObject: FabricObject | null;
	setFontFamily: (fontFamily: string) => void;
	setWidth: (width: number) => void;
	setHeight: (height: number) => void;
	setDiameter: (diameter: number) => void;
	setSelectedObject: (selectedObject: FabricObject | null) => void;
	setCanvasWidth: (width: number) => void;
	setCanvasHeight: (height: number) => void;
	setText: (text: string) => void;
	setFontSize: (size: number) => void;
	setFontStyle: (style: string) => void;
	setFontWeight: (weight: string | number) => void;
	toggleBold: () => void;
	toggleItalic: () => void;
	setColor: (color: ReturnType<TFiller['toObject']> | string | null) => void;
	setTextColor: (
		color: ReturnType<TFiller['toObject']> | string | null
	) => void;
	setBackgroundColor: (color: string) => void;
	setCanvas: (canvas: Canvas | null) => void;
	setTextObjects: (
		updateFn: (objects: { [key: string]: FabricText | IText }) => {
			[key: string]: FabricText | IText;
		}
	) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
	canvasWidth: 0,
	canvasHeight: 0,
	color: '#000000',
	textColor: '#000000',
	fontWeight: 'normal',
	fontFamily: 'Arial',
	width: 200,
	height: 250,
	diameter: 25,
	selectedObject: null,
	text: '',
	fontSize: 20,
	fontStyle: 'normal',
	isBold: false,
	isItalic: false,
	backgroundColor: '#1e293b',
	canvas: null,
	textObjects: {},
	setFontFamily: (fontFamily) => set({ fontFamily }),
	setFontWeight: (weight) => set({ fontWeight: weight }),
	setCanvasWidth: (width) => set({ canvasWidth: width }),
	setCanvasHeight: (height) => set({ canvasHeight: height }),
	setText: (text) => set({ text }),
	setFontSize: (size) => set({ fontSize: size }),
	setFontStyle: (style) => set({ fontStyle: style }),
	toggleBold: () => set((state) => ({ isBold: !state.isBold })),
	toggleItalic: () => set((state) => ({ isItalic: !state.isItalic })),
	setTextColor: (color) => set({ textColor: color }),
	setColor: (color) => set({ color: color }),
	setBackgroundColor: (color) => set({ backgroundColor: color }),
	setCanvas: (canvas) => set({ canvas }),
	setTextObjects: (updateFn) =>
		set((state) => ({ textObjects: updateFn(state.textObjects) })),
	setDiameter: (diameter) => set({ diameter: diameter }),
	setHeight: (height) => set({ height: height }),
	setWidth: (width) => set({ width: width }),
	setSelectedObject: (selectedObject) => set({ selectedObject }),
}));
