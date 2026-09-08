"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Calendar,
  User,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Edit,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Update modal state
  const [editStatus, setEditStatus] = useState("");
  const [editTechId, setEditTechId] = useState("");
  const [editNote, setEditNote] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bRes, tRes] = await Promise.all([
        fetch(`/api/bookings?status=${statusFilter}&search=${encodeURIComponent(search)}`),
        fetch("/api/technicians"),
      ]);

      const bData = await bRes.json();
      const tData = await tRes.json();

      setBookings(bData.bookings || []);
      setTechnicians(tData.technicians || []);
    } catch (err) {
      console.error("Failed to load admin bookings data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const openEditModal = (booking: any) => {
    setSelectedBooking(booking);
    setEditStatus(booking.status);
    setEditTechId(booking.assignedTechnicianId || "");
    setEditNote(booking.internalNotes || "");
  };

  const handleSaveStatusUpdate = async () => {
    if (!selectedBooking) return;
    setIsUpdating(true);

    try {
      const res = await fetch(`/api/bookings/${selectedBooking.reference}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          note: editNote,
          assignedTechId: editTechId || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update booking status");
      }

      // Close modal and refresh list
      setSelectedBooking(null);
      await fetchData();
    } catch (err: any) {
      alert(err.message || "Failed to save updates");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Booking Management Console</h1>
          <p className="text-xs text-slate-400 mt-1">
            Track appointments, assign specialized technicians, and synchronize live customer progress.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <form onSubmit={handleSearchSubmit} className="flex-1 w-full flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reference, customer name, phone, city..."
              className="w-full px-3.5 py-2.5 ps-9 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs focus:ring-2 focus:ring-brand-blue outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold transition-colors"
          >
            Filter
          </button>
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium text-xs focus:ring-2 focus:ring-brand-blue outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="new">New Requests</option>
            <option value="accepted">Accepted</option>
            <option value="assigned">Assigned</option>
            <option value="technician_en_route">Technician En Route</option>
            <option value="inspection">Inspection</option>
            <option value="consultation_completed">Consultation Completed</option>
            <option value="quote_provided">Quote Provided</option>
            <option value="approved">Approved</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs text-slate-300">
            <thead className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800/60 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 text-start">Reference</th>
                <th className="py-3 px-4 text-start">Customer Details</th>
                <th className="py-3 px-4 text-start">Service & Brand</th>
                <th className="py-3 px-4 text-start">Location</th>
                <th className="py-3 px-4 text-start">Schedule</th>
                <th className="py-3 px-4 text-start">Assigned Tech</th>
                <th className="py-3 px-4 text-start">Status</th>
                <th className="py-3 px-4 text-end">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    Loading booking records...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No bookings found matching criteria.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-brand-orange">
                      {b.reference}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{b.customerName}</div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-0.5">
                        <a href={`tel:${b.customerPhone}`} className="hover:text-brand-orange">
                          {b.customerPhone}
                        </a>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-200">{b.serviceTitle}</div>
                      <div className="text-[10px] text-slate-400">
                        {b.brand} {b.model ? `• ${b.model}` : ""}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-white">{b.city}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                        {b.area} - {b.address?.building}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{b.appointmentDate}</div>
                      <div className="text-[10px] text-slate-400">{b.appointmentSlot.split("(")[0]}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      {b.assignedTechnicianName ? (
                        <span className="text-brand-blue font-semibold">{b.assignedTechnicianName}</span>
                      ) : (
                        <span className="text-slate-500 italic">Unassigned</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
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

                    <td className="py-3.5 px-4 text-end">
                      <button
                        onClick={() => openEditModal(b)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 ms-auto transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Update</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Booking Status & Assignment Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 text-xs shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  Update Booking: {selectedBooking.reference}
                </h3>
                <span className="text-slate-400">
                  {selectedBooking.customerName} • {selectedBooking.serviceTitle}
                </span>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 font-bold mb-1 uppercase text-[10px]">
                  Change Booking Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                >
                  <option value="new">New Booking</option>
                  <option value="accepted">Accepted</option>
                  <option value="assigned">Assigned</option>
                  <option value="technician_en_route">Technician En Route</option>
                  <option value="inspection">On-Site Inspection</option>
                  <option value="consultation_completed">Consultation Completed</option>
                  <option value="quote_provided">Quote Provided</option>
                  <option value="approved">Approved by Customer</option>
                  <option value="in_progress">Repair In Progress</option>
                  <option value="completed">Job Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1 uppercase text-[10px]">
                  Assign Dedicated Technician
                </label>
                <select
                  value={editTechId}
                  onChange={(e) => setEditTechId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                >
                  <option value="">-- Select Technician --</option>
                  {technicians.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.specialties.join(", ")})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1 uppercase text-[10px]">
                  Audit Note / Internal Remarks
                </label>
                <textarea
                  rows={3}
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  placeholder="E.g., Customer confirmed 2:00 PM visit. Technician carrying replacement compressor capacitor."
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isUpdating}
                onClick={handleSaveStatusUpdate}
                className="px-5 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold flex items-center gap-1.5 shadow-md disabled:opacity-50"
              >
                <span>{isUpdating ? "Saving..." : "Save & Sync Status"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
