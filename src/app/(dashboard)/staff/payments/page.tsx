"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useAppStore } from "@/store/useAppStore";
import { PaymentTransaction } from "@/lib/mock-data";
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
import { PlusCircle, Printer, User, Banknote, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function StaffPayments() {
  const { role, user } = useAuthStore();
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useAppStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentTransaction | null>(null);
  const [editingTx, setEditingTx] = useState<PaymentTransaction | null>(null);

  const [formData, setFormData] = useState<Partial<PaymentTransaction>>({
    studentId: "",
    studentName: "",
    details: { pembangunan: 0, pendaftaran: 0, spp: 0, buku: 0, seragam: 0, tunggakan: 0, lainnya: 0 },
    totalAmount: 0,
  });

  const handleOpenAdd = () => {
    setFormData({ 
      studentId: "", 
      studentName: "", 
      details: { pembangunan: 0, pendaftaran: 0, spp: 0, buku: 0, seragam: 0, tunggakan: 0, lainnya: 0 },
      totalAmount: 0 
    });
    setIsAddOpen(true);
  };

  const handleOpenEdit = (tx: PaymentTransaction) => {
    setEditingTx(tx);
    setFormData({ 
      studentId: tx.studentId, 
      studentName: tx.studentName, 
      details: { ...tx.details }, 
      totalAmount: tx.totalAmount 
    });
    setIsEditOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const details = formData.details || { pembangunan: 0, pendaftaran: 0, spp: 0, buku: 0, seragam: 0, tunggakan: 0, lainnya: 0 };
    const totalAmount = Object.values(details).reduce((sum, val) => sum + (val || 0), 0);
    const dataToSave = { ...formData, details, totalAmount };

    if (isEditOpen && editingTx) {
      updateTransaction(editingTx.id, dataToSave);
      toast.success("Transaksi berhasil diupdate!");
      setIsEditOpen(false);
    } else {
      const newTx: PaymentTransaction = {
        id: `TRX-${Math.floor(Math.random() * 9000) + 1000}`,
        date: new Date().toISOString(),
        studentId: dataToSave.studentId || "S999",
        studentName: dataToSave.studentName || "Siswa Dummy",
        details: dataToSave.details,
        totalAmount: dataToSave.totalAmount,
        cashier: user?.name || "Staff",
      };
      addTransaction(newTx);
      toast.success("Transaksi berhasil dicatat!", {
        description: `Total pembayaran Rp ${totalAmount.toLocaleString('id-ID')} telah disimpan.`
      });
      setIsAddOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      deleteTransaction(id);
      toast.error("Transaksi berhasil dihapus!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Pembayaran</h2>
          <p className="text-muted-foreground">Catat transaksi dan lihat riwayat pembayaran siswa.</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={<Button variant="outline" className="shrink-0 gap-2" onClick={handleOpenAdd} />}>
            <PlusCircle className="h-4 w-4" />
            Catat Transaksi
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Catat Pembayaran Baru</DialogTitle>
              <DialogDescription>
                Masukkan detail transaksi pembayaran siswa di sini. (Simulasi)
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-slate-600">ID Siswa</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Contoh: S001" className="pl-9 border-slate-200" required value={formData.studentId} onChange={e => setFormData({...formData, studentId: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600">Nama Siswa</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Contoh: Budi" className="pl-9 border-slate-200" required value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['pembangunan', 'pendaftaran', 'spp', 'buku', 'seragam', 'tunggakan', 'lainnya'].map((key) => (
                  <div className="space-y-2" key={key}>
                    <Label className="text-slate-600 capitalize">{key}</Label>
                    <div className="relative">
                      <Banknote className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        min="0"
                        className="pl-9 border-slate-200" 
                        value={formData.details?.[key as keyof typeof formData.details] || 0} 
                        onChange={e => setFormData({
                          ...formData, 
                          details: { 
                            ...formData.details!, 
                            [key]: Number(e.target.value) 
                          }
                        })} 
                      />
                    </div>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button type="submit">Simpan Transaksi</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Edit Pembayaran</DialogTitle>
              <DialogDescription>
                Edit detail transaksi pembayaran siswa.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-slate-600">ID Siswa</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Contoh: S001" className="pl-9 border-slate-200" required value={formData.studentId} onChange={e => setFormData({...formData, studentId: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600">Nama Siswa</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Contoh: Budi" className="pl-9 border-slate-200" required value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['pembangunan', 'pendaftaran', 'spp', 'buku', 'seragam', 'tunggakan', 'lainnya'].map((key) => (
                  <div className="space-y-2" key={key}>
                    <Label className="text-slate-600 capitalize">{key}</Label>
                    <div className="relative">
                      <Banknote className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number" 
                        min="0"
                        className="pl-9 border-slate-200" 
                        value={formData.details?.[key as keyof typeof formData.details] || 0} 
                        onChange={e => setFormData({
                          ...formData, 
                          details: { 
                            ...formData.details!, 
                            [key]: Number(e.target.value) 
                          }
                        })} 
                      />
                    </div>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button type="submit">Simpan Perubahan</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-slate-100 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-[800px] sm:min-w-full">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>ID Transaksi</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Total Jumlah</TableHead>
                  <TableHead>Kasir</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
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
                    <TableCell>Rp {trx.totalAmount?.toLocaleString('id-ID') || 0}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{trx.cashier}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(trx)} className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/50">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(trx.id)} className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/50">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Hapus</span>
                        </Button>
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
                            <div className="p-6 border rounded-lg bg-card text-center space-y-4 font-mono text-sm max-h-[50vh] overflow-y-auto">
                              <div className="font-bold text-lg mb-4">EDONUSA PRIMARY SCHOOL</div>
                              <div className="text-left border-b border-dashed pb-4 mb-4">
                                <div>No. Trx: {trx.id}</div>
                                <div>Tanggal: {new Date(trx.date).toLocaleString('id-ID')}</div>
                                <div>Kasir: {trx.cashier}</div>
                              </div>
                              <div className="text-left font-bold mb-2">Terima dari: {trx.studentName}</div>
                              {trx.details && Object.entries(trx.details).map(([k, v]) => {
                                if (v > 0) {
                                  return (
                                    <div key={k} className="flex justify-between font-bold">
                                      <span className="capitalize">{k}</span>
                                      <span>Rp {v.toLocaleString('id-ID')}</span>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                              <div className="border-t border-dashed pt-4 mt-8 font-bold text-lg flex justify-between">
                                <span>TOTAL</span>
                                <span>Rp {trx.totalAmount?.toLocaleString('id-ID') || 0}</span>
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
                      </div>
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
