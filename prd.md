# Product Requirements Document (PRD): Interactive Portfolio & Academic Skill Mapper

## 1. Project Overview & Objectives
The goal of this project is to build a premium, highly aesthetic, and interactive personal portfolio website for **Muhammad Zaky Maizi**, a Fullstack Developer and UI/UX Designer studying Software Engineering at Politeknik Negeri Padang. 

Unlike traditional static portfolios, this application integrates an academic transcript calculator that dynamically maps academic grades directly into real-time visual skill competencies (using a custom SVG radar chart) and feeds this data into a professional, printable A4-formatted CV generator.

## 2. Target Audience
- **Tech Recruiters & Hiring Managers**: Looking to evaluate Zaky's software engineering credentials, view his projects, and download a print-ready PDF resume.
- **Academic Advisors / Reviewers**: Reviewing course accomplishments, GPA, and curriculum distribution.
- **Visitors / Tech Community**: Exploring Zaky's featured projects, GitHub links, and professional summary.

## 3. Key Feature Requirements

### A. Navigation & Shell (Navbar)
- Floating glassmorphic header bar that transitions to a bottom navigation bar on mobile devices.
- Interactive tab switching between three main views: Profile (Home), Rapor & Skills, and CV Builder.

### B. Interactive Profile Home
- **Hero Section**: Asymmetric layout showing Zaky's title (Fullstack Developer & UI/UX Designer), location (Kabupaten Agam, Sumatera Barat), and a professional summary.
- **Live Competency Breakdown**: Custom progress bars representing active technical skill groups (Frontend, Backend, AI, Algorithms) calculated live from the academic transcript.
- **Featured Projects**: Grids displaying top projects with category tags, descriptions, tech stacks, and repo links.
- **Interactive Contact Card**: Displaying contact channels (WA/Phone, Email, LinkedIn, GitHub) alongside a decorative floating code editor widget.

### C. Academic Transcript & Skill Competency Mapper
- **Interactive Grade Input**: Form allowing users to input course names, select credit counts (SKS), grades (A, B, C, etc. with standard Indonesian university weights), and map them to four core skill categories:
  1. *UI/UX & Frontend*
  2. *Backend & Infrastructure*
  3. *Data Science & AI*
  4. *Logic & Algorithms*
- **Real-time GPA Calculator**: Automatically calculates Cumulative GPA (IPK) using the formula: $\text{IPK} = \frac{\sum (\text{Grade Weight} \times \text{SKS})}{\sum \text{SKS}}$.
- **Custom SVG Radar Chart**: Renders a dynamic, glowing radar plot representing the relative strengths of the 4 skill fields. Fully written in pure SVG to keep the build lightweight and performant.
- **Empty State & Purge Controls**: Allow resetting or clearing the entire transcript with a "Kosongkan Rapor" action.

### D. CV Builder & Print Engine
- **Direct Editor Form**: Let the user edit personal details, add work/organizational experiences, and list custom projects.
- **A4 Scale Simulation**: Live preview simulating a physical A4 page on desktop.
- **Print Optimization**: Configured with `@media print` CSS rules so that clicking "Cetak CV / PDF" prints/downloads a clean, margins-perfect A4 document, hiding all web navigations, inputs, and controls.
- **Reactive Data Sync**: GPA and skill levels are pulled dynamically from the transcript mapper state.

## 4. Technical Stack
- **Framework**: Vite + React.js (JavaScript)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox, CSS Grid, Glassmorphism backdrop-filters, custom keyframe animations)
- **Icons**: Lucide React
- **Hosting / Deploy**: Vercel (rewrites set for SPA routing)
- **State Management**: React State with `localStorage` hooks for instant local persistence.

## 5. UI/UX & Design Guidelines
- **Aesthetics**: Premium dark-slate color palette (`#0b0c10` main background) with glowing neon cyan (`#00f2fe`) and bright blue (`#4facfe`) accents.
- **Uniqueness**: Custom asymmetric layout grids and custom SVG components. Avoid generic "AI-generated bootstrap card template" feels.
- **Responsiveness**: Completely responsive. Mobile-friendly stacked elements and bottom floating navigation.
- **Accessibility**: Semantic HTML, readable font weights (Plus Jakarta Sans, Outfit, JetBrains Mono), and proper color contrast.
