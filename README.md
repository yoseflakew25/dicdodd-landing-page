## DICDO — Dire Integrated Community Development Organization

A modern, responsive Next.js 15 web application for **Dire Integrated Community Development Organization (DICDO)**, an indigenous, non-governmental, and non-political non-profit operating across Ethiopia.

---

![Uploading Screenshot 2026-08-21 130505.png…]()



## 🌟 About DICDO

Founded in 2015, DICDO works to empower local communities—especially women, youth, and vulnerable groups—by providing tools, knowledge, and resources to build a sustainable, resilient, and peaceful future.

### Core Focus Areas & Programs

- **Peacebuilding & Conflict Resolution:** Community dialogue facilitation, conflict mediation, and election observation (NEBE accredited observer during the 7th General Election).
- **Education & Literacy:** Primary education support, adult literacy programs, and educational material distribution.
- **Women's & Youth Empowerment:** Vocational skills training, microfinance, and leadership development.
- **Health, Nutrition & WASH:** Mobile health clinics, maternal/child care, clean water well construction, and hygiene education.
- **Environmental Protection:** Reforestation projects, waste management systems, and climate change education.

---

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router, Static Export)
- **Language:** TypeScript
- **Styling & UI:** Tailwind CSS, shadcn/ui
- **Icons & Animation:** Lucide React, Framer Motion
- **Package Manager:** Bun / npm
- **Deployment:** Vercel / GitHub Pages

---

## 📂 Project Structure

```text
├── .github/workflows/    # Automated CI/CD deployment scripts
├── app/                  # Next.js App Router (Pages, Layouts, Routes)
│   ├── about/            # About DICDO page
│   ├── gallery/          # Media & impact stories gallery
│   └── page.tsx          # Main landing page
├── components/           # React components
│   ├── landing/          # Hero, Programs, Impact Stories, FAQ, Contact forms
│   └── ui/               # Base UI & shadcn components
├── data/                 # Static content, partners, FAQs, and media metadata
├── lib/                  # Helper utilities and shared functions
├── public/               # Images, certificates, assets, and branding logos
└── types/                # Shared TypeScript interfaces
```

---

## 💻 Getting Started

### Prerequisites

- Node.js 18+ or [Bun](https://bun.sh/) installed on your machine.

### Local Setup

1. **Clone the repository:**

```bash
git clone https://github.com/yoseflakew25/dicdodd-landing-page.git
cd dicdodd-landing-page
```

2. **Install dependencies:**

```bash
bun install
# or
npm install
```

3. **Start the development server:**

```bash
bun dev
# or
npm run dev
```

4. Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to view the application.

---

## 🛠️ Build & Static Export

This project uses Next.js static site generation (SSG) with `output: 'export'`.

To build the project for static hosting:

```bash
bun run build
# or
npm run build
```

The compiled, production-ready static files will be exported to the `out/` directory.

---

## 📞 Contact & Support

- **Executive Director:** Mr. Demissie Afework
- **Address:** Dire Dawa, Kebele 03 Area, Ethiopia (Offices in Dire Dawa & Addis Ababa)
- **Email:** [dicdodd@gmail.com](https://www.google.com/search?q=mailto%3Adicdodd%40gmail.com) | [demessafworke12@gmail.com](https://www.google.com/search?q=mailto%3Ademessafworke12%40gmail.com)
- **Phone:** +251 915005166 | +251 975047055 | +251 911435422

---

© 2026 DICDO. All Rights Reserved.

*Building Peace • Creating Hope • Empowering Communities*
```
