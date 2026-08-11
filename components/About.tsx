"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Building2, Calendar, User, Code2, Edit3 } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function About() {
  const { data, isAdmin, openEditModal } = usePortfolio();
  const { personal } = data;

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Get To Know Me
            </h2>
            {isAdmin && (
              <button
                onClick={() => openEditModal("personal")}
                className="p-1 text-blue-400 hover:text-white rounded-md bg-blue-950/60 border border-blue-800"
                title="Edit Bio & Personal Info"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient-primary">Me</span>
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Profile Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Photo Card & Specs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="glass-card rounded-2xl p-8 border border-slate-800/80 flex flex-col items-center text-center h-full relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all duration-500" />
              
              {/* Photo Avatar Card - Crisp, Unmasked & Adjustable */}
              <div className="relative mb-6">
                <div className="w-36 h-36 rounded-full p-[2px] bg-gradient-to-tr from-blue-600 via-blue-400 to-indigo-600 shadow-[0_0_25px_rgba(37,99,235,0.4)]">
                  <div className="w-full h-full rounded-full bg-[#020617] overflow-hidden relative">
                    {personal.profileImage ? (
                      <img
                        src={personal.profileImage}
                        alt={personal.name}
                        className="w-full h-full"
                        style={{
                          objectFit: personal.imageFit || "cover",
                          objectPosition: `${personal.imagePosX ?? 50}% ${personal.imagePosY ?? 50}%`,
                          transform: `scale(${personal.imageScale ?? 1})`,
                          transformOrigin: "center center",
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#090d1a]">
                        <User className="w-20 h-20 text-blue-400" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-[#020617] shadow-md" title="Active & Ready" />
              </div>

              {/* Personal Meta Details */}
              <h3 className="text-2xl font-bold text-white tracking-wide">
                {personal.name}
              </h3>
              <p className="text-sm text-blue-400 font-mono mt-1 font-medium">
                Information Technology Undergraduate
              </p>

              {/* Location Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>{personal.location}</span>
              </div>

              {/* Social Highlights */}
              <div className="w-full mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-left">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    University
                  </div>
                  <div className="text-xs font-bold text-white mt-1 truncate">{personal.university}</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    Graduation
                  </div>
                  <div className="text-xs font-bold text-white mt-1">{personal.expectedGraduation}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio & Academic Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div className="glass-card rounded-2xl p-8 border border-slate-800/80 space-y-6 h-full flex flex-col justify-between">
              
              {/* Bio Narrative */}
              <div>
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  Engineering Biography
                </h4>
                <p className="text-slate-300 text-base leading-relaxed">
                  {personal.bio}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mt-4">
                  My core technical philosophy revolves around clean architecture, type safety, performance, and building intuitive digital products that make an impact.
                </p>
              </div>

              {/* Education Details Box */}
              <div className="bg-[#090d1a] rounded-2xl p-6 border border-slate-800/80">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Academic Background
                </h4>

                <div className="space-y-4">
                  <div>
                    <div className="text-lg font-bold text-white">
                      {personal.university}
                    </div>
                    <div className="text-sm text-slate-300 font-medium mt-0.5">
                      {personal.degree}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-2 font-mono">
                      <span>Expected Graduation: {personal.expectedGraduation}</span>
                      <span className="text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                        Undergraduate
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Values Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
                  <div className="text-blue-400 font-bold text-sm">Backend Architecture</div>
                  <div className="text-xs text-slate-400 mt-1">REST APIs, Spring Boot, Microservices</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
                  <div className="text-blue-400 font-bold text-sm">Mobile Development</div>
                  <div className="text-xs text-slate-400 mt-1">Android, Kotlin, Media & ExoPlayer</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
                  <div className="text-blue-400 font-bold text-sm">Full-Stack Web</div>
                  <div className="text-xs text-slate-400 mt-1">Next.js 15, React, Tailwind CSS</div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
