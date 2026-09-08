import React from "react";
import Link from "next/link";
import { Wrench, Calendar, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-card text-center space-y-6">
        {/* Broken Plug / Wrench Illustration */}
        <div className="relative w-24 h-24 mx-auto rounded-3xl bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-orange">
          <Wrench className="w-12 h-12 transform -rotate-45" />
          <span className="absolute top-2 end-2 w-3 h-3 rounded-full bg-rose-500 animate-ping" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-black text-brand-navy">404</span>
          <h1 className="text-xl font-bold text-slate-900">
            Oops — this page needs a repair.
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            The page you are looking for has been moved, unplugged, or does not exist in our system.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4 text-brand-blue" />
            <span>Back Home</span>
          </Link>

          <Link
            href="/book-service"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Service</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
