"use client";

import { motion } from "framer-motion";
import { ArrowUp, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#020617] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright & Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold text-white text-lg tracking-tight">
                R.M. Thisun Kalhara
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-blue-600/20 text-blue-400 font-mono border border-blue-500/30">
                Portfolio
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              © {new Date().getFullYear()} R.M. Thisun Kalhara. All rights reserved.
            </p>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs font-mono text-slate-400">
            <span>Built with</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
              Next.js 15
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
              Tailwind CSS
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
              TypeScript
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
              Framer Motion
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-blue-400 font-medium">Hosted on Vercel</span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-blue-500/40 transition-all duration-300 shadow-md group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-blue-400" />
          </button>

        </div>
      </div>
    </footer>
  );
}
