"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  PortfolioData,
  defaultPortfolioData,
  PersonalInfo,
  SkillCategoryData,
  ProjectData,
  ExperienceData,
  AchievementData,
} from "@/data/defaultPortfolioData";

interface PortfolioContextType {
  data: PortfolioData;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  activeEditModal: string | null;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (password: string) => boolean;
  logout: () => void;
  openEditModal: (modalName: string) => void;
  closeEditModal: () => void;
  updatePersonal: (personal: PersonalInfo) => void;
  updateSkills: (skills: SkillCategoryData[]) => void;
  updateProjects: (projects: ProjectData[]) => void;
  updateExperience: (experience: ExperienceData[]) => void;
  updateAchievements: (achievements: AchievementData[]) => void;
  resetToDefaults: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "thisun_portfolio_data_v1";
const ADMIN_AUTH_KEY = "thisun_portfolio_admin_auth";
const ADMIN_PASSWORD = "Kalhara@321$";

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeEditModal, setActiveEditModal] = useState<string | null>(null);

  // Load persisted data & auth state on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        setData(JSON.parse(savedData));
      }
      const savedAuth = localStorage.getItem(ADMIN_AUTH_KEY);
      if (savedAuth === "true") {
        setIsAdmin(true);
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }
  }, []);

  // Save data helper
  const saveData = (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
  };

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem(ADMIN_AUTH_KEY, "true");
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setActiveEditModal(null);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openEditModal = (modalName: string) => {
    if (isAdmin) {
      setActiveEditModal(modalName);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const closeEditModal = () => setActiveEditModal(null);

  const updatePersonal = (personal: PersonalInfo) => {
    saveData({ ...data, personal });
  };

  const updateSkills = (skills: SkillCategoryData[]) => {
    saveData({ ...data, skills });
  };

  const updateProjects = (projects: ProjectData[]) => {
    saveData({ ...data, projects });
  };

  const updateExperience = (experience: ExperienceData[]) => {
    saveData({ ...data, experience });
  };

  const updateAchievements = (achievements: AchievementData[]) => {
    saveData({ ...data, achievements });
  };

  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all portfolio data to default settings?")) {
      saveData(defaultPortfolioData);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isAdmin,
        isAuthModalOpen,
        activeEditModal,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
        openEditModal,
        closeEditModal,
        updatePersonal,
        updateSkills,
        updateProjects,
        updateExperience,
        updateAchievements,
        resetToDefaults,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
