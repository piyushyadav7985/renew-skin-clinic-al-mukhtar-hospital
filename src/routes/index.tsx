import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles, Phone, MapPin, Instagram, Star, ArrowRight, ArrowUpRight,
  Plus, Minus, Check, Menu, X, MessageCircle,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import doctor from "@/assets/doctor.jpg";
import clinic from "@/assets/clinic.jpg";
import skin from "@/assets/skin.jpg";
import tFacial from "@/assets/treatment-facial.jpg";
import tLaser from "@/assets/treatment-laser.jpg";
import tHair from "@/assets/treatment-hair.jpg";
import tNeedling from "@/assets/treatment-needling.jpg";
import r1 from "@/assets/result-1.jpg";
import r2 from "@/assets/result-2.jpg";
import r3 from "@/assets/result-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Renew+ Skin Clinic — Healthy Skin. Confident You. | Beed" },
      { name: "description", content: "Luxury aesthetic clinic in Beed by Dr. Musaddique Shaikh. Acne, scars, hydrafacial, microneedling, PRP, hair & anti-aging." },
    ],
  }),
  component: Index,
});

const PHONE_1 = "+919822767906";
const PHONE_2 = "+917020895855";
const WHATSAPP = "919822767906";
const INSTAGRAM = "https://www.instagram.com/renewplus_skinclinic/";
const MAPS = "https://maps.app.goo.gl/?q=Renew+Skin+Clinic+Beed";

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Treatments />
        <BeforeAfter />
        <Results />
        <Testimonials />
        <InstagramSection />
        <BookConsultation />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}

/* ---------------- Announcement ---------------- */
function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-ink text-white text-[11px] sm:text-xs tracking-wide">
      <div className="shine-overlay absolute inset-0 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-center gap-2">
        <Sparkles className="h-3 w-3 text-rose" />
        <span className="opacity-90">Website Engineered by</span>
        <span className="font-semibold">Alpha Media</span>
        <span className="opacity-60">·</span>
        <span className="opacity-90">Piyush Yadav — Founder & Chief Strategist</span>
      </div>
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const nav = [
    ["Home", "#home"], ["About", "#about"], ["Treatments", "#treatments"],
    ["Results", "#results"], ["Reviews", "#reviews"], ["Contact", "#contact"],
  ] as const;
  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-3 transition-all duration-500 ${scrolled ? "glass shadow-soft" : "bg-transparent"}`}>
          <a href="#home" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-rose text-white font-bold">R</div>
            <div className="leading-tight">
              <div className="font-display font-bold text-base tracking-tight">Renew<span className="text-primary">+</span></div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Skin Clinic</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {nav.map(([l, h]) => (
              <a key={h} href={h} className="relative text-foreground/80 hover:text-foreground transition group">
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#book" className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-xs font-medium text-white hover:bg-primary transition-colors">
              Book Consultation <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button onClick={() => setOpen(o => !o)} aria-label="Menu" className="md:hidden grid h-10 w-10 place-items-center rounded-full glass">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden mt-2 glass rounded-3xl p-6">
            <div className="flex flex-col gap-4 text-sm">
              {nav.map(([l, h]) => (
                <a key={h} href={h} onClick={() => setOpen(false)} className="py-1">{l}</a>
              ))}
              <a href="#book" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-3 text-white">Book Consultation</a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      mx.set(x); my.set(y);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden bg-luxury">
      {/* Blobs */}
      <motion.div style={{ x: sx, y: sy }} className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-primary/20 blur-3xl blob" />
      <motion.div style={{ x: useTransform(sx, v => -v), y: useTransform(sy, v => -v) }} className="pointer-events-none absolute -bottom-32 -right-32 h-[520px] w-[520px] rounded-full bg-rose/40 blur-3xl blob" />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-16 md:pt-20 md:pb-28 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-medium tracking-wide">Luxury Aesthetic Clinic · Beed</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.95] font-bold tracking-tight"
          >
            Healthy Skin.<br />
            <span className="italic font-normal" style={{ fontFamily: "var(--font-serif)" }}>Confident</span>{" "}
            <span className="text-gradient">You.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            A premium aesthetic destination led by <span className="text-foreground font-medium">Dr. Musaddique Shaikh</span>. Where world-class dermatology meets the calm of a private sanctuary.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#book" className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-white hover:bg-primary transition-colors shadow-luxe">
              Book Consultation
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
            <a href="#treatments" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white/60 backdrop-blur px-7 py-4 text-sm font-medium hover:bg-white transition">
              Explore Treatments
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><div className="flex">{[...Array(5)].map((_,i)=><Star key={i} className="h-3.5 w-3.5 fill-rose text-rose" />)}</div><span className="font-medium text-foreground">4.9</span> · 139+ Google Reviews</div>
            <div className="hidden sm:block h-3 w-px bg-border" />
            <div className="hidden sm:block">Trusted by thousands</div>
          </motion.div>
        </div>

        <div className="md:col-span-5 relative">
          <motion.div style={{ y, scale }} className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-luxe">
            <img src={hero} alt="Radiant skin" width={1080} height={1350} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
          </motion.div>

          {/* Floating glass cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
            className="absolute -left-4 sm:-left-8 top-12 glass rounded-2xl p-4 w-44 float-slow"
          >
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Today</div>
            <div className="mt-1 font-display text-2xl font-bold">98%</div>
            <div className="text-xs text-muted-foreground">Patient satisfaction</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}
            className="absolute -right-2 sm:-right-6 bottom-12 glass rounded-2xl p-4 w-52 float-slow" style={{ animationDelay: "2s" }}
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-rose" />
              <div>
                <div className="text-xs font-medium">Hydra Facial</div>
                <div className="text-[10px] text-muted-foreground">Booked 3 mins ago</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[10px]"><Check className="h-3 w-3 text-primary" /> Verified result</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Marquee ---------------- */
function Marquee() {
  const items = ["Acne · Scars", "Hydra Facial", "Microneedling", "Pigmentation", "PRP Therapy", "Laser", "Anti-Aging", "Hair Restoration", "Skin Rejuvenation"];
  return (
    <section className="border-y border-border/60 py-6 bg-white overflow-hidden">
      <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {[...items, ...items, ...items].map((it, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="font-display tracking-tight">{it}</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }`}</style>
    </section>
  );
}

