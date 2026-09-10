"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Phone,
  MapPin,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Truck,
  Plus,
  Trash2,
  Calendar,
  AlertTriangle,
  X,
} from "lucide-react";

export default function AdminTechniciansPage() {
  const [activeTab, setActiveTab] = useState<"technicians" | "fleet">("technicians");
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [fleetVehicles, setFleetVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showAddTechModal, setShowAddTechModal] = useState(false);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);

  // New Tech Form
  const [techName, setTechName] = useState("");
  const [techPhone, setTechPhone] = useState("");
  const [techEmail, setTechEmail] = useState("");
  const [techSpecialties, setTechSpecialties] = useState("");
  const [techAreas, setTechAreas] = useState("");
  const [isSavingTech, setIsSavingTech] = useState(false);

  // New Vehicle Form
  const [vehPlate, setVehPlate] = useState("");
  const [vehType, setVehType] = useState<"Van" | "Pickup" | "Car">("Van");
  const [vehModel, setVehModel] = useState("");
  const [vehYear, setVehYear] = useState("2024");
  const [vehTechId, setVehTechId] = useState("");
  const [vehMileage, setVehMileage] = useState("");
  const [vehServiceDue, setVehServiceDue] = useState("");
  const [vehNotes, setVehNotes] = useState("");
  const [isSavingVeh, setIsSavingVeh] = useState(false);

  const fetchData = async () => {
    try {
      const [tRes, fRes] = await Promise.all([
        fetch("/api/technicians"),
        fetch("/api/fleet"),
      ]);
      const tData = await tRes.json();
      const fData = await fRes.json();
      setTechnicians(tData.technicians || []);
      setFleetVehicles(fData.vehicles || []);
    } catch (err) {
      console.error("Failed to fetch technicians and fleet", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/technicians", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, active: !currentStatus }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      alert("Failed to toggle technician availability");
    }
  };

  const handleCreateTechnician = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!techName || !techPhone) {
      alert("Technician name and phone are required.");
      return;
    }

    setIsSavingTech(true);
    try {
      const specialtiesArray = techSpecialties
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const areasArray = techAreas
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);

      const res = await fetch("/api/technicians", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: techName,
          phone: techPhone,
          email: techEmail || undefined,
          specialties: specialtiesArray.length > 0 ? specialtiesArray : ["Appliance Repair"],
          serviceAreas: areasArray.length > 0 ? areasArray : ["Sharjah"],
          active: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create technician");
      }

      setShowAddTechModal(false);
      setTechName("");
      setTechPhone("");
      setTechEmail("");
      setTechSpecialties("");
      setTechAreas("");
      await fetchData();
    } catch (err: any) {
      alert(err.message || "Failed to create technician");
    } finally {
      setIsSavingTech(false);
    }
  };

  const handleDeleteTechnician = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove technician ${name}? This action will be logged.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/technicians?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchData();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete technician");
      }
    } catch (err) {
      alert("Failed to delete technician");
    }
  };

  const handleCreateVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehPlate || !vehModel) {
      alert("Plate number and Make/Model are required.");
      return;
    }

    setIsSavingVeh(true);
    try {
      const assignedTech = technicians.find((t) => t.id === vehTechId);
      const res = await fetch("/api/fleet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plateNumber: vehPlate,
          type: vehType,
          makeModel: vehModel,
          year: vehYear ? parseInt(vehYear, 10) : undefined,
          assignedTechnicianId: vehTechId || undefined,
          assignedTechnicianName: assignedTech?.name || undefined,
          status: "active",
          serviceDue: vehServiceDue || undefined,
          mileage: vehMileage || undefined,
          notes: vehNotes || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add fleet vehicle");
      }

      setShowAddVehicleModal(false);
      setVehPlate("");
      setVehModel("");
      setVehMileage("");
      setVehServiceDue("");
      setVehNotes("");
      await fetchData();
    } catch (err: any) {
      alert(err.message || "Failed to add vehicle");
    } finally {
      setIsSavingVeh(false);
    }
  };

  const handleToggleVehicleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "active" ? "maintenance" : "active";
    try {
      const res = await fetch("/api/fleet", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      alert("Failed to update vehicle status");
    }
  };

  const handleDeleteVehicle = async (id: string, plate: string) => {
    if (!confirm(`Are you sure you want to remove fleet vehicle ${plate}?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/fleet?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      alert("Failed to delete vehicle");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Technicians & Service Fleet</h1>
          <p className="text-xs text-slate-400 mt-1">
            Certified on-site engineering personnel, service zones, vehicle allocations, and duty readiness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "technicians" ? (
            <button
              onClick={() => setShowAddTechModal(true)}
              className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold flex items-center gap-2 shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Technician</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAddVehicleModal(true)}
              className="px-4 py-2 rounded-xl bg-brand-blue hover:bg-blue-600 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("technicians")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === "technicians"
              ? "bg-slate-800 text-brand-orange border border-slate-700"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>On-Site Technicians ({technicians.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("fleet")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === "fleet"
              ? "bg-slate-800 text-brand-blue border border-slate-700"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Service Fleet Vehicles ({fleetVehicles.length})</span>
        </button>
      </div>

      {/* TAB 1: TECHNICIANS */}
      {activeTab === "technicians" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 py-12 text-center text-slate-500">
              Loading technician profiles...
            </div>
          ) : technicians.length === 0 ? (
            <div className="col-span-2 py-12 text-center text-slate-500">
              No technicians registered yet. Click &quot;Add Technician&quot; to enroll field personnel.
            </div>
          ) : (
            technicians.map((tech) => (
              <div
                key={tech.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-card hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{tech.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <Phone className="w-3.5 h-3.5 text-brand-orange" />
                      <span>{tech.phone}</span>
                      {tech.email && <span className="text-slate-500">• {tech.email}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAvailability(tech.id, tech.active)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        tech.active
                          ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      {tech.active ? "● On Duty" : "○ Off Duty"}
                    </button>

                    <button
                      onClick={() => handleDeleteTechnician(tech.id, tech.name)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete technician"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
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
                  <span>Active Work Order Allocations:</span>
                  <span className="font-bold text-brand-blue">{tech.assignedJobsCount || 0} Jobs</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: FLEET VEHICLES */}
      {activeTab === "fleet" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 py-12 text-center text-slate-500">
              Loading service fleet...
            </div>
          ) : fleetVehicles.length === 0 ? (
            <div className="col-span-2 py-12 text-center text-slate-500">
              No service vehicles in fleet. Click &quot;Add Vehicle&quot; to register a service van or pickup.
            </div>
          ) : (
            fleetVehicles.map((veh) => (
              <div
                key={veh.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-card hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-black">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-white">{veh.plateNumber}</span>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                          {veh.type}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {veh.makeModel} {veh.year ? `(${veh.year})` : ""}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleVehicleStatus(veh.id, veh.status)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        veh.status === "active"
                          ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                          : veh.status === "maintenance"
                          ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {veh.status === "active"
                        ? "● Road Ready"
                        : veh.status === "maintenance"
                        ? "▲ Workshop Service"
                        : "○ Inactive"}
                    </button>

                    <button
                      onClick={() => handleDeleteVehicle(veh.id, veh.plateNumber)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete vehicle"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">
                      Assigned Driver
                    </span>
                    <span className="text-white font-semibold text-xs mt-0.5 block">
                      {veh.assignedTechnicianName || "Unassigned / Pool Vehicle"}
                    </span>
                  </div>

                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">
                      Next Service Due
                    </span>
                    <span className="text-brand-orange font-semibold text-xs mt-0.5 block">
                      {veh.serviceDue || "Regular Interval"}
                    </span>
                  </div>
                </div>

                {veh.notes && (
                  <div className="text-xs text-slate-400 bg-slate-800/40 p-2.5 rounded-xl">
                    <span className="font-bold text-slate-300 text-[10px] block uppercase mb-0.5">
                      Tooling & Equipment:
                    </span>
                    {veh.notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* MODAL: ADD TECHNICIAN */}
      {showAddTechModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-orange" />
                <span>Enroll On-Site Technician</span>
              </h2>
              <button
                onClick={() => setShowAddTechModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTechnician} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  value={techName}
                  onChange={(e) => setTechName(e.target.value)}
                  placeholder="e.g. Tariq Mansoor"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Phone Number *</label>
                  <input
                    type="text"
                    value={techPhone}
                    onChange={(e) => setTechPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={techEmail}
                    onChange={(e) => setTechEmail(e.target.value)}
                    placeholder="tariq@fixar.in"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Specialties (Comma separated)
                </label>
                <input
                  type="text"
                  value={techSpecialties}
                  onChange={(e) => setTechSpecialties(e.target.value)}
                  placeholder="AC Repair, Compressor Overhaul, Gas Charging"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Service Zones (Comma separated)
                </label>
                <input
                  type="text"
                  value={techAreas}
                  onChange={(e) => setTechAreas(e.target.value)}
                  placeholder="Sharjah, Dubai, Al Majaz, Al Barsha"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddTechModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingTech}
                  className="px-5 py-2 rounded-xl bg-brand-orange text-white font-bold hover:bg-brand-orange-hover disabled:opacity-50"
                >
                  {isSavingTech ? "Saving..." : "Enroll Technician"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD VEHICLE */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-brand-blue" />
                <span>Register Fleet Vehicle</span>
              </h2>
              <button
                onClick={() => setShowAddVehicleModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVehicle} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Plate Number *</label>
                  <input
                    type="text"
                    value={vehPlate}
                    onChange={(e) => setVehPlate(e.target.value)}
                    placeholder="e.g. SHJ-44912"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 uppercase"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Vehicle Type</label>
                  <select
                    value={vehType}
                    onChange={(e: any) => setVehType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Van">Service Van (HiAce/Urvan)</option>
                    <option value="Pickup">Heavy Pickup (Hilux/Navara)</option>
                    <option value="Car">Utility Car</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Make & Model *</label>
                  <input
                    type="text"
                    value={vehModel}
                    onChange={(e) => setVehModel(e.target.value)}
                    placeholder="Toyota HiAce High Roof"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Model Year</label>
                  <input
                    type="number"
                    value={vehYear}
                    onChange={(e) => setVehYear(e.target.value)}
                    placeholder="2024"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Assign Technician (Driver)
                </label>
                <select
                  value={vehTechId}
                  onChange={(e) => setVehTechId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="">-- Unassigned / Workshop Pool --</option>
                  {technicians.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Current Mileage</label>
                  <input
                    type="text"
                    value={vehMileage}
                    onChange={(e) => setVehMileage(e.target.value)}
                    placeholder="45,000 km"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Next Service Due</label>
                  <input
                    type="date"
                    value={vehServiceDue}
                    onChange={(e) => setVehServiceDue(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Tooling & On-Board Equipment Notes
                </label>
                <textarea
                  value={vehNotes}
                  onChange={(e) => setVehNotes(e.target.value)}
                  rows={2}
                  placeholder="Vacuum pump, R410A gas, welding torch, pipe bender..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddVehicleModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingVeh}
                  className="px-5 py-2 rounded-xl bg-brand-blue text-white font-bold hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSavingVeh ? "Saving..." : "Register Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
