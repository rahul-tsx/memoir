import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface MenuState {
	isNavbarOpen: boolean;
	isSideBarOpen: boolean;
	setNavbarOpen: (isNavbarOpen: boolean) => void;
	setSideBarOpen: (isSideBarOpen: boolean) => void;
}

const useMenuStore = create(
	persist<MenuState>(
		(set) => ({
			isNavbarOpen: false,
			setNavbarOpen: (value: boolean) =>
				set({ isNavbarOpen: value, isSideBarOpen: false }),
			// set({ isNavbarOpen: value, isSideBarOpen: false }),
			isSideBarOpen: false,
			setSideBarOpen: (value: boolean) =>
				set({ isSideBarOpen: value, isNavbarOpen: false }),
			// set({ isSideBarOpen: value, isNavbarOpen: !value }),
		}),
		{ name: 'menu-storage', storage: createJSONStorage(() => sessionStorage) }
	)
);

export default useMenuStore;
