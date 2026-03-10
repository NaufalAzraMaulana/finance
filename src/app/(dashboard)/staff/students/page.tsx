"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useAppStore } from "@/store/useAppStore";
import { Student } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, PlusCircle, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function StaffStudents() {
  const { role } = useAuthStore();
  const { students, addStudent, updateStudent, deleteStudent } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [formData, setFormData] = useState<Partial<Student>>({
    nis: "",
    name: "",
    className: "1A",
    status: "Lunas",
    totalArrears: 0
  });

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({ nis: "", name: "", className: "1A", status: "Lunas", totalArrears: 0 });
    setIsAddOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({ nis: student.nis, name: student.name, className: student.className, status: student.status, totalArrears: student.totalArrears });
    setIsEditOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditOpen && editingStudent) {
      updateStudent(editingStudent.id, formData);
      toast.success("Data siswa berhasil diupdate!");
      setIsEditOpen(false);
    } else {
      const newStudent: Student = {
        id: `S${Math.floor(Math.random() * 900) + 100}`,
        nis: formData.nis || "",
        name: formData.name || "",
        className: formData.className || "1A",
        status: formData.status as Student["status"],
        totalArrears: formData.totalArrears || 0
      };
      addStudent(newStudent);
      toast.success("Siswa berhasil ditambahkan!");
      setIsAddOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus siswa ini?")) {
      deleteStudent(id);
      toast.error("Data siswa berhasil dihapus!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Data Siswa</h2>
          <p className="text-muted-foreground">Daftar siswa dan status keuangan mereka.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input
               type="search"
               placeholder="Cari nama atau NIS..."
               className="w-full pl-8 bg-background"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger render={<Button className="shrink-0 gap-2" onClick={handleOpenAdd} />}>
              <PlusCircle className="h-4 w-4" />
              Tambah
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tambah Siswa Baru</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>NIS</Label>
                  <Input required value={formData.nis} onChange={e => setFormData({...formData, nis: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Nama Lengkap</Label>
                  <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Kelas</Label>
                  <Input required value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Status Pembayaran</Label>
                  <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v as Student["status"]})}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lunas">Lunas</SelectItem>
                      <SelectItem value="Nunggak">Nunggak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.status === 'Nunggak' && (
                  <div className="space-y-2">
                    <Label>Total Tunggakan (Rp)</Label>
                    <Input type="number" required value={formData.totalArrears} onChange={e => setFormData({...formData, totalArrears: Number(e.target.value)})} />
                  </div>
                )}
                <DialogFooter>
                  <Button type="submit">Simpan Siswa</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Data Siswa</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>NIS</Label>
                <Input required value={formData.nis} onChange={e => setFormData({...formData, nis: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Nama Lengkap</Label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Kelas</Label>
                <Input required value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Status Pembayaran</Label>
                <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v as Student["status"]})}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lunas">Lunas</SelectItem>
                    <SelectItem value="Nunggak">Nunggak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.status === 'Nunggak' && (
                <div className="space-y-2">
                  <Label>Total Tunggakan (Rp)</Label>
                  <Input type="number" required value={formData.totalArrears} onChange={e => setFormData({...formData, totalArrears: Number(e.target.value)})} />
                </div>
              )}
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
            <Table className="min-w-[600px] sm:min-w-full">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>NIS</TableHead>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total Tunggakan</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-sky-50/50 transition-colors">
                    <TableCell className="font-medium">{student.nis}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.className}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={student.status === 'Lunas' ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200" : "bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200"}
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                       {student.status === 'Nunggak' ? (
                          <span className="text-red-600 dark:text-red-400">
                             Rp {student.totalArrears.toLocaleString('id-ID')}
                          </span>
                       ) : (
                          <span className="text-muted-foreground">-</span>
                       )}
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(student)} className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/50">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(student.id)} className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/50">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Hapus</span>
                      </Button>
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
