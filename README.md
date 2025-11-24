# Threaten – AI‑Powered Threat Modeling

![Cyberpunk UI](https://img.shields.io/badge/UI-Cyberpunk-00f3ff)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Gemini AI](https://img.shields.io/badge/Gemini‑AI-7b2cbf)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🎯 Project Overview
**Threaten** is a modern web application that leverages **Google Gemini** to generate comprehensive threat models for software systems. Users provide a textual description (and optionally an architecture diagram) and select a threat‑modeling methodology (STRIDE, PASTA, LINDDUN, CVSS). The app returns:
- A **Data Flow Diagram (DFD)** rendered with Mermaid.js, complete with trust boundaries and data‑flow labels.
- A detailed **risk analysis** with mitigation suggestions and validation steps.
- The ability to **download the DFD** as a PNG image.

The UI follows a **cyber‑punk aesthetic** – neon colors, glowing effects, and smooth micro‑animations – to give a premium, futuristic feel.

---

## ✨ Key Features
- **AI‑driven threat analysis** using Gemini 2.5 Flash.
- **Multiple modeling frameworks** – STRIDE, PASTA, LINDDUN, CVSS.
- **Dynamic DFD generation** with trust boundaries and labeled data flows.
- **Image upload** – feed an existing architecture diagram to improve context.
- **One‑click PNG export** of the generated DFD via the `mermaid.ink` API.
- **Cyber‑punk UI** with neon gradients, animated backgrounds, and custom fonts (Orbitron & Source Code Pro).
- **Fully typed TypeScript/JavaScript** codebase, ready for extension.

---

## 🛠️ Tech Stack
| Layer | Technology |
|-------|------------|
| **Framework** | **Next.js 16 (App Router)** |
| **AI SDK** | `@google/genai` (Gemini) |
| **Styling** | Vanilla CSS + custom cyber‑punk design system |
| **Diagrams** | Mermaid.js (rendered client‑side) |
| **Icons** | Lucide‑React |
| **Animations** | Framer Motion |
| **Fonts** | Google Fonts – *Orbitron*, *Source Code Pro* |
| **Version Control** | Git + GitHub |

---

## 📦 Installation
```bash
# 1️⃣ Clone the repository
git clone https://github.com/pruthuraut/threaten.git
cd threaten

# 2️⃣ Install dependencies
npm install   # or `yarn` / `pnpm`

# 3️⃣ Set up environment variables
cat <<EOF > .env.local
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
EOF

# 4️⃣ Run the development server
npm run dev
```
Open **http://localhost:3000** in your browser.

---

## 🚀 Usage
1. **Enter system description** – free‑form text describing your architecture, tech stack, and components.
2. **(Optional) Upload diagram** – PNG/JPG/SVG of an existing architecture diagram.
3. **Select threat‑modeling methodology** – STRIDE, PASTA, LINDDUN, or CVSS.
4. **Generate** – the app sends the prompt to Gemini and receives a JSON payload containing:
   - `dfd` – Mermaid flowchart source.
   - `analysis` – Markdown‑formatted risk report.
5. **View results** – DFD is rendered live; the analysis appears below.
6. **Download DFD** – click *Download PNG* to save the diagram.

---

## 📸 Screenshots
*(Add screenshots of the landing page, input form, and generated DFD here)*

---

## 📂 Project Structure
```
threaten/
├─ app/
│  ├─ api/
│  │   └─ analyze/route.js      # Gemini integration
│  ├─ components/
│  │   ├─ LandingPage.js        # Hero section
│  │   ├─ ThreatTool.js         # Main UI flow
│  │   ├─ InputSection.js       # Form & file upload
│  │   ├─ ResultsSection.js     # DFD & analysis display
│  │   └─ Mermaid.js            # Mermaid renderer helper
│  ├─ globals.css               # Cyber‑punk design system
│  ├─ layout.js                 # Root layout (metadata updated)
│  └─ page.js                   # Home page entry point
├─ .gitignore                    # Ignored files (node_modules, .env*)
├─ README.md                     # ← **You are reading this file**
└─ package.json
```

---

## 🔐 Environment Variables
- `GEMINI_API_KEY` – **required**. Obtain a free key from the [Google AI Studio](https://aistudio.google.com/app/apikey).
- `.env.local` is listed in `.gitignore` to keep your secret safe.

---

## ☁️ Deployment (Vercel – recommended)
1. Push your code to GitHub (already done).
2. Sign in to **Vercel** and import the repository.
3. Add the `GEMINI_API_KEY` under *Environment Variables*.
4. Deploy – Vercel will automatically build and host the app at a public URL.

---

## 🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome‑feature`).
3. Commit your changes and push to your fork.
4. Open a PR against the `main` branch.

---

## 📄 License
This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

## 🙏 Acknowledgments
- **Google Gemini** – for the powerful AI backend.
- **Mermaid.js** – for elegant diagram rendering.
- **Next.js** – for a fast, production‑ready React framework.
- **The open‑source community** – for countless libraries and inspiration.

---
