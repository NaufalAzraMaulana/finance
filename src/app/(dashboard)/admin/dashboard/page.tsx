"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { mockStats } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ArrowUpRight, ArrowDownRight, Users } from "lucide-react";

export default function AdminDashboard() {
  const { role } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Admin</h2>
        <p className="text-muted-foreground">Ringkasan aktivitas dan metrik keuangan sekolah.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pemasukan</CardTitle>
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full dark:bg-emerald-900 dark:text-emerald-400">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              Rp {mockStats.admin.totalIncome.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Bulan ini
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
            <div className="p-2 bg-red-100 text-red-600 rounded-full dark:bg-red-900 dark:text-red-400">
              <ArrowDownRight className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              Rp {mockStats.admin.monthlyExpense.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Bulan ini
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Aktif</CardTitle>
            <div className="p-2 bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900 dark:text-blue-400">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {mockStats.admin.activeUsers}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Staff & Admin
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
