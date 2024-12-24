import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
	token: string | null;
	name: string;
	userId: string;
	role: String;
	setRole: (value: string) => void;
	setToken: (token: string) => void;
	setUserId: (value: string) => void;
	setName: (value: string) => void;
	clearAuth: () => void;
}

const useAuthStore = create(
	persist<AuthState>(
		(set) => ({
			token: null,
			name: 'User',
			userId: '',
			role: 'Manager',

			setRole: (role) => set({ role }),
			setToken: (token) => set({ token }),
			setUserId: (userId) => set({ userId }),
			setName: (name) => set({ name }),
			clearAuth: () =>
				set({ token: null, name: 'User', userId: '', role: 'Manager' }),
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
);
export const getAuthToken = () => useAuthStore.getState().token;

export default useAuthStore;
