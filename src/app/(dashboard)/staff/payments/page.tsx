"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { mockTransactions, PaymentTransaction } from "@/lib/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Printer, User, Banknote } from "lucide-react";
import { toast } from "sonner";

export default function StaffPayments() {
  const { role, user } = useAuthStore();
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(mockTransactions);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentTransaction | null>(null);

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const newTx: PaymentTransaction = {
      id: `TRX-${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toISOString(),
      studentId: "S999",
      studentName: "Siswa Dummy",
      item: "SPP",
      amount: 150000,
      cashier: user?.name || "Staff",
    };
    setTransactions([newTx, ...transactions]);
    setIsAddOpen(false);
    toast.success("Transaksi berhasil dicatat!", {
      description: `Pembayaran ${newTx.item} untuk ${newTx.studentName} sejumlah Rp ${newTx.amount.toLocaleString('id-ID')} telah disimpan.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Pembayaran</h2>
          <p className="text-muted-foreground">Catat transaksi dan lihat riwayat pembayaran siswa.</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={<Button variant="outline" className="shrink-0 gap-2" />}>
            <PlusCircle className="h-4 w-4" />
            Catat Transaksi
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Catat Pembayaran Baru</DialogTitle>
              <DialogDescription>
                Masukkan detail transaksi pembayaran siswa di sini. (Simulasi)
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTransaction} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-slate-600">ID Siswa</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Contoh: S001" className="pl-9 border-slate-200" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600">Jenis Pembayaran</Label>
                <Select required defaultValue="SPP">
                  <SelectTrigger className="border-slate-200"><SelectValue placeholder="Pilih Jenis" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SPP">SPP Bulanan</SelectItem>
                    <SelectItem value="Seragam">Seragam</SelectItem>
                    <SelectItem value="Buku">Buku</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600">Jumlah (Rp)</Label>
                <div className="relative">
                  <Banknote className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="number" placeholder="Contoh: 150000" className="pl-9 border-slate-200" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Simpan Transaksi</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-slate-100 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>ID Transaksi</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Kasir</TableHead>
                  <TableHead className="text-right">Struk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((trx) => (
                  <TableRow key={trx.id} className="hover:bg-sky-50/50 transition-colors">
                    <TableCell className="font-medium">{trx.id}</TableCell>
                    <TableCell>
                      {new Date(trx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </TableCell>
                    <TableCell>{trx.studentName}</TableCell>
                    <TableCell>{trx.item}</TableCell>
                    <TableCell>Rp {trx.amount.toLocaleString('id-ID')}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{trx.cashier}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger render={<Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100" />}>
                          <Printer className="h-4 w-4" />
                          <span className="sr-only">Cetak</span>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Struk Pembayaran</DialogTitle>
                            <DialogDescription>
                              Pratinjau struk sebelum dicetak.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="p-6 border rounded-lg bg-card text-center space-y-4 font-mono text-sm">
                            <div className="font-bold text-lg mb-4">EDONUSA PRIMARY SCHOOL</div>
                            <div className="text-left border-b border-dashed pb-4 mb-4">
                              <div>No. Trx: {trx.id}</div>
                              <div>Tanggal: {new Date(trx.date).toLocaleString('id-ID')}</div>
                              <div>Kasir: {trx.cashier}</div>
                            </div>
                            <div className="text-left font-bold mb-2">Terima dari: {trx.studentName}</div>
                            <div className="flex justify-between font-bold">
                              <span>Pembayaran {trx.item}</span>
                              <span>Rp {trx.amount.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="border-t border-dashed pt-4 mt-8 font-bold text-lg flex justify-between">
                              <span>TOTAL</span>
                              <span>Rp {trx.amount.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="mt-8 text-xs text-muted-foreground">Terima kasih atas pembayarannya.</div>
                          </div>
                          <DialogFooter className="sm:justify-end">
                            <Button type="button" variant="secondary" onClick={() => {
                               window.print();
                               toast.success("Struk sedang dicetak!", { description: `Struk untuk transaksi ${trx.id} sedang diproses.` });
                            }}>
                              <Printer className="mr-2 h-4 w-4" /> Cetak Sekarang
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
