import { Suspense, useRef, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import expenseIQ from '../assets/expense-iq.png';
import chatNest from '../assets/chatnest.png';
import irrCalc from '../assets/irr-calculator.png';
import portfolio from '../assets/portfolio.png';
import passMgr from '../assets/terminal-command-prompt.png';
import filmly from '../assets/Filmly.png';

import ProjectDetailPage from './ProjectDetailPage';

/* ─── Project Data ───────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    name: 'Filmly',
    title: 'Filmly — AI-Powered Semantic Movie Recommendation Platform',
    desc: 'Filmly is an AI-powered movie discovery and social review platform that delivers personalized movie recommendations using semantic vector search. Instead of relying on genres or popularity alone, Filmly learns a user\'s preferences from reviews, favorites, and watchlists to build a weighted preference profile. The system retrieves semantically similar movies using FAISS and Sentence Transformers, while an LLM generates contextual explanations that explain why each movie was recommended.',
    longDesc: [
      'Retrieves semantically similar movies using FAISS and Sentence Transformers.',
      'Weighted User Profile (Reviews → 1.0, Favorites → 2.0, Watchlists → 0.5).',
      'LLM-generated recommendation explanations via Gemini API.',
      'Optimized latency: ~750ms recommendations, ~14s asynchronous LLM explanations.',
      'Responsive MERN-based interface with JWT authentication.',
    ],
    image: filmly,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'FastAPI', 'FAISS', 'Gemini API'],
    github: 'https://github.com/kaushalravin/Filmly',
    live: null,
    accent: '#6366f1',
    detail: {
      overview: 'Filmly combines semantic search with Large Language Models to recommend movies based on user behavior.',
      overviewLong: 'Filmly is an AI-powered movie discovery and social review platform that delivers personalized movie recommendations using semantic vector search. Instead of relying on genres or popularity alone, Filmly learns a user\'s preferences from reviews, favorites, and watchlists to build a weighted preference profile. The system retrieves semantically similar movies using FAISS and Sentence Transformers, while Gemini generates contextual explanations that explain why each movie was recommended. Prompts are compressed and batched to reduce LLM explanation latency from 2 minutes down to ~14 seconds.',
      problem: 'I enjoy watching only specific types of movies, and finding movies that truly matched my taste was surprisingly difficult. Existing platforms such as Letterboxd allow users to log and review movies but do not provide deeply personalized recommendations. OTT platforms recommend only content available in their own catalog, limiting discovery outside their ecosystem.',
      features: [
        { icon: '🤖', title: 'AI-Powered Recommendations', desc: 'Personalized movie recommendations based on user preference profiles.' },
        { icon: '🔍', title: 'Semantic Vector Search', desc: 'Find similar films based on deep semantic metadata using FAISS.' },
        { icon: '🧠', title: 'Sentence Transformers', desc: 'Convert movie overview metadata from TMDB to high-quality semantic embeddings.' },
        { icon: '📝', title: 'Weighted Profiles', desc: 'Build profile embeddings using user reviews, favorites, and watchlists.' },
        { icon: '💬', title: 'LLM Explanations', desc: 'Gemini explains recommendations (e.g. "Because you consistently enjoy slow-burn science fiction...").' },
        { icon: '🔐', title: 'JWT Authentication', desc: 'Secure registration, login, reviews, ratings, and friend interactions.' },
      ],
      techStack: [
        { layer: 'Frontend', items: ['React', 'Vite', 'Material UI'] },
        { layer: 'Backend', items: ['Node.js', 'Express.js'] },
        { layer: 'AI Service', items: ['FastAPI', 'Sentence Transformers', 'FAISS'] },
        { layer: 'Database', items: ['MongoDB Atlas'] },
        { layer: 'Deployment', items: ['Azure VM', 'Render', 'Vercel'] },
      ],
      architectureDesc: 'Filmly follows a classic three-tier client–server–database architecture. The React SPA communicates with an Express REST API over HTTPS; the API layer handles auth, business logic, and proxies enriched data from TMDB; MongoDB stores users, reviews, and watchlists.',
      architectureLayers: [
        { label: 'Client', nodes: [{ label: 'React SPA', sublabel: 'Vite + Tailwind' }] },
        { label: 'API Gateway', nodes: [{ label: 'Express REST API', sublabel: 'Node.js' }, { label: 'JWT Middleware', sublabel: 'Auth guard' }] },
        { label: 'Services', nodes: [{ label: 'Auth Service', sublabel: 'bcrypt / JWT' }, { label: 'Movie Service', sublabel: 'TMDB proxy' }, { label: 'Review Service', sublabel: 'CRUD + agg' }] },
        { label: 'Data', nodes: [{ label: 'MongoDB Atlas', sublabel: 'Mongoose ODM' }, { label: 'TMDB API', sublabel: 'External' }] },
      ],
    },
  },
  {
    name: 'ExpenseIQ',
    title: 'ExpenseIQ — AI-Powered Personal Expense Tracker',
    desc: 'ExpenseIQ is a full-stack personal finance application that simplifies expense tracking using Artificial Intelligence. Instead of manually entering every field, users simply describe an expense in natural language or through voice, and the application automatically converts it into structured financial records.',
    longDesc: [
      'Natural language expense parsing via Google Gemini API.',
      'Voice-based expense logging using the browser\'s Web Speech API.',
      'Monthly summary dashboard with Chart.js visualisations.',
      'Data portability: supports CSV import and Excel export.',
      'Full MERN stack with secure JWT auth and RESTful APIs.',
    ],
    image: expenseIQ,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API', 'Speech API'],
    github: 'https://github.com/kaushalravin/ExpenseIQ',
    live: null,
    accent: '#818cf8',
    detail: {
      overview: 'ExpenseIQ is a full-stack personal finance application that simplifies expense tracking using Artificial Intelligence.',
      overviewLong: 'ExpenseIQ removes the friction from personal finance. Instead of manually entering every field, users describe an expense in natural language or through voice, and the application automatically parses and converts it into structured financial records. Voice inputs use the browser\'s Web Speech API to convert spoken words to text, and the parsed JSON data is validated with Joi before storing in MongoDB.',
      problem: 'Most expense tracking applications require multiple manual inputs for every transaction. My own family found this process repetitive and eventually stopped tracking expenses consistently. I wanted to reduce the friction by allowing users to simply say: "Spent ₹350 on dinner yesterday using UPI" and let AI handle the rest.',
      features: [
        { icon: '🗣️', title: 'Voice Input', desc: 'Uses the browser\'s Web Speech API to convert spoken expenses into text before AI processing.' },
        { icon: '🤖', title: 'AI Parsing', desc: 'Gemini extracts amount, category, payment method, date, and notes from natural language.' },
        { icon: '📊', title: 'Analytics', desc: 'Chart.js dashboard displaying monthly trends, category distributions, and payment statistics.' },
        { icon: '📥', title: 'Data Portability', desc: 'Import financial history from CSV and export to formatted Excel files.' },
        { icon: '🔐', title: 'Security First', desc: 'Secure passwords using bcrypt, JWT authentication, and HTTP-only cookies.' },
        { icon: '📡', title: 'REST APIs', desc: 'Structured backend built with Node, Express, Joi Validation, and MongoDB sanitization.' },
      ],
      techStack: [
        { layer: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'Chart.js'] },
        { layer: 'Backend', items: ['Node.js', 'Express.js', 'Joi Validation'] },
        { layer: 'AI Layer', items: ['Google Gemini API', 'Web Speech API'] },
        { layer: 'Database', items: ['MongoDB Atlas'] },
      ],
      architectureDesc: 'User input flows from the React client to an Express endpoint, which builds a structured prompt and calls the Gemini API. The parsed JSON response is validated, enriched with user metadata, and stored in MongoDB. The dashboard reads aggregated data via dedicated analytics endpoints.',
      architectureLayers: [
        { label: 'Client', nodes: [{ label: 'React SPA', sublabel: 'Input + charts' }] },
        { label: 'API', nodes: [{ label: 'Express REST', sublabel: '/expenses, /auth' }, { label: 'Gemini Proxy', sublabel: 'Prompt builder' }] },
        { label: 'AI Layer', nodes: [{ label: 'Gemini API', sublabel: 'NLP parse' }, { label: 'JSON Validator', sublabel: 'Schema check' }] },
        { label: 'Data', nodes: [{ label: 'MongoDB Atlas', sublabel: 'Expenses, Users' }] },
      ],
    },
  },
  {
    name: 'ChatNest',
    title: 'Real-Time Chat Application',
    desc: 'ChatNest is a WebSocket-powered chat platform where anyone can spin up a named room and start talking instantly — no sign-up required. Rooms are dynamically managed on the server and automatically cleaned up when empty.',
    longDesc: [
      'Bi-directional real-time messaging via Socket.io WebSockets.',
      'Dynamic room creation and automatic cleanup on last-user exit.',
      'Typing indicators and online-user count per room.',
      'Persistent message history within an active session.',
      'Minimalist React UI with animated message transitions.',
    ],
    image: chatNest,
    tags: ['React', 'Node.js', 'Express', 'Socket.io'],
    github: 'https://github.com/kaushalravin/ChatNest',
    live: null,
    accent: '#a78bfa',
    detail: {
      overview: 'Instant, room-based real-time chat — no accounts, no setup, just pick a room name and start talking.',
      overviewLong: 'ChatNest strips real-time communication down to its essentials: join a named room and send messages instantly. Built on Node.js with Socket.io, it handles bi-directional WebSocket communication with minimal latency. The server dynamically tracks active rooms and users, broadcasting events (join, leave, typing, message) to all room members in real time. When the last user leaves, the room is automatically purged from memory.',
      problem: 'Existing chat platforms require account creation, onboarding flows, and app downloads just to share a quick message with a group. There\'s a clear need for ephemeral, zero-friction chat rooms that "just work" directly in the browser.',
      features: [
        { icon: '⚡', title: 'Real-Time Messaging', desc: 'Sub-millisecond message delivery via Socket.io WebSockets with bi-directional event handling.' },
        { icon: '🏠', title: 'Dynamic Rooms', desc: 'Create any named room instantly. Rooms are spun up on first join and cleaned up when empty.' },
        { icon: '⌨️', title: 'Typing Indicators', desc: 'See when other users are composing a message in real time.' },
        { icon: '👥', title: 'User Count', desc: 'Live count of active participants displayed per room.' },
        { icon: '📜', title: 'Session History', desc: 'Full message history preserved for the duration of an active session.' },
        { icon: '🎨', title: 'Animated UI', desc: 'React frontend with smooth message slide-in animations and auto-scroll.' },
      ],
      techStack: [
        { layer: 'Frontend', items: ['React 18', 'Tailwind CSS', 'Framer Motion', 'Socket.io-client'] },
        { layer: 'Backend', items: ['Node.js', 'Express.js', 'Socket.io', 'In-memory room store'] },
        { layer: 'Tooling', items: ['Vite', 'Nodemon', 'Vercel (frontend)', 'Railway (backend)'] },
      ],
      architectureDesc: 'ChatNest uses a single Node.js server that handles both HTTP (for serving the React build) and WebSocket connections via Socket.io. Room state is maintained in-process with a simple Map structure. Events are scoped to Socket.io namespaced rooms for isolation.',
      architectureLayers: [
        { label: 'Client', nodes: [{ label: 'React SPA', sublabel: 'Socket.io-client' }] },
        { label: 'Transport', nodes: [{ label: 'WebSocket', sublabel: 'Socket.io' }, { label: 'HTTP Fallback', sublabel: 'Long poll' }] },
        { label: 'Server', nodes: [{ label: 'Node.js + Express', sublabel: 'Event emitter' }, { label: 'Room Manager', sublabel: 'In-memory Map' }] },
      ],
    },
  },
  {
    name: 'PassVault',
    title: 'PassVault — Secure Credential Management System',
    desc: 'PassVault is a lightweight terminal-based password manager built in modern C++. It securely stores application credentials using custom symmetric encryption while demonstrating object-oriented software design and persistent encrypted storage.',
    longDesc: [
      'Master Password Authentication gate to authorize vault access.',
      'Symmetric encryption using a custom XOR-based reversible algorithm.',
      'Full CRUD operations to add, view, update, and delete credentials.',
      'Persistent local file storage using C++ file streams.',
      'Clean object-oriented architecture leveraging strict encapsulation.',
    ],
    image: passMgr,
    tags: ['C++', 'OOP', 'File I/O', 'Cryptography'],
    github: 'https://github.com/kaushalravin/password_manager',
    live: null,
    accent: '#34d399',
    detail: {
      overview: 'PassVault is a lightweight terminal-based password manager built in modern C++.',
      overviewLong: 'PassVault securely stores application credentials using custom symmetric encryption while demonstrating object-oriented software design. It compiles zero-dependency code using the C++ standard library, and performs direct encrypted read/writes with the local filesystem, ensuring no plaintext data ever touches the disk.',
      problem: 'I wanted to better understand file handling, encryption concepts, and object-oriented programming by building a complete security-focused application from scratch instead of relying on existing cryptographic libraries.',
      features: [
        { icon: '🔑', title: 'Master Password', desc: 'Vault access is restricted using a secure Master Password authentication gate.' },
        { icon: '🔐', title: 'XOR Encryption', desc: 'Credentials are encrypted using a custom symmetric XOR-based algorithm.' },
        { icon: '📝', title: 'CRUD Operations', desc: 'Interactive command-line menu to add, read, update, and delete credentials.' },
        { icon: '💾', title: 'Persistent Storage', desc: 'Securely writes and parses encrypted files directly on the local hard drive.' },
        { icon: '🏗️', title: 'Object-Oriented Design', desc: 'Structured utilizing encapsulation, file streams, and distinct class objects.' },
        { icon: '🛡️', title: 'Secure Vaulting', desc: 'Strict memory validation ensuring decrypted keys and credentials are not leaked.' },
      ],
      techStack: [
        { layer: 'Language', items: ['C++17 (Modern C++)'] },
        { layer: 'Standard Library', items: ['File Streams (fstream)', 'Containers (vector, string, map)'] },
        { layer: 'Design', items: ['Object-Oriented Programming', 'Encapsulation'] },
      ],
      architectureDesc: 'PassVault follows a layered architecture: the CLI layer reads user commands and delegates to the Vault facade, which coordinates between the Cipher for encryption and the FileStore for serialisation. No data is ever held in plaintext beyond the scope of a single operation.',
      architectureLayers: [
        { label: 'Presentation', nodes: [{ label: 'CLI', sublabel: 'Menu + input' }] },
        { label: 'Domain', nodes: [{ label: 'Vault', sublabel: 'Facade' }, { label: 'Entry', sublabel: 'Model' }] },
        { label: 'Security', nodes: [{ label: 'Cipher', sublabel: 'Shift encryption' }, { label: 'SHA-256', sublabel: 'Key hashing' }] },
        { label: 'Persistence', nodes: [{ label: 'FileStore', sublabel: 'Binary I/O' }] },
      ],
    },
  },
  {
    name: 'IRR Calculator',
    title: 'Financial Analysis Tool',
    desc: 'A browser-based Internal Rate of Return (IRR) calculator built with vanilla JavaScript that computes investment returns using Binary Search and Net Present Value (NPV). It features dynamic cash-flow generation and intelligent pre-population of repeated values.',
    longDesc: [
      'Binary Search with NPV calculations to accurately compute the IRR.',
      'Dynamic cash-flow input generation based on investment duration.',
      'Intelligent pre-populate feature for recurring cash-flow values.',
      'Interactive and responsive interface using HTML, CSS, Bootstrap 5.',
      'DOM manipulation and event-driven programming for seamless UX.',
    ],
    image: irrCalc,
    tags: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'Binary Search', 'NPV'],
    github: 'https://github.com/kaushalravin/interest-rate-on-return-calculator',
    live: null,
    accent: '#f59e0b',
    detail: {
      overview: 'Instant IRR computation for any investment schedule — enter cash flows, get the Internal Rate of Return in milliseconds.',
      overviewLong: 'The IRR Calculator was built to give investors and finance students a fast, no-install way to evaluate the profitability of multi-year investment schedules. The UI dynamically generates cash-flow input rows based on the number of years, and the Binary Search algorithm iterates on the NPV equation to converge on the IRR to six decimal places of accuracy.',
      problem: 'Financial calculators online are either locked behind paywalls or buried in complex spreadsheet tools. Students and early-stage investors need a clean, zero-friction IRR tool that works instantly in the browser without requiring Excel or financial modelling software.',
      features: [
        { icon: '📈', title: 'IRR Computation', desc: 'Binary Search algorithm solves the NPV=0 equation to find IRR with high precision.' },
        { icon: '⚡', title: 'Dynamic Inputs', desc: 'Cash-flow rows are generated automatically based on the investment period entered.' },
        { icon: '🔄', title: 'Pre-Populate', desc: 'Copy a single cash-flow value across all years with one click for uniform-return investments.' },
        { icon: '✅', title: 'Input Validation', desc: 'Real-time validation ensures no invalid or missing cash flows before computation.' },
        { icon: '📱', title: 'Responsive Design', desc: 'Bootstrap 5 grid adapts the layout cleanly across mobile, tablet, and desktop.' },
        { icon: '🧮', title: 'NPV Display', desc: 'Shows intermediate NPV alongside final IRR for educational transparency.' },
      ],
      techStack: [
        { layer: 'Markup', items: ['HTML5', 'Semantic Elements'] },
        { layer: 'Styling', items: ['CSS3', 'Bootstrap 5'] },
        { layer: 'Logic', items: ['Vanilla JavaScript (ES6+)', 'Binary Search', 'NPV Formula'] },
        { layer: 'Hosting', items: ['GitHub Pages'] },
      ],
      architectureDesc: 'A pure frontend application with no build step or server. All logic runs client-side: the DOM manager handles form generation and events, the Calculator module implements Binary Search over the NPV function, and the Renderer updates results in place.',
      architectureLayers: [
        { label: 'UI', nodes: [{ label: 'HTML Form', sublabel: 'Dynamic rows' }, { label: 'Bootstrap Grid', sublabel: 'Responsive' }] },
        { label: 'Controller', nodes: [{ label: 'DOM Manager', sublabel: 'Events + render' }, { label: 'Validator', sublabel: 'Input checks' }] },
        { label: 'Algorithm', nodes: [{ label: 'Calculator', sublabel: 'Binary Search' }, { label: 'NPV Engine', sublabel: 'Σ CF / (1+r)^t' }] },
      ],
    },
  },
  {
    name: 'Portfolio',
    title: 'Personal Developer Portfolio',
    desc: 'This very site — a dark-themed, interactive developer portfolio built with React, Vite, and Three.js. Procedurally rendered 3D scenes, scroll-triggered animations, and a responsive glassmorphism design system make it feel alive from first load.',
    longDesc: [
      'Three.js / React Three Fiber 3D scenes: laptop, orbital rings, globe.',
      'Framer Motion scroll-triggered animations throughout.',
      'EmailJS-powered contact form with spam protection.',
      'Tailwind CSS design system with custom design tokens.',
      'Vite for near-instant HMR and optimised production builds.',
    ],
    image: portfolio,
    tags: ['React', 'Three.js', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/kaushalravin/Personal_portfolio',
    live: null,
    accent: '#6366f1',
    detail: {
      overview: 'A dark-themed interactive portfolio with live 3D scenes, scroll animations, and a glassmorphism design system.',
      overviewLong: 'The portfolio was designed to feel like a premium product rather than a static resume. Three.js powers three distinct 3D canvases — a procedurally modelled laptop in the hero, animated orbital rings in the skills section, and a real-time rotating globe in the contact section. Framer Motion drives scroll-triggered reveals throughout, and Tailwind CSS provides a coherent dark design system with custom colour tokens.',
      problem: 'Most developer portfolios are indistinguishable — generic templates with stock photos and a list of technologies. Standing out as a developer requires a portfolio that itself demonstrates the craft: real 3D graphics, real animations, real attention to detail.',
      features: [
        { icon: '🖥️', title: '3D Laptop Scene', desc: 'Procedurally built Three.js laptop with glowing keyboard, particle field, and floating animation.' },
        { icon: '🌐', title: 'Live Globe', desc: 'Rotating WebGL globe with arc particles and city markers in the contact section.' },
        { icon: '🌀', title: 'Orbital Rings', desc: 'Animated three-ring rig with colour-coded tech-skill nodes orbiting in 3D space.' },
        { icon: '🎞️', title: 'Scroll Animations', desc: 'Every section animates in on scroll via Framer Motion viewport triggers.' },
        { icon: '📧', title: 'Contact Form', desc: 'EmailJS integration with honeypot spam protection and 24-hour send rate limiting.' },
        { icon: '🎨', title: 'Design System', desc: 'Custom Tailwind tokens for colour, shadow, and typography — dark mode by default.' },
      ],
      techStack: [
        { layer: 'Frontend', items: ['React 18', 'Vite', 'Tailwind CSS v3', 'Framer Motion'] },
        { layer: '3D', items: ['Three.js', 'React Three Fiber', '@react-three/drei'] },
        { layer: 'Services', items: ['EmailJS'] },
        { layer: 'Hosting', items: ['Vercel'] },
      ],
      architectureDesc: 'A pure client-side SPA built with Vite. Each major section is a standalone React component. 3D scenes are lazy-loaded Canvas elements to avoid blocking the main thread. EmailJS handles form submission without a custom backend.',
      architectureLayers: [
        { label: 'Pages', nodes: [{ label: 'Single Page App', sublabel: 'React + Vite' }] },
        { label: 'Sections', nodes: [{ label: 'Hero', sublabel: 'Laptop 3D' }, { label: 'Projects', sublabel: 'Orb scenes' }, { label: 'Skills', sublabel: 'Orbital rings' }] },
        { label: '3D Engine', nodes: [{ label: 'React Three Fiber', sublabel: 'Canvas wrapper' }, { label: 'Three.js', sublabel: 'WebGL renderer' }] },
        { label: 'Services', nodes: [{ label: 'EmailJS', sublabel: 'Contact form' }, { label: 'Vercel CDN', sublabel: 'Hosting' }] },
      ],
    },
  },
];

/* ─── Framer variants ────────────────────────────────────────────────────── */
const rowVariant = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Hex → RGB helper ───────────────────────────────────────────────────── */
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ─── Mini 3D floating orb scene ─────────────────────────────────────────── */
function OrbMesh({ accent }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();

  const accentColor = accent || '#6366f1';

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: accentColor, emissive: accentColor, emissiveIntensity: 0.6,
    roughness: 0.25, metalness: 0.7,
  }), [accentColor]);

  const ringMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: accentColor, emissive: accentColor, emissiveIntensity: 1.0,
    roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.65,
  }), [accentColor]);

  const coreMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ffffff', emissive: accentColor, emissiveIntensity: 2.2,
    roughness: 0, metalness: 0, transparent: true, opacity: 0.85,
  }), [accentColor]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
      meshRef.current.position.y = Math.sin(t * 0.7) * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
      ringRef.current.rotation.x = Math.PI / 2.8 + Math.sin(t * 0.25) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.3;
      ring2Ref.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={18} color={accentColor} distance={10} decay={2} />
      <pointLight position={[-2, -2, 2]} intensity={10} color="#ffffff" distance={8} decay={2} />
      <pointLight position={[0, 4, -2]} intensity={8} color={accentColor} distance={8} decay={2} />

      <mesh ref={meshRef} material={mat}>
        <icosahedronGeometry args={[0.9, 2]} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.38, 16, 16]} />
        <primitive object={coreMat} attach="material" />
      </mesh>

      <mesh ref={ringRef} material={ringMat} rotation={[Math.PI / 2.8, 0, 0]}>
        <torusGeometry args={[1.42, 0.028, 12, 80]} />
      </mesh>

      <mesh ref={ring2Ref} material={ringMat} rotation={[Math.PI / 4, Math.PI / 5, 0]}>
        <torusGeometry args={[1.75, 0.016, 8, 80]} />
      </mesh>

      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 1.42, 0, Math.sin(angle) * 1.42]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={3} />
          </mesh>
        );
      })}
    </group>
  );
}

