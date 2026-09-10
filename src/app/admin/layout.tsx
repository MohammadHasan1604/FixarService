"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Wrench,
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  UserCheck,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // If on /admin/login, render without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/verify", { method: "POST" });
      document.cookie = "fixar_admin_token=; path=/; max-age=0;";
      document.cookie = "fixar_auth_token=; path=/; max-age=0;";
    } catch {}
    router.push("/login?role=admin");
  };

  const navItems = [
    { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
    { href: "/admin/bookings", label: "Manage Bookings", icon: Calendar },
    { href: "/admin/technicians", label: "Technicians & Fleet", icon: Users },
    { href: "/admin/staff", label: "Staff Accounts", icon: UserCheck },
    { href: "/admin/messages", label: "Customer Inquiries", icon: MessageSquare },
    { href: "/admin/settings", label: "Business Settings CMS", icon: Settings },
    { href: "/admin/audit", label: "Audit & Security Logs", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center">
            <Wrench className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white">FIXAR OPERATIONS</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 start-0 z-50 w-64 bg-slate-900 border-e border-slate-800 flex flex-col justify-between p-5 transform transition-transform duration-200 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-9 h-9 rounded-xl bg-brand-orange text-white flex items-center justify-center shadow-md shadow-brand-orange/30">
              <Wrench className="w-5 h-5 -rotate-12" />
            </div>
            <div>
              <div className="font-black text-sm text-white tracking-tight">FIXAR ADMIN</div>
              <div className="text-[10px] text-slate-400">Operations Control Desk</div>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-brand-blue text-white shadow-md"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-brand-orange" />
              <span>View Public Site</span>
            </span>
            <span className="text-[10px] bg-slate-700 px-1.5 py-0.5 rounded">Live</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full overflow-x-auto">
        {children}
      </main>
    </div>
  );
}
