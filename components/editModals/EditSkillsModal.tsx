"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Wrench, Plus, Trash2 } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function EditSkillsModal() {
  const { activeEditModal, closeEditModal, data, updateSkills } = usePortfolio();
  const [skills, setSkills] = useState(data.skills);
  const [newSkillName, setNewSkillName] = useState("");
  const [selectedCatIndex, setSelectedCatIndex] = useState(0);

  useEffect(() => {
    setSkills(data.skills);
  }, [data.skills]);

  if (activeEditModal !== "skills") return null;

  const handleAddSkill = () => {
    if (newSkillName.trim()) {
      const updated = [...skills];
      updated[selectedCatIndex].skills.push({
        name: newSkillName.trim(),
        level: "Advanced",
        color: "from-blue-500 to-indigo-600",
      });
      setSkills(updated);
      setNewSkillName("");
    }
  };

  const handleRemoveSkill = (catIdx: number, skillIdx: number) => {
    const updated = [...skills];
    updated[catIdx].skills = updated[catIdx].skills.filter((_, i) => i !== skillIdx);
    setSkills(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSkills(skills);
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

          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-400" />
            Edit Skills & Technical Stack
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6 text-xs font-sans">
            
            {/* Add New Skill Bar */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="block font-semibold uppercase text-slate-300">Add Skill to Category</span>
              <div className="flex gap-2">
                <select
                  value={selectedCatIndex}
                  onChange={(e) => setSelectedCatIndex(Number(e.target.value))}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                >
                  {skills.map((cat, idx) => (
                    <option key={cat.category} value={idx}>
                      {cat.category}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="Skill name (e.g. Docker, Redis)"
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            {/* Existing Skills Listing */}
            <div className="space-y-4">
              {skills.map((cat, catIdx) => (
                <div key={cat.category} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <h4 className="font-bold text-white mb-3 text-sm">{cat.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, skillIdx) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                      >
                        {skill.name}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(catIdx, skillIdx)}
                          className="text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
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
