import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import BackgroundParticles from "@/components/BackgroundParticles";
import { PortfolioProvider } from "@/context/PortfolioContext";
import AdminModal from "@/components/AdminModal";
import AdminToolbar from "@/components/AdminToolbar";
import EditPersonalModal from "@/components/editModals/EditPersonalModal";
import EditSkillsModal from "@/components/editModals/EditSkillsModal";
import EditProjectsModal from "@/components/editModals/EditProjectsModal";
import EditExperienceModal from "@/components/editModals/EditExperienceModal";
import EditAchievementsModal from "@/components/editModals/EditAchievementsModal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "R.M. Thisun Kalhara | Software Engineer & Backend Developer",
  description:
    "Passionate Information Technology undergraduate at SLIIT specializing in Java, Spring Boot, React, Next.js, and Android development. Discover my portfolio, projects, skills, and experience.",
  keywords: [
    "R.M. Thisun Kalhara",
    "Thisun Kalhara",
    "Software Engineer",
    "Backend Developer",
    "Java Developer",
    "Android Developer",
    "Full Stack Developer",
    "SLIIT",
    "Spring Boot",
    "Next.js",
    "Portfolio",
    "Sri Lanka Developer",
  ],
  authors: [{ name: "R.M. Thisun Kalhara" }],
  creator: "R.M. Thisun Kalhara",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thisunkalhara.vercel.app",
    title: "R.M. Thisun Kalhara | Software Engineer Portfolio",
    description:
      "Information Technology Undergraduate | Java, Spring Boot, Next.js & Android Developer.",
    siteName: "R.M. Thisun Kalhara Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "R.M. Thisun Kalhara | Software Engineer",
    description:
      "Passionate IT undergraduate specializing in Java, Spring Boot, React, Next.js & Android development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth dark`}>
      <body className="bg-[#020617] text-white antialiased selection:bg-blue-600/30 selection:text-white min-h-screen relative overflow-x-hidden">
        <PortfolioProvider>
          <ScrollProgress />
          <BackgroundParticles />
          {children}

          {/* Admin Edit Controls & Password Modal */}
          <AdminModal />
          <AdminToolbar />
          <EditPersonalModal />
          <EditSkillsModal />
          <EditProjectsModal />
          <EditExperienceModal />
          <EditAchievementsModal />
        </PortfolioProvider>
      </body>
    </html>
  );
}