/* ---------------- Stats ---------------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Stats() {
  const stats = [
    { v: 4.9, s: "★", l: "Google Rating", fixed: true },
    { v: 139, s: "+", l: "Google Reviews" },
    { v: 550, s: "+", l: "Instagram Followers" },
    { v: 5000, s: "+", l: "Happy Patients" },
  ];
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center md:text-left"
          >
            <div className="font-display text-5xl md:text-6xl font-bold tracking-tight">
              {s.fixed ? "4.9" : <Counter to={s.v} />}<span className="text-gradient">{s.s}</span>
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  return (
    <section id="about" className="relative py-24 md:py-36 bg-luxury">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-12 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:col-span-5">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-luxe">
              <img src={doctor} alt="Dr. Musaddique Shaikh" loading="lazy" width={1100} height={1400} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-4 glass rounded-2xl p-4 w-44">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Founder</div>
              <div className="mt-1 font-display font-bold text-sm">Dr. Musaddique Shaikh</div>
              <div className="text-[11px] text-muted-foreground">MBBS · Aesthetic Specialist</div>
            </div>
          </div>
        </motion.div>
        <div className="md:col-span-7">
          <span className="text-xs uppercase tracking-[0.22em] text-primary font-medium">— Our Story</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            A sanctuary for skin, <span style={{ fontFamily: "var(--font-serif)" }} className="italic font-normal text-gradient">crafted with care.</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
            Renew<span className="text-primary">+</span> was founded on a quiet belief — that aesthetic medicine, at its best, is the meeting point of science, art, and empathy. Led by Dr. Musaddique Shaikh and co-founded by Dr. Alina, our clinic in Beed brings together evidence-based dermatology and a calm, luxury-grade experience.
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-6">
            {[
              ["10+", "Years of experience"],
              ["FDA", "Approved technology"],
              ["1:1", "Personal care plans"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="font-display text-2xl font-bold">{k}</div>
                <div className="text-xs text-muted-foreground mt-1">{v}</div>
              </div>
            ))}
          </div>
          <a href="#book" className="mt-10 inline-flex items-center gap-2 text-sm font-medium border-b border-foreground/30 pb-1 hover:border-primary hover:text-primary transition">
            Meet the team <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Treatments ---------------- */
