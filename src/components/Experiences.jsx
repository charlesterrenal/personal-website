import { motion } from "framer-motion";

const experiences = [
  {
    company: "stellarph",
    logo: "images/stellar-logo.png",
    alt: "StellarPH",
    dates: "jun 2026 - present",
    role: "tech intern",
    bullets: [
      "coordinate tech-team delivery across multiple products using kanban and agile practices.",
      "led intern delivery of hackathonsph through launch on next.js, supabase, and vercel.",
      "delivered ph100 2026 on a fixed launch deadline, handling honoree data sync and publication.",
    ],
  },
  {
    company: "st telemedia gdc",
    logo: "images/stt-logo.png",
    alt: "ST Telemedia",
    dates: "feb 2026 - may 2026",
    role: "network & security intern",
    bullets: [
      "built three appsheet apps for attendance tracking, document control, and staff onboarding.",
      "configured cisco 9200 switches and simulated enterprise topologies in eve-ng/gns3.",
      "deployed a proxmox syslog server over forticlient vpn to centralize network logging.",
    ],
  },
  {
    company: "nexus technologies inc.",
    logo: "images/nexus-logo.png",
    alt: "Nexus Technologies",
    dates: "jul 2025 - sep 2025",
    role: "solutions & services intern",
    bullets: [
      "serviced and repaired 400+ thermal printers to keep client equipment available.",
      "inspected cisco networking, fiber-optic, cctv, and access control systems across five client sites.",
    ],
  },
];

const Experiences = ({ setExpandedImage }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section id="experiences" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mb-16 scroll-mt-24">
      <h2 className="section-title">experiences</h2>
      <div className="mt-8">
        {experiences.map((exp, i) => (
          <div key={exp.company} className={`timeline-container${i === experiences.length - 1 ? " !pb-0 !border-transparent" : ""}`}>
            <button
              type="button"
              onClick={() => setExpandedImage?.(exp.logo)}
              aria-label={`View ${exp.alt} logo`}
              className="timeline-icon cursor-pointer group hover:scale-125"
            >
              <img src={exp.logo} alt={exp.alt} className="w-full h-full rounded-full object-cover bg-[#e2e2dc] dark:bg-[#1a1a1a] transition-all duration-500 group-hover:brightness-110" />
            </button>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2 gap-2">
              <h3 className="text-sm font-medium text-black dark:text-white lowercase transition-colors duration-500">{exp.company}</h3>
              <span className="text-[11px] text-black/60 dark:text-white/60 lowercase shrink-0 font-mono transition-colors duration-500">{exp.dates}</span>
            </div>
            <p className="text-[13px] text-black/60 dark:text-white/60 lowercase mb-3 transition-colors duration-500">{exp.role}</p>
            <ul className="text-[11px] text-black/60 dark:text-white/60 space-y-1.5 list-disc pl-4 lowercase transition-colors duration-500">
              {exp.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default Experiences;
