"use client";

import React from "react";
import { AlertTriangle, CheckCircle, X } from "lucide-react";

export interface FieldChange {
  label: string;
  oldValue?: string | number | boolean | null;
  newValue: string | number | boolean | null;
}

interface ConfirmActionDialogProps {
  isOpen: boolean;
  title: string;
  description?: string;
  mode?: "create" | "update" | "confirm";
  changes?: FieldChange[];
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmActionDialog({
  isOpen,
  title,
  description,
  mode = "confirm",
  changes = [],
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmActionDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-brand-blue">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">{title}</h3>
              {description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
              )}
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content / Diff Review */}
        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          {mode === "create" && (
            <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl text-xs text-blue-900 dark:text-blue-300">
              Please review the record details carefully before creating this operational entry.
            </div>
          )}

          {changes.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Field Modifications (Stage 1 of 2: Change Review)
              </span>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30">
                {changes.map((ch, idx) => (
                  <div key={idx} className="p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{ch.label}:</span>
                    <div className="flex items-center gap-2 flex-wrap text-[11px]">
                      {ch.oldValue !== undefined && (
                        <span className="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 line-through">
                          {String(ch.oldValue || "(empty)")}
                        </span>
                      )}
                      <span className="text-slate-400">→</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold">
                        {String(ch.newValue || "(empty)")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
