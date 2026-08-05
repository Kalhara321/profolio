"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, FolderGit2, Mail, Edit3 } from "lucide-react";
import CodeIllustration from "./CodeIllustration";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Hero() {
  const { data, isAdmin, openEditModal } = usePortfolio();
  const { personal } = data;
  const roles = personal.roles && personal.roles.length > 0 ? personal.roles : ["Software Engineer"];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        setTypingSpeed(90);

        if (displayedText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        setTypingSpeed(40);

        if (displayedText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, roles, typingSpeed]);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start relative"
          >
            {/* Quick Admin Edit Trigger */}
            {isAdmin && (
              <button
                onClick={() => openEditModal("personal")}
                className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-semibold hover:bg-blue-600 hover:text-white transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Hero & Personal Details</span>
              </button>
            )}

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide mb-6 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for Software Engineering Roles
            </div>

            {/* Main Greeting Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Hi, <br />
              <span className="text-slate-300 font-normal text-3xl sm:text-5xl block mt-1">I&apos;m</span>
              <span className="text-gradient-primary bg-clip-text text-transparent">
                {personal.name}
              </span>
            </h1>

            {/* Typing Effect Subtitle */}
            <div className="h-12 mt-4 flex items-center">
              <p className="text-xl sm:text-2xl font-mono text-slate-300 font-medium flex items-center">
                <span className="text-blue-500 mr-2 font-bold">&gt;</span>
                <span>{displayedText}</span>
                <span className="w-2.5 h-6 bg-blue-500 inline-block ml-1 animate-caret" />
              </p>
            </div>

            {/* Description */}
            <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              {personal.bio}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="/cv.pdf"
                download="Thisun_Kalhara_CV.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-all duration-300 active:scale-95 group"
              >
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download CV</span>
              </a>

              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500/40 text-sm font-semibold transition-all duration-300 backdrop-blur-md"
              >
                <FolderGit2 className="w-4 h-4 text-blue-400" />
                <span>View Projects</span>
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-blue-500/40 text-sm font-semibold transition-all duration-300 backdrop-blur-md group"
              >
                <Mail className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-6 text-left w-full max-w-lg">
              <div>
                <h4 className="text-2xl font-bold text-white font-mono">Undergrad</h4>
                <p className="text-xs text-slate-400">{personal.university}</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-blue-400 font-mono">Full-Stack</h4>
                <p className="text-xs text-slate-400">Java, Next.js & Android</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white font-mono">{personal.expectedGraduation}</h4>
                <p className="text-xs text-slate-400">Expected Grad</p>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Interactive Code Terminal */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <CodeIllustration />
          </div>

        </div>
      </div>
    </section>
  );
}
