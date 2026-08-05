"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Code, Cpu, CheckCircle2, Copy, Check, Sparkles } from "lucide-react";

export default function CodeIllustration() {
  const [activeTab, setActiveTab] = useState<"java" | "ts" | "config">("java");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-xl mx-auto group"
    >
      {/* Outer ambient glow ring */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-700 animate-pulse-glow" />

      {/* Main Terminal Window Card */}
      <div className="relative rounded-2xl glass-card border border-slate-700/60 overflow-hidden shadow-2xl">
        {/* Window Topbar */}
        <div className="bg-[#0b1329] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              kalhara@sliit-dev:~
            </span>
          </div>

          {/* File Tabs */}
          <div className="flex items-center gap-1 bg-[#020617] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("java")}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                activeTab === "java"
                  ? "bg-blue-600 text-white font-semibold shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Developer.java
            </button>
            <button
              onClick={() => setActiveTab("ts")}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                activeTab === "ts"
                  ? "bg-blue-600 text-white font-semibold shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Stack.ts
            </button>
          </div>
        </div>

        {/* Code Content View */}
        <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto bg-[#090d1a]">
          {activeTab === "java" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-slate-500">// R.M. Thisun Kalhara - Primary Profile</div>
              <div className="mt-1">
                <span className="text-purple-400">public class </span>
                <span className="text-yellow-300">SoftwareEngineer </span>
                <span className="text-slate-300">{"{"}</span>
              </div>

              <div className="pl-4 mt-1">
                <span className="text-purple-400">private final </span>
                <span className="text-blue-400">String </span>
                <span className="text-slate-200">name </span>
                <span className="text-slate-400">= </span>
                <span className="text-emerald-400">&quot;R.M. Thisun Kalhara&quot;</span>
                <span className="text-slate-300">;</span>
              </div>

              <div className="pl-4 mt-1">
                <span className="text-purple-400">private final </span>
                <span className="text-blue-400">String </span>
                <span className="text-slate-200">university </span>
                <span className="text-slate-400">= </span>
                <span className="text-emerald-400">&quot;SLIIT Sri Lanka&quot;</span>
                <span className="text-slate-300">;</span>
              </div>

              <div className="pl-4 mt-1">
                <span className="text-purple-400">private final </span>
                <span className="text-blue-400">String[] </span>
                <span className="text-slate-200">focusAreas </span>
                <span className="text-slate-400">= </span>
                <span className="text-slate-300">{"{"}</span>
              </div>
              <div className="pl-8 text-emerald-300">
                &quot;Java Backend&quot;, &quot;Spring Boot&quot;, &quot;Android SDK&quot;, &quot;Next.js&quot;
              </div>
              <div className="pl-4 text-slate-300">{"};"}</div>

              <div className="pl-4 mt-2">
                <span className="text-purple-400">public </span>
                <span className="text-blue-400">void </span>
                <span className="text-yellow-300">buildFuture</span>
                <span className="text-slate-300">() {"{"}</span>
              </div>
              <div className="pl-8 text-slate-400">
                System.out.println(<span className="text-emerald-400">&quot;Solving complex problems with modern code.&quot;</span>);
              </div>
              <div className="pl-4 text-slate-300">{"}"}</div>
              <div className="text-slate-300">{"}"}</div>
            </motion.div>
          )}

          {activeTab === "ts" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-slate-500">// Modern Full Stack & Mobile Capabilities</div>
              <div className="mt-1">
                <span className="text-blue-400">export interface </span>
                <span className="text-yellow-300">TechCapabilities </span>
                <span className="text-slate-300">{"{"}</span>
              </div>

              <div className="pl-4 mt-1">
                <span className="text-slate-300">backend: </span>
                <span className="text-emerald-400">[&quot;Java&quot;, &quot;Spring Boot&quot;, &quot;Node.js&quot;, &quot;MySQL&quot;];</span>
              </div>
              <div className="pl-4 mt-1">
                <span className="text-slate-300">frontend: </span>
                <span className="text-emerald-400">[&quot;React&quot;, &quot;Next.js 15&quot;, &quot;TypeScript&quot;, &quot;Tailwind&quot;];</span>
              </div>
              <div className="pl-4 mt-1">
                <span className="text-slate-300">mobile: </span>
                <span className="text-emerald-400">[&quot;Kotlin&quot;, &quot;Android Studio&quot;, &quot;ExoPlayer&quot;];</span>
              </div>
              <div className="pl-4 mt-1">
                <span className="text-slate-300">status: </span>
                <span className="text-purple-400">&quot;Ready for Next Big Challenge&quot;</span>;
              </div>
              <div className="text-slate-300">{"}"}</div>
            </motion.div>
          )}
        </div>

        {/* Bottom Interactive Terminal Status Bar */}
        <div className="bg-[#0b1329] px-4 py-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Build: 100% Passed
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">UTF-8</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
