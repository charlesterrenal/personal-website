import { useState, useEffect } from 'react'
import { Mail, ExternalLink, Moon, Sun, Github, Facebook, Instagram, Youtube, X } from 'lucide-react'

function App() {
  const [isDark, setIsDark] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)

  useEffect(() => {
    // Check for saved dark mode preference or system preference
    const saved = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (saved === 'true' || (saved === null && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    }
  }

  return (
    <div className="p-4 md:p-8 bg-[#f6f8fa] dark:bg-gray-950 dark:text-white transition-colors min-h-screen">
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-4 left-4 w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center z-50 shadow-md"
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12 pt-2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-6">
            <div className="flex items-center gap-6 self-start">
              <img 
                src="images/linkedin-picture.png" 
                alt="Charles" 
                className="profile-picture" 
                onClick={() => setShowImageModal(true)}
              />
              <div>
                <h1 className="tech-name mb-1">CHARLES VINCENT P. TERRENAL</h1>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="academic-badge">
                    <img src="images/pup-logo.png" alt="PUP" className="w-4 h-4" />
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 tracking-tighter">Institute of Technology</span>
                  </div>
                  <a href="https://www.instagram.com/cncp_mnl/" target="_blank" rel="noopener noreferrer" className="cncp-badge">
                    <img src="images/cncp-logo.png" alt="CNCP" className="w-4 h-4" />
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 tracking-tighter">CNCP</span>
                  </a>
                  <a href="https://www.facebook.com/AWSCloudClubPUP" target="_blank" rel="noopener noreferrer" className="aws-badge">
                    <img src="images/awsccpup-logo.png" alt="AWS" className="w-4 h-4" />
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 tracking-tighter">AWSCC</span>
                  </a>
                  <a href="https://www.facebook.com/icpepse.pupmanila" target="_blank" rel="noopener noreferrer" className="icpep-badge">
                    <img src="images/icpeppup-logo.png" alt="ICPEP" className="w-4 h-4 rounded-full" />
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 tracking-tighter">ICPEP-SE</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
              <div className="flex flex-wrap justify-center md:justify-end gap-2">
                <a href="https://linkedin.com/in/charlesterrenal" target="_blank" rel="noopener noreferrer" className="mini-card shadow-sm hover-linkedin h-[34px] px-4">
                  <span className="font-medium text-xs">LinkedIn</span>
                </a>
                <a href="mailto:contact@charlesterrenal.com" className="mini-card shadow-sm h-[34px] px-4">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium text-xs">Email</span>
                </a>
              </div>

              <div className="flex justify-center md:justify-end gap-2">
                <a href="https://github.com/charlesterrenal" target="_blank" rel="noopener noreferrer" className="mini-card social-icon-only shadow-sm hover-github">
                  <Github className="w-4 h-4 icon-bw" />
                </a>
                <a href="https://www.facebook.com/charlesterrenal1/" target="_blank" rel="noopener noreferrer" className="mini-card social-icon-only shadow-sm hover-facebook">
                  <Facebook className="w-4 h-4 icon-bw" />
                </a>
                <a href="https://www.instagram.com/charleiterrenal/" target="_blank" rel="noopener noreferrer" className="mini-card social-icon-only shadow-sm hover-instagram">
                  <Instagram className="w-4 h-4 icon-bw" />
                </a>
                <a href="https://www.youtube.com/@charleiterrenal" target="_blank" rel="noopener noreferrer" className="mini-card social-icon-only shadow-sm hover-youtube">
                  <Youtube className="w-4 h-4 icon-bw" />
                </a>
              </div>
            </div>
          </div>
          <div className="h-px bg-[#d0d7de] dark:bg-gray-700 w-full mt-6"></div>
        </header>

        {/* Main Content */}
        <main className="space-y-6">
          {/* About and Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* About Section */}
            <section className="bento-card hover:!border-blue-600 hover:!bg-blue-50 dark:hover:!bg-blue-900/20 hover:!shadow-[0_8px_18px_-14px_rgba(37,99,235,0.8)]">
              <div className="flex flex-col items-center mb-6">
                <span className="section-header !mb-0 font-bold tracking-widest">ABOUT</span>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 text-[13px] leading-relaxed">
                <ul className="space-y-2 list-disc list-inside px-1">
                  <li><span className="font-medium text-gray-900 dark:text-white">Infrastructure:</span> Designing and implementing secure, high-availability server environments and enterprise-grade networking through advanced virtualization platforms like Proxmox VE.</li>
                  <li><span className="font-medium text-gray-900 dark:text-white">Support & Deployment:</span> Experienced in large-scale hardware management, enterprise-level troubleshooting, and on-site technical inspections.</li>
                  <li><span className="font-medium text-gray-900 dark:text-white">Automation:</span> Streamlining infrastructure operations and service delivery through Python and Bash scripting, Docker containerization, and modern CI/CD deployment tools.</li>
                </ul>
                <p className="pt-2 border-t border-gray-100 dark:border-gray-700">
                  Bridging the gap between physical hardware and cloud-native solutions by building efficient, automated, and high-performance infrastructure.
                </p>
              </div>
            </section>

            {/* Projects Section */}
            <section className="bento-card hover:!border-purple-600 hover:!bg-purple-50 dark:hover:!bg-purple-900/20 hover:!shadow-[0_8px_18px_-14px_rgba(168,85,247,0.8)]">
              <div className="flex flex-col items-center mb-6">
                <span className="section-header !mb-0">RECENT PROJECTS</span>
              </div>
              <div className="space-y-4">
                <div className="inner-item-card project-item project-webdapp flex-col !items-start gap-2 p-4 hover:!border-red-600 hover:!bg-red-50 dark:hover:!bg-red-900/20 hover:!shadow-[0_8px_18px_-14px_rgba(220,38,38,0.8)]">
                  <div className="flex justify-between w-full items-start">
                    <div>
                      <a href="https://github.com/charlesterrenal/computerent-on-stellar" target="_blank" rel="noopener noreferrer" className="project-title-link">
                        <h4 className="font-bold text-sm flex items-center gap-1">CompuTeRent <ExternalLink className="w-3 h-3" /></h4>
                      </a>
                      <p className="text-[10px] text-gray-400 font-mono">Mar. 2026 - Present</p>
                    </div>
                    <span className="text-[9px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded">Web DApp</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-tight">A Stellar-based DePIN platform for renting home server compute time via XLM micropayments.</p>
                </div>

                <div className="inner-item-card project-item project-iotml flex-col !items-start gap-2 p-4 hover:!border-blue-600 hover:!bg-blue-50 dark:hover:!bg-blue-900/20 hover:!shadow-[0_8px_18px_-14px_rgba(37,99,235,0.8)]">
                  <div className="flex justify-between w-full items-start">
                    <div>
                      <a href="https://github.com/charlesterrenal/smarth2wo" target="_blank" rel="noopener noreferrer" className="project-title-link">
                        <h4 className="font-bold text-sm flex items-center gap-1">SmartH2wo <ExternalLink className="w-3 h-3" /></h4>
                      </a>
                      <p className="text-[10px] text-gray-400 font-mono">Oct. 2025 - Present</p>
                    </div>
                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">IoT / ML</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-tight">IoT-based water dispenser with predictive maintenance using ML.</p>
                </div>

                <div className="inner-item-card project-item project-server flex-col !items-start gap-2 p-4 hover:!border-emerald-600 hover:!bg-emerald-50 dark:hover:!bg-emerald-900/20 hover:!shadow-[0_8px_18px_-14px_rgba(5,150,105,0.8)]">
                  <div className="flex justify-between w-full items-start">
                    <div>
                      <a href="https://github.com/charlesterrenal/ahhs" target="_blank" rel="noopener noreferrer" className="project-title-link">
                        <h4 className="font-bold text-sm flex items-center gap-1">A Humble Home Server (AHHS) <ExternalLink className="w-3 h-3" /></h4>
                      </a>
                      <p className="text-[10px] text-gray-400 font-mono">Sep. 2025 - Present</p>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">Server</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-tight">A self-hosted personal production environment running on Proxmox VE, focused on networking, security, automation, and self-hosted service development.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Experiences Section */}
          <section className="bento-card">
            <div className="section-header">
              <span>Experiences</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="inner-item-card hover:!border-emerald-600 hover:!bg-emerald-50 dark:hover:!bg-emerald-900/20 hover:!shadow-[0_8px_18px_-14px_rgba(5,150,105,0.85)]">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-bold text-sm uppercase">ST TELEMEDIA GDC</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Network & Security Intern</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">COMPLETED</span>
              </div>
              <div className="inner-item-card hover:!border-emerald-600 hover:!bg-emerald-50 dark:hover:!bg-emerald-900/20 hover:!shadow-[0_8px_18px_-14px_rgba(5,150,105,0.85)]">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-bold text-sm uppercase">NEXUS TECHNOLOGIES</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Solutions & Services Intern</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">COMPLETED</span>
              </div>
            </div>
          </section>

          {/* Certifications Section */}
          <section className="bento-card">
            <div className="section-header">
              <span>Certifications</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="inner-item-card hover:!border-black dark:hover:!border-gray-300 hover:!bg-gray-50 dark:hover:!bg-gray-700 hover:!shadow-[0_8px_18px_-14px_rgba(0,0,0,0.55)]">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-bold text-sm uppercase">Mechatronics Servicing</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">TESDA NC II</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">2026 - 2031</span>
              </div>
              <div className="inner-item-card hover:!border-black dark:hover:!border-gray-300 hover:!bg-gray-50 dark:hover:!bg-gray-700 hover:!shadow-[0_8px_18px_-14px_rgba(0,0,0,0.55)]">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-bold text-sm uppercase">Computer Systems Servicing</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">TESDA NC II</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">2024 - 2029</span>
              </div>
            </div>
          </section>

          {/* Stacks Section */}
          <section className="bento-card">
            <div className="section-header">
              <span>Stacks</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-[9px] font-bold uppercase text-gray-400 dark:text-gray-500 mb-3 tracking-[0.2em]">Infrastructure</p>
                <div className="flex flex-wrap gap-2">
                  <span className="tech-badge">Cisco IOS</span>
                  <span className="tech-badge">Proxmox VE</span>
                  <span className="tech-badge">EVE NG</span>
                  <span className="tech-badge">GNS3</span>
                </div>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase text-gray-400 dark:text-gray-500 mb-3 tracking-[0.2em]">DevOps & Automation</p>
                <div className="flex flex-wrap gap-2">
                  <span className="tech-badge">Linux Administration</span>
                  <span className="tech-badge">Docker</span>
                  <span className="tech-badge">Git</span>
                  <span className="tech-badge">Bash</span>
                  <span className="tech-badge">AI Orchestration</span>
                </div>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase text-gray-400 dark:text-gray-500 mb-3 tracking-[0.2em]">Programming</p>
                <div className="flex flex-wrap gap-2">
                  <span className="tech-badge">Python</span>
                  <span className="tech-badge">SQL</span>
                  <span className="tech-badge">JavaScript</span>
                  <span className="tech-badge">C++</span>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 py-6 text-center">
          <div className="h-px bg-[#d0d7de] dark:bg-gray-700 w-12 mx-auto mb-6"></div>
          <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-1">Self-Hosted</p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500">&copy; 2026 Charles Vincent Terrenal.</p>
        </footer>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div 
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>
            <img 
              src="images/linkedin-picture.png" 
              alt="Charles" 
              className="w-full rounded-lg shadow-2xl object-cover"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
