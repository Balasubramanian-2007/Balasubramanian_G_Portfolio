/**
 * ENGINEERING BLUEPRINT INTERACTIVE ENGINE
 * Author: Balasubramanian G (Backend & AI Systems Engineer)
 * Architecture: Clean Vanilla ES6, Zero-dependency, GitHub Pages compatible
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. THEME ENGINE: Technical Paper ⇄ Blueprint Night
  // --------------------------------------------------------------------------
  const THEME_KEY = 'bp_portfolio_theme';
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeLabel = document.getElementById('themeLabel');

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeButton(savedTheme);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', initial);
      updateThemeButton(initial);
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
    updateThemeButton(nextTheme);
  }

  function updateThemeButton(theme) {
    if (!themeLabel) return;
    if (theme === 'dark') {
      themeLabel.textContent = 'PAPER MODE';
    } else {
      themeLabel.textContent = 'BLUEPRINT NIGHT';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  initTheme();

  // --------------------------------------------------------------------------
  // 2. COORDINATE TRACKER & POINTER CALIPERS
  // --------------------------------------------------------------------------
  const coordX = document.getElementById('coordX');
  const coordY = document.getElementById('coordY');

  if (coordX && coordY) {
    window.addEventListener('pointermove', function (e) {
      // Calculate millimeters approx based on 96 DPI (1 in = 25.4 mm => 1 px = 0.264583 mm)
      const mmX = (e.clientX * 0.264583).toFixed(1);
      const mmY = (e.clientY * 0.264583).toFixed(1);
      coordX.textContent = mmX + 'mm';
      coordY.textContent = mmY + 'mm';
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 3. HERO CANVAS: DYNAMIC ENGINEERING BLUEPRINT SYSTEM
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('blueprintCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animId = null;

    // Architectural Subsystems Nodes
    const nodes = [
      { id: 'client', label: 'HTTP / WS Client', x: 0.15, y: 0.25, sub: 'Browser / React' },
      { id: 'gateway', label: 'API Gateway', x: 0.50, y: 0.25, sub: 'Reverse Proxy' },
      { id: 'auth', label: 'AuthService :4000', x: 0.82, y: 0.18, sub: 'JWT + Google OAuth' },
      { id: 'bid', label: 'BidService :3000', x: 0.82, y: 0.42, sub: 'Auction Core' },
      { id: 'redis', label: 'Redis 7.x (Lua)', x: 0.50, y: 0.62, sub: 'Atomic Lock Barrier' },
      { id: 'postgres', label: 'PostgreSQL ACID', x: 0.82, y: 0.78, sub: 'Relational Store' },
      { id: 'bullmq', label: 'BullMQ Worker', x: 0.18, y: 0.62, sub: 'Status Transition' },
      { id: 'socket', label: 'Socket.IO Room', x: 0.18, y: 0.82, sub: 'Real-time Push' }
    ];

    const edges = [
      { from: 0, to: 1, label: 'JSON / REST' },
      { from: 1, to: 2, label: 'Auth Handshake' },
      { from: 1, to: 3, label: 'Auction Bids' },
      { from: 3, to: 4, label: 'EVALSHA Atomic Check' },
      { from: 3, to: 5, label: 'Persist Valid Bid' },
      { from: 3, to: 6, label: 'Queue Post-Sale Job' },
      { from: 3, to: 7, label: 'Emit Bid Broadcast' },
      { from: 7, to: 0, label: 'Live Frame Stream' }
    ];

    let packets = [
      { edgeIndex: 0, progress: 0.1, speed: 0.008 },
      { edgeIndex: 2, progress: 0.4, speed: 0.009 },
      { edgeIndex: 3, progress: 0.7, speed: 0.012 },
      { edgeIndex: 4, progress: 0.2, speed: 0.007 },
      { edgeIndex: 6, progress: 0.5, speed: 0.011 },
      { edgeIndex: 7, progress: 0.8, speed: 0.010 }
    ];

    function resizeCanvas() {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    function drawBlueprint() {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const wireColor = isDark ? 'rgba(77, 136, 255, 0.35)' : 'rgba(33, 85, 217, 0.3)';
      const nodeBg = isDark ? '#162032' : '#FFFFFF';
      const nodeBorder = isDark ? '#4D88FF' : '#102B52';
      const textColor = isDark ? '#E8EEF5' : '#102B52';
      const subColor = isDark ? '#7E93AB' : '#687487';
      const pulseColor = isDark ? '#FF7A59' : '#FF6538';

      // Draw Grid Ticks inside Canvas
      ctx.strokeStyle = isDark ? 'rgba(77, 136, 255, 0.08)' : 'rgba(33, 85, 217, 0.08)';
      ctx.lineWidth = 1;
      const step = 30;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Edges (Routing lines with drafting chamfers)
      ctx.lineWidth = 1.5;
      edges.forEach((edge) => {
        const p1 = { x: nodes[edge.from].x * width, y: nodes[edge.from].y * height };
        const p2 = { x: nodes[edge.to].x * width, y: nodes[edge.to].y * height };

        ctx.strokeStyle = wireColor;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw Data Packets along edges
      packets.forEach((pkt) => {
        const edge = edges[pkt.edgeIndex];
        const p1 = { x: nodes[edge.from].x * width, y: nodes[edge.from].y * height };
        const p2 = { x: nodes[edge.to].x * width, y: nodes[edge.to].y * height };

        const curX = p1.x + (p2.x - p1.x) * pkt.progress;
        const curY = p1.y + (p2.y - p1.y) * pkt.progress;

        ctx.fillStyle = pulseColor;
        ctx.beginPath();
        ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        pkt.progress += pkt.speed;
        if (pkt.progress > 1) {
          pkt.progress = 0;
        }
      });

      // Draw Subsystem Nodes
      nodes.forEach((node) => {
        const nx = node.x * width;
        const ny = node.y * height;
        const nw = 110;
        const nh = 40;

        ctx.fillStyle = nodeBg;
        ctx.strokeStyle = nodeBorder;
        ctx.lineWidth = 1.5;

        ctx.fillRect(nx - nw / 2, ny - nh / 2, nw, nh);
        ctx.strokeRect(nx - nw / 2, ny - nh / 2, nw, nh);

        // Technical Corner Marks
        ctx.strokeStyle = pulseColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(nx - nw / 2 - 2, ny - nh / 2 - 2, 4, 4);
        ctx.strokeRect(nx + nw / 2 - 2, ny + nh / 2 - 2, 4, 4);

        // Label
        ctx.fillStyle = textColor;
        ctx.font = '600 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, nx, ny - 5);

        // Subtext
        ctx.fillStyle = subColor;
        ctx.font = '400 8px "Inter", sans-serif';
        ctx.fillText(node.sub, nx, ny + 9);
      });

      animId = requestAnimationFrame(drawBlueprint);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    resizeCanvas();
    animId = requestAnimationFrame(drawBlueprint);
  }

  // --------------------------------------------------------------------------
  // 4. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. PROJECT DOSSIER MODAL & HASH NAVIGATION
  // --------------------------------------------------------------------------
  const projectDossiers = {
    'bidpulse': {
      title: 'BidPulse: Real-Time Auction Microservice Architecture',
      specNo: 'DWG-BP-001',
      status: 'VERIFIED IMPLEMENTATION',
      tech: 'Node.js, Express, PostgreSQL, Redis (Lua), Socket.IO, BullMQ, React, Razorpay (Test Mode)',
      github: 'https://github.com/Balasubramanian-2007/Bid-Pulse',
      demo: null,
      summary: 'A distributed live auction system engineered to solve race conditions in multi-bidder auctions through Redis Lua atomic scripting and WebSocket room broadcasting.',
      sections: [
        {
          heading: '01. Architectural Boundary & Separation of Concerns',
          body: 'The backend is strictly divided into two autonomous services communicating over HTTP:\n• AuthService (Port 4000): Manages user identity, bcrypt password encryption, Google OAuth2, and email OTP verification via Nodemailer.\n• BidService (Port 3000): Governs auction lifecycles, bidder authorizations, real-time bid validation, seller ratings, and post-sale workflows.'
        },
        {
          heading: '02. Concurrency Problem & The Redis Lua Barrier',
          body: 'Problem: In traditional relational databases, concurrent bids arriving within milliseconds cause race conditions, read-modify-write conflicts, and dirty writes where an outdated bid gets registered as the winning bid.\nSolution: Implemented an atomic Redis Lua script (EVALSHA). The script atomically checks:\n1. Is the incoming bidder verified in the auction approved-bidders set?\n2. Is the submitted bid amount strictly higher than the current high bid?\nBoth conditions are evaluated and committed in a single Redis execution thread, eliminating distributed race conditions before persisting to PostgreSQL.'
        },
        {
          heading: '03. Transactional Integrity & Post-Sale Workflows',
          body: '• Mandatory Shipment Proof: Sellers must supply courier/tracking documentation within a post-auction window, visible only to the verified winner and seller.\n• Wilson Score Confidence Rating: Calculates seller reputation lower bounds using binomial confidence intervals, protecting against arbitrary 1-star skewing.\n• Test Payments: Razorpay test-mode integration handles order generation, checkout modal presentation, and HMAC-SHA256 signature verification.'
        },
        {
          heading: '04. Technical Trade-offs & Limitations',
          body: '• Single Redis Instance: In the current version, Redis runs as a single node rather than a Redis Cluster or Redis Sentinel. High availability under infrastructure crash is a planned milestone.\n• Payment Scope: Operates strictly in Razorpay Sandbox mode — no real banking funds are processed.'
        }
      ]
    },
    'offline-rag': {
      title: 'Offline RAG: Technical Document Retrieval Engine',
      specNo: 'DWG-RAG-002',
      status: 'VERIFIED IMPLEMENTATION',
      tech: 'Python, FastAPI, FAISS, Sentence Transformers, PostgreSQL/SQLite, pypdfium2',
      github: 'https://github.com/Balasubramanian-2007/Offline_RAG',
      demo: null,
      summary: 'An air-gapped document question-answering engine utilizing structural heading chunking, dense vector embeddings, and FAISS indexing for zero-hallucination semantic retrieval.',
      sections: [
        {
          heading: '01. Retrieval Architecture & Design Rationale',
          body: 'Engineered for restricted enterprise environments where proprietary documentation cannot be transmitted to external cloud APIs (e.g. OpenAI or Gemini) due to strict data privacy mandates.'
        },
        {
          heading: '02. Structure-Aware Document Processing',
          body: 'Standard RAG pipelines slice text into arbitrary 500-character windows, cutting sentences and code blocks in half. This implementation parses document hierarchy (Markdown headings, PDF sections, DOCX outlines) to preserve semantic cohesion in chunks before vector conversion.'
        },
        {
          heading: '03. Vector Indexing & Local Retrieval Pipeline',
          body: 'Pipeline:\n1. Document Ingestion (PDF/Word via pypdfium2/python-docx).\n2. Heading-based chunk generation.\n3. Dense 384-dimensional vector embedding using Sentence Transformers (all-MiniLM-L6-v2).\n4. Fast L2/Cosine similarity retrieval using FAISS IndexFlatIP.\n5. Context-grounded synthesis with local LLM prompt injection (e.g. Qwen2-1.5B via FastAPI).'
        },
        {
          heading: '04. Verified Boundaries',
          body: 'Operates entirely offline once embedding weights are cached locally. Generates answers strictly from retrieved document passages to prevent synthetic hallucinations.'
        }
      ]
    },
    'price-tracker': {
      title: 'Product Price Tracker & Notification Daemon',
      specNo: 'DWG-PPT-003',
      status: 'VERIFIED IMPLEMENTATION',
      tech: 'Node.js, Express, PostgreSQL, Axios, node-cron, Nodemailer',
      github: 'https://github.com/Balasubramanian-2007/Product-Price-Tracker-Notifier',
      demo: null,
      summary: 'A decoupled background polling daemon that tracks e-commerce price variations over time and triggers automated email alert sequences on price dips.',
      sections: [
        {
          heading: '01. Daemon Architecture & Scheduling',
          body: 'Employs node-cron to execute scheduled polling cycles. Requests are throttled and dispatched via Axios with randomized user-agent rotation to prevent IP blocking.'
        },
        {
          heading: '02. Database Schema & Price Delta Analysis',
          body: 'PostgreSQL tracks relational subscriptions: Users ⇄ Products ⇄ PriceHistory. Each poll calculates price deltas against previous timestamps; if current_price < target_price, an alert task is queued.'
        },
        {
          heading: '03. Reliable Notification Dispatch',
          body: 'Nodemailer handles templated email delivery with automated follow-up sequences. System gracefully logs network timeouts without crashing the polling daemon.'
        }
      ]
    },
    'radar-sensing': {
      title: 'TI AWR1843 mmWave Radar Aerial Classification',
      specNo: 'DWG-RAD-004',
      status: 'ACTIVE RESEARCH & INTERNSHIP',
      tech: 'TI AWR1843 (77GHz FMCW), Python, NumPy, SciPy, Matplotlib, scikit-learn, UART/TLV',
      github: 'https://github.com/Balasubramanian-2007/Drone-or-Not-classification-using-mmwave-radar',
      demo: null,
      summary: 'Perception engineering at Mistral Solutions: Processing raw 77GHz FMCW radar electromagnetic signals to distinguish micro-drones from birds using STFT micro-Doppler signatures.',
      sections: [
        {
          heading: '01. Radar Hardware & Signal Acquisition',
          body: 'Operates on Texas Instruments AWR1843 77GHz mmWave sensor. Flashed radar firmware profiles via UniFlash. Parsed UART serial data streams containing raw ADC and Tag-Length-Value (TLV) frames in real time.'
        },
        {
          heading: '02. Digital Signal Processing Pipeline',
          body: '1. Range FFT: Fast Fourier Transform across raw ADC chirps to calculate target distance.\n2. Doppler FFT: Computes radial target velocity.\n3. CA-CFAR (Cell-Averaging Constant False Alarm Rate): Filters out environmental noise and multipath clutter.\n4. STFT (Short-Time Fourier Transform): Extracts micro-Doppler spectrograms revealing distinct periodic rotor blade rotations versus erratic bird wing flapping.'
        },
        {
          heading: '03. Machine Learning Classification Results',
          body: 'Baseline Random Forest classifier trained on extracted Doppler features achieved 92.9% classification accuracy with an ROC-AUC of 0.974. Currently advancing toward deep learning CNN and CNN-LSTM architectures for temporal radar point-cloud classification.'
        }
      ]
    }
  };

  const modalBackdrop = document.getElementById('dossierModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSpecNo = document.getElementById('modalSpecNo');
  const modalStatus = document.getElementById('modalStatus');
  const modalContent = document.getElementById('modalContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openDossier(projectId) {
    const data = projectDossiers[projectId];
    if (!data || !modalBackdrop) return;

    modalTitle.textContent = data.title;
    modalSpecNo.textContent = data.specNo;
    modalStatus.textContent = data.status;

    let html = `
      <div style="margin-bottom: 24px;">
        <p style="font-size: 1.1rem; color: var(--bp-ink); margin-bottom: 12px; font-weight: 500;">${data.summary}</p>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; background: var(--bp-paper-card); padding: 8px 12px; border: 1px solid var(--bp-border);">
          <strong style="color: var(--bp-cobalt);">TECH STACK:</strong> ${data.tech}
        </div>
      </div>
    `;

    data.sections.forEach(sec => {
      html += `
        <div style="margin-bottom: 24px; border-left: 2px solid var(--bp-cobalt); padding-left: 16px;">
          <h4 style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--bp-deep-blue); margin-bottom: 6px; text-transform: uppercase;">${sec.heading}</h4>
          <p style="font-size: 0.95rem; color: var(--bp-ink-secondary); line-height: 1.65; white-space: pre-line;">${sec.body}</p>
        </div>
      `;
    });

    html += `
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px dashed var(--bp-border); display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="bp-btn bp-btn-primary">
          <span>SOURCE CODE ON GITHUB</span> ↗
        </a>
        <button type="button" class="bp-btn bp-btn-outline" onclick="window.print()">
          <span>PRINT DOSSIER SPECIFICATION</span>
        </button>
      </div>
    `;

    modalContent.innerHTML = html;
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Update URL Hash
    history.pushState(null, '', `#dossier-${projectId}`);
  }

  function closeDossier() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Remove hash without scrolling
    if (window.location.hash.startsWith('#dossier-')) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  }

  // Trigger buttons
  document.querySelectorAll('[data-dossier]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-dossier');
      openDossier(id);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeDossier);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeDossier();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeDossier();
    }
  });

  // Handle hash on initial load
  window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#dossier-')) {
      const pid = hash.replace('#dossier-', '');
      if (projectDossiers[pid]) {
        openDossier(pid);
      }
    }
  });

  // --------------------------------------------------------------------------
  // 6. SCROLL SPY & INTERSECTION REVEALS
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.bp-nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => navObserver.observe(sec));

  // --------------------------------------------------------------------------
  // 7. INTERACTIVE SVG ARCHITECTURE INSPECTOR (ACCESSIBLE & TOUCH-FRIENDLY)
  // --------------------------------------------------------------------------
  function setDiagramTelemetry(node) {
    const caption = node.getAttribute('data-tooltip');
    const viewport = node.closest('.bp-diagram-viewport');
    const targetCaption = viewport ? viewport.querySelector('.bp-diagram-caption') : null;
    if (targetCaption && caption) {
      targetCaption.innerHTML = `<strong>SUBSYSTEM TELEMETRY:</strong> ${caption}`;
      targetCaption.style.color = 'var(--bp-signal-orange)';
    }
  }

  function resetDiagramTelemetry(node) {
    const viewport = node.closest('.bp-diagram-viewport');
    const targetCaption = viewport ? viewport.querySelector('.bp-diagram-caption') : null;
    if (targetCaption) {
      const defaultCaption = targetCaption.getAttribute('data-default');
      if (defaultCaption) {
        targetCaption.innerHTML = defaultCaption;
        targetCaption.style.color = 'var(--bp-annotation)';
      }
    }
  }

  document.querySelectorAll('.bp-diagram-node').forEach((node) => {
    // Pointer hover
    node.addEventListener('mouseenter', () => setDiagramTelemetry(node));
    node.addEventListener('mouseleave', () => resetDiagramTelemetry(node));

    // Keyboard focus & blur
    node.addEventListener('focus', () => setDiagramTelemetry(node));
    node.addEventListener('blur', () => resetDiagramTelemetry(node));

    // Click / Touch toggle
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      setDiagramTelemetry(node);
    });
  });

  // Tap outside resets diagram telemetry
  document.addEventListener('click', () => {
    document.querySelectorAll('.bp-diagram-viewport').forEach((vp) => {
      const cap = vp.querySelector('.bp-diagram-caption');
      if (cap) {
        const defaultCap = cap.getAttribute('data-default');
        if (defaultCap) {
          cap.innerHTML = defaultCap;
          cap.style.color = 'var(--bp-annotation)';
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 8. DYNAMIC CODING METRICS RENDERER (SINGLE SOURCE OF TRUTH)
  // --------------------------------------------------------------------------
  function renderPortfolioMetrics() {
    const data = window.PORTFOLIO_DATA;
    if (!data || !data.codingProfiles) return;

    const lc = data.codingProfiles.leetcode;
    const sr = data.codingProfiles.skillrack;

    // Helper: format numbers safely with thousands separators
    function fmt(val) {
      if (val === null || val === undefined || isNaN(val)) return null;
      return Number(val).toLocaleString();
    }

    // Helper: format date strings nicely
    function fmtDate(isoStr) {
      if (!isoStr) return null;
      try {
        const d = new Date(isoStr);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      } catch (e) {
        return isoStr;
      }
    }

    // 1. Hero LeetCode Solved Telemetry
    const heroLeetcodeVal = document.getElementById('heroLeetcodeVal');
    const heroLeetcodeLbl = document.getElementById('heroLeetcodeLbl');
    if (heroLeetcodeVal && lc) {
      const formattedTotal = fmt(lc.totalSolved);
      if (formattedTotal !== null) {
        heroLeetcodeVal.innerHTML = `${formattedTotal}<span class="accent">+</span>`;
        if (heroLeetcodeLbl) heroLeetcodeLbl.textContent = 'LeetCode Solved · Verified';
      } else {
        heroLeetcodeVal.innerHTML = '<span class="bp-unverified-tag">Update required</span>';
        if (heroLeetcodeLbl) heroLeetcodeLbl.textContent = 'LeetCode Solved';
      }
    }

    // 2. Section 06 Coding Header Badge
    const metricsHeaderBadge = document.getElementById('metricsHeaderBadge');
    if (metricsHeaderBadge && lc) {
      const formattedTotal = fmt(lc.totalSolved);
      if (formattedTotal !== null) {
        metricsHeaderBadge.textContent = `${formattedTotal} VERIFIED (LEETCODE)`;
      } else {
        metricsHeaderBadge.textContent = 'VERIFICATION PENDING';
      }
    }

    // 3. LeetCode Verified Date
    const leetcodeVerifiedDate = document.getElementById('leetcodeVerifiedDate');
    if (leetcodeVerifiedDate && lc) {
      const verifiedDateStr = fmtDate(lc.lastVerified);
      if (verifiedDateStr) {
        leetcodeVerifiedDate.textContent = `VERIFIED: ${verifiedDateStr.toUpperCase()}`;
      } else {
        leetcodeVerifiedDate.textContent = 'UNVERIFIED';
      }
    }

    // 4. LeetCode Difficulty Bars & Counts
    const barFillEasy = document.getElementById('barFillEasy');
    const barCountEasy = document.getElementById('barCountEasy');
    const barFillMedium = document.getElementById('barFillMedium');
    const barCountMedium = document.getElementById('barCountMedium');
    const barFillHard = document.getElementById('barFillHard');
    const barCountHard = document.getElementById('barCountHard');
    const leetcodeTotalDisplay = document.getElementById('leetcodeTotalDisplay');
    const leetcodeProfileLink = document.getElementById('leetcodeProfileLink');

    if (lc) {
      const total = Number(lc.totalSolved) || 0;

      // Easy
      if (barCountEasy) barCountEasy.textContent = fmt(lc.easy) || '—';
      if (barFillEasy) {
        const easyPct = total > 0 && lc.easy != null ? ((lc.easy / total) * 100).toFixed(1) : 0;
        barFillEasy.style.width = `${easyPct}%`;
        barFillEasy.setAttribute('title', `Easy: ${fmt(lc.easy) || 0} (${easyPct}%)`);
      }

      // Medium
      if (barCountMedium) barCountMedium.textContent = fmt(lc.medium) || '—';
      if (barFillMedium) {
        const medPct = total > 0 && lc.medium != null ? ((lc.medium / total) * 100).toFixed(1) : 0;
        barFillMedium.style.width = `${medPct}%`;
        barFillMedium.setAttribute('title', `Medium: ${fmt(lc.medium) || 0} (${medPct}%)`);
      }

      // Hard
      if (barCountHard) barCountHard.textContent = fmt(lc.hard) || '—';
      if (barFillHard) {
        const hardPct = total > 0 && lc.hard != null ? ((lc.hard / total) * 100).toFixed(1) : 0;
        barFillHard.style.width = `${hardPct}%`;
        barFillHard.setAttribute('title', `Hard: ${fmt(lc.hard) || 0} (${hardPct}%)`);
      }

      // LeetCode Total Display & Link
      if (leetcodeTotalDisplay) {
        leetcodeTotalDisplay.textContent = total > 0 ? `${fmt(total)} Unique Problems` : 'Update required';
      }
      if (leetcodeProfileLink && lc.profileUrl) {
        leetcodeProfileLink.href = lc.profileUrl;
      }
    }

    // 5. SkillRack Metric & Profile
    const skillrackCountWrap = document.getElementById('skillrackCountWrap');
    const skillrackProfileLink = document.getElementById('skillrackProfileLink');

    if (sr) {
      if (skillrackProfileLink && sr.profileUrl) {
        skillrackProfileLink.href = sr.profileUrl;
      }

      if (skillrackCountWrap) {
        const srTotal = fmt(sr.totalSolved);
        if (srTotal !== null) {
          skillrackCountWrap.innerHTML = `<strong>${srTotal}</strong> <span style="font-size:0.75rem; color:var(--bp-annotation);">${sr.metricLabel || 'Programs'}</span>`;
        } else {
          skillrackCountWrap.innerHTML = `<span class="bp-unverified-tag" title="SkillRack requires college authentication to verify counts">Update required</span>`;
        }
      }
    }
  }

  // Initialize data-driven metrics rendering
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderPortfolioMetrics);
  } else {
    renderPortfolioMetrics();
  }

  // Optional: non-blocking live refresh attempt for LeetCode public GraphQL if online
  if (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.codingProfiles && window.PORTFOLIO_DATA.codingProfiles.leetcode) {
    const lc = window.PORTFOLIO_DATA.codingProfiles.leetcode;
    if (lc.username && window.fetch) {
      // Gentle non-blocking background check; strictly preserves verified fallback on failure
      const graphqlQuery = {
        query: "query getUserProfile($username: String!) { matchedUser(username: $username) { submitStatsGlobal { acSubmissionNum { difficulty count } } } }",
        variables: { username: lc.username }
      };

      fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphqlQuery),
        mode: 'cors'
      })
      .then(res => res.ok ? res.json() : null)
      .then(json => {
        if (json && json.data && json.data.matchedUser && json.data.matchedUser.submitStatsGlobal) {
          const stats = json.data.matchedUser.submitStatsGlobal.acSubmissionNum || [];
          const allItem = stats.find(s => s.difficulty === 'All');
          const easyItem = stats.find(s => s.difficulty === 'Easy');
          const medItem = stats.find(s => s.difficulty === 'Medium');
          const hardItem = stats.find(s => s.difficulty === 'Hard');

          if (allItem && allItem.count > 0) {
            lc.totalSolved = allItem.count;
            if (easyItem) lc.easy = easyItem.count;
            if (medItem) lc.medium = medItem.count;
            if (hardItem) lc.hard = hardItem.count;
            const now = new Date();
            lc.lastVerified = now.toISOString().split('T')[0];
            renderPortfolioMetrics();
          }
        }
      })
      .catch(() => {
        // Silent catch: offline or CORS restriction defaults gracefully to verified config
      });
    }
  }

})();
