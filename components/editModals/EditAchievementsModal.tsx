"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Trophy, Plus, Trash2 } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { AchievementData } from "@/data/defaultPortfolioData";

export default function EditAchievementsModal() {
  const { activeEditModal, closeEditModal, data, updateAchievements } = usePortfolio();
  const [achList, setAchList] = useState<AchievementData[]>(data.achievements);

  useEffect(() => {
    setAchList(data.achievements);
  }, [data.achievements]);

  if (activeEditModal !== "achievements") return null;

  const handleChange = (index: number, field: keyof AchievementData, value: any) => {
    const updated = [...achList];
    updated[index] = { ...updated[index], [field]: value };
    setAchList(updated);
  };

  const handleAdd = () => {
    const newAch: AchievementData = {
      id: `ach-${Date.now()}`,
      title: "Achievement Title",
      subtitle: "Optional Subtitle",
      category: "Category Name",
      description: "Description of the milestone or recognition...",
      badge: "Recognition",
    };
    setAchList([...achList, newAch]);
  };

  const handleRemove = (index: number) => {
    setAchList(achList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAchievements(achList);
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
          <button
            onClick={closeEditModal}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-400" />
              Edit Achievements & Recognitions
            </h3>

            <button
              type="button"
              onClick={handleAdd}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Achievement
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-xs font-sans">
            {achList.map((item, idx) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 relative space-y-4"
              >
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleChange(idx, "title", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={item.badge}
                      onChange={(e) => handleChange(idx, "badge", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">Subtitle (Optional)</label>
                    <input
                      type="text"
                      value={item.subtitle || ""}
                      onChange={(e) => handleChange(idx, "subtitle", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">Category</label>
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => handleChange(idx, "category", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => handleChange(idx, "description", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs resize-none"
                  />
                </div>
              </div>
            ))}

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