function ProjectOrb({ accent }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      <OrbMesh accent={accent} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
    </Canvas>
  );
}

/* ─── Feature bullet list ────────────────────────────────────────────────── */
function FeatureList({ items, accent }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
          <span
            className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ─── Single full-width project row ─────────────────────────────────────── */
function ProjectRow({ project, index, onOpenDetail }) {
  const { name, title, desc, longDesc, image, tags, github, live, accent } = project;
  const isEven = index % 2 === 0;
  const rgb = hexToRgb(accent);

  return (
    <motion.div
      variants={rowVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="w-full rounded-3xl overflow-hidden border border-white/[0.07] relative"
      style={{
        background: `linear-gradient(135deg, rgba(${rgb},0.06) 0%, rgba(10,10,15,0.97) 60%)`,
        boxShadow: `0 8px 60px -12px rgba(${rgb},0.25), 0 1px 0 rgba(255,255,255,0.04) inset`,
      }}
    >
      {/* Top glint */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}55, transparent)` }}
      />

      {/* Project number watermark */}
      <div
        className="absolute top-6 right-8 font-mono text-[80px] font-black leading-none select-none pointer-events-none"
        style={{ color: `${accent}09` }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0`}>

        {/* ── Image + 3D orb side ── */}
        <div className="relative lg:w-[48%] flex-shrink-0 min-h-[280px] sm:min-h-[340px] lg:min-h-[480px] overflow-hidden">
          <img
            src={image}
            alt={`${name} screenshot`}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(${isEven ? '270deg' : '90deg'}, rgba(10,10,15,0.0) 0%, rgba(10,10,15,0.55) 70%, rgba(10,10,15,0.92) 100%)`,
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f]/70 to-transparent lg:hidden" />

          <div
            className={`absolute hidden sm:block ${isEven ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56`}
            style={{ zIndex: 2 }}
          >
            <Suspense fallback={null}>
              <ProjectOrb accent={accent} />
            </Suspense>
          </div>

          <div className="absolute bottom-4 left-5 z-10">
            <span
              className="font-mono text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border"
              style={{
                color: accent,
                borderColor: `${accent}40`,
                background: `rgba(${rgb},0.12)`,
                boxShadow: `0 0 12px ${accent}30`,
              }}
            >
              {name}
            </span>
          </div>
        </div>

        {/* ── Content side ── */}
        <div className="flex-1 p-7 sm:p-10 lg:p-14 flex flex-col justify-center gap-6">

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-text-primary leading-tight mb-3">
              {title}
            </h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-xl">
              {desc}
            </p>
          </div>

          <div
            className="h-px w-full max-w-xs"
            style={{ background: `linear-gradient(90deg, ${accent}40, transparent)` }}
          />

          <FeatureList items={longDesc} accent={accent} />

          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[10.5px] px-3 py-1 rounded-full border"
                style={{
                  color: accent,
                  borderColor: `${accent}35`,
                  background: `rgba(${rgb},0.08)`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {/* View Details */}
            <button
              onClick={() => onOpenDetail(project)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-250"
              style={{
                background: accent,
                boxShadow: `0 0 22px ${accent}50`,
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 32px ${accent}80`; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 22px ${accent}50`; }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 2H14M14 2V8M14 2L8 8M6 4H3a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1v-3" />
              </svg>
              View Details
            </button>

            {/* GitHub */}
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-250"
              style={{
                color: accent,
                borderColor: `${accent}40`,
                background: `rgba(${rgb},0.08)`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.boxShadow = `0 0 18px ${accent}40`;
                e.currentTarget.style.background = `rgba(${rgb},0.18)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${accent}40`;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = `rgba(${rgb},0.08)`;
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.55v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39C17.03 6 18 6.31 18 6.31c.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.42.36.79 1.06.79 2.14v3.17c0 .3.2.66.8.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
              GitHub
            </a>

            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-250"
                style={{ background: `rgba(${rgb},0.15)`, border: `1px solid ${accent}40` }}
              >
                Live ↗
              </a>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      <section id="projects" className="section-container">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-accent/70 flex items-center gap-2.5 mb-4">
            <span className="inline-block w-6 h-px bg-gradient-to-r from-accent to-accent-light rounded-full" />
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
            Things I&apos;ve <span className="text-gradient">Built</span>
          </h2>
          <p className="text-text-secondary mt-3 text-sm max-w-md leading-relaxed">
            A collection of projects that reflect how I think, architect, and ship — from AI-powered apps to real-time systems.
          </p>
        </motion.div>

        {/* Project rows */}
        <div className="flex flex-col gap-10 sm:gap-14">
          {PROJECTS.map((p, i) => (
            <ProjectRow
              key={p.name}
              project={p}
              index={i}
              onOpenDetail={setActiveProject}
            />
          ))}
        </div>

      </section>

      {/* Detail overlay */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailPage
            key={activeProject.name}
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
