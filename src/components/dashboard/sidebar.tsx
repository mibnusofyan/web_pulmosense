"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FilePlus2,
  History,
  FileBarChart,
  Settings,
  Waves,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/analisis-baru", label: "Analisis Baru", icon: FilePlus2 },
  { href: "/dashboard/riwayat-analisis", label: "Riwayat Analisis", icon: History },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[260px] flex-col border-r border-white/[0.06] bg-gradient-to-b from-[#0b2836] via-[#0e3344] to-[#091e2a]">
      {/* ——— Logo ——— */}
      <div className="flex items-center gap-3 px-6 pt-7 pb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/20">
          <Waves className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-[15px] font-bold tracking-tight text-white">
            ParuScan AI
          </p>
          <p className="text-[11px] text-slate-400">AI Medical Assistant</p>
        </div>
      </div>

      {/* ——— Navigation ——— */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-medium transition-all duration-200",
                isActive
                  ? "bg-white/[0.08] text-white shadow-sm shadow-black/10"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
              )}
            >
              {/* Active indicator bar */}
              {isActive && (
                <span className="absolute -left-3 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-teal-400 to-cyan-400" />
              )}
              <Icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0 transition-colors",
                  isActive ? "text-teal-400" : "text-slate-500"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* ——— Bottom: Settings ——— */}
      <div className="border-t border-white/[0.06] px-3 py-4">
        <Link
          href="/dashboard/pengaturan"
          className={cn(
            "flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-400 transition-all duration-200 hover:bg-white/[0.04] hover:text-slate-200",
            pathname === "/dashboard/pengaturan" &&
            "bg-white/[0.08] text-white"
          )}
        >
          <Settings className="h-[18px] w-[18px] shrink-0 text-slate-500" />
          Pengaturan
        </Link>
      </div>
    </aside>
  );
}
