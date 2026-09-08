"use client";

import React, { useState, useEffect } from "react";
import { Users, Phone, MapPin, Wrench, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";

export default function AdminTechniciansPage() {
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTechs = async () => {
    try {
      const res = await fetch("/api/technicians");
      const data = await res.json();
      setTechnicians(data.technicians || []);
    } catch (err) {
      console.error("Failed to fetch technicians", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechs();
  }, []);

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/technicians", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, active: !currentStatus }),
      });

      if (res.ok) {
        await fetchTechs();
      }
    } catch (err) {
      alert("Failed to toggle technician availability");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Technician Fleet Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Certified on-site engineering personnel, service zones, and duty availability.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 py-12 text-center text-slate-500">
            Loading technician profiles...
          </div>
        ) : (
          technicians.map((tech) => (
            <div
              key={tech.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-card"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{tech.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-brand-orange" />
                    <span>{tech.phone}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleAvailability(tech.id, tech.active)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    tech.active
                      ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {tech.active ? "● Available On Duty" : "○ Off Duty"}
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-400 block text-[10px] uppercase">
                    Technical Specialties:
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tech.specialties.map((spec: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-slate-800 text-slate-200 px-2.5 py-0.5 rounded text-[11px] font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-bold text-slate-400 block text-[10px] uppercase">
                    Primary Service Zones:
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tech.serviceAreas.map((area: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-blue-500/10 text-blue-300 px-2.5 py-0.5 rounded text-[11px]"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Active Assignments:</span>
                <span className="font-bold text-brand-blue">{tech.assignedJobsCount} Jobs</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
