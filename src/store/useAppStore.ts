import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers, mockStudents, mockTransactions, User, Student, PaymentTransaction } from '@/lib/mock-data';

interface AppState {
  users: User[];
  students: Student[];
  transactions: PaymentTransaction[];
  
  // User Actions
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;

  // Student Actions
  addStudent: (student: Student) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;

  // Transaction Actions
  addTransaction: (tx: PaymentTransaction) => void;
  updateTransaction: (id: string, tx: Partial<PaymentTransaction>) => void;
  deleteTransaction: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      users: mockUsers,
      students: mockStudents,
      transactions: mockTransactions,

      addUser: (user) => set((state) => ({ users: [user, ...state.users] })),
      updateUser: (id, updatedUser) => set((state) => ({
        users: state.users.map(u => (u.id === id ? { ...u, ...updatedUser } : u))
      })),
      deleteUser: (id) => set((state) => ({
        users: state.users.filter(u => u.id !== id)
      })),

      addStudent: (student) => set((state) => ({ students: [student, ...state.students] })),
      updateStudent: (id, updatedStudent) => set((state) => ({
        students: state.students.map(s => (s.id === id ? { ...s, ...updatedStudent } : s))
      })),
      deleteStudent: (id) => set((state) => ({
        students: state.students.filter(s => s.id !== id)
      })),

      addTransaction: (tx) => set((state) => ({ transactions: [tx, ...state.transactions] })),
      updateTransaction: (id, updatedTx) => set((state) => ({
        transactions: state.transactions.map(t => (t.id === id ? { ...t, ...updatedTx } : t))
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id)
      })),
    }),
    {
      name: 'app-storage',
    }
  )
);
