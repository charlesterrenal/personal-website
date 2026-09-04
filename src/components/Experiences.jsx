import { motion } from "framer-motion";

const Experiences = ({ setExpandedImage }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section id="experiences" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16 scroll-mt-24">
      <h2 className="section-title">experiences</h2>
      <div className="mt-8">

        {/* Experience 1: StellarPH */}
        <div className="timeline-container">
          <button 
            type="button"
            onClick={() => setExpandedImage?.("images/stellar-logo.png")}
            aria-label="View StellarPH logo"
            className="timeline-icon cursor-pointer group hover:scale-125 focus:outline-none"
          >
            <img src="images/stellar-logo.png" alt="StellarPH" className="w-full h-full rounded-full object-cover bg-[#e2e2dc] dark:bg-[#1a1a1a] transition-all duration-500 group-hover:brightness-110" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
            <div className="hidden w-full h-full rounded-full bg-[#e2e2dc] dark:bg-[#1a1a1a] items-center justify-center text-[10px] font-bold text-blue-500 dark:text-blue-400 border border-blue-500/20 dark:border-blue-900/50 transition-colors duration-500">ST</div>
          </button>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
            <h3 className="text-sm font-medium text-black dark:text-white lowercase transition-colors duration-500">stellarph</h3>
            <span className="text-[11px] text-black/40 dark:text-white/40 lowercase shrink-0 font-mono transition-colors duration-500">current</span>
          </div>
          <p className="text-[13px] text-black/60 dark:text-white/60 lowercase transition-colors duration-500">tech intern</p>
        </div>

        {/* Experience 2: ST Telemedia GDC */}
        <div className="timeline-container">
          <button 
            type="button"
            onClick={() => setExpandedImage?.("images/stt-logo.png")}
            aria-label="View ST Telemedia logo"
            className="timeline-icon cursor-pointer group hover:scale-125 focus:outline-none"
          >
            <img src="images/stt-logo.png" alt="ST Telemedia" className="w-full h-full rounded-full object-cover bg-[#e2e2dc] dark:bg-[#1a1a1a] transition-all duration-500 group-hover:brightness-110" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
            <div className="hidden w-full h-full rounded-full bg-[#e2e2dc] dark:bg-[#1a1a1a] items-center justify-center text-[10px] font-bold text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-900/50 transition-colors duration-500">ST</div>
          </button>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
            <h3 className="text-sm font-medium text-black dark:text-white lowercase transition-colors duration-500">st telemedia gdc</h3>
            <span className="text-[11px] text-black/40 dark:text-white/40 lowercase shrink-0 font-mono transition-colors duration-500">feb 2026 - may 2026</span>
          </div>
          <p className="text-[13px] text-black/60 dark:text-white/60 lowercase transition-colors duration-500">network & security intern</p>
        </div>

        {/* Experience 3: Nexus Technologies Inc. */}
        <div className="timeline-container !pb-0 !border-transparent">
          <button 
            type="button"
            onClick={() => setExpandedImage?.("images/nexus-logo.png")}
            aria-label="View Nexus Technologies logo"
            className="timeline-icon cursor-pointer group hover:scale-125 focus:outline-none"
          >
            <img src="images/nexus-logo.png" alt="Nexus" className="w-full h-full rounded-full object-cover bg-[#e2e2dc] dark:bg-[#1a1a1a] transition-all duration-500 group-hover:brightness-110" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
            <div className="hidden w-full h-full rounded-full bg-[#e2e2dc] dark:bg-[#1a1a1a] items-center justify-center text-[10px] font-bold text-orange-500 dark:text-orange-400 border border-orange-500/20 dark:border-orange-900/50 transition-colors duration-500">NX</div>
          </button>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
            <h3 className="text-sm font-medium text-black dark:text-white lowercase transition-colors duration-500">nexus technologies inc.</h3>
            <span className="text-[11px] text-black/40 dark:text-white/40 lowercase shrink-0 font-mono transition-colors duration-500">jul 2025 - sep 2025</span>
          </div>
          <p className="text-[13px] text-black/60 dark:text-white/60 lowercase transition-colors duration-500">solutions & services intern</p>
        </div>
      </div>
    </motion.section>
  );
};

export default Experiences;
