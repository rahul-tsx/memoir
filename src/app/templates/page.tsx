'use client';
import Image from 'next/image';
import { FC } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import birthdayCard from '@/assets/images/birthdayCard.jpg';
import weddingCard from '@/assets/images/wedding-card.jpg';
import christmasCard from '@/assets/images/christmas.jpg';

interface TemplatePageProps {}

const templates = [
	{
		id: 1,
		name: 'Birthday',
		category: 'Celebration',
		image: birthdayCard,
	},
	{
		id: 2,
		name: 'Wedding',
		category: 'Celebration',
		image: weddingCard,
	},
	{
		id: 3,
		name: 'Christmas',
		category: 'Holiday',
		image: christmasCard,
	},
	// Add more templates as needed
];

const TemplatePage: FC<TemplatePageProps> = ({}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');

	const filteredTemplates = templates.filter(
		(template) =>
			template.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(selectedCategory === '' || template.category === selectedCategory)
	);

	return (
		<div className='myContainer mx-auto px-4 py-8 min-h-screen'>
			<h1 className='text-3xl font-bold mb-6'>Choose a Template</h1>
			<div className='flex mb-4'>
				<Input
					type='text'
					placeholder='Search templates...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='mr-2'
				/>
				<select
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
					className='border rounded p-2'>
					<option value=''>All Categories</option>
					<option value='Celebration'>Celebration</option>
					<option value='Holiday'>Holiday</option>
				</select>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-10'>
				{filteredTemplates.map((template) => (
					<Link
						href={`/editor/${template.id}`}
						key={template.id}>
						<div className='relative p-10 h-[250px] rounded-lg shadow-xl cursor-pointer transition-colors text-white font-bold'>
							<div className='absolute inset-0 '>
								<Image
									src={template.image}
									alt={template.name}
									layout='fill'
									objectFit='cover'
									className='rounded-lg'
								/>
							</div>
							<div className='absolute inset-0 bg-black bg-opacity-50 rounded-lg'></div>
							<span className='relative z-10'>{template.name}</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default TemplatePage;
