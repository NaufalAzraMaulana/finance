import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'admin' | 'staff' | null;

interface UserData {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthState {
  user: UserData | null;
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
  user: null,
  role: null,
  login: (role) => {
    if (role === 'admin') {
      set({
        user: { id: '1', name: 'Admin Utama', email: 'admin@sekolah.com', role: 'admin' },
        role: 'admin',
      });
    } else if (role === 'staff') {
      set({
        user: { id: '2', name: 'Staff Keuangan', email: 'staff@sekolah.com', role: 'staff' },
        role: 'staff',
      });
    }
  },
      logout: () => set({ user: null, role: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
