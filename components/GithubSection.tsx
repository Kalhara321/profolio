"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  GitFork,
  Star,
  Users,
  FolderGit2,
  ExternalLink,
  Code2,
  Activity,
  Flame,
  Globe,
} from "lucide-react";

interface GithubProfile {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
}

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export default function GithubSection() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "thisunkalhara";
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGithubData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
          ),
        ]);

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }

        if (reposRes.ok) {
          const reposData = await reposRes.json();
          setRepos(reposData);
        }
      } catch (err) {
        console.error("Failed to fetch GitHub data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGithubData();
  }, [username]);

  // Fallback state data if API is limited
  const defaultProfile = {
    login: username,
    name: "R.M. Thisun Kalhara",
    avatar_url: "https://avatars.githubusercontent.com/u/10000000?v=4",
    html_url: `https://github.com/${username}`,
    public_repos: 14,
    followers: 12,
    following: 15,
    bio: "Java | Spring Boot | React | Next.js | Android",
  };

  const activeProfile = profile || defaultProfile;

  return (
    <section id="github" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
            Open Source & Activity
          </h2>
          <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            GitHub <span className="text-gradient-primary">Insights</span>
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Profile Stats Header Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-6 border border-slate-800/80 mb-12 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 p-[2px]">
                <div className="w-full h-full rounded-[14px] bg-[#020617] flex items-center justify-center">
                  <Github className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  @{activeProfile.login}
                  <a
                    href={activeProfile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {activeProfile.bio}
                </p>
              </div>
            </div>

            {/* GitHub Stats Counters */}
            <div className="grid grid-cols-3 gap-6 text-center sm:text-right w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
              <div className="bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800/60">
                <div className="text-xl font-bold text-white font-mono">
                  {activeProfile.public_repos}
                </div>
                <div className="text-[11px] text-slate-400">Repositories</div>
              </div>

              <div className="bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800/60">
                <div className="text-xl font-bold text-blue-400 font-mono">
                  {activeProfile.followers}
                </div>
                <div className="text-[11px] text-slate-400">Followers</div>
              </div>

              <div className="bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800/60">
                <div className="text-xl font-bold text-white font-mono">
                  {activeProfile.following}
                </div>
                <div className="text-[11px] text-slate-400">Following</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* GitHub Visual Badges & Streak Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Top Languages Visual Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-xl flex flex-col justify-between"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Language Breakdown
            </h4>

            {/* Language Progress Bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Java / Spring Boot</span>
                  <span className="text-blue-400 font-bold">45%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[45%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>TypeScript / Next.js</span>
                  <span className="text-blue-400 font-bold">30%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-[30%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>Kotlin / Android</span>
                  <span className="text-blue-400 font-bold">15%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[15%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                  <span>HTML / CSS / Node.js</span>
                  <span className="text-blue-400 font-bold">10%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 w-[10%]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* GitHub Streak & Activity Overview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6 border border-slate-800/80 shadow-xl flex flex-col justify-between"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              Contribution & Commit Pulse
            </h4>

            {/* Streak Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-2xl font-bold text-white font-mono flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  Active
                </div>
                <div className="text-xs text-slate-400 mt-1">Continuous Code Commits</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-2xl font-bold text-blue-400 font-mono flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  Open Source
                </div>
                <div className="text-xs text-slate-400 mt-1">Public Code Repositories</div>
              </div>
            </div>

            {/* Link to Full GitHub Profile */}
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <a
                href={activeProfile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold border border-slate-800 hover:border-blue-500/40 transition-all"
              >
                <Github className="w-4 h-4 text-blue-400" />
                <span>Visit Full GitHub Profile (@{activeProfile.login})</span>
              </a>
            </div>
          </motion.div>

        </div>

        {/* Repositories Grid */}
        <div className="mt-8">
          <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-blue-400" />
            Recent Public Repositories
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.length > 0
              ? repos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                          <FolderGit2 className="w-4 h-4 text-blue-400" />
                          {repo.name}
                        </h5>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {repo.description || "No description provided."}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-blue-300">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          {repo.language}
                        </span>
                      )}
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5 text-slate-400" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </a>
                ))
              : [
                  { name: "PetCare-System", lang: "Java", stars: 4 },
                  { name: "Android-MusicPlayer", lang: "Kotlin", stars: 5 },
                  { name: "fb-pirate-downloader", lang: "JavaScript", stars: 3 },
                  { name: "brooks-anime-web", lang: "TypeScript", stars: 6 },
                ].map((mock, idx) => (
                  <div
                    key={idx}
                    className="glass-card rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between"
                  >
                    <div>
                      <h5 className="font-bold text-white flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-blue-400" />
                        {mock.name}
                      </h5>
                      <p className="text-xs text-slate-400 mt-2">
                        Production repository created by R.M. Thisun Kalhara.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span className="text-blue-400">{mock.lang}</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        {mock.stars}
                      </span>
                    </div>
                  </div>
                ))}
          </div>
        </div>

      </div>
    </section>
  );
}
