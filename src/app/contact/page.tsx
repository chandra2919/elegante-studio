"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { MagneticButton } from "@/components/ui/MagneticButton";

const SERVICES_LIST = [
  "Interior Design — Residential",
  "Interior Design — Commercial",
  "Styling Services",
  "Furniture Curation",
  "Window Treatments & Drapery",
  "Floral Installations",
  "Full Studio Package",
];

let inputCounter = 0; // module-level counter for stable IDs

function LuxuryInput({
  label,
  type = "text",
  placeholder,
  required = false,
  as = "input",
  rows,
  children,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  as?: "input" | "select" | "textarea";
  rows?: number;
  children?: React.ReactNode;
}) {
  const lineRef = useRef<HTMLSpanElement>(null);
  // Stable ID per instance for label association
  const idRef = useRef<string>(`field-${++inputCounter}`);
  const id = idRef.current;

  const onFocus = () => {
    if (lineRef.current) gsap.to(lineRef.current, { scaleX: 1, duration: 0.4, ease: "power2.out", overwrite: true });
  };
  const onBlur = () => {
    if (lineRef.current) gsap.to(lineRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in", overwrite: true });
  };

  const sharedCls = "w-full bg-transparent border-none outline-none font-inter text-[13.5px] font-medium text-luxury-black placeholder-luxury-gray/50 pb-2 pt-2 focus-visible:outline-none";

  return (
    <div className="relative group">
      {/* htmlFor links label to input — accessibility fix */}
      <label htmlFor={id} className="eyebrow text-[8px] block mb-2 text-luxury-gold">{label}</label>
      <div className="relative border-b border-luxury-gold/25">
        {as === "textarea" ? (
          <textarea
            id={id}
            name={id}
            rows={rows ?? 4}
            placeholder={placeholder}
            required={required}
            aria-required={required}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`${sharedCls} resize-none`}
          />
        ) : as === "select" ? (
          <select
            id={id}
            name={id}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`${sharedCls} cursor-pointer appearance-none`}
            aria-label={label}
          >
            {children}
          </select>
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            required={required}
            aria-required={required}
            onFocus={onFocus}
            onBlur={onBlur}
            className={sharedCls}
          />
        )}
        {/* Animated gold underline */}
        <span
          ref={lineRef}
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-luxury-gold"
          style={{ transformOrigin: "left", transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [submitted,   setSubmitted]   = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [submitError, setSubmitError] = useState("");
  const btnRef  = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSubmitError("");

    if (btnRef.current) {
      gsap.to(btnRef.current, { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 });
    }

    // Collect all field values from the form
    const fd = new FormData(formRef.current!);
    const data: Record<string, string> = {};
    fd.forEach((v, k) => { data[k] = v.toString(); });

    // Map generic field IDs to readable keys using placeholder values
    // (We collect by field position since LuxuryInput generates IDs like field-1..N)
    const inputs = formRef.current!.querySelectorAll("input, select, textarea");
    const fieldNames = ["firstName","lastName","email","phone","service","vision"];
    inputs.forEach((el, i) => {
      if (fieldNames[i]) data[fieldNames[i]] = (el as HTMLInputElement).value;
    });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");

      setLoading(false);
      setSubmitted(true);

    } catch {
      setLoading(false);
      setSubmitError("Something went wrong. Please try again or call us directly.");
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-end pb-24 overflow-hidden" style={{ minHeight: "62vh" }}>
        <Image src="/images/BW8A3383.webp" alt="Contact Eleganté" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/35 to-transparent" />
        <div className="container-luxury relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-px bg-luxury-gold" />
              <span className="eyebrow text-luxury-gold">Begin Your Journey</span>
            </div>
            <h1 className="font-cormorant font-light text-white leading-[1.05] mb-4" style={{ fontSize: "clamp(48px,5.5vw,88px)" }}>
              Let's Create Something<br />
              <em className="italic text-luxury-gold font-light">Extraordinary</em>
            </h1>
            <p className="text-body-lg text-white/55 max-w-xl font-light">
              Every great space begins with a conversation. We would love to hear about your vision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-pad bg-luxury-cream">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-20 xl:gap-28">

            {/* Left — Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-px bg-luxury-gold" />
                <span className="eyebrow">Studio Information</span>
              </div>
              <h2 className="font-cormorant font-light text-luxury-black mb-8 leading-[1.1]" style={{ fontSize: "clamp(32px,3.5vw,54px)" }}>
                Visit the<br />
                <em className="italic text-luxury-pink font-light">Eleganté Studio</em>
              </h2>

              <div className="flex flex-col gap-8 mb-12">
                {[
                  {
                    label: "Studio Location", content: "1046 S Telegraph Rd\nPontiac, MI 48341",
                    svg: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />,
                  },
                  {
                    label: "Studio Hours", content: "Monday – Saturday: 10:00 AM – 6:00 PM\nSunday: By Appointment Only",
                    svg: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
                  },
                  {
                    label: "Private Line", content: "(248) 555-0198",
                    svg: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />,
                  },
                  {
                    label: "Email", content: "hello@elegante-studio.com",
                    svg: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />,
                  },
                ].map(({ label, svg, content }) => (
                  <div key={label} className="flex items-start gap-5 group">
                    <div className="w-12 h-12 border border-luxury-gold/20 flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:bg-luxury-gold group-hover:border-luxury-gold">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"
                        className="w-5 h-5 text-luxury-gold group-hover:text-white transition-colors duration-400">
                        {svg}
                      </svg>
                    </div>
                    <div>
                      <div className="eyebrow text-[8.5px] mb-1.5">{label}</div>
                      <p className="text-body-md text-luxury-gray font-light whitespace-pre-line">{content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <GoldDivider className="mb-12 opacity-35" />

              {/* FAQs */}
              <div className="eyebrow mb-6">Quick Answers</div>
              {[
                { q: "What happens after I submit?", a: "Our design team reviews your enquiry and contacts you within 24 hours to schedule your private consultation." },
                { q: "Is the consultation free?",   a: "Yes — your initial design consultation is complimentary. We believe in building relationships before we build spaces." },
                { q: "Do you work outside Michigan?", a: "We primarily serve Michigan but accept select national commissions for existing clients and high-profile projects." },
              ].map(({ q, a }) => (
                <details key={q} className="group mb-4 border-b border-luxury-gold/12 pb-4 cursor-pointer">
                  <summary className="flex items-center justify-between font-cormorant text-lg text-luxury-black font-light list-none select-none">
                    {q}
                    <span className="text-luxury-gold ml-4 flex-shrink-0 transition-transform duration-300 group-open:rotate-45 text-xl">+</span>
                  </summary>
                  <p className="text-body-sm text-luxury-gray mt-3 font-light leading-relaxed">{a}</p>
                </details>
              ))}
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="bg-luxury-warm border border-luxury-gold/15 p-10 lg:p-14 relative">
                {/* Gold accent top */}
                <div className="absolute top-0 left-0 w-24 h-0.5 bg-gradient-to-r from-luxury-pink to-luxury-gold" />
                {/* Subtle corner ornaments */}
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-luxury-gold/25" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-luxury-gold/25" />

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      {/* Animated checkmark */}
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.175, 0.885, 0.32, 1.275] }}
                        className="w-16 h-16 rounded-full bg-luxury-gold/15 border border-luxury-gold/40 flex items-center justify-center mb-6"
                      >
                        <span className="text-luxury-gold text-2xl">✦</span>
                      </motion.div>

                      <h3 className="font-cormorant text-3xl text-luxury-black font-light mb-3">Thank You</h3>
                      <p className="text-body-md text-luxury-gray font-medium leading-relaxed max-w-sm mb-8">
                        Your enquiry has been received. Our team will be in touch within 24 hours.
                        A WhatsApp message has been prepared for you.
                      </p>

                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-2 eyebrow text-[9px] text-luxury-gold hover:text-luxury-black transition-colors duration-300"
                      >
                        Submit another enquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      ref={formRef}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6"
                    >
                      <h3 className="font-cormorant text-[28px] text-luxury-black font-semibold mb-2 leading-snug">
                        Contact Us
                      </h3>
                      <p className="text-body-sm text-luxury-gray font-medium -mt-2 mb-4">
                        Tell us about your vision and we will be in touch.
                      </p>

                      <div className="grid grid-cols-2 gap-5">
                        <LuxuryInput label="First Name" placeholder="Your first name" required />
                        <LuxuryInput label="Last Name"  placeholder="Your last name"  required />
                      </div>
                      <LuxuryInput label="Email Address" type="email" placeholder="your@email.com" required />
                      <LuxuryInput label="Phone Number"  type="tel"   placeholder="+1 (000) 000-0000" />
                      <LuxuryInput label="Service of Interest" as="select">
                        <option value="">Select a service…</option>
                        {SERVICES_LIST.map((s) => <option key={s}>{s}</option>)}
                      </LuxuryInput>
                      <LuxuryInput label="Your Vision" as="textarea" rows={4}
                        placeholder="Tell us about your project and what luxury means to you…" />

                      {submitError && (
                        <p className="text-[11px] text-red-600 font-inter text-center -mt-2">{submitError}</p>
                      )}

                      <MagneticButton strength={0.15} className="w-full mt-2">
                        <button
                          ref={btnRef}
                          type="submit"
                          disabled={loading}
                          className="btn-luxury-primary w-full justify-center relative overflow-hidden"
                        >
                          {loading ? (
                            <span className="flex items-center gap-3">
                              <span className="w-3 h-3 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                              Sending…
                            </span>
                          ) : (
                            <>
                              Contact Us
                              <span className="btn-arrow-line" />
                            </>
                          )}
                        </button>
                      </MagneticButton>

                      <p className="text-[10px] text-luxury-gray/60 text-center font-inter leading-relaxed">
                        By submitting, you agree to our privacy policy. We never share your information.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
