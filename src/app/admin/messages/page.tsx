"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Phone, Mail, Clock, CheckCircle } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-black text-white">Customer Inquiries & Feedback</h1>
        <p className="text-xs text-slate-400 mt-1">
          Messages received from website contact forms and online quotation requests.
        </p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-slate-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="py-12 text-center text-slate-500">No customer messages received yet.</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-card"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">{msg.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 pt-0.5">
                    <a href={`tel:${msg.phone}`} className="flex items-center gap-1 hover:text-brand-orange">
                      <Phone className="w-3 h-3 text-brand-orange" />
                      <span>{msg.phone}</span>
                    </a>
                    {msg.email && (
                      <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-brand-blue">
                        <Mail className="w-3 h-3" />
                        <span>{msg.email}</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="font-bold text-brand-orange">{msg.subject}</div>
                <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
