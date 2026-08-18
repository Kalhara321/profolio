"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Wrench, Plus, Trash2, Tag } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

const colorPresets = [
  { label: "Blue / Indigo", value: "from-blue-500 to-indigo-600" },
  { label: "Orange / Red", value: "from-orange-500 to-red-500" },
  { label: "Green / Emerald", value: "from-green-500 to-emerald-600" },
  { label: "Yellow / Amber", value: "from-yellow-400 to-amber-500" },
  { label: "Purple / Pink", value: "from-purple-500 to-pink-500" },
  { label: "Teal / Cyan", value: "from-teal-400 to-cyan-500" },
  { label: "Slate / Silver", value: "from-slate-200 to-slate-400" },
];

export default function EditSkillsModal() {
  const { activeEditModal, closeEditModal, data, updateSkills } = usePortfolio();
  const [skills, setSkills] = useState(data.skills);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Advanced");
  const [newSkillColor, setNewSkillColor] = useState("from-blue-500 to-indigo-600");
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
        level: newSkillLevel,
        color: newSkillColor,
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
            Edit Skills & Technical Parameters
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6 text-xs font-sans">
            
            {/* Add New Skill Bar with Parameters */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
              <span className="block font-bold uppercase text-white text-xs flex items-center gap-2">
                <Tag className="w-4 h-4 text-blue-400" />
                Add Skill with Custom Parameters
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Category</label>
                  <select
                    value={selectedCatIndex}
                    onChange={(e) => setSelectedCatIndex(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                  >
                    {skills.map((cat, idx) => (
                      <option key={cat.category} value={idx}>
                        {cat.category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Skill Name</label>
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="e.g. Docker, Kubernetes"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Proficiency Level Parameter</label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                    <option value="Proficient">Proficient</option>
                    <option value="Learning">Learning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Color Gradient Theme</label>
                  <select
                    value={newSkillColor}
                    onChange={(e) => setNewSkillColor(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                  >
                    {colorPresets.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddSkill}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                Add Skill Parameter
              </button>
            </div>

            {/* Existing Skills Listing */}
            <div className="space-y-4">
              {skills.map((cat, catIdx) => (
                <div key={cat.category} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <h4 className="font-bold text-white mb-3 text-sm flex items-center justify-between">
                    <span>{cat.category}</span>
                    <span className="text-xs font-mono text-slate-400">({cat.skills.length} skills)</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, skillIdx) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs"
                      >
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${skill.color || "from-blue-500 to-indigo-500"}`} />
                        <span className="font-semibold">{skill.name}</span>
                        <span className="text-[10px] text-blue-400 bg-blue-950/60 px-1.5 py-0.5 rounded font-mono">
                          {skill.level}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(catIdx, skillIdx)}
                          className="text-slate-400 hover:text-red-400 transition-colors ml-1"
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
