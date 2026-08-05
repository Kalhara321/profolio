"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Edit3,
  Wrench,
  FolderGit2,
  Lock,
  RotateCcw,
  Download,
  Sparkles,
  Briefcase,
  Trophy,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function AdminToolbar() {
  const { isAdmin, logout, openEditModal, resetToDefaults, data } = usePortfolio();

  if (!isAdmin) return null;

  const exportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `portfolio_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[92%] sm:w-auto"
    >
      <div className="glass-nav rounded-2xl px-4 py-3 border border-blue-500/40 shadow-[0_0_30px_rgba(37,99,235,0.3)] flex flex-wrap items-center justify-between gap-3 bg-[#020617]/90 backdrop-blur-xl">
        
        {/* Status Badge */}
        <div className="flex items-center gap-2 pr-3 border-r border-slate-800">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Admin Edit Mode
          </span>
        </div>

        {/* Section Edit Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => openEditModal("personal")}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <span>Hero & Bio</span>
          </button>

          <button
            onClick={() => openEditModal("skills")}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <span>Skills</span>
          </button>

          <button
            onClick={() => openEditModal("projects")}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <span>Projects</span>
          </button>

          <button
            onClick={() => openEditModal("experience")}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <span>Experience</span>
          </button>

          <button
            onClick={() => openEditModal("achievements")}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <span>Achievements</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
          <button
            onClick={exportJSON}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
            title="Export JSON Backup"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={resetToDefaults}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
            title="Reset to Defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-semibold flex items-center gap-1 transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
}
