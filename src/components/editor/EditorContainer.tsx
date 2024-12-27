'use client';
import { FC, useEffect, useRef, useState } from 'react';

import CanvasContainer from '@/components/editor/CanvasContainer';

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
				<CanvasContainer />
			</div>
		</div>
	);
};

export default EditorContainer;
