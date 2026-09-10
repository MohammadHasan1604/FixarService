"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Calendar,
  Trash2,
  Check,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [convertingId, setConvertingId] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error("Failed to load contact messages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateMessageStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus, read: true }),
      });

      if (res.ok) {
        setActionSuccess(`Status updated to ${newStatus}`);
        setTimeout(() => setActionSuccess(null), 3000);
        await fetchMessages();
      }
    } catch (err) {
      alert("Failed to update message status");
    }
  };

  const handleConvertToBooking = async (msg: any) => {
    if (!confirm(`Convert inquiry from ${msg.name} into an official service booking?`)) {
      return;
    }

    setConvertingId(msg.id);
    try {
      // Determine probable service from subject or default to AC repair
      let serviceId = "ac-repair";
      let serviceTitle = "Air Conditioner Repair & Servicing";
      const subjectLower = (msg.subject || "").toLowerCase();
      if (subjectLower.includes("fridge") || subjectLower.includes("refrigerator")) {
        serviceId = "refrigerator-repair";
        serviceTitle = "Refrigerator & Freezer Repair";
      } else if (subjectLower.includes("washing") || subjectLower.includes("dryer")) {
        serviceId = "washing-machine-repair";
        serviceTitle = "Washing Machine & Dryer Repair";
      }

      const todayStr = new Date().toISOString().split("T")[0];

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: msg.name,
          customerPhone: msg.phone,
          customerEmail: msg.email || undefined,
          serviceId,
          serviceTitle,
          problemCategory: msg.subject || "Customer Inquiry Conversion",
          description: msg.message,
          city: "Sharjah",
          area: "Main District",
          appointmentDate: todayStr,
          appointmentSlot: "Morning (09:00 AM - 01:00 PM)",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create booking from inquiry");
      }

      // Mark inquiry as converted with booking reference
      await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: msg.id,
          status: "converted",
          read: true,
          convertedBookingRef: data.reference,
        }),
      });

      alert(`Inquiry successfully converted to booking ${data.reference}!`);
      await fetchMessages();
    } catch (err: any) {
      alert(err.message || "Failed to convert inquiry to booking");
    } finally {
      setConvertingId(null);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to remove this inquiry?")) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchMessages();
      }
    } catch (err) {
      alert("Failed to delete inquiry");
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const currentStatus = msg.status || (msg.read ? "read" : "new");
    if (activeTab !== "all" && currentStatus !== activeTab) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        (msg.name || "").toLowerCase().includes(q) ||
        (msg.phone || "").includes(q) ||
        (msg.subject || "").toLowerCase().includes(q) ||
        (msg.message || "").toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const getStatusBadge = (msg: any) => {
    const status = msg.status || (msg.read ? "read" : "new");
    switch (status) {
      case "new":
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold">● New Inquiry</span>;
      case "contacted":
        return <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold">✓ Contacted</span>;
      case "converted":
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold">★ Converted to Booking</span>;
      case "resolved":
        return <span className="bg-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full text-[10px] font-bold">Closed</span>;
      default:
        return <span className="bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold">Read</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Customer Inquiries & CRM Inbox</h1>
          <p className="text-xs text-slate-400 mt-1">
            Incoming website leads, quotation requests, client follow-up tracking, and direct booking conversion.
          </p>
        </div>

        {actionSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{actionSuccess}</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { key: "all", label: "All Messages" },
            { key: "new", label: "New Leads" },
            { key: "contacted", label: "Contacted" },
            { key: "converted", label: "Converted" },
            { key: "resolved", label: "Resolved" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === tab.key
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads, phone, subject..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl ps-9 pe-3 py-1.5 text-xs text-white placeholder-slate-500"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading inquiries...</div>
        ) : filteredMessages.length === 0 ? (
          <div className="py-12 text-center text-slate-500 bg-slate-900/50 border border-slate-800 rounded-3xl p-8">
            <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <div className="text-sm font-bold text-slate-400">No matching inquiries found</div>
            <div className="text-xs text-slate-600 mt-1">Try switching tabs or clearing your search filters.</div>
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const cleanPhone = (msg.phone || "").replace(/\D/g, "");
            const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `Hello ${msg.name}, thank you for contacting Fixar Service regarding: "${msg.subject}". How can our engineering team assist you today?`
            )}`;

            return (
              <div
                key={msg.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-card hover:border-slate-700 transition-colors"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{msg.name}</h3>
                      {getStatusBadge(msg)}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                      <a
                        href={`tel:${msg.phone}`}
                        className="flex items-center gap-1 hover:text-brand-orange text-slate-300 font-medium"
                      >
                        <Phone className="w-3 h-3 text-brand-orange" />
                        <span>{msg.phone}</span>
                      </a>
                      {msg.email && (
                        <a
                          href={`mailto:${msg.email}`}
                          className="flex items-center gap-1 hover:text-brand-blue text-slate-400"
                        >
                          <Mail className="w-3 h-3" />
                          <span>{msg.email}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(msg.createdAt).toLocaleString()}</span>
                    </div>

                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="text-slate-600 hover:text-rose-400 transition-colors p-1"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="space-y-1.5 text-xs">
                  <div className="font-bold text-brand-orange text-sm">{msg.subject}</div>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-950/50 p-3 rounded-2xl border border-slate-800/80">
                    {msg.message}
                  </p>
                </div>

                {/* If converted, show booking link */}
                {msg.convertedBookingRef && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                    <span className="flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Converted to Work Order: {msg.convertedBookingRef}</span>
                    </span>
                    <a
                      href={`/track-booking?ref=${msg.convertedBookingRef}&phone=${encodeURIComponent(msg.phone)}`}
                      target="_blank"
                      className="underline font-bold hover:text-emerald-200"
                    >
                      Track Job
                    </a>
                  </div>
                )}

                {/* Quick Action Buttons */}
                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${msg.phone}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-orange" />
                      <span>Call Client</span>
                    </a>

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Follow-Up</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    {msg.status !== "contacted" && (
                      <button
                        onClick={() => updateMessageStatus(msg.id, "contacted")}
                        className="px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold"
                      >
                        Mark Contacted
                      </button>
                    )}

                    {msg.status !== "resolved" && (
                      <button
                        onClick={() => updateMessageStatus(msg.id, "resolved")}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-semibold"
                      >
                        Resolve
                      </button>
                    )}

                    {!msg.convertedBookingRef && (
                      <button
                        onClick={() => handleConvertToBooking(msg)}
                        disabled={convertingId === msg.id}
                        className="px-4 py-1.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold flex items-center gap-1.5 shadow-sm transition-colors disabled:opacity-50"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{convertingId === msg.id ? "Converting..." : "Convert to Booking"}</span>
                      </button>
                    )}
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
