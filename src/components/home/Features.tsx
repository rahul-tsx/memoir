'use client';
import { FC } from 'react';
import { motion } from 'framer-motion';

interface FeaturesProps {}

const Features: FC<FeaturesProps> = ({}) => {
	const features = [
		{ title: 'Easy to Use', description: 'Intuitive drag-and-drop interface' },
		{
			title: 'Customizable',
			description: 'Personalize every aspect of your card',
		},
		{
			title: 'High Quality',
			description: 'Print-ready designs for stunning results',
		},
	];

	return (
		<section className='py-20 bg-app_bg_secondary'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
					Why Choose Us?
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{features.map((feature, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							className='bg-app_card_primary_bg p-6 rounded-lg shadow-lg'>
							<h3 className='text-xl font-semibold mb-4'>{feature.title}</h3>
							<p className='text-app_text_secondary'>{feature.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
