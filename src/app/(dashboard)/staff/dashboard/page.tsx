"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { mockStats } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, AlertCircle, TrendingUp } from "lucide-react";

export default function StaffDashboard() {
  const { role } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Staff</h2>
        <p className="text-muted-foreground">Ringkasan transaksi hari ini dan status keuangan siswa.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pembayaran Hari Ini</CardTitle>
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full dark:bg-emerald-900 dark:text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              Rp {mockStats.staff.todayIncome.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Berdasarkan transaksi yang tercatat hari ini
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tunggakan Siswa</CardTitle>
            <div className="p-2 bg-amber-100 text-amber-600 rounded-full dark:bg-amber-900 dark:text-amber-400">
              <AlertCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              Rp {mockStats.staff.totalArrears.toLocaleString('id-ID')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Akumulasi siswa berstatus Nunggak
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
