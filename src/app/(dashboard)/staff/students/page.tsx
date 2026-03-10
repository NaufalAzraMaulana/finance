"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { mockStudents } from "@/lib/mock-data";
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
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function StaffStudents() {
  const { role } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Data Siswa</h2>
          <p className="text-muted-foreground">Daftar siswa dan status keuangan mereka.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
           <Input
             type="search"
             placeholder="Cari nama atau NIS..."
             className="w-full pl-8 bg-background"
           />
        </div>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockStudents.map((student) => (
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
