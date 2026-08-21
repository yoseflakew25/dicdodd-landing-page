## DICDO Landing Page — Dire Integrated Community Development Organization

A modern, responsive **Next.js 15** landing page for **Dire Integrated Community Development Organization (DICDO)**, an indigenous, non-governmental, and non-political non-profit operating across Ethiopia.

---

![DICDO Landing Page](/public/images/Screenshot%202026-08-21%20130505.png)


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
├── app/                  # Next.js App Router
│   ├── about/            # About DICDO page
│   ├── gallery/          # Media & impact stories gallery
│   └── page.tsx          # Main landing page
├── components/           # React components
│   ├── landing/          # Hero, Programs, Impact Stories, FAQ, Contact forms
│   └── ui/               # Base UI & shadcn components
├── data/                 # Static content, partners, FAQs, and media metadata
├── lib/                  # Helper utilities and shared functions
├── public/               # Images, certificates, assets, branding logos
└── types/                # Shared TypeScript interfaces
```

---

## 💻 Getting Started

### Prerequisites
- Node.js 18+ **or** Bun installed.

### Local Setup

1. **Clone:**
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

3. **Run development server:**
```bash
bun dev
# or
npm run dev
```

4. **Open:**
- Visit `http://localhost:3000`

---

## 🛠️ Build & Static Export

This project uses Next.js static site generation (SSG) with `output: 'export'`.

Build for static hosting:
```bash
bun run build
# or
npm run build
```

The production static files are exported to the `out/` directory.

---

## 📞 Contact & Support

- **Executive Director:** Mr. Demissie Afework  
- **Address:** Dire Dawa, Kebele 03 Area, Ethiopia (Offices in Dire Dawa & Addis Ababa)
- **Email:** [dicdodd@gmail.com](mailto:dicdodd@gmail.com) | [demessafworke12@gmail.com](mailto:demessafworke12@gmail.com)
- **Phone:** +251 915005166 | +251 975047055 | +251 911435422

---

© 2026 DICDO. All Rights Reserved.

*Building Peace • Creating Hope • Empowering Communities*
```

---

If you want, paste your **current GitHub README.md** (exact text), and I’ll rewrite it to match this landing-page version perfectly (including removing the screenshot placeholder and formatting the image section nicely).
