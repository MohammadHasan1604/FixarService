"use client";

import React, { useState, useEffect } from "react";
import { Settings, Save, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { BusinessSettingsType } from "@/data/businessSettings";

export default function AdminSettingsCMSPage() {
  const [settings, setSettings] = useState<BusinessSettingsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
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

  if (loading || !settings) {
    return <div className="py-12 text-center text-slate-500">Loading business settings CMS...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Central Business Settings CMS</h1>
          <p className="text-xs text-slate-400 mt-1">
            Updating values here propagates instantly across the public website, headers, footers, and WhatsApp links.
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

      <form onSubmit={handleSave} className="space-y-8">
        {/* Core Identity */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-brand-orange border-b border-slate-800 pb-2">
            1. Brand Identity & Global Contact
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
              <label className="block text-slate-400 font-bold mb-1">Primary Email</label>
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
            2. Regional Phone Numbers & Desks
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
                  <label className="block text-slate-400 font-bold mb-1">WhatsApp Display Number</label>
                  <input
                    type="text"
                    value={reg.whatsappDisplay}
                    onChange={(e) => {
                      const updated = { ...settings.supportedRegions };
                      updated[key].whatsappDisplay = e.target.value;
                      setSettings({ ...settings, supportedRegions: updated });
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 font-bold mb-1">Physical Location / Address</label>
                  <input
                    type="text"
                    value={reg.address}
                    onChange={(e) => {
                      const updated = { ...settings.supportedRegions };
                      updated[key].address = e.target.value;
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
            3. Legal Disclaimers & Policies
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
