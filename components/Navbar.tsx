"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, Code2, Lock, Unlock, Settings, ShieldCheck } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "GitHub", href: "#github" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { data, isAdmin, openAuthModal, logout } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "py-3 glass-nav shadow-lg shadow-black/40"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo TK */}
        <a
          href="#hero"
          className="group flex items-center gap-2 text-xl font-bold tracking-tight text-white transition-all"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 p-[1px] shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all duration-300">
            <div className="w-full h-full bg-[#020617] rounded-[15px] flex items-center justify-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
              TK
            </div>
          </div>
          <span className="hidden sm:inline-block text-base font-semibold tracking-wide text-slate-200 group-hover:text-blue-400 transition-colors">
            {data.personal.name}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0f172a]/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-800/80 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-blue-600/30 border border-blue-500/40 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {isAdmin ? (
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Active</span>
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-900/90 text-slate-300 border border-slate-800 text-xs font-semibold hover:text-white hover:border-blue-500/40 transition-all"
              title="Admin Login (Kalhara@321$)"
            >
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>Edit Portfolio</span>
            </button>
          )}

          <a
            href="/cv.pdf"
            download="Thisun_Kalhara_CV.pdf"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CV Download</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          {!isAdmin && (
            <button
              onClick={openAuthModal}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl"
              title="Edit Portfolio"
            >
              <Lock className="w-4 h-4 text-blue-400" />
            </button>
          )}

          <a
            href="/cv.pdf"
            download="Thisun_Kalhara_CV.pdf"
            className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl"
            title="Download CV"
          >
            <Download className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#020617]/95 backdrop-blur-xl border-b border-slate-800/80 px-6 py-6"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 px-4 py-2.5 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-200 bg-slate-900 py-3 rounded-xl border border-slate-800"
                >
                  <Lock className="w-4 h-4 text-blue-400" />
                  Edit Portfolio (Password)
                </button>
                <a
                  href="/cv.pdf"
                  download="Thisun_Kalhara_CV.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 py-3 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
