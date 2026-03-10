"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

export function Header() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-4 md:hidden">
        <Sheet>
          <SheetTrigger render={<Button variant="outline" size="icon" className="shrink-0 md:hidden" />}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar className="block min-h-full" />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
           <span className="font-bold text-primary">SDIT AL-FATH</span>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <div className="hidden flex-col items-end text-sm sm:flex">
          <span className="font-medium">{user.name}</span>
          <span className="text-muted-foreground text-xs">{user.role === 'admin' ? 'Administrator' : 'Staff Keuangan'}</span>
        </div>
        <Avatar className="h-9 w-9 border-2 border-primary/20">
          <AvatarFallback className="bg-primary/10 text-primary">
            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
