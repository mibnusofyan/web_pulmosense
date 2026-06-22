"use client";

import {
  FilePlus2,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import type { AuthUser } from "@/lib/auth/config";
import { cn } from "@/lib/utils";

const baseNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/analisis-baru", label: "Analisis Baru", icon: FilePlus2 },
  { href: "/dashboard/riwayat-analisis", label: "Riwayat Analisis", icon: History },
];

export function DashboardSidebar({ user }: { user: AuthUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navItems =
    user.role === "superadmin"
      ? [
          ...baseNavItems,
          { href: "/dashboard/users", label: "Manajemen User", icon: Users },
        ]
      : baseNavItems;

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        return;
      }

      router.replace("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[260px] flex-col border-r border-white/[0.06] bg-gradient-to-b from-[#0b2836] via-[#0e3344] to-[#091e2a]">
      <div className="flex items-center gap-3 px-6 pb-8 pt-7">
        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/20">
          <Waves className="size-5 text-white" />
        </div>
        <div>
          <p className="text-[15px] font-bold text-white">PulmoSense</p>
          <p className="text-[11px] text-slate-400">AI Medical Assistant</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-medium transition-colors",
                isActive
                  ? "bg-white/[0.08] text-white shadow-sm shadow-black/10"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200",
              )}
            >
              {isActive ? (
                <span className="absolute -left-3 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-teal-400 to-cyan-400" />
              ) : null}
              <Icon
                className={cn(
                  "size-[18px] shrink-0",
                  isActive ? "text-teal-400" : "text-slate-500",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-2 border-t border-white/[0.06] px-3 py-4">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">{user.name}</p>
            <p className="text-[11px] text-slate-400">
              {user.role === "superadmin" ? "Superadmin" : "Admin"}
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/pengaturan"
          className={cn(
            "flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-slate-200",
            pathname === "/dashboard/pengaturan" && "bg-white/[0.08] text-white",
          )}
        >
          <Settings className="size-[18px] shrink-0 text-slate-500" />
          Pengaturan
        </Link>

        <Button
          type="button"
          variant="ghost"
          disabled={isLoggingOut}
          onClick={handleLogout}
          className="h-auto justify-start gap-3 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
        >
          <LogOut data-icon="inline-start" />
          {isLoggingOut ? "Keluar..." : "Keluar"}
        </Button>
      </div>
    </aside>
  );
}
