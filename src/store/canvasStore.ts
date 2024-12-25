import { Canvas, FabricText } from 'fabric';
import { create } from 'zustand';

interface CanvasState {
	canvasWidth: number;
	canvasHeight: number;
	text: string;
	fontSize: number;
	fontStyle: string;
	isBold: boolean;
	isItalic: boolean;
	textColor: string;
	shapeColor: string;
	backgroundColor: string;
	canvas: Canvas | null;
	textObjects: { [key: string]: FabricText };
	setCanvasWidth: (width: number) => void;
	setCanvasHeight: (height: number) => void;
	setText: (text: string) => void;
	setFontSize: (size: number) => void;
	setFontStyle: (style: string) => void;
	toggleBold: () => void;
	toggleItalic: () => void;
	setTextColor: (color: string) => void;
	setShapeColor: (color: string) => void;
	setBackgroundColor: (color: string) => void;
	setCanvas: (canvas: Canvas | null) => void;
	setTextObjects: (updateFn: (objects: { [key: string]: FabricText }) => { [key: string]: FabricText }) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
	canvasWidth: 0,
	canvasHeight: 0,
	text: '',
	fontSize: 20,
	fontStyle: 'normal',
	isBold: false,
	isItalic: false,
	textColor: '#000000',
	shapeColor: 'red',
	backgroundColor: '#1e293b',
	canvas: null,
	textObjects: {},
	setCanvasWidth: (width) => set({ canvasWidth: width }),
	setCanvasHeight: (height) => set({ canvasHeight: height }),
	setText: (text) => set({ text }),
	setFontSize: (size) => set({ fontSize: size }),
	setFontStyle: (style) => set({ fontStyle: style }),
	toggleBold: () => set((state) => ({ isBold: !state.isBold })),
	toggleItalic: () => set((state) => ({ isItalic: !state.isItalic })),
	setTextColor: (color) => set({ textColor: color }),
	setShapeColor: (color) => set({ shapeColor: color }),
	setBackgroundColor: (color) => set({ backgroundColor: color }),
	setCanvas: (canvas) => set({ canvas }),
	setTextObjects: (updateFn) => set((state) => ({ textObjects: updateFn(state.textObjects) })),
}));
