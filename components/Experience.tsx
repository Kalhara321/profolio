"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle, ShoppingBag, Edit3 } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Experience() {
  const { data, isAdmin, openEditModal } = usePortfolio();
  const { experience } = data;

  return (
    <section id="experience" className="py-24 relative z-10">
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
              Career Journey
            </h2>
            {isAdmin && (
              <button
                onClick={() => openEditModal("experience")}
                className="p-1 text-blue-400 hover:text-white rounded-md bg-blue-950/60 border border-blue-800"
                title="Edit Experience"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work <span className="text-gradient-primary">Experience</span>
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Timeline Items */}
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-blue-400 to-slate-800 -translate-x-1/2 hidden sm:block" />

          {experience.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mb-12"
            >
              <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-0 w-10 h-10 rounded-full bg-blue-600 border-4 border-[#020617] items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.6)] z-10">
                <ShoppingBag className="w-4 h-4" />
              </div>

              <div className="sm:w-1/2 sm:pr-12 sm:text-right ml-0">
                <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 relative group shadow-xl">
                  
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.period}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {item.role}
                  </h3>
                  <h4 className="text-base font-semibold text-blue-400 mt-1">
                    {item.company}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {item.type}
                  </p>

                  <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-800/80">
                    <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Core Competencies Demonstrated
                    </h5>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      {item.responsibilities.map((resp) => (
                        <span
                          key={resp}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-medium"
                        >
                          <CheckCircle className="w-3 h-3 text-blue-400" />
                          {resp}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
