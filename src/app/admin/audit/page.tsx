"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Search, RefreshCw, Filter, Clock, User, FileText, AlertCircle } from "lucide-react";
import { AuditLogRecord } from "@/lib/db/types";

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<AuditLogRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/audit?limit=200");
      if (!res.ok) {
        throw new Error("Failed to load audit logs");
      }
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (err: any) {
      setError(err.message || "Failed to load logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      !searchTerm ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.entityId && log.entityId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesAction =
      actionFilter === "all" ||
      (actionFilter === "booking" && log.entityType === "booking") ||
      (actionFilter === "staff" && log.entityType === "staff") ||
      (actionFilter === "technician" && log.entityType === "technician") ||
      (actionFilter === "auth" && (log.action.includes("LOGIN") || log.action.includes("AUTH")));

    return matchesSearch && matchesAction;
  });

  const getActionBadgeColor = (action: string) => {
    if (action.includes("DELETE") || action.includes("CANCEL") || action.includes("FAILED")) {
      return "bg-rose-500/10 text-rose-400 border-rose-500/30";
    }
    if (action.includes("CREATE") || action.includes("COMPLETE")) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    }
    if (action.includes("UPDATE") || action.includes("ASSIGN") || action.includes("STATUS")) {
      return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    }
    return "bg-slate-500/10 text-slate-300 border-slate-700";
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-brand-blue flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Security & Audit Log
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Immutable chronological trail of operational and privileged system mutations
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={fetchLogs}
          disabled={loading}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative sm:col-span-2">
          <Search className="w-4 h-4 text-slate-500 absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by action, actor, entity ID..."
            className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
          />
        </div>

        <div className="relative">
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none cursor-pointer"
          >
            <option value="all">All Event Categories</option>
            <option value="booking">Bookings & Status</option>
            <option value="staff">Staff Operations</option>
            <option value="technician">Technicians & Fleet</option>
            <option value="auth">Authentication & Sessions</option>
          </select>
        </div>
      </div>

      {/* Log Feed */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-blue" />
            <p>Loading encrypted audit trail...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-rose-400 text-xs space-y-2">
            <AlertCircle className="w-6 h-6 mx-auto" />
            <p>{error}</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No audit logs recorded matching this query.
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 sm:p-5 hover:bg-slate-800/40 transition-colors space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold border ${getActionBadgeColor(
                        log.action
                      )}`}
                    >
                      {log.action}
                    </span>
                    <span className="text-xs text-slate-300 font-semibold">
                      {log.entityType} {log.entityId ? `[${log.entityId}]` : ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-slate-300">
                      <User className="w-3 h-3 text-slate-500" />
                      Actor: <strong className="text-white font-medium">{log.actorId}</strong>
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 uppercase font-semibold">
                      {log.actorRole}
                    </span>
                  </div>

                  {log.metadata && Object.keys(log.metadata).length > 0 && (
                    <div className="font-mono text-[11px] bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300 max-w-full overflow-x-auto">
                      {JSON.stringify(log.metadata)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
