import CTA from '@/components/home/CTA';
import Features from '@/components/home/Features';
import Hero from '@/components/home/Hero';

export default function LandingPage() {
	return (
		<div className='min-h-screen bg-app_bg_primary '>
			<Hero />
			<Features />
			<CTA />
		</div>
	);
}
