'use client';
import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
interface HeroProps {}

const Hero: FC<HeroProps> = ({}) => {
	return (
		<section className='py-20 md:py-32'>
			<div className='myContainer'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center'>
					<h1 className='text-4xl md:text-6xl font-bold mb-6'>
						Create Stunning Greeting Cards
					</h1>
					<p className='text-xl md:text-2xl text-app_text_secondary mb-8'>
						Design personalized cards for any occasion in minutes
					</p>
					<Link href='/templates'>
						<button className='text-lg primaryButton min-w-[300px]'>
							Get Started
						</button>
					</Link>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
