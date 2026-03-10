"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function Home() {
  const { role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (role === 'admin') {
      router.push('/admin/dashboard');
    } else if (role === 'staff') {
      router.push('/staff/dashboard');
    } else {
      router.push('/login');
    }
  }, [role, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">Loading EduFinance...</div>
    </div>
  );
}
