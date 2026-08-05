"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Edit3,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Contact() {
  const { data, isAdmin, openEditModal } = usePortfolio();
  const { personal } = data;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const resData = await res.json();
        setErrorMessage(resData.error || "Failed to send message.");
        setStatus("error");
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10">
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
              Let&apos;s Connect
            </h2>
            {isAdmin && (
              <button
                onClick={() => openEditModal("personal")}
                className="p-1 text-blue-400 hover:text-white rounded-md bg-blue-950/60 border border-blue-800"
                title="Edit Contact Info"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact <span className="text-gradient-primary">Me</span>
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Contact Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Contact Info Display */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="glass-card rounded-2xl p-8 border border-slate-800/80 h-full flex flex-col justify-between space-y-8">
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Get In Touch
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Have a question, project proposal, or opportunity? Feel free to reach out directly through the form or via my social profiles.
                </p>
              </div>

              {/* Contact Information List */}
              <div className="space-y-6">
                
                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono uppercase">Email</div>
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-sm font-semibold text-white hover:text-blue-400 transition-colors"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono uppercase">Phone</div>
                    <div className="text-sm font-semibold text-white">
                      {personal.phone}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-mono uppercase">Location</div>
                    <div className="text-sm font-semibold text-white">
                      {personal.location}
                    </div>
                  </div>
                </div>

              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-slate-800/80">
                <div className="text-xs text-slate-400 font-mono uppercase mb-3">
                  Connect On Socials
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={personal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/40 transition-all"
                    title="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>

                  <a
                    href={personal.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/40 transition-all"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="glass-card rounded-2xl p-8 border border-slate-800/80 flex flex-col justify-between h-full">
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm resize-none"
                  />
                </div>

                {status === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Your message has been sent successfully! I will reply soon.</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {status === "submitting" ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
