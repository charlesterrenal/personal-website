import { useState, useRef, useEffect } from "react";
import { fadeInUp } from "../motion";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    name: "smarth2wo",
    tagline: "iot water dispenser system",
    logo: "images/smarth2wo-logo.png",
    repo: "https://github.com/charlesterrenal/smarth2wo",
    live: "https://smarth2wo.tech/",
    slides: [
      { src: "images/smarth2wo-landing.webp", light: "images/smarth2wo-landing-light.webp", alt: "SmartH2wo Landing Page" },
      { src: "images/smarth2wo-dashboard.webp", light: "images/smarth2wo-dashboard-light.webp", alt: "SmartH2wo Dashboard" },
    ],
    tags: ["iot", "esp32", "fastapi", "react", "supabase", "machine learning"],
    bullets: [
      "dual payment system via qr ph (paymongo) or physical coins.",
      "dynamic qr code generation rendered directly on the tft display.",
      "machine learning for predictive maintenance and anomaly detection.",
      "automated real-time email alerts via resend for maintenance and transactions.",
      "real-time admin dashboard for sensor status, revenue analytics, and logs.",
      "secure mqtt-driven communication between backend and esp32 hardware.",
    ],
  },
  {
    name: "ahhs",
    tagline: "a humble home server",
    letter: "a",
    repo: "https://github.com/charlesterrenal/ahhs",
    slides: [
      { src: "images/ahhs-terminal.webp", alt: "AHHS Terminal" },
      { src: "images/ahhs-proxmox.webp", alt: "AHHS Proxmox Dashboard" },
    ],
    tags: ["proxmox ve", "cloudflare tunnel", "tailscale", "bash", "n8n", "samba"],
    bullets: [
      "multi-lxc virtualization environment running securely on a proxmox ve hypervisor.",
      "centralized network storage using samba and nfs shares for fast local media streaming.",
      "reliable automated backup routines driven by custom bash scripts and cron jobs.",
      "self-hosted services including a password manager, media server, vpn, and network-wide adblocking.",
      "ai-hub container for shared knowledge retrieval across ai agents and centralized documentation.",
    ],
  },
  {
    name: "orbit dashboard",
    tagline: "homelab telemetry & command center",
    logo: "images/orbit-logo.png",
    repo: "https://github.com/charlesterrenal/orbit-dashboard",
    slides: [
      { src: "images/orbit-dashboard-dark.webp", light: "images/orbit-dashboard-light.webp", alt: "Orbit Dashboard Overview" },
      { src: "images/orbit-dashboard-services.webp", alt: "Orbit Services Directory" },
      { src: "images/orbit-dashboard-containers.webp", alt: "Orbit Docker Containers Overview" },
    ],
    tags: ["react 19", "vite", "nginx", "proxmox api", "docker / portainer", "tailscale api", "uptime kuma"],
    bullets: [
      "12-factor api gateway architecture with an envsubst-driven nginx reverse proxy ensuring no internal ips or topologies are exposed.",
      "real-time virtualization telemetry pulling live cpu, ram, zfs pool health, and lxc/vm counts via proxmox ve api.",
      "container orchestration monitoring with portainer ce and network mesh device status tracking via tailscale api.",
      "instant ping latency metrics and uptime indicators seamlessly fed from uptime kuma monitors.",
      "media server & download bandwidth widgets tracking active jellyfin streams and qbittorrent transfer rates.",
      "dynamic service catalog driven by json schema with ctrl+k command palette for instantaneous keyboard navigation.",
    ],
  },
];

const ArrowButton = ({ side, onClick }) => (
  <motion.button
    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
    onClick={onClick}
    className={`absolute ${side === "left" ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-black/60 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black transition-all md:opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 backdrop-blur-sm shadow-sm`}
    aria-label={`Scroll ${side}`}
  >
    {side === "left" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
  </motion.button>
);

const Carousel = ({ slides, darkMode, openImage }) => {
  const ref = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = ref.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    ref.current?.scrollBy({ left: direction * ref.current.clientWidth * 0.85, behavior: 'smooth' });
  };

  return (
    <div className="relative group/carousel">
      <AnimatePresence>
        {canScrollLeft && <ArrowButton side="left" onClick={() => scroll(-1)} />}
      </AnimatePresence>

      <div ref={ref} onScroll={checkScroll} className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory mb-4 pb-2">
        {slides.map((slide) => {
          const src = !darkMode && slide.light ? slide.light : slide.src;
          return (
            <button key={slide.src} onClick={() => openImage(src, slide.alt)} aria-label={`View ${slide.alt} full size`} className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500 p-0 block">
              <img src={src} alt={slide.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {canScrollRight && <ArrowButton side="right" onClick={() => scroll(1)} />}
      </AnimatePresence>
    </div>
  );
};

const Projects = ({ darkMode, openImage }) => {
  return (
    <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
      <h2 className="section-title">projects</h2>
      <div className="mt-8">
        {projects.map((project, i) => (
          <div key={project.name} className={`timeline-container${i === projects.length - 1 ? " !border-transparent !pb-0" : ""}`}>
            {project.logo ? (
              <button onClick={() => openImage(project.logo, `${project.name} logo`, true)} aria-label={`View ${project.name} logo`} className="timeline-icon cursor-pointer">
                <img src={project.logo} alt="" className="w-full h-full rounded-full object-cover bg-[#e2e2dc] dark:bg-[#1a1a1a] transition-colors duration-500" />
              </button>
            ) : (
              <div className="timeline-icon-small">
                <div className="w-full h-full rounded-full bg-[#e2e2dc] dark:bg-[#1a1a1a] flex items-center justify-center text-[9px] font-bold text-black dark:text-white border border-black/10 dark:border-white/20 transition-colors duration-500">{project.letter}</div>
              </div>
            )}
            <div className="mb-4 flex items-center gap-2">
              <h3 className="text-[13px] font-medium text-black dark:text-white lowercase transition-colors duration-500">
                {project.name} <span className="text-black/30 dark:text-white/30" aria-hidden="true">—</span> {project.tagline}
              </h3>
              <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`${project.name} source code`} className="p-1.5 -m-1.5 rounded"><ExternalLink className="w-3 h-3 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white" /></a>
              {project.live ? (
                <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20 transition-colors ml-2 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase drop-shadow-[0_0_2px_rgba(239,68,68,0.5)]">live</span>
                </a>
              ) : (
                <a href={project.repo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 hover:bg-slate-500/20 transition-colors ml-2 shadow-none border border-slate-500/20">
                  <span className="text-[10px] font-bold tracking-wider uppercase">source</span>
                </a>
              )}
            </div>

            <Carousel slides={project.slides} darkMode={darkMode} openImage={openImage} />

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => <span key={tag} className="tech-pill">{tag}</span>)}
            </div>
            <ul className="text-[13px] text-black/60 dark:text-white/60 space-y-1.5 list-disc pl-4 lowercase transition-colors duration-500">
              {project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;
