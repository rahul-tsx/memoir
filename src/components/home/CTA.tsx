'use client';
import { FC } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';

interface CTAProps {}

const CTA: FC<CTAProps> = ({}) => {
	return (
		<section className='py-20'>
			<div className='container mx-auto px-4'>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5 }}
					className='bg-app_bg_dark text-app_text_light rounded-lg p-8 md:p-12 text-center'>
					<h2 className='text-3xl md:text-4xl font-bold mb-6'>
						Ready to Create Your Card?
					</h2>
					<p className='text-xl mb-8'>
						Join thousands of happy customers and start designing today!
					</p>
					<Link
						href='/templates'
						>
						<button className=' primaryButton min-w-[200px]'>
							Browse Templates
						</button>
					</Link>
				</motion.div>
			</div>
		</section>
	);
};

export default CTA;
