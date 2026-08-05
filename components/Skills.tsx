"use client";

import { motion } from "framer-motion";
import { Code, Layers, Database, Wrench, Monitor, Edit3 } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

const categoryIcons: Record<string, any> = {
  "Programming Languages": Code,
  "Frameworks & Libraries": Layers,
  "Databases": Database,
  "Development Tools": Wrench,
  "Operating Systems": Monitor,
};

export default function Skills() {
  const { data, isAdmin, openEditModal } = usePortfolio();
  const { skills } = data;

  return (
    <section id="skills" className="py-24 relative z-10">
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
              Technical Stack
            </h2>
            {isAdmin && (
              <button
                onClick={() => openEditModal("skills")}
                className="p-1 text-blue-400 hover:text-white rounded-md bg-blue-950/60 border border-blue-800"
                title="Edit Skills"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-gradient-primary">Technologies</span>
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((cat, idx) => {
            const Icon = categoryIcons[cat.category] || Code;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 relative group overflow-hidden shadow-xl"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/25 transition-all duration-500" />

                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {cat.category}
                  </h3>
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.05 }}
                      className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 flex items-center gap-2 group/skill transition-all"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.color || "from-blue-500 to-indigo-500"}`} />
                      <span className="text-xs font-semibold text-slate-200 group-hover/skill:text-white transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
