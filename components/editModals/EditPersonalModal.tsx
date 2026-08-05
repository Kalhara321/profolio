"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, User, Mail, Phone, MapPin, GraduationCap, Github, Linkedin, Plus, Trash2 } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function EditPersonalModal() {
  const { activeEditModal, closeEditModal, data, updatePersonal } = usePortfolio();
  const [formData, setFormData] = useState(data.personal);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    setFormData(data.personal);
  }, [data.personal]);

  if (activeEditModal !== "personal") return null;

  const handleAddRole = () => {
    if (newRole.trim()) {
      setFormData({
        ...formData,
        roles: [...formData.roles, newRole.trim()],
      });
      setNewRole("");
    }
  };

  const handleRemoveRole = (index: number) => {
    setFormData({
      ...formData,
      roles: formData.roles.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonal(formData);
    closeEditModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl glass-card rounded-2xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={closeEditModal}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            Edit Personal & Hero Details
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
            
            {/* Name */}
            <div>
              <label className="block text-slate-300 font-semibold uppercase mb-1.5">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Roles typing list */}
            <div>
              <label className="block text-slate-300 font-semibold uppercase mb-1.5">Typing Roles (Hero Loop)</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="Add new role..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddRole}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.roles.map((role, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs"
                  >
                    {role}
                    <button
                      type="button"
                      onClick={() => handleRemoveRole(idx)}
                      className="text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-slate-300 font-semibold uppercase mb-1.5">Engineering Bio</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            {/* University & Degree */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold uppercase mb-1.5">University</label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold uppercase mb-1.5">Degree Title</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Grad year & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold uppercase mb-1.5">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold uppercase mb-1.5">Expected Graduation</label>
                <input
                  type="text"
                  value={formData.expectedGraduation}
                  onChange={(e) => setFormData({ ...formData, expectedGraduation: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold uppercase mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Social URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold uppercase mb-1.5">GitHub Profile URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold uppercase mb-1.5">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={closeEditModal}
                className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
