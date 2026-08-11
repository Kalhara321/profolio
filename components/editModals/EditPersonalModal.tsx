"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, User, Mail, Phone, MapPin, GraduationCap, Github, Linkedin, Plus, Trash2, Upload, Move, ZoomIn, Image as ImageIcon } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function EditPersonalModal() {
  const { activeEditModal, closeEditModal, data, updatePersonal } = usePortfolio();
  const [formData, setFormData] = useState(data.personal);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    setFormData(data.personal);
  }, [data.personal]);

  if (activeEditModal !== "personal") return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        setFormData((prev) => ({
          ...prev,
          profileImage: base64Url,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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

          <form onSubmit={handleSubmit} className="space-y-6 text-xs font-sans">
            
            {/* Profile Photo Upload & Adjustment Box */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="block font-bold text-white uppercase text-xs flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-400" />
                  Profile Photo & Adjustments (Unmasked)
                </span>
                {formData.profileImage && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, profileImage: "" })}
                    className="text-xs text-red-400 hover:text-red-300 font-mono"
                  >
                    Remove Photo
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* Live Preview Circle */}
                <div className="sm:col-span-4 flex flex-col items-center">
                  <div className="w-28 h-28 rounded-full p-[2px] bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg mb-2">
                    <div className="w-full h-full rounded-full bg-[#020617] overflow-hidden relative">
                      {formData.profileImage ? (
                        <img
                          src={formData.profileImage}
                          alt="Profile Preview"
                          className="w-full h-full"
                          style={{
                            objectFit: formData.imageFit || "cover",
                            objectPosition: `${formData.imagePosX ?? 50}% ${formData.imagePosY ?? 50}%`,
                            transform: `scale(${formData.imageScale ?? 1})`,
                            transformOrigin: "center center",
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#090d1a]">
                          <User className="w-12 h-12 text-blue-400" />
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Live Unmasked Preview</span>
                </div>

                {/* File Upload & URL input */}
                <div className="sm:col-span-8 space-y-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Upload Photo from PC</label>
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold cursor-pointer text-xs transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Choose Image File...</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Or Image URL</label>
                    <input
                      type="text"
                      value={formData.profileImage || ""}
                      onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                      placeholder="https://example.com/my-photo.jpg"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Adjustments (Scale, PosX, PosY, Fit) */}
              {formData.profileImage && (
                <div className="pt-4 border-t border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                    <Move className="w-3.5 h-3.5" />
                    Fine-tune Photo Position & Zoom
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Zoom / Scale */}
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span className="flex items-center gap-1">
                          <ZoomIn className="w-3 h-3 text-slate-400" />
                          Zoom / Scale:
                        </span>
                        <span className="font-mono text-blue-400">{(formData.imageScale ?? 1).toFixed(1)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="2.5"
                        step="0.05"
                        value={formData.imageScale ?? 1}
                        onChange={(e) =>
                          setFormData({ ...formData, imageScale: parseFloat(e.target.value) })
                        }
                        className="w-full accent-blue-500 bg-slate-900 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Fit Mode */}
                    <div>
                      <span className="block text-slate-300 mb-1">Object Fit Mode:</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, imageFit: "cover" })}
                          className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            (formData.imageFit || "cover") === "cover"
                              ? "bg-blue-600 border-blue-500 text-white"
                              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          Cover (Fill)
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, imageFit: "contain" })}
                          className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            formData.imageFit === "contain"
                              ? "bg-blue-600 border-blue-500 text-white"
                              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          Contain (Fit)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Position X */}
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Horizontal Position (X):</span>
                        <span className="font-mono text-blue-400">{formData.imagePosX ?? 50}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={formData.imagePosX ?? 50}
                        onChange={(e) =>
                          setFormData({ ...formData, imagePosX: parseInt(e.target.value, 10) })
                        }
                        className="w-full accent-blue-500 bg-slate-900 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Position Y */}
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Vertical Position (Y):</span>
                        <span className="font-mono text-blue-400">{formData.imagePosY ?? 50}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={formData.imagePosY ?? 50}
                        onChange={(e) =>
                          setFormData({ ...formData, imagePosY: parseInt(e.target.value, 10) })
                        }
                        className="w-full accent-blue-500 bg-slate-900 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

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
