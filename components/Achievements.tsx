"use client";

import { motion } from "framer-motion";
import { Trophy, Cpu, Sparkles, Edit3 } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

const iconMap: Record<string, any> = {
  "ach-1": Trophy,
  "ach-2": Cpu,
};

export default function Achievements() {
  const { data, isAdmin, openEditModal } = usePortfolio();
  const { achievements } = data;

  return (
    <section id="achievements" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Milestones & Recognition
            </h2>
            {isAdmin && (
              <button
                onClick={() => openEditModal("achievements")}
                className="p-1 text-blue-400 hover:text-white rounded-md bg-blue-950/60 border border-blue-800"
                title="Edit Achievements"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Key <span className="text-gradient-primary">Achievements</span>
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Achievements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {achievements.map((item, idx) => {
            const Icon = iconMap[item.id] || Trophy;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-2xl p-8 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 relative group overflow-hidden shadow-xl flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all duration-500" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-medium text-slate-300">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="text-sm font-semibold text-blue-400 mt-1">
                      {item.subtitle}
                    </p>
                  )}

                  <p className="text-xs text-slate-400 font-mono mt-1 mb-4">
                    {item.category}
                  </p>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Verified Entry</span>
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
