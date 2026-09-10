"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Search,
  Filter,
  Check,
  Truck,
  FileCheck,
} from "lucide-react";
import { BookingRecord, BookingStatus } from "@/lib/db/types";

export default function StaffDashboardPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingRef, setUpdatingRef] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<Record<string, string>>({});

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (ref: string, newStatus: BookingStatus, note?: string) => {
    setUpdatingRef(ref);
    try {
      const res = await fetch(`/api/bookings/${ref}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          note: note || `Operational status marked as ${newStatus.replace(/_/g, " ")} by field staff`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      await fetchBookings();
    } catch (err: any) {
      alert(err.message || "Failed to update booking status");
    } finally {
      setUpdatingRef(null);
    }
  };

  const handleSaveNote = async (ref: string) => {
    const text = noteText[ref];
    if (!text || !text.trim()) return;

    setUpdatingRef(ref);
    try {
      const booking = bookings.find((b) => b.reference === ref);
      const currentStatus = booking ? booking.status : "in_progress";

      const res = await fetch(`/api/bookings/${ref}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: currentStatus,
          note: text.trim(),
        }),
      });

      if (res.ok) {
        setNoteText((prev) => ({ ...prev, [ref]: "" }));
        await fetchBookings();
      }
    } catch (err) {
      alert("Failed to save note");
    } finally {
      setUpdatingRef(null);
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];

  const todayCount = bookings.filter((b) => b.appointmentDate === todayStr).length;
  const inProgressCount = bookings.filter(
    (b) => b.status === "in_progress" || b.status === "inspection" || b.status === "technician_en_route"
  ).length;
  const completedCount = bookings.filter((b) => b.status === "completed").length;
  const newCount = bookings.filter((b) => b.status === "new" || b.status === "accepted").length;

  const filtered = bookings.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        b.reference.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.customerPhone.includes(q) ||
        b.serviceTitle.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 text-slate-100">
      {/* KPI Header Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
          <span className="text-[11px] font-bold text-amber-400 uppercase">Incoming & Accepted</span>
          <div className="text-2xl font-black mt-1 text-white">{newCount}</div>
          <span className="text-[10px] text-slate-500">Awaiting Service</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
          <span className="text-[11px] font-bold text-brand-blue uppercase">Today's Schedule</span>
          <div className="text-2xl font-black mt-1 text-white">{todayCount}</div>
          <span className="text-[10px] text-slate-500">Date: {todayStr}</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
          <span className="text-[11px] font-bold text-sky-400 uppercase">Active In Progress</span>
          <div className="text-2xl font-black mt-1 text-white">{inProgressCount}</div>
          <span className="text-[10px] text-slate-500">Field Diagnostics / Repair</span>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
          <span className="text-[11px] font-bold text-emerald-400 uppercase">Completed Jobs</span>
          <div className="text-2xl font-black mt-1 text-white">{completedCount}</div>
          <span className="text-[10px] text-slate-500">Finished Successfully</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search booking reference, customer name, phone, area..."
            className="w-full px-3.5 py-2.5 ps-9 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:ring-2 focus:ring-brand-blue outline-none"
          />
          <Search className="w-4 h-4 text-slate-500 absolute start-3 top-3" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none"
          >
            <option value="all">All Jobs</option>
            <option value="new">New Requests</option>
            <option value="accepted">Accepted</option>
            <option value="assigned">Assigned</option>
            <option value="technician_en_route">En Route</option>
            <option value="inspection">On-Site Inspection</option>
            <option value="consultation_completed">Consultation Done</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Jobs Feed Cards */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            Loading technician jobs queue...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm bg-slate-950 rounded-2xl border border-slate-800">
            No service jobs matching this criteria.
          </div>
        ) : (
          filtered.map((job) => {
            const isWorkingOnThis = updatingRef === job.reference;
            const whatsappMsg = encodeURIComponent(
              `Hello ${job.customerName}, this is Fixar Service technician regarding your ${job.serviceTitle} appointment (${job.reference}).`
            );

            return (
              <div
                key={job.id}
                className="bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-4 shadow-card hover:border-slate-700 transition-colors"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-mono font-black text-sm text-brand-orange">
                        {job.reference}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          job.status === "new"
                            ? "bg-amber-500/20 text-amber-300"
                            : job.status === "completed"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : job.status === "cancelled"
                            ? "bg-rose-500/20 text-rose-300"
                            : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {job.status.replace(/_/g, " ")}
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-white mt-1">
                      {job.serviceTitle} — {job.brand} {job.model ? `(${job.model})` : ""}
                    </h2>
                  </div>

                  {/* Customer Quick Contact Actions */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${job.customerPhone}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-800"
                      title="Call Customer"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-orange" />
                      <bdi>{job.customerPhone}</bdi>
                    </a>

                    <a
                      href={`https://wa.me/${(job.customerWhatsapp || job.customerPhone).replace(/\+/g, "")}?text=${whatsappMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/30"
                      title="Chat on WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${job.address?.building || ""} ${job.address?.street || ""} ${job.area}, ${job.city}, UAE`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-800"
                      title="Open in Google Maps"
                    >
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>Map</span>
                    </a>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Customer</span>
                    <div className="font-semibold text-white">{job.customerName}</div>
                    <div className="text-slate-400">{job.customerEmail || "No email provided"}</div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Address & Landmark</span>
                    <div className="font-semibold text-white">
                      {job.city} - {job.area}
                    </div>
                    <div className="text-slate-400">
                      {job.address?.building} {job.address?.apartment ? `, Apt ${job.address.apartment}` : ""},{" "}
                      {job.address?.street}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Appointment Window</span>
                    <div className="font-semibold text-brand-blue">{job.appointmentDate}</div>
                    <div className="text-slate-400">{job.appointmentSlot}</div>
                  </div>
                </div>

                {/* Problem Description Callout */}
                {job.description && (
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800/80 text-xs">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                      Problem Symptom & Client Description:
                    </span>
                    <p className="text-slate-200 italic">"{job.description}"</p>
                  </div>
                )}

                {/* Internal Notes Display */}
                {job.internalNotes && (
                  <div className="p-3.5 rounded-2xl bg-blue-950/20 border border-blue-900/40 text-xs">
                    <span className="text-[10px] font-bold uppercase text-brand-blue block mb-1">
                      Internal Audit Remarks:
                    </span>
                    <p className="text-slate-300">{job.internalNotes}</p>
                  </div>
                )}

                {/* Operational Quick Actions (Buttons for Staff) */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {job.status === "new" && (
                      <button
                        disabled={isWorkingOnThis}
                        onClick={() => handleStatusChange(job.reference, "accepted", "Request accepted by field technician")}
                        className="px-3 py-1.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold transition-all disabled:opacity-50"
                      >
                        ✓ Accept Request
                      </button>
                    )}

                    {job.status !== "technician_en_route" && job.status !== "completed" && job.status !== "cancelled" && (
                      <button
                        disabled={isWorkingOnThis}
                        onClick={() => handleStatusChange(job.reference, "technician_en_route", "Technician dispatched and en route")}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Truck className="w-3.5 h-3.5 text-brand-orange" />
                        <span>En Route</span>
                      </button>
                    )}

                    {job.status !== "inspection" && job.status !== "completed" && job.status !== "cancelled" && (
                      <button
                        disabled={isWorkingOnThis}
                        onClick={() => handleStatusChange(job.reference, "inspection", "On-site diagnostics and inspection started")}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Wrench className="w-3.5 h-3.5 text-sky-400" />
                        <span>Inspection</span>
                      </button>
                    )}

                    {job.status !== "consultation_completed" && job.status !== "completed" && job.status !== "cancelled" && (
                      <button
                        disabled={isWorkingOnThis}
                        onClick={() => handleStatusChange(job.reference, "consultation_completed", "Diagnostic consultation completed with homeowner")}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-purple-400" />
                        <span>Consultation Done</span>
                      </button>
                    )}

                    {job.status !== "in_progress" && job.status !== "completed" && job.status !== "cancelled" && (
                      <button
                        disabled={isWorkingOnThis}
                        onClick={() => handleStatusChange(job.reference, "in_progress", "Repair work actively in progress")}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Wrench className="w-3.5 h-3.5 text-amber-400" />
                        <span>In Progress</span>
                      </button>
                    )}

                    {job.status !== "completed" && (
                      <button
                        disabled={isWorkingOnThis}
                        onClick={() => handleStatusChange(job.reference, "completed", "Job successfully completed and verified")}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Completed</span>
                      </button>
                    )}
                  </div>

                  {/* Add Quick Operational Note */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      value={noteText[job.reference] || ""}
                      onChange={(e) => setNoteText({ ...noteText, [job.reference]: e.target.value })}
                      placeholder="Add field note..."
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs outline-none focus:ring-1 focus:ring-brand-blue"
                    />
                    <button
                      onClick={() => handleSaveNote(job.reference)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
