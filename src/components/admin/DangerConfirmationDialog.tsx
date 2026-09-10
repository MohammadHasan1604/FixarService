"use client";

import React, { useState, useEffect } from "react";
import { AlertOctagon, X, Trash2 } from "lucide-react";

interface DangerConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  recordName: string;
  description?: string;
  requireTyping?: boolean;
  expectedWord?: string; // e.g. "DELETE" or record name
  actionLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DangerConfirmationDialog({
  isOpen,
  title,
  recordName,
  description = "This action is high-risk. Please confirm carefully before proceeding.",
  requireTyping = true,
  expectedWord = "DELETE",
  actionLabel = "Permanently Delete",
  isLoading = false,
  onConfirm,
  onCancel,
}: DangerConfirmationDialogProps) {
  const [typedInput, setTypedInput] = useState("");
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    if (isOpen) {
      setTypedInput("");
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isTypingMatch =
    !requireTyping ||
    typedInput.trim().toUpperCase() === expectedWord.trim().toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/50 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="p-5 border-b border-red-100 dark:border-red-950/50 bg-red-50/50 dark:bg-red-950/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">{title}</h3>
              <p className="text-[11px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
                Stage {step} of 2: High-Risk Confirmation
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-xs text-red-900 dark:text-red-300">
            <p className="font-semibold">{description}</p>
            <p className="mt-1 text-slate-700 dark:text-slate-300">
              Target Record: <strong className="font-mono text-red-600 dark:text-red-400">{recordName}</strong>
            </p>
          </div>

          {step === 1 ? (
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Are you sure you want to request deletion of this record? You will be prompted to explicitly verify your intent in the final step.
            </p>
          ) : (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Type <strong className="font-mono text-red-600 dark:text-red-400">{expectedWord}</strong> to confirm execution:
              </label>
              <input
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder={`Type ${expectedWord}`}
                autoFocus
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
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
            Cancel
          </button>

          {step === 1 ? (
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-500/20 transition-all flex items-center gap-1.5"
            >
              Proceed to Stage 2 →
            </button>
          ) : (
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading || !isTypingMatch}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white text-xs font-bold shadow-md shadow-red-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isLoading ? "Deleting..." : actionLabel}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
