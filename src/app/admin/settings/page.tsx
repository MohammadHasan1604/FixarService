"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, AlertCircle, Shield, KeyRound, User, Lock, Mail } from "lucide-react";
import { BusinessSettingsType } from "@/data/businessSettings";

export default function AdminSettingsCMSPage() {
  const [settings, setSettings] = useState<BusinessSettingsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Admin Credentials State
  const [adminProfile, setAdminProfile] = useState<{ email: string; username: string; name: string } | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [credSaving, setCredSaving] = useState(false);
  const [credSuccess, setCredSuccess] = useState(false);
  const [credError, setCredError] = useState<string | null>(null);

  useEffect(() => {
    // Load Business Settings
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

    // Load Admin Profile / Credentials
    fetch("/api/admin/credentials")
      .then((res) => res.json())
      .then((data) => {
        if (data.email) {
          setAdminProfile(data);
          setNewEmail(data.email);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSaveSuccess(false);
    setSaveError(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        throw new Error("Failed to save settings");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || "Failed to update business configuration");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredSaving(true);
    setCredSuccess(false);
    setCredError(null);

    if (!currentPassword) {
      setCredError("Please enter your current password to authorize this change.");
      setCredSaving(false);
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setCredError("New password and confirmation do not match.");
      setCredSaving(false);
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setCredError("New password must be at least 6 characters.");
      setCredSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/credentials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newEmail: newEmail.trim(),
          newUsername: newEmail.trim(),
          newPassword: newPassword ? newPassword.trim() : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update credentials");
      }

      setCredSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setAdminProfile({
        email: data.email,
        username: data.username,
        name: adminProfile?.name || "Operations Director",
      });
      setTimeout(() => setCredSuccess(false), 4000);
    } catch (err: any) {
      setCredError(err.message || "Error updating credentials.");
    } finally {
      setCredSaving(false);
    }
  };

  if (loading || !settings) {
    return <div className="py-12 text-center text-slate-500">Loading business settings CMS...</div>;
  }

  return (
    <div className="space-y-10 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Central Business Settings & Admin Security</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage global website parameters, regional hotline numbers, legal copy, and administrative login credentials.
          </p>
        </div>

        {saveSuccess && (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Synchronized Live</span>
          </div>
        )}
      </div>

      {saveError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{saveError}</span>
        </div>
      )}

      {/* 1. Admin Login & Security Credentials Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-orange/20 text-brand-orange flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Admin Authentication & Password Management
              </h2>
              <p className="text-[11px] text-slate-400">
                Change your admin email and access password. Changes take effect immediately.
              </p>
            </div>
          </div>

          {credSuccess && (
            <div className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Credentials Updated Successfully</span>
            </div>
          )}
        </div>

        {credError && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{credError}</span>
          </div>
        )}

        <form onSubmit={handleUpdateCredentials} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-bold mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-blue" />
                <span>Admin Login Email / Username</span>
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="fixarservices@gmail.com"
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none"
                required
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Current: {adminProfile?.email || "fixarservices@gmail.com"}
              </span>
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-brand-orange" />
                <span>Current Password (Required to Save)</span>
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password..."
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-brand-orange outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                <span>New Password (Leave blank to keep current)</span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min. 6 characters)..."
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                <span>Confirm New Password</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password..."
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={credSaving}
              className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-md disabled:opacity-50 transition-all"
            >
              <Shield className="w-4 h-4" />
              <span>{credSaving ? "Updating Credentials..." : "Update Admin Credentials"}</span>
            </button>
          </div>
        </form>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        {/* Core Brand Identity */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-brand-orange border-b border-slate-800 pb-2">
            2. Brand Identity & Global Contact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Company Name (English)</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Company Name (Arabic)</label>
              <input
                type="text"
                value={settings.companyNameAr}
                onChange={(e) => setSettings({ ...settings, companyNameAr: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Primary Support Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Operating Hours</label>
              <input
                type="text"
                value={settings.operatingHours}
                onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-brand-blue outline-none"
              />
            </div>
          </div>
        </div>

        {/* Regional Phone & WhatsApp Desk Contacts */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-brand-blue border-b border-slate-800 pb-2">
            3. Regional Phone Numbers & Dispatch Desks
          </h2>

          {Object.entries(settings.supportedRegions).map(([key, reg]) => (
            <div key={key} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
              <div className="font-bold text-white text-xs flex items-center justify-between">
                <span>{reg.country} ({reg.city})</span>
                <span className="text-slate-400 font-mono text-[10px] uppercase">{key}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Hotline Display Number</label>
                  <input
                    type="text"
                    value={reg.phoneDisplay}
                    onChange={(e) => {
                      const updated = { ...settings.supportedRegions };
                      updated[key].phoneDisplay = e.target.value;
                      setSettings({ ...settings, supportedRegions: updated });
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Hotline Raw Dial Value</label>
                  <input
                    type="text"
                    value={reg.phone}
                    onChange={(e) => {
                      const updated = { ...settings.supportedRegions };
                      updated[key].phone = e.target.value;
                      setSettings({ ...settings, supportedRegions: updated });
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">WhatsApp Direct Number</label>
                  <input
                    type="text"
                    value={reg.whatsapp}
                    onChange={(e) => {
                      const updated = { ...settings.supportedRegions };
                      updated[key].whatsapp = e.target.value;
                      setSettings({ ...settings, supportedRegions: updated });
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Region Name</label>
                  <input
                    type="text"
                    value={reg.country}
                    onChange={(e) => {
                      const updated = { ...settings.supportedRegions };
                      updated[key].country = e.target.value;
                      setSettings({ ...settings, supportedRegions: updated });
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Disclaimers */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-2">
            4. Legal Disclaimers & Policies
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Independent Provider Disclaimer (English)</label>
              <textarea
                rows={3}
                value={settings.disclaimerEn}
                onChange={(e) => setSettings({ ...settings, disclaimerEn: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Independent Provider Disclaimer (Arabic)</label>
              <textarea
                rows={3}
                value={settings.disclaimerAr}
                onChange={(e) => setSettings({ ...settings, disclaimerAr: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-brand-orange/30 disabled:opacity-50 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Changes..." : "Save Business Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
