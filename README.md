# Engineering Blueprint Portfolio — Balasubramanian G

An engineering portfolio built with an **Architectural Blueprint & Technical Drafting** aesthetic. Engineered with semantic HTML5, modern CSS custom properties, responsive SVG schematics, and an interactive Canvas data-flow engine.

Designed specifically for **Balasubramanian G**, Information Technology student at National Engineering College specializing in scalable backend engineering, distributed microservices, and AI-integrated systems.

---

## 📐 Design Philosophy: Engineering Blueprint

The visual and interaction design treats the portfolio as an engineer's technical specification document:

- **Aesthetic Foundation:** Architectural blueprints, technical drafting, coordinate grids, measurement dimensions, and ISO 128 schematic drawings.
- **Dual Drawing Modes:**
  - **Technical Paper (Default):** Warm technical paper vellum (`#F4F0E6`), engineering deep blue (`#102B52`), cobalt schematics (`#2155D9`), ink text (`#15191F`), and signal orange telemetry (`#FF6538`).
  - **Blueprint Night (Dark Mode):** Deep blueprint grid (`#090E17`), electric cobalt (`#4D88FF`), and signal amber (`#FF7A59`).
- **Interactive Drafting Schematics:**
  - Dynamic HTML5 Canvas drawing architectural nodes (Client, Gateway, AuthService, BidService, Redis, Postgres, BullMQ, WebSockets) with real-time signal packet animations.
  - Interactive SVG architecture diagrams with hoverable subsystem telemetry.
  - Expandable Engineering Dossiers with hash routing (`#dossier-bidpulse`, `#dossier-offline-rag`, etc.) and browser history support.
  - Desktop pointer calipers tracking real-time screen coordinates in millimeters.

---

## 🛠️ Verified Project Case Studies

All project claims, architectures, and technologies are verified against source code and documentation in Balasubramanian's GitHub repositories:

1. **BidPulse: Real-Time Auction Platform (`/Bid-Pulse`)**
   - **Stack:** Node.js, Express, PostgreSQL, Redis (Lua Scripting), Socket.IO, BullMQ, Google OAuth2, Razorpay (Test Mode), React.
   - **Architecture:** Autonomous `AuthService` (:4000) and `BidService` (:3000) communicating over HTTP.
   - **Concurrency Solution:** Atomic in-memory Redis Lua script (`EVALSHA`) validates seller-approved status and highest bid value in a single thread before relational commit to PostgreSQL, eliminating race conditions.
   - **Post-Sale:** Mandatory shipment tracking upload and Wilson score confidence reputation ratings.

2. **Offline RAG System for Technical Documentation (`/Offline_RAG`)**
   - **Stack:** Python, FastAPI, FAISS, Sentence Transformers (`all-MiniLM-L6-v2`), pypdfium2, PostgreSQL/SQLite.
   - **Architecture:** Air-gapped question-answering pipeline using heading-aware document chunking, dense 384-dimensional vector embedding, and FAISS vector similarity search for context-grounded responses without internet dependency.

3. **Product Price Tracker & Notification Daemon (`/Product-Price-Tracker-Notifier`)**
   - **Stack:** Node.js, Express, PostgreSQL, Axios, node-cron, Nodemailer.
   - **Architecture:** Background polling daemon tracking price histories in PostgreSQL, executing delta checks, and dispatching automated Nodemailer email notifications.

4. **mmWave Radar Aerial Target Classification (`/Drone-or-Not-classification-using-mmwave-radar`)**
   - **Stack:** Texas Instruments AWR1843 (77GHz FMCW radar), Python, NumPy, SciPy, scikit-learn, UART/TLV.
   - **Status:** Mistral Solutions Engineering Internship (Dec 2025 – Present).
   - **Signal Pipeline:** Raw ADC acquisition → Range-FFT → Doppler-FFT → CA-CFAR → STFT micro-Doppler spectrograms → Random Forest classifier (92.9% accuracy, 0.974 ROC-AUC).

5. **Additional Documented Repositories:**
   - **Venue Booking System (`/Venue-Booking-system`):** Conflict-free slot reservation with Node.js/PostgreSQL.
   - **L-ADAS (`/L-ADAS`):** Driver assistance calculation algorithms in TypeScript.
   - **Stock Pulse (`/Stock-Pulse`):** Python financial monitoring script.

---

## 📊 Verified Metrics & Problem-Solving (Single Source of Truth)

All metrics are centrally maintained in `portfolio-data.js` and dynamically rendered across the website:
- **Academic:** B.Tech in Information Technology, National Engineering College (CGPA: **9.27**).
- **LeetCode (Live Verified):** **228 Unique Problems Solved** (132 Easy, 84 Medium, 12 Hard) — [Profile](https://leetcode.com/u/BalasubramanianG/).
- **SkillRack:** *Update required* (Platform requires institutional student credentials to verify; left unverified in configuration pending student login).
- **Competitive Honors:**
  - 🏆 Winner: Thoothukudi Hackathon (Startup TN).
  - 🥈 Finalist: Aerothon '26 (IIIT Dharwad).
  - 🥇 2nd Prize: Coding Contest — CSI Club (National Engineering College).

### How to Update Metrics in the Future:
To update problem-solving numbers, open `portfolio-data.js` and change the numbers in the `codingProfiles` object. The Hero telemetry strip, LeetCode breakdown bars, and Section 06 displays will automatically recalculate and re-render.

---

## 🚀 Deployment Instructions for GitHub Pages

The portfolio is structured with relative paths (`./assets/...`, `./blueprint.css`, `./blueprint.js`) so it operates seamlessly under both custom domains and GitHub Pages project subpaths (`https://balasubramanian-2007.github.io/My_Portfolio/`).

### How to Deploy:

1. Copy the files in `D:\portfolio\nnew\` (`index.html`, `blueprint.css`, `blueprint.js`, `README.md`, and the `assets/` directory) to the root of your `My_Portfolio` repository on GitHub.
2. Commit the changes:
   ```bash
   git add .
   git commit -m "feat: complete Engineering Blueprint portfolio redesign"
   git push origin main
   ```
3. GitHub Pages will build and deploy the static files directly.
4. Your website will be live at:
   **https://balasubramanian-2007.github.io/My_Portfolio/**
