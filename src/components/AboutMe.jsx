import { motion } from 'framer-motion';

/* ─── Stats row data ─────────────────────────────────────────────── */
const STATS = [
  { value: '380+', label: 'LeetCode Problems' },
  { value: '9.79', label: 'CGPA' },
  { value: '105',  label: 'WPM Typing Speed' },
  { value: '3+',   label: 'AI-Integrated Projects' },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

/* ─── Section ────────────────────────────────────────────────────── */
export default function AboutMe() {
  return (
    <section id="about-me" className="relative section-container overflow-hidden">

      {/* ── Subtle background glow ─────────────────────────────────── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />

      {/* ── Top accent line ────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-0"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.35), transparent)' }}
      />

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="relative z-10">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-14"
        >
          <span className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-accent/70 flex items-center gap-2.5 mb-4">
            <span className="inline-block w-6 h-px bg-gradient-to-r from-accent to-accent-light rounded-full" />
            Who I Am
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            About Me
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left — description ─────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="flex flex-col gap-6"
          >
            <motion.p
              variants={fadeUp}
              className="text-white/80 text-base sm:text-lg leading-relaxed font-medium"
            >
              I build intelligent software that combines{' '}
              <span className="text-gradient font-semibold">full-stack engineering with AI</span>
              {' '}to solve real-world problems.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-white/55 text-sm sm:text-base leading-relaxed"
            >
              From semantic recommendation systems to AI-assisted financial tools, I enjoy designing
              scalable applications that transform complex ideas into practical user experiences.
            </motion.p>

            {/* Accent divider */}
            <motion.div
              variants={fadeUp}
              className="h-px max-w-xs"
              style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.5), transparent)' }}
            />

            {/* Highlight chips */}
            <motion.div variants={stagger} className="flex flex-wrap gap-2.5">
              {['Full-Stack Engineering', 'AI & ML Integration', 'Semantic Search', 'System Design', 'MERN Stack', 'FastAPI'].map((chip) => (
                <motion.span
                  key={chip}
                  variants={fadeUp}
                  className="font-mono text-[10.5px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border"
                  style={{
                    color: '#818cf8',
                    borderColor: 'rgba(99,102,241,0.3)',
                    background: 'rgba(99,102,241,0.08)',
                  }}
                >
                  {chip}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right — stats grid ────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="relative group rounded-2xl border border-white/[0.08] overflow-hidden p-6 flex flex-col gap-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.09) 0%, rgba(10,10,15,0.95) 60%)',
                  boxShadow: '0 4px 32px -8px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.04) inset',
                }}
              >
                {/* Top glint */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
                />

                <span
                  className="text-4xl font-black leading-none tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-white/50 text-xs font-semibold tracking-wide leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
