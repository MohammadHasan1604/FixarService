import React from "react";
import Link from "next/link";
import { getAllBookings, getAllContactMessages, getAllTechnicians } from "@/lib/db";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Wrench,
  XCircle,
  Users,
  MessageSquare,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function AdminDashboardOverview() {
  const bookings = getAllBookings();
  const messages = getAllContactMessages();
  const technicians = getAllTechnicians();

  const newCount = bookings.filter((b) => b.status === "new").length;
  const acceptedCount = bookings.filter((b) => b.status === "accepted").length;
  const assignedCount = bookings.filter((b) => b.status === "assigned").length;
  const inProgressCount = bookings.filter(
    (b) =>
      b.status === "technician_en_route" ||
      b.status === "in_progress" ||
      b.status === "inspection" ||
      b.status === "consultation_completed" ||
      b.status === "quote_provided" ||
      b.status === "approved"
  ).length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;
  const cancelledCount = bookings.filter((b) => b.status === "cancelled").length;

  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Operations Command Center</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time monitoring of service dispatches, technician allocations, and client inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/bookings"
            className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Manage All Bookings</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid - 6 Cards matching specification */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-[11px] font-semibold">New Requests</span>
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-white">{newCount}</div>
          <div className="text-[10px] text-slate-500">Unconfirmed</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-sky-400">
            <span className="text-[11px] font-semibold">Accepted</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-white">{acceptedCount}</div>
          <div className="text-[10px] text-slate-500">Ready for tech</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-indigo-400">
            <span className="text-[11px] font-semibold">Assigned</span>
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-white">{assignedCount}</div>
          <div className="text-[10px] text-slate-500">Tech allocated</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-brand-orange">
            <span className="text-[11px] font-semibold">In Progress</span>
            <Wrench className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-white">{inProgressCount}</div>
          <div className="text-[10px] text-slate-500">On-site / En Route</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-[11px] font-semibold">Completed</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-white">{completedCount}</div>
          <div className="text-[10px] text-slate-500">Jobs finalized</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-rose-400">
            <span className="text-[11px] font-semibold">Cancelled</span>
            <XCircle className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl font-black text-white">{cancelledCount}</div>
          <div className="text-[10px] text-slate-500">Voided</div>
        </div>
      </div>

      {/* Grid: Recent Bookings & Fleet Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Recent Service Requests</h2>
              <p className="text-xs text-slate-400">Latest orders submitted across UAE and regional branches.</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs font-bold text-brand-blue hover:text-sky-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs text-slate-300">
              <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800 pb-2">
                <tr>
                  <th className="text-start py-2">Reference</th>
                  <th className="text-start py-2">Customer</th>
                  <th className="text-start py-2">Service</th>
                  <th className="text-start py-2">Date / Slot</th>
                  <th className="text-start py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 font-mono font-bold text-brand-orange">
                      <Link href={`/admin/bookings?ref=${b.reference}`}>{b.reference}</Link>
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-white">{b.customerName}</div>
                      <div className="text-[10px] text-slate-400">{b.city}</div>
                    </td>
                    <td className="py-3">{b.serviceTitle}</td>
                    <td className="py-3">
                      <div>{b.appointmentDate}</div>
                      <div className="text-[10px] text-slate-500">{b.appointmentSlot.split("(")[0]}</div>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          b.status === "new"
                            ? "bg-amber-500/20 text-amber-300"
                            : b.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : b.status === "cancelled"
                            ? "bg-rose-500/20 text-rose-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {b.status.replace(/_/g, " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fleet Technicians Overview */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Technician Fleet</h2>
            <Link
              href="/admin/technicians"
              className="text-xs font-bold text-brand-blue hover:text-sky-300"
            >
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {technicians.map((tech) => (
              <div
                key={tech.id}
                className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{tech.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tech.active ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {tech.active ? "Available" : "Off Duty"}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {tech.specialties.join(", ")}
                </div>
                <div className="text-[10px] text-slate-500">
                  Active Jobs Assigned: {tech.assignedJobsCount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
