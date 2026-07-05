import { useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Github, Linkedin, ExternalLink, Mail, Smartphone, ChevronLeft, ChevronRight, Moon, Sun, Instagram, Facebook, X } from "lucide-react";

function App() {
  const [init, setInit] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [expandedImage, setExpandedImage] = useState(null);
  const smarth2woRef = useRef(null);
  const ahhsRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const now = new Date();
    const phDate = new Intl.DateTimeFormat('en-PH', {
      timeZone: 'Asia/Manila',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(now);
    
    const phTime = new Intl.DateTimeFormat('en-PH', {
      timeZone: 'Asia/Manila',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(now);

    const submissionData = {
      ...formData,
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
      submittedDate: phDate,
      submittedTime: phTime
    };

    try {
      const res = await fetch('https://n8n.charlesterrenal.com/webhook/61f81cd1-66f0-4c2a-903c-a7d3842a14d7', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', inquiryType: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [scrollStates, setScrollStates] = useState({
    smarth2wo: { canScrollLeft: false, canScrollRight: true },
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
      checkScroll(ahhsRef, 'ahhs');
    };
    
    // Check initial layout after a brief render delay
    setTimeout(handleResize, 100);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            <div 
              onClick={() => setExpandedImage("images/linkedin-picture.png")}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shrink-0 bg-[#e2e2dc] dark:bg-[#1a1a1a] transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-white/20 cursor-pointer group"
            >
              <img src="images/linkedin-picture.png" alt="Charles Terrenal" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
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
                  <a href="https://www.instagram.com/charleiterrenal/" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white transition-colors">
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
                  <div onClick={() => setExpandedImage(darkMode ? "images/smarth2wo-landing.png" : "images/smarth2wo-landing-light.png")} className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500">
                    <img src={darkMode ? "images/smarth2wo-landing.png" : "images/smarth2wo-landing-light.png"} alt="SmartH2wo Landing Page" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent z-0" />
                    <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">landing image missing</span>
                  </div>
                  <div onClick={() => setExpandedImage(darkMode ? "images/smarth2wo-dashboard.png" : "images/smarth2wo-dashboard-light.png")} className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500">
                    <img src={darkMode ? "images/smarth2wo-dashboard.png" : "images/smarth2wo-dashboard-light.png"} alt="SmartH2wo Dashboard" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent z-0" />
                    <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">dashboard image missing</span>
                  </div>
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
            <div className="timeline-container !border-transparent !pb-0">
              <div className="timeline-icon-small">
                <div className="w-full h-full rounded-full bg-[#e2e2dc] dark:bg-[#1a1a1a] flex items-center justify-center text-[9px] font-bold text-black dark:text-white border border-black/10 dark:border-white/20 transition-colors duration-500">a</div>
              </div>
              <h3 className="text-[13px] font-medium text-black dark:text-white lowercase mb-4 flex items-center gap-2 transition-colors duration-500">
                ahhs <span className="text-black/30 dark:text-white/30">—</span> a humble home server
                <a href="https://github.com/charlesterrenal/ahhs" target="_blank" rel="noreferrer"><ExternalLink className="w-3 h-3 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white" /></a>
                <a href="https://github.com/charlesterrenal/ahhs" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors ml-2 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                  </span>
                  <span className="text-[9px] font-bold tracking-wider uppercase drop-shadow-[0_0_2px_rgba(239,68,68,0.5)]">live</span>
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
                  <div onClick={() => setExpandedImage("images/ahhs-terminal.png")} className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500">
                    <img src="images/ahhs-terminal.png" alt="AHHS Terminal" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent z-0" />
                    <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">terminal missing</span>
                  </div>
                  <div onClick={() => setExpandedImage("images/ahhs-proxmox.png")} className="w-[85%] sm:w-[90%] shrink-0 snap-center aspect-[16/9] rounded-xl bg-[#e2e2dc] dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden relative group cursor-pointer transition-colors hover:border-black/20 dark:hover:border-white/20 duration-500">
                    <img src="images/ahhs-proxmox.png" alt="AHHS Proxmox Dashboard" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent z-0" />
                    <span className="hidden text-black/30 dark:text-white/30 text-[10px] z-10 group-hover:scale-105 transition-transform tracking-widest uppercase">proxmox missing</span>
                  </div>
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

          </div>
        </motion.section>

        {/* Let's Work Together Section */}
        <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-12 scroll-mt-24">
          <h2 className="section-title mb-6">let's work together</h2>

          {/* Contact Form */}
          <div className="transition-colors duration-500 relative overflow-hidden">
            <p className="text-sm text-black/60 dark:text-white/60 mb-6 lowercase max-w-lg">
              fill out the form with your goals and preferred format. i'll review your inquiry and get back to you with a custom proposal.
            </p>

            {submitStatus === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 bg-[#e2e2dc]/50 dark:bg-[#1a1a1a]/50 rounded-xl text-black dark:text-white text-sm lowercase flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                  <div className="w-2 h-4 border-b-2 border-r-2 border-black dark:border-white transform rotate-45 mb-1" />
                </div>
                <span className="font-medium">thanks for reaching out!</span>
                <span className="opacity-60 mt-1">i'll get back to you shortly.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-3 relative z-10">
                <input 
                  type="text" name="name" required placeholder="full name" 
                  value={formData.name} onChange={handleFormChange}
                  className="w-full bg-[#e2e2dc]/50 dark:bg-[#1a1a1a]/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors lowercase"
                />
                
                <input 
                  type="email" name="email" required placeholder="email" 
                  value={formData.email} onChange={handleFormChange}
                  className="w-full bg-[#e2e2dc]/50 dark:bg-[#1a1a1a]/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors lowercase"
                />

                <input 
                  type="text" name="company" placeholder="company / organization" 
                  value={formData.company} onChange={handleFormChange}
                  className="w-full bg-[#e2e2dc]/50 dark:bg-[#1a1a1a]/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors lowercase"
                />

                <div className="relative">
                  <select 
                    name="inquiryType" required 
                    value={formData.inquiryType} onChange={handleFormChange}
                    className="w-full bg-[#e2e2dc]/50 dark:bg-[#1a1a1a]/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors lowercase appearance-none"
                  >
                    <option value="" disabled className="text-black/40 dark:text-white/40">select...</option>
                    <option value="General Inquiry">general inquiry</option>
                    <option value="Project Request">project request</option>
                    <option value="Consulting">consulting</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/40 dark:text-white/40">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>

                <textarea 
                  name="message" required placeholder="what are you hoping to get out of it?" 
                  value={formData.message} onChange={handleFormChange} rows={3}
                  className="w-full bg-[#e2e2dc]/50 dark:bg-[#1a1a1a]/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors lowercase resize-none"
                />

                {submitStatus === 'error' && (
                  <p className="text-red-500 text-xs lowercase px-1 mt-1">something went wrong. please try again.</p>
                )}

                <button 
                  type="submit" disabled={isSubmitting}
                  className="w-full bg-black dark:bg-white text-white dark:text-black font-medium text-sm rounded-xl py-2.5 mt-2 hover:bg-black/90 dark:hover:bg-white/90 active:scale-[0.98] transition-all lowercase disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : 'submit'}
                </button>
              </form>
            )}
          </div>

        </motion.section>

        {/* Footer */}
        <footer className="pt-8 border-t border-black/10 dark:border-white/10 flex justify-between items-center text-[10px] text-black/40 dark:text-white/30 lowercase transition-colors duration-500">
          <span>&copy; 2026 charles vincent terrenal</span>
          <span>self-hosted</span>
        </footer>
      </div>

      {/* Expanded Image Lightbox */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} 
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }} 
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            onClick={() => setExpandedImage(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 sm:p-12 cursor-pointer"
          >
            <button className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.95, opacity: 0, y: 10 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={expandedImage} 
              alt="Expanded view"
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain ring-1 ring-white/10 cursor-default" 
              onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing it
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
