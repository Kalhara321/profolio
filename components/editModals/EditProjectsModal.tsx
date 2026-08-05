"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, FolderGit2, Plus, Trash2 } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { ProjectData } from "@/data/defaultPortfolioData";

export default function EditProjectsModal() {
  const { activeEditModal, closeEditModal, data, updateProjects } = usePortfolio();
  const [projects, setProjects] = useState<ProjectData[]>(data.projects);

  useEffect(() => {
    setProjects(data.projects);
  }, [data.projects]);

  if (activeEditModal !== "projects") return null;

  const handleProjectChange = (index: number, field: keyof ProjectData, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const handleAddProject = () => {
    const newProj: ProjectData = {
      id: `proj-${Date.now()}`,
      title: "New Featured Project",
      description: "Description of your new project...",
      features: ["Feature 1", "Feature 2"],
      tech: ["Java", "React"],
      github: "https://github.com/thisunkalhara",
      tag: "Full-Stack Project",
    };
    setProjects([...projects, newProj]);
  };

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProjects(projects);
    closeEditModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl glass-card rounded-2xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={closeEditModal}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/60"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-blue-400" />
              Edit Portfolio Projects
            </h3>

            <button
              type="button"
              onClick={handleAddProject}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-xs font-sans">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 relative space-y-4"
              >
                <button
                  type="button"
                  onClick={() => handleRemoveProject(idx)}
                  className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-900"
                  title="Remove Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">Project Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">Tag / Category</label>
                    <input
                      type="text"
                      value={proj.tag}
                      onChange={(e) => handleProjectChange(idx, "tag", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold uppercase mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">GitHub Repo URL</label>
                    <input
                      type="url"
                      value={proj.github}
                      onChange={(e) => handleProjectChange(idx, "github", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">Live Demo URL (Optional)</label>
                    <input
                      type="url"
                      value={proj.demo || ""}
                      onChange={(e) => handleProjectChange(idx, "demo", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={proj.tech.join(", ")}
                      onChange={(e) =>
                        handleProjectChange(
                          idx,
                          "tech",
                          e.target.value.split(",").map((s) => s.trim())
                        )
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold uppercase mb-1">Features (comma separated)</label>
                    <input
                      type="text"
                      value={(proj.features || []).join(", ")}
                      onChange={(e) =>
                        handleProjectChange(
                          idx,
                          "features",
                          e.target.value.split(",").map((s) => s.trim())
                        )
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
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
