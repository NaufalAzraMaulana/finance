export type UserRole = 'admin' | 'staff';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
}

export interface Student {
  id: string;
  nis: string;
  name: string;
  className: string;
  status: 'Lunas' | 'Nunggak';
  totalArrears: number;
}

export interface PaymentTransaction {
  id: string;
  date: string;
  studentId: string;
  studentName: string;
  item: 'SPP' | 'Seragam' | 'Buku' | 'Lainnya';
  amount: number;
  cashier: string;
}

// Data Users
export const mockUsers: User[] = [
  { id: '1', name: 'Admin Utama', email: 'admin@sekolah.com', role: 'admin', status: 'active', lastLogin: '2026-03-10T08:30:00Z' },
  { id: '2', name: 'Budi Santoso', email: 'budi@sekolah.com', role: 'staff', status: 'active', lastLogin: '2026-03-10T07:15:00Z' },
  { id: '3', name: 'Siti Aminah', email: 'siti@sekolah.com', role: 'staff', status: 'inactive', lastLogin: '2026-02-28T14:20:00Z' },
  { id: '4', name: 'Agus Pratama', email: 'agus@sekolah.com', role: 'staff', status: 'active', lastLogin: '2026-03-09T09:45:00Z' },
];

// Data Students
export const mockStudents: Student[] = [
  { id: 'S001', nis: '2026001', name: 'Ahmad Fajri', className: '1A', status: 'Lunas', totalArrears: 0 },
  { id: 'S002', nis: '2026002', name: 'Bunga Citra', className: '1A', status: 'Nunggak', totalArrears: 250000 },
  { id: 'S003', nis: '2026003', name: 'Cipto Mangunkusumo', className: '2B', status: 'Lunas', totalArrears: 0 },
  { id: 'S004', nis: '2026004', name: 'Dewi Lestari', className: '3C', status: 'Nunggak', totalArrears: 500000 },
  { id: 'S005', nis: '2026005', name: 'Eko Patrio', className: '4A', status: 'Lunas', totalArrears: 0 },
  { id: 'S006', nis: '2026006', name: 'Fatimah Az Zahra', className: '5B', status: 'Lunas', totalArrears: 0 },
  { id: 'S007', nis: '2026007', name: 'Gilang Ramadhan', className: '6A', status: 'Nunggak', totalArrears: 150000 },
];

// Data Transactions
export const mockTransactions: PaymentTransaction[] = [
  { id: 'TRX-1001', date: '2026-03-10T08:00:00Z', studentId: 'S001', studentName: 'Ahmad Fajri', item: 'SPP', amount: 250000, cashier: 'Budi Santoso' },
  { id: 'TRX-1002', date: '2026-03-10T09:15:00Z', studentId: 'S005', studentName: 'Eko Patrio', item: 'Seragam', amount: 150000, cashier: 'Agus Pratama' },
  { id: 'TRX-1003', date: '2026-03-09T10:30:00Z', studentId: 'S003', studentName: 'Cipto Mangunkusumo', item: 'Buku', amount: 120000, cashier: 'Budi Santoso' },
];

export const mockStats = {
  admin: {
    totalIncome: 15450000,
    monthlyExpense: 8200000,
    activeUsers: mockUsers.filter(u => u.status === 'active').length,
  },
  staff: {
    todayIncome: mockTransactions.filter(t => t.date.startsWith('2026-03-10')).reduce((acc, curr) => acc + curr.amount, 0),
    totalArrears: mockStudents.reduce((acc, curr) => acc + curr.totalArrears, 0),
  }
};
