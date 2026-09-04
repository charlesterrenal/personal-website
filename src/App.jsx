import { useEffect, useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Moon, Sun, Instagram, Facebook, X } from "lucide-react";

const BackgroundParticles = lazy(() => import("./components/BackgroundParticles"));
const Experiences = lazy(() => import("./components/Experiences"));
const Projects = lazy(() => import("./components/Projects"));
const ContactForm = lazy(() => import("./components/ContactForm"));

function App() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [darkMode, setDarkMode] = useState(true);
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative min-h-screen bg-[#f0f0ea] dark:bg-[#111111] text-[#222222] dark:text-[#e0e0e0] font-sans selection:bg-black/10 dark:selection:bg-white/20 transition-colors duration-500">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg focus:text-sm focus:font-medium">
        Skip to main content
      </a>
      
      {/* Floating Navbar */}
      <nav aria-label="Primary navigation" className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center gap-3 sm:gap-6 shadow-sm transition-colors duration-500 w-[90%] sm:w-auto max-w-fit justify-center">
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

      {/* Interactive Background - Lazy Loaded */}
      <Suspense fallback={null}>
        <BackgroundParticles darkMode={darkMode} prefersReducedMotion={prefersReducedMotion} />
      </Suspense>

      {/* Main Content Container */}
      <main id="main-content" className="relative z-10 max-w-2xl mx-auto px-6 py-24">
        
        {/* Header Section */}
        <motion.header 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="mb-16"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-8 text-center sm:text-left">
            <div className="relative group">
              {/* Subtle ambient blur glow behind avatar */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 blur-md opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <button 
                onClick={() => setExpandedImage("images/linkedin-picture.webp")}
                aria-label="View profile photo"
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-black/15 dark:border-white/15 shrink-0 bg-[#e2e2dc] dark:bg-[#1a1a1a] transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-black/30 dark:hover:border-white/30 cursor-pointer block p-0 ring-1 ring-black/5 dark:ring-white/10"
              >
                <img
                  src="images/linkedin-picture.webp"
                  alt="Charles Terrenal"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  width="128"
                  height="128"
                />
                
                {/* Diagonal light sheen overlay effect on hover */}
                <div 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" 
                  aria-hidden="true" 
                />
              </button>
            </div>
            <div className="pt-0 sm:pt-2 flex flex-col items-center sm:items-start">
              <h1 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-2 lowercase tracking-tight transition-colors duration-500">charles vincent terrenal</h1>
              <p className="text-[13px] sm:text-sm text-black/60 dark:text-white/60 mb-4 leading-relaxed lowercase transition-colors duration-500">
                computer engineering student at pup.<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>aspiring to be a network engineer and a leader in tech.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 text-black/50 dark:text-white/50 transition-colors duration-500 flex-wrap">
                <div className="flex items-center gap-4">
                  <a href="https://linkedin.com/in/charlesterrenal" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="p-1.5 -m-1.5 rounded hover:text-black dark:hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a href="https://github.com/charlesterrenal" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="p-1.5 -m-1.5 rounded hover:text-black dark:hover:text-white transition-colors">
                    <Github className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a href="mailto:contact@charlesterrenal.com" aria-label="Send email" className="p-1.5 -m-1.5 rounded hover:text-black dark:hover:text-white transition-colors">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
                
                <div className="w-[1px] h-4 bg-black/10 dark:bg-white/10"></div>
                
                <div className="flex items-center gap-4">
                  <a href="https://www.instagram.com/charleiterrenal/" target="_blank" rel="noreferrer" aria-label="Instagram profile" className="p-1.5 -m-1.5 rounded hover:text-black dark:hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a href="https://www.facebook.com/charlesterrenal1/" target="_blank" rel="noreferrer" aria-label="Facebook profile" className="p-1.5 -m-1.5 rounded hover:text-black dark:hover:text-white transition-colors">
                    <Facebook className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Affiliations / Tools Pills */}
          <div className="flex flex-row flex-wrap sm:flex-nowrap justify-center sm:justify-start gap-2 sm:gap-2.5 mb-10">
            <a href="https://www.pup.edu.ph/cea/" target="_blank" rel="noreferrer" className="pill !no-underline text-left">
              <img src="images/pup-logo.png" alt="PUP" className="w-5 h-5 rounded-md object-cover shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-black dark:text-white leading-tight transition-colors duration-500">pup</span>
                <span className="text-[9px] text-black/40 dark:text-white/40 leading-tight transition-colors duration-500 whitespace-nowrap">college of engineering</span>
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
              <img src="images/cncp-logo.jpg" alt="CNCP" className="w-5 h-5 rounded-md object-cover shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-black dark:text-white leading-tight transition-colors duration-500">cncp</span>
                <span className="text-[9px] text-black/40 dark:text-white/40 leading-tight transition-colors duration-500 whitespace-nowrap">ent. networking</span>
              </div>
            </a>
            <a href="https://www.facebook.com/ICPEP.SE.PUPManila" target="_blank" rel="noreferrer" className="pill !no-underline text-left">
              <img src="images/icpeppup-logo.png" alt="ICpEP.SE - PUP Manila" className="w-5 h-5 rounded-md object-cover shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-black dark:text-white leading-tight transition-colors duration-500 whitespace-nowrap">icpep.se - pup manila</span>
                <span className="text-[9px] text-black/40 dark:text-white/40 leading-tight transition-colors duration-500 whitespace-nowrap">avp internal</span>
              </div>
            </a>
          </div>
        </motion.header>

        {/* About Section */}
        <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16 scroll-mt-24">
          <h2 className="section-title">about</h2>
          <p className="text-[13px] text-black/60 dark:text-white/60 leading-relaxed lowercase transition-colors duration-500 mb-8">
            i'm a computer engineering student at pup sta. mesa with a passion for networking, cloud computing, and self-hosted environments.<br /><br />
            i also love exploring virtualization and automation through my homelab setup, where i get hands-on experience building and breaking things.<br /><br />
            beyond my homelab, i'm highly active in the tech community and love attending and volunteering in local tech events.
          </p>
        </motion.section>

        {/* Experiences Section - Lazy Loaded */}
        <Suspense fallback={<div className="h-48 animate-pulse bg-black/5 dark:bg-white/5 rounded-xl mb-16" />}>
          <Experiences setExpandedImage={setExpandedImage} />
        </Suspense>

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

        {/* Projects Section - Lazy Loaded */}
        <Suspense fallback={<div className="h-64 animate-pulse bg-black/5 dark:bg-white/5 rounded-xl mb-16" />}>
          <Projects darkMode={darkMode} setExpandedImage={setExpandedImage} />
        </Suspense>

        {/* Let's Work Together Section - Lazy Loaded */}
        <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-12 scroll-mt-24">
          <h2 className="section-title mb-6">let's work together</h2>
          <Suspense fallback={<div className="h-64 animate-pulse bg-black/5 dark:bg-white/5 rounded-xl" />}>
            <ContactForm darkMode={darkMode} />
          </Suspense>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 text-center border-t border-black/5 dark:border-white/5">
        <p className="text-[11px] text-black/40 dark:text-white/40 lowercase transition-colors duration-500 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span>designed & built by charles terrenal.</span>
          <span className="hidden sm:inline">•</span>
          <span>© {new Date().getFullYear()} all rights reserved.</span>
        </p>
      </footer>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
            onClick={() => setExpandedImage(null)}
          >
            <button className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all" aria-label="Close image">
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={expandedImage} alt="Expanded view"
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
