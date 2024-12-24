'use client';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { ModeToggle } from './ThemeToggler';
import Link from 'next/link';
import useMenuStore from '@/store/collapsibleMenuStore';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
interface NavbarProps {}
const Navbar: FC<NavbarProps> = () => {
	const { setSideBarOpen, isSideBarOpen, isNavbarOpen, setNavbarOpen } =
		useMenuStore();

	const toggleNavbar = () => setNavbarOpen(!isNavbarOpen);
	const toggleSidebar = () => setSideBarOpen(!isSideBarOpen);
	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ type: 'spring', stiffness: 120 }}
			className='bg-app_bg_dark py-4 px-6 flex justify-between items-center font-bold text-app_text_light'>
			{/* (
				<div className='md:hidden'>
					<button
						className='text-app_text_primary focus:outline-none'
						onClick={toggleSidebar}>
						{isSideBarOpen ? (
							<GoSidebarCollapse size={35} />
						) : (
							<GoSidebarExpand size={35} />
						)}
					</button>
				</div>
			) */}

			<motion.div
				whileHover={{ scale: 1.1 }}
				className='text-2xl  flex justify-between '>
				<Link href={`/`}>Memoir</Link>
			</motion.div>
			<ul className='flex space-x-6 items-center '>
				<li>
					<Link
						href='/templates'
						className='mr-4'>
						Templates
					</Link>
				</li>

				<li>
					<ModeToggle />
				</li>
			</ul>
		</motion.nav>
	);
};

export default Navbar;
