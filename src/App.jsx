import { useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";
import { Link2, Github, Linkedin, ExternalLink, Mail, Smartphone, ChevronLeft, ChevronRight, Moon, Sun, Instagram, Facebook } from "lucide-react";

function App() {
  const [init, setInit] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const smarth2woRef = useRef(null);
  const ahhsRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scroll = (direction, ref) => {
    if (ref.current) {
      const { current } = ref;
      const scrollAmount = current.clientWidth * 0.85;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 96;
      const start = window.scrollY;
      const distance = top - start;
      const duration = 1200; // Slower 1.2s smooth scroll
      let startTime = null;

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // easeInOutQuart for a luxurious feel
        const ease = progress < 0.5 ? 8 * progress * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 4) / 2;
        
        window.scrollTo(0, start + distance * ease);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };
      requestAnimationFrame(animation);
    }
  };

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
      },
    },
    particles: {
      color: {
        value: darkMode ? "#ffffff" : "#000000",
      },
      links: {
        color: darkMode ? "#ffffff" : "#000000",
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 100,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 2 },
      },
    },
    detectRetina: true,
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative min-h-screen bg-[#f0f0ea] dark:bg-[#111111] text-[#222222] dark:text-[#e0e0e0] font-sans selection:bg-black/10 dark:selection:bg-white/20 transition-colors duration-500">
      
      {/* Floating Navbar */}
      <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center gap-3 sm:gap-6 shadow-sm transition-colors duration-500 w-[90%] sm:w-auto max-w-fit justify-center">
        <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-[10px] sm:text-xs font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors lowercase cursor-pointer">about</a>
        <a href="#experiences" onClick={(e) => scrollToSection(e, 'experiences')} className="text-[10px] sm:text-xs font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors lowercase cursor-pointer">experiences</a>
        <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="text-[10px] sm:text-xs font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors lowercase cursor-pointer">projects</a>
        <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-[10px] sm:text-xs font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors lowercase cursor-pointer">contact</a>
      </nav>

      {/* Theme Toggle */}
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black/5 dark:bg-white/10 text-black/50 dark:text-white/50 backdrop-blur-md border border-black/10 dark:border-white/10 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-all duration-300"
        aria-label="Toggle Theme"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Interactive Background */}
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          className="absolute inset-0 z-0 opacity-40 transition-opacity duration-500"
        />
      )}

      {/* Main Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-24">
        
        {/* Header Section */}
        <motion.header 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="mb-16"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8 text-center sm:text-left">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shrink-0 bg-[#e2e2dc] dark:bg-[#1a1a1a] transition-colors duration-500">
              <img src="images/linkedin-picture.png" alt="Charles Terrenal" className="w-full h-full object-cover" />
            </div>
            <div className="pt-0 sm:pt-2 flex flex-col items-center sm:items-start">
              <h1 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-2 lowercase tracking-tight transition-colors duration-500">charles vincent terrenal</h1>
              <p className="text-[13px] sm:text-sm text-black/60 dark:text-white/60 mb-4 leading-relaxed lowercase transition-colors duration-500">
                junior computer engineering technology student at pup<br className="hidden sm:block" />
                <span className="sm:hidden">, </span>aspiring to be a network and cloud engineer.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 text-black/50 dark:text-white/50 transition-colors duration-500 flex-wrap">
                <div className="flex items-center gap-4">
                  <a href="https://linkedin.com/in/charlesterrenal" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="https://github.com/charlesterrenal" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href="mailto:contact@charlesterrenal.com" className="hover:text-black dark:hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
                
                <div className="w-[1px] h-4 bg-black/10 dark:bg-white/10"></div>
                
                <div className="flex items-center gap-4">
                  <a href="https://instagram.com/charlesterrenal" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://www.facebook.com/charlesterrenal1/" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Affiliations / Tools Pills */}
          <div className="flex flex-row flex-wrap justify-center sm:justify-start gap-3 mb-10">
            <a href="https://www.pup.edu.ph/itech/" target="_blank" rel="noreferrer" className="pill !no-underline text-left">
              <img src="images/pup-logo.png" alt="PUP" className="w-5 h-5 rounded-md object-cover shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-black dark:text-white leading-tight transition-colors duration-500">pup</span>
                <span className="text-[9px] text-black/40 dark:text-white/40 leading-tight transition-colors duration-500">institute of technology</span>
              </div>
            </a>
            <a href="https://stellarph.io" target="_blank" rel="noreferrer" className="pill !no-underline text-left">
              <img src="images/stellar-logo.png" alt="StellarPH" className="w-5 h-5 rounded-md object-cover shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-black dark:text-white leading-tight transition-colors duration-500">stellarph</span>
                <span className="text-[9px] text-black/40 dark:text-white/40 leading-tight transition-colors duration-500">tech intern</span>
              </div>
            </a>
            <a href="https://www.linkedin.com/company/cncp-mnl/" target="_blank" rel="noreferrer" className="pill !no-underline text-left">
              <img src="images/cncp-logo.png" alt="CNCP" className="w-5 h-5 rounded-md object-cover shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-black dark:text-white leading-tight transition-colors duration-500">cncp</span>
                <span className="text-[9px] text-black/40 dark:text-white/40 leading-tight transition-colors duration-500">junior networking officer</span>
              </div>
            </a>
          </div>
        </motion.header>

        {/* About Section */}
        <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16 scroll-mt-24">
          <h2 className="section-title">about</h2>
          <p className="text-[13px] text-black/60 dark:text-white/60 leading-relaxed lowercase transition-colors duration-500 mb-8">
            i'm a junior computer engineering technology student at pup sta. mesa with a passion for networking, cloud computing, and self-hosted environments.<br /><br />
            i love exploring virtualization and automation through my homelab setup, where i get hands-on experience building and breaking things.<br /><br />
            beyond my homelab, i'm highly active in the community and love participating in local tech events.
          </p>

        </motion.section>

        {/* Experiences Section */}
        <motion.section id="experiences" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16 scroll-mt-24">
          <h2 className="section-title">experiences</h2>
          <div className="mt-8">

            {/* Experience 1: StellarPH */}
            <div className="timeline-container">
              <div className="timeline-icon">
                <img src="images/stellar-logo.png" alt="StellarPH" className="w-full h-full rounded-full object-cover bg-[#e2e2dc] dark:bg-[#1a1a1a] transition-colors duration-500" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                <div className="hidden w-full h-full rounded-full bg-[#e2e2dc] dark:bg-[#1a1a1a] items-center justify-center text-[10px] font-bold text-blue-500 dark:text-blue-400 border border-blue-500/20 dark:border-blue-900/50 transition-colors duration-500">ST</div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
                <h3 className="text-sm font-medium text-black dark:text-white lowercase transition-colors duration-500">stellarph</h3>
                <span className="text-[11px] text-black/40 dark:text-white/40 lowercase shrink-0 font-mono transition-colors duration-500">current</span>
              </div>
              <p className="text-[13px] text-black/60 dark:text-white/60 lowercase transition-colors duration-500">tech intern</p>
            </div>

            {/* Experience 2: ST Telemedia GDC */}
            <div className="timeline-container">
              <div className="timeline-icon">
                <img src="images/stt-logo.png" alt="ST Telemedia" className="w-full h-full rounded-full object-cover bg-[#e2e2dc] dark:bg-[#1a1a1a] transition-colors duration-500" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                <div className="hidden w-full h-full rounded-full bg-[#e2e2dc] dark:bg-[#1a1a1a] items-center justify-center text-[10px] font-bold text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-900/50 transition-colors duration-500">ST</div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
                <h3 className="text-sm font-medium text-black dark:text-white lowercase transition-colors duration-500">st telemedia gdc</h3>
                <span className="text-[11px] text-black/40 dark:text-white/40 lowercase shrink-0 font-mono transition-colors duration-500">feb 2026 - may 2026</span>
              </div>
              <p className="text-[13px] text-black/60 dark:text-white/60 lowercase transition-colors duration-500">network & security intern</p>
            </div>

            {/* Experience 3: Nexus Technologies Inc. */}
            <div className="timeline-container !pb-0 !border-transparent">
              <div className="timeline-icon">
                <img src="images/nexus-logo.png" alt="Nexus" className="w-full h-full rounded-full object-cover bg-[#e2e2dc] dark:bg-[#1a1a1a] transition-colors duration-500" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                <div className="hidden w-full h-full rounded-full bg-[#e2e2dc] dark:bg-[#1a1a1a] items-center justify-center text-[10px] font-bold text-orange-500 dark:text-orange-400 border border-orange-500/20 dark:border-orange-900/50 transition-colors duration-500">NX</div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
                <h3 className="text-sm font-medium text-black dark:text-white lowercase transition-colors duration-500">nexus technologies inc.</h3>
                <span className="text-[11px] text-black/40 dark:text-white/40 lowercase shrink-0 font-mono transition-colors duration-500">jul 2025 - sep 2025</span>
              </div>
              <p className="text-[13px] text-black/60 dark:text-white/60 lowercase transition-colors duration-500">solutions & services intern</p>
            </div>
          </div>
        </motion.section>

        {/* Education / Certifications Section */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
          <h2 className="section-title">certifications</h2>
          <div className="mt-8">
            <div className="timeline-container">
              <div className="timeline-icon-small">
                <div className="w-full h-full rounded-full bg-black/10 dark:bg-white/20 transition-colors duration-500" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1 gap-2">
                <h3 className="text-[13px] font-medium text-black dark:text-white lowercase transition-colors duration-500">mechatronics servicing nc ii</h3>
                <span className="text-[11px] text-black/40 dark:text-white/40 lowercase shrink-0 font-mono transition-colors duration-500">tesda</span>
              </div>
            </div>

            <div className="timeline-container !pb-0 !border-transparent">
              <div className="timeline-icon-small">
                <div className="w-full h-full rounded-full bg-black/10 dark:bg-white/20 transition-colors duration-500" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1 gap-2">
                <h3 className="text-[13px] font-medium text-black dark:text-white lowercase transition-colors duration-500">computer systems servicing nc ii</h3>
                <span className="text-[11px] text-black/40 dark:text-white/40 lowercase shrink-0 font-mono transition-colors duration-500">tesda</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16">
          <h2 className="section-title">tech stack</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {["python", "javascript", "sql", "bash", "ansible", "docker/lxc", "proxmox ve", "vmware", "linux", "git", "eve-ng / gns3", "appsheet", "n8n", "gcp", "azure"].map((tech) => (
              <span key={tech} className="tech-pill">{tech}</span>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
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
                <a href="https://dash.smarth2wo.tech" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors ml-2 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                  </span>
                  <span className="text-[9px] font-bold tracking-wider uppercase drop-shadow-[0_0_2px_rgba(239,68,68,0.5)]">live</span>
                </a>
              </h3>
              
              <div className="relative group/carousel">
                <button 
                  onClick={() => scroll('left', smarth2woRef)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-black/60 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black transition-all opacity-0 group-hover/carousel:opacity-100 backdrop-blur-sm shadow-sm"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div ref={smarth2woRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory mb-4 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                  <div className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500">
                    <img src={darkMode ? "images/smarth2wo-landing.png" : "images/smarth2wo-landing-light.png"} alt="SmartH2wo Landing Page" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent z-0" />
                    <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">landing image missing</span>
                  </div>
                  <div className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500">
                    <img src={darkMode ? "images/smarth2wo-dashboard.png" : "images/smarth2wo-dashboard-light.png"} alt="SmartH2wo Dashboard" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent z-0" />
                    <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">dashboard image missing</span>
                  </div>
                </div>

                <button 
                  onClick={() => scroll('right', smarth2woRef)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-black/60 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black transition-all opacity-0 group-hover/carousel:opacity-100 backdrop-blur-sm shadow-sm"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
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
            <div className="timeline-container !border-transparent !pb-0">
              <div className="timeline-icon-small">
                <div className="w-full h-full rounded-full bg-[#e2e2dc] dark:bg-[#1a1a1a] flex items-center justify-center text-[9px] font-bold text-black dark:text-white border border-black/10 dark:border-white/20 transition-colors duration-500">a</div>
              </div>
              <h3 className="text-[13px] font-medium text-black dark:text-white lowercase mb-4 flex items-center gap-2 transition-colors duration-500">
                ahhs <span className="text-black/30 dark:text-white/30">—</span> a humble home server
                <a href="https://github.com/charlesterrenal/ahhs" target="_blank" rel="noreferrer"><ExternalLink className="w-3 h-3 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white" /></a>
                <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors ml-2 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                  </span>
                  <span className="text-[9px] font-bold tracking-wider uppercase drop-shadow-[0_0_2px_rgba(239,68,68,0.5)]">live</span>
                </a>
              </h3>
              
              <div className="relative group/carousel">
                <button 
                  onClick={() => scroll('left', ahhsRef)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-black/60 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black transition-all opacity-0 group-hover/carousel:opacity-100 backdrop-blur-sm shadow-sm"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div ref={ahhsRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory mb-4 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                  <div className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500">
                    <img src="images/ahhs-terminal.png" alt="AHHS Terminal" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent z-0" />
                    <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">terminal missing</span>
                  </div>
                  <div className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500">
                    <img src="images/ahhs-proxmox.png" alt="AHHS Proxmox Dashboard" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent z-0" />
                    <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">proxmox missing</span>
                  </div>
                </div>

                <button 
                  onClick={() => scroll('right', ahhsRef)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/60 dark:bg-black/60 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-black transition-all opacity-0 group-hover/carousel:opacity-100 backdrop-blur-sm shadow-sm"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
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

          </div>
        </motion.section>

        {/* Let's Work Together Section */}
        <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-12 scroll-mt-24">
          <h2 className="section-title mb-8">let's work together</h2>
          <div className="flex flex-col gap-4">
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 group">
              <div className="flex items-center gap-3 text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm lowercase">email</span>
              </div>
              <a href="mailto:contact@charlesterrenal.com" className="text-sm text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors lowercase">
                contact@charlesterrenal.com
              </a>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 group">
              <div className="flex items-center gap-3 text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
                <span className="text-sm lowercase">linkedin</span>
              </div>
              <a href="https://linkedin.com/in/charlesterrenal" target="_blank" rel="noreferrer" className="text-sm text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors lowercase">
                charlesterrenal
              </a>
            </div>

          </div>

        </motion.section>

        {/* Footer */}
        <footer className="pt-8 border-t border-black/10 dark:border-white/10 flex justify-between items-center text-[10px] text-black/40 dark:text-white/30 lowercase transition-colors duration-500">
          <span>&copy; 2026 charles vincent terrenal</span>
          <span>self-hosted</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