const TREATMENTS = [
  { name: "Hydra Facial", desc: "Deep cleanse, hydrate and glow in 45 minutes.", img: tFacial, tag: "Signature" },
  { name: "Acne & Scar Care", desc: "A protocol for clearer, smoother, even skin.", img: skin, tag: "Most Loved" },
  { name: "Microneedling", desc: "Collagen induction for firmer, refined texture.", img: tNeedling, tag: "Advanced" },
  { name: "Pigmentation Removal", desc: "Brightening therapies for tone clarity.", img: tLaser, tag: "Clinical" },
  { name: "Hair Fall & PRP", desc: "Regrowth therapy from your own biology.", img: tHair, tag: "Restore" },
  { name: "Anti-Aging & Rejuvenation", desc: "Lift, plump and restore youthful luminosity.", img: clinic, tag: "Premium" },
];

function Treatments() {
  return (
    <section id="treatments" className="py-24 md:py-36 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.22em] text-primary font-medium">— Treatments</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              Curated rituals for <span style={{ fontFamily: "var(--font-serif)" }} className="italic font-normal text-gradient">every concern.</span>
            </h2>
          </div>
          <a href="#book" className="hidden md:inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm hover:bg-secondary transition">
            Personalized consultation <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TREATMENTS.map((t, i) => (
            <motion.a
              href="#book"
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="group relative rounded-3xl overflow-hidden bg-secondary aspect-[4/5] block"
            >
              <img src={t.img} alt={t.name} loading="lazy" width={1000} height={1200} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="rounded-full glass px-3 py-1 text-[10px] uppercase tracking-widest font-medium">{t.tag}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
                <p className="mt-1 text-sm text-white/80">{t.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition">
                  Book now <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Before/After ---------------- */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <section className="relative py-24 md:py-36 bg-luxury overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.22em] text-primary font-medium">— Transformations</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            Real skin. <span style={{ fontFamily: "var(--font-serif)" }} className="italic font-normal text-gradient">Real results.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Drag the handle to see the difference our protocols make.</p>
        </div>

        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-[2rem] overflow-hidden shadow-luxe select-none">
            <img src={r1} alt="Before and after transformation" loading="lazy" width={1200} height={900} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <img src={r1} alt="" loading="lazy" width={1200} height={900} className="absolute inset-0 h-full object-cover" style={{ width: `${100 / (pos / 100)}%`, maxWidth: "none", filter: "saturate(0.85) brightness(0.95)" }} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
              <div className="absolute top-4 left-4 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-widest">Before</div>
            </div>
            <div className="absolute top-4 right-4 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-widest">After</div>
            <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
              <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-white/90" />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid place-items-center h-12 w-12 rounded-full bg-white shadow-luxe">
                <div className="flex items-center gap-0.5"><ArrowRight className="h-3 w-3 -rotate-180 text-primary" /><ArrowRight className="h-3 w-3 text-primary" /></div>
              </div>
            </div>
            <input type="range" min={0} max={100} value={pos} onChange={e => setPos(Number(e.target.value))} aria-label="Comparison slider" className="absolute inset-0 h-full w-full opacity-0 cursor-ew-resize" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Results gallery ---------------- */
function Results() {
  const items = [
    { src: r2, h: "tall" },
    { src: r3, h: "short" },
    { src: tFacial, h: "med" },
    { src: skin, h: "tall" },
    { src: tHair, h: "med" },
    { src: r1, h: "short" },
  ];
  return (
    <section id="results" className="py-24 md:py-36 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-primary font-medium">— Gallery</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">Moments of <span style={{ fontFamily: "var(--font-serif)" }} className="italic font-normal text-gradient">renewal.</span></h2>
          </div>
        </div>
        <div className="columns-2 md:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="mb-4 md:mb-6 break-inside-avoid overflow-hidden rounded-3xl shadow-soft group"
            >
              <img src={it.src} alt="Result" loading="lazy" className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${it.h === "tall" ? "aspect-[3/4]" : it.h === "med" ? "aspect-square" : "aspect-[4/3]"}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
const REVIEWS = [
  { n: "Priya S.", t: "The best acne scar treatment I have ever had. Dr. Musaddique is a true expert — my skin has never looked better.", r: 5 },
  { n: "Aisha K.", t: "The Hydra Facial is divine. The clinic feels like a luxury spa, but the results are clinical-grade. Obsessed.", r: 5 },
  { n: "Rohan M.", t: "Microneedling sessions completely transformed my skin texture. The team is incredibly professional and warm.", r: 5 },
  { n: "Sneha P.", t: "Years of dandruff — solved. Honestly the most thoughtful, calming clinic experience in the city.", r: 5 },
];

function Testimonials() {
  return (
    <section id="reviews" className="py-24 md:py-36 bg-luxury">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.22em] text-primary font-medium">— Reviews</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">Loved by <span style={{ fontFamily: "var(--font-serif)" }} className="italic font-normal text-gradient">our patients.</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-3xl p-8">
              <div className="flex items-center gap-1 mb-4">{[...Array(r.r)].map((_,i)=><Star key={i} className="h-4 w-4 fill-rose text-rose" />)}</div>
              <p className="font-display text-lg md:text-xl leading-relaxed">"{r.t}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-rose grid place-items-center text-white font-semibold">{r.n[0]}</div>
                <div>
                  <div className="text-sm font-medium">{r.n}</div>
                  <div className="text-xs text-muted-foreground">Verified Patient</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Instagram ---------------- */
function InstagramSection() {
  const grid = [tFacial, skin, tHair, r2, r3, tNeedling, r1, clinic];
  return (
    <section className="py-24 md:py-36 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-primary font-medium">— @renewplus_skinclinic</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">Follow our <span className="text-gradient italic" style={{ fontFamily: "var(--font-serif)" }}>journal.</span></h2>
          </div>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-white hover:bg-primary transition">
            <Instagram className="h-4 w-4" /> 550+ Followers
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {grid.map((src, i) => (
            <a key={i} href={INSTAGRAM} target="_blank" rel="noreferrer" className="relative aspect-square overflow-hidden rounded-2xl group">
              <img src={src} alt="Instagram" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition grid place-items-center">
                <Instagram className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Booking ---------------- */
function BookConsultation() {
  const [form, setForm] = useState({ name: "", phone: "", concern: "", treatment: "Hydra Facial", date: "" });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Renew+, I'd like to book a consultation.%0A%0AName: ${form.name}%0APhone: ${form.phone}%0AConcern: ${form.concern}%0ATreatment: ${form.treatment}%0APreferred Date: ${form.date}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
  };
  return (
    <section id="book" className="py-24 md:py-36 bg-luxury relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] bg-primary/15 rounded-full blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.22em] text-primary font-medium">— Book</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">Begin your <span style={{ fontFamily: "var(--font-serif)" }} className="italic font-normal text-gradient">renewal.</span></h2>
          <p className="mt-4 text-muted-foreground">Tell us a little about you. We'll respond on WhatsApp within minutes.</p>
        </div>
        <form onSubmit={onSubmit} className="glass rounded-[2rem] p-6 md:p-10 grid md:grid-cols-2 gap-4">
          <Field label="Your Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} required />
          <Field label="Phone Number" type="tel" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} required />
          <Field label="Concern (acne, scars, hair fall…)" value={form.concern} onChange={v => setForm(f => ({ ...f, concern: v }))} className="md:col-span-2" />
          <Select label="Preferred Treatment" value={form.treatment} onChange={v => setForm(f => ({ ...f, treatment: v }))} options={TREATMENTS.map(t => t.name).concat(["Not sure — recommend"])} />
          <Field label="Preferred Date" type="date" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} />
          <button type="submit" className="md:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-white hover:bg-primary transition shadow-luxe">
            Send via WhatsApp <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", required, className = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <input
        type={type} required={required} value={value} onChange={e => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl bg-white/70 border border-border px-5 py-4 text-sm outline-none focus:border-primary focus:bg-white transition"
      />
    </label>
  );
}
function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <select value={value} onChange={e => onChange(e.target.value)} className="mt-2 w-full rounded-2xl bg-white/70 border border-border px-5 py-4 text-sm outline-none focus:border-primary focus:bg-white transition">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  ["Where is Renew+ Skin Clinic located?", "We are located in Beed, Maharashtra, inside the Al-Mukhtar Hospital complex. Find directions on Google Maps in the contact section."],
  ["Do I need an appointment?", "Yes — we work by appointment to ensure each guest receives undivided attention. You can book via the form, WhatsApp, or by calling us."],
  ["Are the treatments safe for sensitive skin?", "Every protocol begins with a one-on-one consultation with Dr. Musaddique. Treatments are then customized for your skin type and concerns."],
  ["How many sessions will I need?", "Most concerns show visible improvement in 3–6 sessions. We design a personalized plan after your consultation."],
  ["Do you treat hair loss?", "Yes — we offer PRP therapy, hair restoration protocols, and medical-grade scalp care."],
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-36 bg-white">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.22em] text-primary font-medium">— FAQ</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-tight">Questions, <span style={{ fontFamily: "var(--font-serif)" }} className="italic font-normal text-gradient">answered.</span></h2>
        </div>
        <div className="divide-y divide-border">
          {FAQS.map(([q, a], i) => (
            <div key={i} className="py-5">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between text-left">
                <span className="font-display text-base md:text-lg font-medium pr-6">{q}</span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-border flex-shrink-0">
                  {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden">
                <p className="pt-4 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const items = [
    { icon: Phone, label: "Call", value: "+91 98227 67906", href: `tel:${PHONE_1}` },
    { icon: MessageCircle, label: "WhatsApp", value: "+91 70208 95855", href: `https://wa.me/${WHATSAPP}` },
    { icon: Instagram, label: "Instagram", value: "@renewplus_skinclinic", href: INSTAGRAM },
    { icon: MapPin, label: "Visit", value: "Beed, Maharashtra", href: MAPS },
  ];
  return (
    <section id="contact" className="py-24 md:py-36 bg-luxury">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.22em] text-primary font-medium">— Contact</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              Visit our <span style={{ fontFamily: "var(--font-serif)" }} className="italic font-normal text-gradient">sanctuary.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">Inside Al-Mukhtar Hospital, Beed, Maharashtra. Open by appointment, six days a week.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {items.map((it, i) => (
                <a key={i} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group glass rounded-2xl p-5 flex items-center gap-4 hover:shadow-luxe transition">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-rose text-white">
                    <it.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{it.label}</div>
                    <div className="text-sm font-medium truncate">{it.value}</div>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
                </a>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-luxe">
            <img src={clinic} alt="Clinic interior" loading="lazy" width={1600} height={1100} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="text-[10px] uppercase tracking-widest opacity-80">Hours</div>
              <div className="mt-2 font-display text-2xl font-semibold">Mon – Sat · 10:00 – 8:00</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-rose text-white font-bold">R</div>
              <div>
                <div className="font-display font-bold text-lg">Renew<span className="text-primary">+</span></div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Skin Clinic</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground max-w-sm leading-relaxed">A premium aesthetic destination — where dermatology meets a luxury sanctuary experience.</p>
          </div>
          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Clinic</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#about" className="hover:text-primary">About</a></li>
              <li><a href="#treatments" className="hover:text-primary">Treatments</a></li>
              <li><a href="#results" className="hover:text-primary">Results</a></li>
              <li><a href="#book" className="hover:text-primary">Book Consultation</a></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Contact</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={`tel:${PHONE_1}`} className="hover:text-primary">+91 98227 67906</a></li>
              <li><a href={`tel:${PHONE_2}`} className="hover:text-primary">+91 70208 95855</a></li>
              <li><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:text-primary">@renewplus_skinclinic</a></li>
              <li className="text-muted-foreground">Beed, Maharashtra</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Renew+ Skin Clinic. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-primary" />
            Website Engineered by <span className="font-semibold text-foreground">Alpha Media</span> · Piyush Yadav, Founder & Chief Strategist
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Floating CTA ---------------- */
function FloatingCTA() {
  return (
    <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-rose text-white shadow-luxe hover:scale-105 transition">
      <MessageCircle className="h-6 w-6" />
      <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-rose text-[9px] font-semibold">1</span>
    </a>
  );
}
