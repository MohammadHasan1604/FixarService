"use client";

import React, { useState, useEffect } from "react";
import {
  UserCheck,
  Plus,
  Search,
  RefreshCw,
  Edit2,
  Trash2,
  Shield,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { StaffMemberRecord } from "@/lib/db/types";
import ConfirmActionDialog, { FieldChange } from "@/components/admin/ConfirmActionDialog";
import DangerConfirmationDialog from "@/components/admin/DangerConfirmationDialog";

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<StaffMemberRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMemberRecord | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "staff" as "staff" | "technician",
    assignedAreas: "Sharjah, Dubai",
    active: true,
  });

  // Two-stage confirmation states
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    mode: "create" | "update";
    changes: FieldChange[];
    payload: any;
  }>({
    isOpen: false,
    mode: "create",
    changes: [],
    payload: null,
  });

  const [dangerDialog, setDangerDialog] = useState<{
    isOpen: boolean;
    staffId: string;
    staffName: string;
  }>({
    isOpen: false,
    staffId: "",
    staffName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/staff");
      if (res.ok) {
        const data = await res.json();
        setStaffList(data.staff || []);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const openCreateModal = () => {
    setEditingStaff(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "staff",
      assignedAreas: "Sharjah, Dubai",
      active: true,
    });
    setIsFormOpen(true);
  };

  const openEditModal = (staff: StaffMemberRecord) => {
    setEditingStaff(staff);
    setFormData({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      role: staff.role,
      assignedAreas: staff.assignedAreas.join(", "),
      active: staff.active,
    });
    setIsFormOpen(true);
  };

  // Stage 1: Form submit triggers Stage 1 confirmation dialog
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const areasArray = formData.assignedAreas
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingStaff) {
      // Calculate diff for stage 1 review
      const changes: FieldChange[] = [];
      if (editingStaff.name !== formData.name) {
        changes.push({ label: "Name", oldValue: editingStaff.name, newValue: formData.name });
      }
      if (editingStaff.email !== formData.email) {
        changes.push({ label: "Email", oldValue: editingStaff.email, newValue: formData.email });
      }
      if (editingStaff.phone !== formData.phone) {
        changes.push({ label: "Phone", oldValue: editingStaff.phone, newValue: formData.phone });
      }
      if (editingStaff.role !== formData.role) {
        changes.push({ label: "Role", oldValue: editingStaff.role, newValue: formData.role });
      }
      if (editingStaff.active !== formData.active) {
        changes.push({
          label: "Status",
          oldValue: editingStaff.active ? "Active" : "Inactive",
          newValue: formData.active ? "Active" : "Inactive",
        });
      }

      setConfirmDialog({
        isOpen: true,
        mode: "update",
        changes,
        payload: {
          id: editingStaff.id,
          updates: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            assignedAreas: areasArray,
            active: formData.active,
          },
        },
      });
    } else {
      setConfirmDialog({
        isOpen: true,
        mode: "create",
        changes: [
          { label: "Full Name", newValue: formData.name },
          { label: "Official Email", newValue: formData.email },
          { label: "Phone", newValue: formData.phone },
          { label: "Operational Role", newValue: formData.role },
        ],
        payload: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          assignedAreas: areasArray,
          active: formData.active,
        },
      });
    }
  };

  // Stage 2: Final execution after review
  const executeSave = async () => {
    setIsSubmitting(true);
    try {
      if (confirmDialog.mode === "create") {
        const res = await fetch("/api/admin/staff", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(confirmDialog.payload),
        });
        if (res.ok) {
          await fetchStaff();
          setIsFormOpen(false);
          setConfirmDialog({ ...confirmDialog, isOpen: false });
        }
      } else {
        const res = await fetch("/api/admin/staff", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(confirmDialog.payload),
        });
        if (res.ok) {
          await fetchStaff();
          setIsFormOpen(false);
          setConfirmDialog({ ...confirmDialog, isOpen: false });
        }
      }
    } catch {}
    setIsSubmitting(false);
  };

  // Delete flow with two-stage typed confirmation
  const requestDelete = (staff: StaffMemberRecord) => {
    setDangerDialog({
      isOpen: true,
      staffId: staff.id,
      staffName: staff.name,
    });
  };

  const executeDelete = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/staff?id=${dangerDialog.staffId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchStaff();
        setDangerDialog({ isOpen: false, staffId: "", staffName: "" });
      }
    } catch {}
    setIsSubmitting(false);
  };

  const filteredStaff = staffList.filter((s) => {
    const q = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.phone.includes(q) ||
      s.role.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Staff & Field Supervisor Management
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Administer staff operational accounts, access status, and dispatch authorizations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchStaff}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Invite New Staff</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute start-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search staff by name, email, phone, or assigned territory..."
          className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
        />
      </div>

      {/* Staff Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-blue mb-2" />
          Loading staff accounts...
        </div>
      ) : filteredStaff.length === 0 ? (
        <div className="p-12 text-center text-slate-500 text-xs bg-slate-900 rounded-2xl border border-slate-800">
          No staff accounts found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-colors shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-white text-sm">{staff.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                      {staff.role}
                    </span>
                    {staff.active ? (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                        <CheckCircle className="w-3 h-3" />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] text-rose-400">
                        <XCircle className="w-3 h-3" />
                        <span>Suspended</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(staff)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Edit Staff"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => requestDelete(staff)}
                    className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
                    title="Revoke / Delete Staff"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{staff.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-orange" />
                  <bdi>{staff.phone}</bdi>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                  <span>{staff.assignedAreas.join(", ")}</span>
                </div>
              </div>

              {staff.lastLogin && (
                <div className="text-[10px] text-slate-500 pt-3 border-t border-slate-800">
                  Last login: {new Date(staff.lastLogin).toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full shadow-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white">
              {editingStaff ? "Edit Staff Account" : "Invite Operational Staff"}
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Phone (with country code)</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+971 50 123 4567"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Operational Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none cursor-pointer"
                >
                  <option value="staff">Field Operations Supervisor</option>
                  <option value="technician">Lead Field Technician</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Assigned Territories</label>
                <input
                  type="text"
                  value={formData.assignedAreas}
                  onChange={(e) => setFormData({ ...formData, assignedAreas: e.target.value })}
                  placeholder="Sharjah, Dubai, Ajman"
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="staffActive"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded bg-slate-800 border-slate-700 text-brand-blue focus:ring-brand-blue"
                />
                <label htmlFor="staffActive" className="text-xs text-slate-300 cursor-pointer">
                  Account Active / Dispatch Enabled
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold shadow-md"
                >
                  Proceed to Review →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stage 2 Confirm Action Dialog */}
      <ConfirmActionDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.mode === "create" ? "Confirm Staff Account Creation" : "Confirm Staff Modifications"}
        description={
          confirmDialog.mode === "create"
            ? "Stage 2 of 2: Create new operational staff account?"
            : "Stage 2 of 2: Confirm changes before updating database record?"
        }
        mode={confirmDialog.mode}
        changes={confirmDialog.changes}
        confirmText="Confirm & Save"
        isLoading={isSubmitting}
        onConfirm={executeSave}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />

      {/* Destructive Deletion Dialog with Typed Verification */}
      <DangerConfirmationDialog
        isOpen={dangerDialog.isOpen}
        title="Revoke Staff Account"
        recordName={dangerDialog.staffName}
        description="This will immediately revoke access for this staff member and disassociate their operational permissions."
        expectedWord="DELETE"
        actionLabel="Permanently Revoke"
        isLoading={isSubmitting}
        onConfirm={executeDelete}
        onCancel={() => setDangerDialog({ isOpen: false, staffId: "", staffName: "" })}
      />
    </div>
  );
}
