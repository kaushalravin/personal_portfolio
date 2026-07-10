import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ─── Section Label ───────────────────────────────────────────────────────── */
function SectionLabel({ children, accent }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className="inline-block w-1 h-5 rounded-full flex-shrink-0"
        style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
      />
      <span
        className="font-mono text-[10px] tracking-[0.28em] uppercase font-semibold"
        style={{ color: accent }}
      >
        {children}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: `linear-gradient(90deg, ${accent}30, transparent)` }}
      />
    </div>
  );
}

/* ─── Main Detail Page ────────────────────────────────────────────────────── */
export default function ProjectDetailPage({ project, onClose }) {
  const scrollRef = useRef(null);
  const { name, title, image, accent, github, live, detail } = project;

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const rgb = hexToRgb(accent);

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-stretch justify-end"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        {/* Slide-in panel */}
        <motion.aside
          key="panel"
          initial={{ x: '100%', opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 38 }}
          className="relative w-full max-w-3xl h-full overflow-y-auto flex flex-col"
          style={{
            background: 'linear-gradient(160deg, #0d0d16 0%, #0a0a0f 100%)',
            borderLeft: `1px solid rgba(${rgb},0.18)`,
            boxShadow: `-24px 0 80px rgba(0,0,0,0.6), inset 1px 0 0 rgba(${rgb},0.08)`,
          }}
          ref={scrollRef}
        >
          {/* ── Top accent glow line ── */}
          <div
            className="sticky top-0 left-0 right-0 h-px z-10"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}70, transparent)` }}
          />

          {/* ── Hero banner ── */}
          <div className="relative h-52 sm:h-64 w-full flex-shrink-0 overflow-hidden">
            <img
              src={image}
              alt={`${name} screenshot`}
              className="w-full h-full object-cover object-top"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, rgba(10,10,15,0.1) 0%, rgba(10,10,15,0.75) 70%, rgba(10,10,15,1) 100%)`,
              }}
            />
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/10 bg-black/40 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-200"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {/* Name badge */}
            <div className="absolute bottom-5 left-6">
              <span
                className="font-mono text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border"
                style={{
                  color: accent,
                  borderColor: `${accent}50`,
                  background: `rgba(${rgb},0.15)`,
                  boxShadow: `0 0 14px ${accent}30`,
                }}
              >
                {name}
              </span>
            </div>
          </div>

          {/* ── About (below hero) ── */}
          <div
            className="px-6 sm:px-10 py-8 border-b"
            style={{ borderColor: `rgba(${rgb},0.12)` }}
          >
            <div className="flex items-start gap-4">
              {/* Accent side bar */}
              <div
                className="flex-shrink-0 w-1 self-stretch rounded-full mt-1"
                style={{ background: `linear-gradient(to bottom, ${accent}, ${accent}20)` }}
              />
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-black text-text-primary leading-tight mb-3">
                  {title}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {detail.overview}
                </p>
                {/* Quick meta row */}
                <div className="flex flex-wrap gap-4 mt-4">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: `${accent}80` }}>Status</p>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: `rgba(${rgb},0.12)`, color: accent }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: accent }}
                      />
                      In Development
                    </span>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: `${accent}80` }}>Type</p>
                    <p className="text-text-primary text-xs font-semibold">Personal Project</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: `${accent}80` }}>Stack</p>
                    <p className="text-text-primary text-xs font-semibold">{project.tags.slice(0, 3).join(' · ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="flex-1 px-6 sm:px-10 pb-16 pt-8 flex flex-col gap-10">

            {/* ── Overview ── */}
            <div>
              <SectionLabel accent={accent}>Overview</SectionLabel>
              <p className="text-text-secondary text-sm leading-relaxed">
                {detail.overviewLong}
              </p>
            </div>

            {/* ── Problem Statement ── */}
            <div>
              <SectionLabel accent={accent}>Problem Statement</SectionLabel>
              <div
                className="rounded-2xl p-5 border"
                style={{
                  borderColor: `${accent}20`,
                  background: `rgba(${rgb},0.05)`,
                }}
              >
                <p className="text-text-secondary text-sm leading-relaxed italic">
                  &ldquo;{detail.problem}&rdquo;
                </p>
              </div>
            </div>

            {/* ── Key Features ── */}
            <div>
              <SectionLabel accent={accent}>Key Features</SectionLabel>
              <div className="grid sm:grid-cols-2 gap-3">
                {detail.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-4 rounded-xl border"
                    style={{
                      borderColor: `${accent}18`,
                      background: `rgba(${rgb},0.04)`,
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{
                        background: `rgba(${rgb},0.15)`,
                        color: accent,
                        boxShadow: `0 0 8px ${accent}25`,
                      }}
                    >
                      {f.icon}
                    </div>
                    <div>
                      <p className="text-text-primary text-xs font-semibold mb-0.5">{f.title}</p>
                      <p className="text-text-secondary text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Tech Stack ── */}
            <div>
              <SectionLabel accent={accent}>Tech Stack</SectionLabel>
              <div className="flex flex-col gap-3">
                {detail.techStack.map((layer, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="font-mono text-[9px] tracking-[0.15em] uppercase pt-1 flex-shrink-0 w-20 text-right"
                      style={{ color: `${accent}80` }}
                    >
                      {layer.layer}
                    </span>
                    <div
                      className="w-px self-stretch"
                      style={{ background: `${accent}25` }}
                    />
                    <div className="flex flex-wrap gap-2 flex-1">
                      {layer.items.map((item) => (
                        <span
                          key={item}
                          className="font-mono text-[10.5px] px-2.5 py-1 rounded-lg border"
                          style={{
                            color: accent,
                            borderColor: `${accent}30`,
                            background: `rgba(${rgb},0.08)`,
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── GitHub CTA ── */}
            <div
              className="rounded-2xl p-6 sm:p-8 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
              style={{
                borderColor: `${accent}20`,
                background: `linear-gradient(135deg, rgba(${rgb},0.08) 0%, rgba(10,10,15,0.9) 100%)`,
              }}
            >
              <div>
                <h3 className="text-text-primary font-bold text-base mb-1">Explore the Source Code</h3>
                <p className="text-text-secondary text-sm">
                  Full source, setup instructions, and contribution guide on GitHub.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-250 text-white"
                  style={{
                    background: `rgba(${rgb},0.18)`,
                    border: `1px solid ${accent}50`,
                    boxShadow: `0 0 20px ${accent}25`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `rgba(${rgb},0.32)`;
                    e.currentTarget.style.boxShadow = `0 0 30px ${accent}45`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = `rgba(${rgb},0.18)`;
                    e.currentTarget.style.boxShadow = `0 0 20px ${accent}25`;
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.55v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39C17.03 6 18 6.31 18 6.31c.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.42.36.79 1.06.79 2.14v3.17c0 .3.2.66.8.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                  View on GitHub
                </a>
                {live && (
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-250"
                    style={{
                      background: accent,
                      boxShadow: `0 0 24px ${accent}60`,
                    }}
                  >
                    Live ↗
                  </a>
                )}
              </div>
            </div>

          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}
