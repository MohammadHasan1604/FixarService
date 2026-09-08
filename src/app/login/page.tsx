"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Wrench, Shield, User, Lock, ArrowRight, AlertCircle, ArrowLeft } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLocale();

  const requestedRole = searchParams.get("role") === "admin" ? "admin" : "staff";
  const [activeTab, setActiveTab] = useState<"staff" | "admin">(requestedRole);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const role = searchParams.get("role");
    if (role === "admin" || role === "staff") {
      setActiveTab(role);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
          requestedRole: activeTab,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/staff");
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please verify your login details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-900 flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-slate-950 border border-slate-800 rounded-3xl p-7 sm:p-10 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center shadow-lg shadow-brand-orange/30">
              <Wrench className="w-5 h-5 -rotate-12" />
            </div>
            <div className="text-start">
              <div className="text-xl font-black text-white tracking-tight">FIXAR SERVICE</div>
              <div className="text-[10px] text-slate-400 font-semibold tracking-wide">
                {language === "ar" ? "بوابة العمليات المعتمدة" : "Authorized Personnel Portal"}
              </div>
            </div>
          </Link>
        </div>

        {/* Tab Selector: Staff vs Admin */}
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab("staff");
              setError(null);
            }}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === "staff"
                ? "bg-brand-blue text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <User className="w-4 h-4" />
            <span>{language === "ar" ? "دخول الفنيين / الموظفين" : "Staff Portal"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("admin");
              setError(null);
            }}
            className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === "admin"
                ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>{language === "ar" ? "لوحة الإدارة" : "Admin Console"}</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider text-[10px]">
              {activeTab === "admin" ? "Admin Identifier / Email" : "Staff Username / ID"}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={activeTab === "admin" ? "admin" : "staff"}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none placeholder-slate-500"
              />
              <User className="w-4 h-4 text-slate-500 absolute end-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider text-[10px]">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none placeholder-slate-500"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute end-3.5 top-3" />
            </div>
          </div>

          <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-700 bg-slate-800 text-brand-blue focus:ring-brand-blue"
              />
              <span>Remember this terminal</span>
            </label>

            <span className="text-slate-500">Contact Supervisor</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50 ${
              activeTab === "admin"
                ? "bg-brand-orange hover:bg-brand-orange-hover shadow-brand-orange/20"
                : "bg-brand-blue hover:bg-brand-blue-dark shadow-brand-blue/20"
            }`}
          >
            <span>
              {loading
                ? "Verifying..."
                : activeTab === "admin"
                ? "Sign In to Admin Console"
                : "Sign In to Staff Portal"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-300 inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">Loading portal...</div>}>
      <LoginContent />
    </Suspense>
  );
}
