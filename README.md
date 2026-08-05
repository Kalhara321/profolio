# R.M. Thisun Kalhara - World-Class Software Engineer Portfolio

A premium, production-ready developer portfolio built with **Next.js 15 (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed in dark glassmorphism inspired by Apple, Vercel, and Linear.

![Portfolio Banner](https://raw.githubusercontent.com/Kalhara321/profolio/main/banner.png)
---

## 🌟 Key Features

- **Dark Theme Glassmorphism**: Tailored color palette (`#020617` background, `#0f172a` cards, `#2563eb` primary, `#3b82f6` accent glow) with ambient blurred background blobs.
- **Sticky Shrinking Navbar**: Smooth shrinking transition on scroll, section active highlights, CV download button, and mobile responsive drawer.
- **Interactive Hero Section**: Animated typing loop, interactive code terminal preview, role badges, and primary call-to-actions.
- **About & Academic Profile**: Detailed card showcasing SLIIT University degree, expected graduation (2028), location (Polgahawela, Sri Lanka), and core engineering values.
- **Skills Matrix**: Categorized tech stack (Languages, Frameworks, Databases, Tools, OS) with hover tilt animations and skill icons.
- **Featured Projects Showcase**: Detailed cards for *Pet Care Management System*, *Android Music Player*, *FB Pirate*, and *Brooks Anime* with feature tags, tech badges, GitHub links, and live demo buttons.
- **Career Experience Timeline**: Interactive vertical timeline detailing work experience at *Shopping Expo*.
- **Achievements Section**: Milestone cards highlighting Crew404 CodeJam and University Innovation Exhibition projects.
- **Real-time GitHub Integration**: Live fetching of stats, top languages, streak summary, and pinned public repositories via GitHub REST API.
- **Interactive Contact Form**: Dark glass contact form with API submission handler, status alerts, and direct contact details.
- **Scroll Progress & Particles**: Sleek top reading progress indicator and ambient particle canvas.

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have **Node.js 18.x** or higher installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup (Optional)
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GITHUB_USERNAME=Kalhara321
CONTACT_EMAIL=thisun.kalhara@example.com
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Folder Structure

```
profolio/
├── app/
│   ├── api/
│   │   └── contact/route.ts   # Contact form submission API endpoint
│   ├── globals.css            # Custom CSS variables, radial glows & glass utilities
│   ├── layout.tsx             # Root layout with Inter font and metadata
│   └── page.tsx               # Main page assembling all portfolio components
├── components/
│   ├── About.tsx              # Developer bio, SLIIT info & location card
│   ├── Achievements.tsx       # Hackathons & Innovation exhibition milestones
│   ├── BackgroundParticles.tsx# Ambient floating blobs & particle canvas
│   ├── CodeIllustration.tsx   # Interactive terminal/code window
│   ├── Contact.tsx            # Glassmorphic contact form & direct contact details
│   ├── Experience.tsx         # Vertical career timeline
│   ├── Footer.tsx             # Copyright & technology stack badges
│   ├── GithubSection.tsx      # Real-time GitHub profile & repository fetcher
│   ├── Hero.tsx               # Hero section with animated typing & CTAs
│   ├── Navbar.tsx             # Sticky shrinking header navigation
│   ├── Projects.tsx           # Premium showcase project cards
│   ├── ScrollProgress.tsx     # Top scroll indicator
│   └── Skills.tsx             # Categorized skill cards
├── public/
│   └── cv.pdf                 # Sample downloadable CV asset
├── next.config.mjs            # Next.js configuration (remote image rules)
├── tailwind.config.ts         # Custom dark theme configuration
├── tsconfig.json              # TypeScript strict configuration
├── vercel.json                # Vercel deployment settings
└── package.json               # Dependencies and scripts
```

---

## ☁️ Deployment on Vercel

1. Push this project repository to **GitHub**.
2. Go to [Vercel Dashboard](https://vercel.com/new) and import the repository.
3. Vercel will automatically detect **Next.js**.
4. Click **Deploy**.

---

## 📜 License

This portfolio is open source and available under the [MIT License](LICENSE).
