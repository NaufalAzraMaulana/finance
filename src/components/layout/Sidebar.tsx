"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  GraduationCap, 
  LogOut,
  School
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { role, logout } = useAuthStore();

  if (!role) return null;

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Manajemen User", icon: Users },
  ];

  const staffLinks = [
    { href: "/staff/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/staff/payments", label: "Pembayaran", icon: CreditCard },
    { href: "/staff/students", label: "Data Siswa", icon: GraduationCap },
  ];

  const links = role === "admin" ? adminLinks : staffLinks;

  return (
    <div className={cn("pb-12 min-h-screen w-64 border-r bg-card hidden md:block", className)}>
      <div className="space-y-4 py-6">
        <div className="px-4 py-2">
          <Link href={`/${role}/dashboard`} className="flex items-center gap-3 mb-12 px-4">
            <div className="bg-blue-600 p-2 rounded-xl shadow-sm">
              <School className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-1xl font-bold tracking-tight text-slate-800">
              SDIT AL-FATH
            </h2>
          </Link>
          <div className="space-y-1.5">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-11 text-[15px] font-medium transition-all rounded-xl",
                      isActive 
                        ? "bg-sky-50 text-blue-700 hover:bg-sky-100" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 px-4 w-64">
        <Button variant="outline" className="w-full justify-start h-11 rounded-xl border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all font-medium" onClick={logout}>
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
