'use client';
import { FC, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { SketchPicker } from 'react-color';


import CanvasContainer from '@/components/editor/CanvasContainer';

import { useCanvasStore } from '@/store/canvasStore';
import Toolbar from './Toolbar';

interface EditorContainerProps {}

const EditorContainer: FC<EditorContainerProps> = ({}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	

	return (
		<div className='flex h-screen overflow-hidden '>
			{/* Sidebar */}
			<Toolbar containerRef={containerRef} />

			{/* Canvas Area */}
			<div
				className='w-3/4 h-screen overflow-hidden'
				ref={containerRef}>
				<CanvasContainer  />
			</div>
		</div>
	);
};

export default EditorContainer;
