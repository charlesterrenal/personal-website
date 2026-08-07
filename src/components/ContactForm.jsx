import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Turnstile } from '@marsidev/react-turnstile';

const ContactForm = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [cfToken, setCfToken] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const inquiryOptions = [
    { value: "General Inquiry", label: "general inquiry" },
    { value: "Project Request", label: "project request" },
    { value: "Consulting", label: "consulting" }
  ];

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
      submittedTime: phTime,
      cfToken: cfToken
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
        setTimeout(() => setSubmitStatus(null), 10000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="transition-colors duration-500 relative overflow-hidden">
      <p className="text-sm text-black/60 dark:text-white/60 mb-6 lowercase max-w-lg">
        fill out the form with your goals and preferred format. i'll review your inquiry and get back to you with a custom proposal.
      </p>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="py-12 bg-[#e2e2dc]/50 dark:bg-[#1a1a1a]/50 rounded-xl text-black dark:text-white text-sm lowercase flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
              <div className="w-2 h-4 border-b-2 border-r-2 border-black dark:border-white transform rotate-45 mb-1" />
            </div>
            <span className="font-medium">thanks for reaching out!</span>
            <span className="opacity-60 mt-1">i'll get back to you shortly.</span>
            <span className="opacity-40 text-[10px] mt-4 px-4 leading-tight">if you don't receive a confirmation email, please check your spam folder.</span>
            <button onClick={() => setSubmitStatus(null)} className="mt-4 text-xs opacity-40 hover:opacity-70 underline" aria-label="Dismiss success message">dismiss</button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onSubmit={handleFormSubmit} className="flex flex-col gap-3 relative z-10">
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {submitStatus === 'success' && 'Form submitted successfully. Thank you for reaching out!'}
            {submitStatus === 'error' && 'Form submission failed. Please try again.'}
          </div>
          
          <div>
            <label htmlFor="name" className="sr-only">Full Name</label>
            <input 
              id="name" type="text" name="name" required placeholder="full name" autoComplete="name"
              value={formData.name} onChange={handleFormChange}
              className="w-full bg-[#e2e2dc]/50 dark:bg-[#1a1a1a]/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-black/30 dark:focus:border-white/30 transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input 
              id="email" type="email" name="email" required placeholder="email" autoComplete="email"
              value={formData.email} onChange={handleFormChange}
              className="w-full bg-[#e2e2dc]/50 dark:bg-[#1a1a1a]/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-black/30 dark:focus:border-white/30 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="company" className="sr-only">Company or Organization (optional)</label>
            <input 
              id="company" type="text" name="company" placeholder="company / organization" autoComplete="organization"
              value={formData.company} onChange={handleFormChange}
              className="w-full bg-[#e2e2dc]/50 dark:bg-[#1a1a1a]/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-black/30 dark:focus:border-white/30 transition-colors"
            />
          </div>

          <div className="relative z-20" ref={dropdownRef}>
            <label htmlFor="inquiryType" className="sr-only">Inquiry Type</label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full text-left bg-[#e2e2dc]/50 dark:bg-[#1a1a1a]/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-black/30 dark:focus:border-white/30 transition-colors flex justify-between items-center"
            >
              <span className={formData.inquiryType ? "" : "text-black/40 dark:text-white/40"}>
                {formData.inquiryType ? inquiryOptions.find(o => o.value === formData.inquiryType)?.label : "select..."}
              </span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 opacity-40 ${isDropdownOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute w-full mt-2 bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 backdrop-blur-xl"
                >
                  {inquiryOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, inquiryType: option.value }));
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <input type="hidden" name="inquiryType" required value={formData.inquiryType} />
          </div>

          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea 
              id="message" name="message" required placeholder="what are you hoping to get out of it?" 
              value={formData.message} onChange={handleFormChange} rows={3}
              className="w-full bg-[#e2e2dc]/50 dark:bg-[#1a1a1a]/50 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-black/30 dark:focus:border-white/30 transition-colors"
            />
          </div>

          {submitStatus === 'error' && (
            <p role="alert" className="text-red-500 text-xs lowercase px-1 mt-1">something went wrong. please try again.</p>
          )}

          <div className="flex justify-center my-2">
            <Turnstile
              siteKey="0x4AAAAAAD7QAbgaqffQNNkX"
              onSuccess={(token) => setCfToken(token)}
              options={{ theme: darkMode ? 'dark' : 'light' }}
            />
          </div>

          <button 
            type="submit" disabled={isSubmitting || !cfToken}
            className="w-full bg-black dark:bg-white text-white dark:text-black font-medium text-sm rounded-xl py-2.5 mt-2 hover:bg-black/90 dark:hover:bg-white/90 active:scale-[0.98] transition-all lowercase disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                submitting...
              </span>
            ) : (
              'send message'
            )}
          </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
