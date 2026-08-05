export interface PersonalInfo {
  name: string;
  roles: string[];
  bio: string;
  location: string;
  university: string;
  degree: string;
  expectedGraduation: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface SkillCategoryData {
  category: string;
  skills: { name: string; level: string; color: string }[];
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  features: string[];
  tech: string[];
  github: string;
  demo?: string;
  tag: string;
}

export interface ExperienceData {
  id: string;
  company: string;
  role: string;
  type: string;
  period: string;
  description: string;
  responsibilities: string[];
}

export interface AchievementData {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  badge: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: SkillCategoryData[];
  projects: ProjectData[];
  experience: ExperienceData[];
  achievements: AchievementData[];
}

export const defaultPortfolioData: PortfolioData = {
  personal: {
    name: "R.M. Thisun Kalhara",
    roles: [
      "Information Technology Undergraduate",
      "Backend Developer",
      "Java Developer",
      "Android Developer",
      "Full Stack Developer",
    ],
    bio: "I am an aspiring software engineer who enjoys backend development, web technologies, and Android application development. I love creating practical software solutions while continuously improving my technical skills.",
    location: "Polgahawela, Sri Lanka",
    university: "Sri Lanka Institute of Information Technology (SLIIT)",
    degree: "Bachelor of Science (Hons) in Information Technology",
    expectedGraduation: "2028",
    email: "thisun.kalhara@example.com",
    phone: "+94 (77) 123 4567",
    githubUrl: "https://github.com/thisunkalhara",
    linkedinUrl: "https://linkedin.com/in/thisunkalhara",
  },
  skills: [
    {
      category: "Programming Languages",
      skills: [
        { name: "Java", level: "Advanced", color: "from-orange-500 to-red-500" },
        { name: "JavaScript", level: "Advanced", color: "from-yellow-400 to-amber-500" },
        { name: "TypeScript", level: "Intermediate", color: "from-blue-500 to-indigo-600" },
        { name: "HTML", level: "Advanced", color: "from-orange-400 to-red-600" },
        { name: "CSS", level: "Advanced", color: "from-blue-400 to-cyan-500" },
        { name: "Kotlin", level: "Intermediate", color: "from-purple-500 to-pink-500" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        { name: "Spring Boot", level: "Advanced", color: "from-green-500 to-emerald-600" },
        { name: "React", level: "Advanced", color: "from-cyan-400 to-blue-500" },
        { name: "Next.js", level: "Advanced", color: "from-slate-200 to-slate-400" },
        { name: "Node.js", level: "Intermediate", color: "from-emerald-400 to-green-600" },
        { name: "Tailwind CSS", level: "Advanced", color: "from-teal-400 to-cyan-500" },
      ],
    },
    {
      category: "Databases",
      skills: [
        { name: "MySQL", level: "Advanced", color: "from-blue-600 to-cyan-600" },
        { name: "MongoDB", level: "Intermediate", color: "from-green-500 to-emerald-500" },
      ],
    },
    {
      category: "Development Tools",
      skills: [
        { name: "Git", level: "Advanced", color: "from-orange-500 to-red-500" },
        { name: "GitHub", level: "Advanced", color: "from-purple-400 to-indigo-500" },
        { name: "VS Code", level: "Advanced", color: "from-blue-400 to-cyan-500" },
        { name: "Android Studio", level: "Intermediate", color: "from-green-400 to-emerald-600" },
        { name: "IntelliJ IDEA", level: "Advanced", color: "from-purple-500 to-pink-600" },
      ],
    },
    {
      category: "Operating Systems",
      skills: [
        { name: "Windows", level: "Advanced", color: "from-blue-400 to-indigo-500" },
        { name: "Ubuntu Linux", level: "Intermediate", color: "from-orange-500 to-amber-600" },
      ],
    },
  ],
  projects: [
    {
      id: "pet-care",
      title: "Pet Care Management System",
      description:
        "Developed a full-stack Pet Care Management System for managing pet profiles, appointments, and grooming services.",
      features: [
        "Appointment Scheduling",
        "Pet Profile CRUD",
        "Admin Dashboard",
        "Role-based Authentication",
        "Spring Boot Backend",
        "Responsive UI",
      ],
      tech: ["Java", "Spring Boot", "MySQL", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/thisunkalhara",
      demo: "https://github.com/thisunkalhara",
      tag: "Full-Stack Web Application",
    },
    {
      id: "music-player",
      title: "Android Music Player",
      description:
        "Offline Android music player supporting equalizer, playback speed control, smart playlists, album artwork retrieval, and local music indexing.",
      features: [
        "Dynamic Equalizer Controls",
        "Playback Speed Modifier",
        "Smart Local Playlists",
        "Album Artwork Extraction",
        "ExoPlayer / Media3 Integration",
      ],
      tech: ["Java", "Kotlin", "Android Studio", "Media3", "ExoPlayer"],
      github: "https://github.com/thisunkalhara",
      tag: "Android Mobile App",
    },
    {
      id: "fb-pirate",
      title: "FB Pirate",
      description:
        "Media downloader supporting Facebook, YouTube, Instagram, and TikTok using yt-dlp with high-speed video extraction.",
      features: [
        "Multi-Platform Support",
        "High Quality Video Extraction",
        "yt-dlp Core Engine",
        "CLI & Scripted Automation",
      ],
      tech: ["Node.js", "yt-dlp", "JavaScript"],
      github: "https://github.com/thisunkalhara",
      tag: "CLI Utility & Backend Tool",
    },
    {
      id: "brooks-anime",
      title: "Brooks Anime",
      description:
        "Anime streaming website supporting anime search, genres, episode tracking, and responsive UI built on Next.js.",
      features: [
        "Anime Search & Filtering",
        "Genre Categorization",
        "Episode Tracking",
        "AnimeKai API Integration",
        "Responsive Glassmorphic UI",
      ],
      tech: ["Next.js", "AnimeKai API", "Vercel", "Tailwind CSS"],
      github: "https://github.com/thisunkalhara",
      tag: "Web Streaming App",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Shopping Expo",
      role: "Sales Associate",
      type: "Seasonal Full-Time",
      period: "2024 – 2025",
      description:
        "Engaged with diverse client requests, maintained high satisfaction ratings, and collaborated with cross-functional teams to streamline retail operations during high-traffic exhibition events.",
      responsibilities: ["Customer Service", "Communication", "Sales", "Teamwork"],
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Crew404 CodeJam Participant",
      category: "Hackathon & Competitive Programming",
      description:
        "Participated in the intense Crew404 CodeJam hackathon, building rapid software solutions under strict time constraints and collaborating with team members.",
      badge: "Hackathon",
    },
    {
      id: "ach-2",
      title: "University Innovation Exhibition",
      subtitle: "Developed Water Tank Monitoring & Automation System",
      category: "Hardware & Automation Solution",
      description:
        "Designed and implemented an automated water tank monitoring system utilizing sensors and real-time alert mechanisms for efficient water resource management.",
      badge: "Engineering Project",
    },
  ],
};
