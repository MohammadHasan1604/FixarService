"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Wrench, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-orange text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-orange/30">
            <Wrench className="w-6 h-6 -rotate-12" />
          </div>
          <h1 className="text-2xl font-black text-white">FIXAR SERVICE</h1>
          <p className="text-xs text-slate-400">Secure Dispatch & Operations Portal</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[10px]">
              Administrator Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none"
              />
              <User className="w-4 h-4 text-slate-400 absolute end-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1.5 uppercase tracking-wider text-[10px]">
              Security Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute end-3 top-3" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20 transition-all disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Operations Console"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="p-3 bg-slate-800/60 rounded-xl text-[11px] text-slate-400 border border-slate-700/60 space-y-1">
          <div className="font-semibold text-slate-300">Default Authorized Setup:</div>
          <div>User: <code className="text-brand-orange">admin</code></div>
          <div>Password: <code className="text-brand-orange">fixar2026@admin</code></div>
        </div>
      </div>
    </div>
  );
}
