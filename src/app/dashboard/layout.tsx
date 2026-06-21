import { DashboardSidebar } from "@/components/dashboard/sidebar";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh bg-slate-50/80">
      <DashboardSidebar />

      {/* Main content area: offset by sidebar width */}
      <div className="ml-[260px] flex flex-1 flex-col">
        <main className="flex-1">{children}</main>

        {/* ——— Footer ——— */}
        <footer className="border-t border-border/60 bg-white px-8 py-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-semibold text-foreground/70">
              ParuScan AI
            </span>
            <div className="flex items-center gap-5">
              <Link href="#" className="transition-colors hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="transition-colors hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="transition-colors hover:text-foreground">
                Medical Disclaimer
              </Link>
            </div>
            <span>© 2024 ParuScan AI. Medical AI Laboratory.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
