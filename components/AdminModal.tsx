"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, KeyRound, X, CheckCircle2, ShieldAlert } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function AdminModal() {
  const { isAuthModalOpen, closeAuthModal, login } = usePortfolio();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError(true);
    } else {
      setPassword("");
      setError(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md glass-card rounded-2xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl overflow-hidden"
        >
          {/* Top Background Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide">
                Admin Authentication
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Enter password to unlock portfolio editing
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                Access Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="admin-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Enter admin password"
                  className={`w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-950/80 border text-white placeholder-slate-500 focus:outline-none text-sm transition-all ${
                    error
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  }`}
                />
                <KeyRound className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>Incorrect password. Please try again.</span>
              </motion.div>
            )}

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={closeAuthModal}
                className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
              >
                Authenticate
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
