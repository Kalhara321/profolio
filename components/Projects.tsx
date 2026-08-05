"use client";

import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  CheckCircle,
  Edit3,
  PawPrint,
  Music,
  Download,
  Tv,
  Code2,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

const projectIcons: Record<string, any> = {
  "pet-care": PawPrint,
  "music-player": Music,
  "fb-pirate": Download,
  "brooks-anime": Tv,
};

const projectGradients: Record<string, string> = {
  "pet-care": "from-blue-600 via-indigo-600 to-blue-400",
  "music-player": "from-purple-600 via-pink-600 to-blue-500",
  "fb-pirate": "from-emerald-600 via-teal-600 to-cyan-500",
  "brooks-anime": "from-red-600 via-rose-600 to-orange-500",
};

export default function Projects() {
  const { data, isAdmin, openEditModal } = usePortfolio();
  const { projects } = data;

  return (
    <section id="projects" className="py-24 relative z-10">
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
              Selected Works
            </h2>
            {isAdmin && (
              <button
                onClick={() => openEditModal("projects")}
                className="p-1 text-blue-400 hover:text-white rounded-md bg-blue-950/60 border border-blue-800"
                title="Edit Projects"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="text-gradient-primary">Projects</span>
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((proj, idx) => {
            const Icon = projectIcons[proj.id] || Code2;
            const gradient = projectGradients[proj.id] || "from-blue-600 via-indigo-600 to-blue-400";
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-card rounded-2xl border border-slate-800/80 hover:border-blue-500/40 flex flex-col justify-between overflow-hidden group transition-all duration-300 shadow-xl"
              >
                {/* Project Graphic Banner Header */}
                <div className="relative h-48 sm:h-56 bg-slate-950 p-6 flex flex-col justify-between overflow-hidden border-b border-slate-800/80">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-grid-pattern opacity-20" />

                  {/* Top Tag & Icon */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-medium text-slate-300 font-mono">
                      {proj.tag}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-blue-400 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-blue-300 transition-colors">
                      {proj.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
                  <div>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Features List */}
                    {proj.features && proj.features.length > 0 && (
                      <div className="mt-5">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                          Key Features
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {proj.features.map((feat) => (
                            <div key={feat} className="flex items-center gap-1.5 text-xs text-slate-300">
                              <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tech Stack Badges & Action Buttons */}
                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg bg-blue-950/40 border border-blue-800/40 text-blue-300 text-xs font-mono font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500/40 text-xs font-semibold transition-all"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub Repo</span>
                      </a>

                      {proj.demo && (
                        <a
                          href={proj.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
