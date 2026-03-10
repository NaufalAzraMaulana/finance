"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { role } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!role) {
         router.push('/login');
      } else if (pathname.startsWith('/admin') && role !== 'admin') {
         router.push('/login');
      } else if (pathname.startsWith('/staff') && role !== 'staff') {
         router.push('/login');
      }
    }
  }, [mounted, role, router, pathname]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
        <div className="animate-pulse font-medium text-slate-500">Memuat EduFinance...</div>
      </div>
    );
  }

  if (!role) return null;
  if (pathname.startsWith('/admin') && role !== 'admin') return null;
  if (pathname.startsWith('/staff') && role !== 'staff') return null;

  return <>{children}</>;
}
