import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const Projects = ({ darkMode, setExpandedImage }) => {
  const smarth2woRef = useRef(null);
  const orbitRef = useRef(null);
  const ahhsRef = useRef(null);
  
  const [scrollStates, setScrollStates] = useState({
    smarth2wo: { canScrollLeft: false, canScrollRight: true },
    orbit: { canScrollLeft: false, canScrollRight: true },
    ahhs: { canScrollLeft: false, canScrollRight: true }
  });

  const checkScroll = (ref, key) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setScrollStates(prev => ({
        ...prev,
        [key]: {
          canScrollLeft: scrollLeft > 5,
          canScrollRight: Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5
        }
      }));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      checkScroll(smarth2woRef, 'smarth2wo');
      checkScroll(orbitRef, 'orbit');
      checkScroll(ahhsRef, 'ahhs');
    };
    
    setTimeout(handleResize, 100);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scroll = (direction, ref) => {
    if (ref.current) {
      const { current } = ref;
      const scrollAmount = current.clientWidth * 0.85;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16 scroll-mt-24">
      <h2 className="section-title">projects</h2>
      <div className="mt-8">
        
        {/* Project 1: SMARTH2WO */}
        <div className="timeline-container">
          <div className="timeline-icon">
            <img src="images/smarth2wo-logo.png" alt="SmartH2wo Logo" className="w-full h-full rounded-full object-cover bg-[#e2e2dc] dark:bg-[#1a1a1a] transition-colors duration-500" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
            <div className="hidden w-full h-full rounded-full bg-[#e2e2dc] dark:bg-[#1a1a1a] items-center justify-center text-[9px] font-bold text-black dark:text-white border border-black/10 dark:border-white/20 transition-colors duration-500">S</div>
          </div>
          <h3 className="text-[13px] font-medium text-black dark:text-white lowercase mb-4 flex items-center gap-2 transition-colors duration-500">
            smarth2wo <span className="text-black/30 dark:text-white/30">—</span> iot water dispenser system
            <a href="https://github.com/charlesterrenal/smarth2wo" target="_blank" rel="noreferrer"><ExternalLink className="w-3 h-3 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white" /></a>
            <a href="https://smarth2wo.tech/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors ml-2 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              </span>
              <span className="text-[9px] font-bold tracking-wider uppercase drop-shadow-[0_0_2px_rgba(239,68,68,0.5)]">live</span>
            </a>
          </h3>
          
          <div className="relative group/carousel">
            <AnimatePresence>
              {scrollStates.smarth2wo.canScrollLeft && (
                <motion.button 
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => scroll('left', smarth2woRef)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-black/60 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black transition-all md:opacity-0 group-hover/carousel:opacity-100 backdrop-blur-sm shadow-sm"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>

            <div ref={smarth2woRef} onScroll={() => checkScroll(smarth2woRef, 'smarth2wo')} className="flex gap-4 overflow-x-auto snap-x snap-mandatory mb-4 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`div::-webkit-scrollbar { display: none; }`}</style>
              <button onClick={() => setExpandedImage(darkMode ? "images/smarth2wo-landing.png" : "images/smarth2wo-landing-light.png")} aria-label="View SmartH2wo Landing Page full size" className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500 p-0 block">
                <img src={darkMode ? "images/smarth2wo-landing.png" : "images/smarth2wo-landing-light.png"} alt="SmartH2wo Landing Page" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent z-0" />
                <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">landing image missing</span>
              </button>
              <button onClick={() => setExpandedImage(darkMode ? "images/smarth2wo-dashboard.png" : "images/smarth2wo-dashboard-light.png")} aria-label="View SmartH2wo Dashboard full size" className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500 p-0 block">
                <img src={darkMode ? "images/smarth2wo-dashboard.png" : "images/smarth2wo-dashboard-light.png"} alt="SmartH2wo Dashboard" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent z-0" />
                <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">dashboard image missing</span>
              </button>
            </div>

            <AnimatePresence>
              {scrollStates.smarth2wo.canScrollRight && (
                <motion.button 
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => scroll('right', smarth2woRef)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-black/60 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black transition-all md:opacity-0 group-hover/carousel:opacity-100 backdrop-blur-sm shadow-sm"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="tech-pill">iot</span>
            <span className="tech-pill">esp32</span>
            <span className="tech-pill">fastapi</span>
            <span className="tech-pill">react</span>
            <span className="tech-pill">supabase</span>
            <span className="tech-pill">machine learning</span>
          </div>
          <ul className="text-[11px] text-black/60 dark:text-white/60 space-y-1.5 list-disc pl-4 lowercase transition-colors duration-500">
              <li>dual payment system via qr ph (paymongo) or physical coins.</li>
              <li>dynamic qr code generation rendered directly on the tft display.</li>
              <li>machine learning for predictive maintenance and anomaly detection.</li>
              <li>automated real-time email alerts via resend for maintenance and transactions.</li>
              <li>real-time admin dashboard for sensor status, revenue analytics, and logs.</li>
              <li>secure mqtt-driven communication between backend and esp32 hardware.</li>
            </ul>
        </div>

        {/* Project 2: AHHS */}
        <div className="timeline-container">
          <div className="timeline-icon-small">
            <div className="w-full h-full rounded-full bg-[#e2e2dc] dark:bg-[#1a1a1a] flex items-center justify-center text-[9px] font-bold text-black dark:text-white border border-black/10 dark:border-white/20 transition-colors duration-500">a</div>
          </div>
          <h3 className="text-[13px] font-medium text-black dark:text-white lowercase mb-4 flex items-center gap-2 transition-colors duration-500">
            ahhs <span className="text-black/30 dark:text-white/30">—</span> a humble home server
            <a href="https://github.com/charlesterrenal/ahhs" target="_blank" rel="noreferrer"><ExternalLink className="w-3 h-3 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white" /></a>
            <a href="https://github.com/charlesterrenal/ahhs" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-500 hover:bg-slate-500/20 transition-colors ml-2 shadow-none border border-slate-500/20">
              <span className="text-[9px] font-bold tracking-wider uppercase">source</span>
            </a>
          </h3>
          
          <div className="relative group/carousel">
            <AnimatePresence>
              {scrollStates.ahhs.canScrollLeft && (
                <motion.button 
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => scroll('left', ahhsRef)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-black/60 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black transition-all md:opacity-0 group-hover/carousel:opacity-100 backdrop-blur-sm shadow-sm"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>

            <div ref={ahhsRef} onScroll={() => checkScroll(ahhsRef, 'ahhs')} className="flex gap-4 overflow-x-auto snap-x snap-mandatory mb-4 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`div::-webkit-scrollbar { display: none; }`}</style>
              <button onClick={() => setExpandedImage("images/ahhs-terminal.png")} aria-label="View AHHS Terminal full size" className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500 p-0 block">
                <img src="images/ahhs-terminal.png" alt="AHHS Terminal" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                <div className="hidden absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent z-0" />
                <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">terminal missing</span>
              </button>
              <button onClick={() => setExpandedImage("images/ahhs-proxmox.png")} aria-label="View AHHS Proxmox Dashboard full size" className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500 p-0 block">
                <img src="images/ahhs-proxmox.png" alt="AHHS Proxmox Dashboard" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                <div className="hidden absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent z-0" />
                <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">proxmox missing</span>
              </button>
            </div>

            <AnimatePresence>
              {scrollStates.ahhs.canScrollRight && (
                <motion.button 
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => scroll('right', ahhsRef)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-black/60 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black transition-all md:opacity-0 group-hover/carousel:opacity-100 backdrop-blur-sm shadow-sm"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="tech-pill">proxmox ve</span>
            <span className="tech-pill">cloudflare tunnel</span>
            <span className="tech-pill">tailscale</span>
            <span className="tech-pill">bash</span>
            <span className="tech-pill">n8n</span>
            <span className="tech-pill">samba</span>
          </div>
          <ul className="text-[11px] text-black/60 dark:text-white/60 space-y-1.5 list-disc pl-4 lowercase transition-colors duration-500">
            <li>multi-lxc virtualization environment running securely on a proxmox ve hypervisor.</li>
            <li>centralized network storage using samba and nfs shares for fast local media streaming.</li>
            <li>reliable automated backup routines driven by custom bash scripts and cron jobs.</li>
            <li>self-hosted services including a password manager, media server, vpn, and network-wide adblocking.</li>
          </ul>
        </div>

        {/* Project 3: Orbit Dashboard */}
        <div className="timeline-container !border-transparent !pb-0">
          <div className="timeline-icon">
            <img src="images/orbit-logo.png" alt="Orbit Dashboard Logo" className="w-full h-full rounded-full object-cover bg-[#e2e2dc] dark:bg-[#1a1a1a] transition-colors duration-500" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
            <div className="hidden w-full h-full rounded-full bg-[#e2e2dc] dark:bg-[#1a1a1a] items-center justify-center text-[9px] font-bold text-black dark:text-white border border-black/10 dark:border-white/20 transition-colors duration-500">O</div>
          </div>
          <h3 className="text-[13px] font-medium text-black dark:text-white lowercase mb-4 flex items-center gap-2 transition-colors duration-500">
            orbit dashboard <span className="text-black/30 dark:text-white/30">—</span> homelab telemetry & command center
            <a href="https://github.com/charlesterrenal/orbit-dashboard" target="_blank" rel="noreferrer"><ExternalLink className="w-3 h-3 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white" /></a>
            <a href="https://github.com/charlesterrenal/orbit-dashboard" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-500 hover:bg-slate-500/20 transition-colors ml-2 shadow-none border border-slate-500/20">
              <span className="text-[9px] font-bold tracking-wider uppercase">source</span>
            </a>
          </h3>
          
          <div className="relative group/carousel">
            <AnimatePresence>
              {scrollStates.orbit?.canScrollLeft && (
                <motion.button 
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => scroll('left', orbitRef)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-black/60 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black transition-all md:opacity-0 group-hover/carousel:opacity-100 backdrop-blur-sm shadow-sm"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>

            <div ref={orbitRef} onScroll={() => checkScroll(orbitRef, 'orbit')} className="flex gap-4 overflow-x-auto snap-x snap-mandatory mb-4 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`div::-webkit-scrollbar { display: none; }`}</style>
              <button onClick={() => setExpandedImage(darkMode ? "images/orbit-dashboard-dark.png" : "images/orbit-dashboard-light.png")} aria-label="View Orbit Dashboard Overview full size" className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500 p-0 block">
                <img src={darkMode ? "images/orbit-dashboard-dark.png" : "images/orbit-dashboard-light.png"} alt="Orbit Dashboard Overview" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                <div className="hidden absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent z-0" />
                <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">overview missing</span>
              </button>
              <button onClick={() => setExpandedImage("images/orbit-dashboard-services.png")} aria-label="View Orbit Services Directory full size" className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500 p-0 block">
                <img src="images/orbit-dashboard-services.png" alt="Orbit Services Directory" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                <div className="hidden absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent z-0" />
                <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">services missing</span>
              </button>
              <button onClick={() => setExpandedImage("images/orbit-dashboard-containers.png")} aria-label="View Orbit Containers Overview full size" className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500 p-0 block">
                <img src="images/orbit-dashboard-containers.png" alt="Orbit Docker Containers Overview" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                <div className="hidden absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent z-0" />
                <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">containers missing</span>
              </button>
            </div>

            <AnimatePresence>
              {scrollStates.orbit?.canScrollRight && (
                <motion.button 
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => scroll('right', orbitRef)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-black/60 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black transition-all md:opacity-0 group-hover/carousel:opacity-100 backdrop-blur-sm shadow-sm"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="tech-pill">react 19</span>
            <span className="tech-pill">vite</span>
            <span className="tech-pill">nginx</span>
            <span className="tech-pill">proxmox api</span>
            <span className="tech-pill">docker / portainer</span>
            <span className="tech-pill">tailscale api</span>
            <span className="tech-pill">uptime kuma</span>
          </div>
          <ul className="text-[11px] text-black/60 dark:text-white/60 space-y-1.5 list-disc pl-4 lowercase transition-colors duration-500">
            <li>12-factor api gateway architecture with an envsubst-driven nginx reverse proxy ensuring no internal ips or topologies are exposed.</li>
            <li>real-time virtualization telemetry pulling live cpu, ram, zfs pool health, and lxc/vm counts via proxmox ve api.</li>
            <li>container orchestration monitoring with portainer ce and network mesh device status tracking via tailscale api.</li>
            <li>instant ping latency metrics and uptime indicators seamlessly fed from uptime kuma monitors.</li>
            <li>media server & download bandwidth widgets tracking active jellyfin streams and qbittorrent transfer rates.</li>
            <li>dynamic service catalog driven by json schema with ctrl+k command palette for instantaneous keyboard navigation.</li>
          </ul>
        </div>

      </div>
    </motion.section>
  );
};

export default Projects;
