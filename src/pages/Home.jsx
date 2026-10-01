import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import SEO from "../components/SEO";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/public";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { THERAPEUTIC_AREAS } from "../data/therapeuticAreas";
import { HERO_HEADING, HERO_SUBHEADING, HOME_INTRO_TEASER } from "../data/siteContent";

import Reveal, { RevealGroup } from "../components/motion/Reveal";
import CountUp from "../components/motion/CountUp";
import { Marquee } from "../components/motion/Parallax";
import { RevealText } from "../components/motion/Reveal";
import { ClipReveal, ScrollScale, CornerMorph, Spotlight, Sweep, RiseFromBase } from "../components/motion/Premium";
import ContactBand from "../components/sections/ContactBand";

// Figures traceable to the seeded company copy -- no invented metrics.
const STATS_TOP = [
  { value: "798", label: "Products in the portfolio" },
  { value: "18", label: "Therapeutic areas" },
  { value: "5", label: "Business divisions" },
];
const STATS_BOTTOM = [
  { value: "35+", label: "Years of combined industry expertise" },
  { value: "6", label: "World regions served" },
  { value: "3", label: "Locations outside India" },
  { value: "3", label: "Dedicated product portfolios" },
];

const DIVISIONS = [
  { title: "Pharmaceutical Manufacturing", to: "/business-divisions/pharmaceutical-manufacturing" },
  { title: "Nutraceutical Manufacturing", to: "/business-divisions/nutraceutical-manufacturing" },
  { title: "Hospital & Healthcare Solutions", to: "/business-divisions/hospital-healthcare-medical-solutions" },
  { title: "Emergency Supply & Patient Access", to: "/business-divisions/emergency-supply-patient-access" },
  { title: "Personal Hygiene & Consumer Care", to: "/business-divisions/personal-hygiene-consumer-care" },
];

const PORTFOLIOS = [
  {
    title: "High-Surveillance Markets",
    text: "A separate portfolio prepared for markets with stricter regulatory oversight and documentation needs.",
    to: "/product-portfolio/high-surveillance-regulatory-markets",
    image: "/therapies/portfolio-surveillance.jpg",
  },
  {
    title: "Nutraceutical Products",
    text: "Nutritional and wellness formulations from our nutraceutical manufacturing division.",
    to: "/product-portfolio/nutraceutical-products",
    image: "/therapies/portfolio-nutra.jpg",
  },
  {
    title: "Therapeutic Areas",
    text: "Browse the range by speciality, from cardiovascular and oncology to hospital care products.",
    to: "/therapeutic-areas",
    image: "/therapies/link-inquiry.jpg",
  },
];

const SERVICES = [
  {
    title: "Manufacturing Solutions",
    text: "CDMO, CMO, third-party and private-label manufacturing with technology transfer.",
    to: "/services/manufacturing-solutions",
    image: "/showcase/manufacturing.jpg",
  },
  {
    title: "Healthcare Access Solutions",
    text: "Coordinated supply for critical and time-sensitive healthcare needs.",
    to: "/services/healthcare-access-solutions",
    image: "/showcase/access.jpg",
  },
  {
    title: "Healthcare & Institutional Solutions",
    text: "Supply programmes for hospitals, governments and institutions.",
    to: "/services/healthcare-institutional-solutions",
    image: "/showcase/institutional.jpg",
  },
];

const REGIONS = ["India", "Guatemala", "Thailand", "El Salvador", "Central America", "Latin America", "The Caribbean", "Southeast Asia", "Africa", "CIS Region"];

function Stat({ value, label }) {
  return (
    <div className="px-4 text-center">
      <CountUp value={value} className="block font-display text-[2.6rem] font-normal leading-none text-primary-600 sm:text-[3.2rem]" />
      <p className="mx-auto mt-3 max-w-[15rem] text-[0.9rem] text-slate-600">{label}</p>
    </div>
  );
}

export default function Home() {
  const { settings } = useSiteSettings();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getProducts({ featured: true, page_size: 4 }).then((r) => setFeatured(r.items || [])).catch(() => {});
  }, []);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: settings.company_name || "Strikar Lifescience LLP",
      url: origin || undefined,
      logo: origin ? `${origin}/logo.png` : undefined,
      description: settings.seo_default_description || settings.tagline || undefined,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: settings.company_name || "Strikar Lifescience LLP",
      url: origin || undefined,
    },
  ];

  return (
    <>
      <SEO canonicalPath="/" jsonLd={jsonLd} />

      {/* 1. Hero: centred headline over one large rounded photograph */}
      <section className="relative overflow-hidden pt-12 sm:pt-16">
        <div className="pointer-events-none absolute -right-40 top-40 h-[520px] w-[520px] rounded-full bg-primary-200/50 blur-3xl" aria-hidden="true" />
        <div className="container-page relative text-center">
          <RevealText
            as="h1"
            immediate
            text={settings.hero_heading || HERO_HEADING}
            className="mx-auto block max-w-4xl font-display text-display font-normal text-primary-600"
          />
          <Reveal immediate y={12} delay={0.06}>
            <p className="mx-auto mt-5 max-w-2xl text-[1.06rem] leading-relaxed text-slate-600">
              {settings.hero_subheading || HERO_SUBHEADING}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/products" className="btn-primary">
                Browse Products <ArrowRight size={16} />
              </Link>
              <Link to="/request-quote" className="btn-outline">
                Request a Quote <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="container-page relative mt-12">
          <ClipReveal immediate delay={0.2} className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-panel sm:aspect-[21/9]">
            <ScrollScale className="absolute inset-0" from={1.12}>
              <img
                src="/showcase/manufacturing.jpg"
                alt="Production line at our manufacturing facility in India"
                fetchpriority="high"
                className="h-full w-full object-cover"
              />
            </ScrollScale>
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-primary-500/30 to-transparent" aria-hidden="true" />
          </ClipReveal>
        </div>
      </section>

      {/* 2. Statement + figures on a lavender wash, closed by an arc */}
      <section className="relative mt-16 overflow-hidden bg-gradient-to-b from-white via-panel to-panel pb-0 pt-16 sm:mt-24 sm:pt-24">
        <div className="container-page relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-display-sm font-normal text-ink">
              A diversified healthcare company backed by <Sweep>35+ years</Sweep> of combined expertise
            </h2>
            <Link to="/about" className="btn-outline mt-8">
              Learn More <ArrowRight size={16} />
            </Link>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-3 gap-4 sm:gap-10">
            {STATS_TOP.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-10 lg:grid-cols-4">
            {STATS_BOTTOM.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>
        <RiseFromBase className="relative mx-auto mt-20 h-28 w-[min(900px,92%)] overflow-hidden sm:h-36">
          <div className="absolute inset-x-0 top-0 h-[200%] rounded-[50%] bg-gradient-to-b from-primary-500 to-primary-700" aria-hidden="true" />
        </RiseFromBase>
      </section>

      {/* 3. Who we are: copy with dotted division list, curved photograph */}
      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="section-title">
              Who <Sweep>we are</Sweep>
            </h2>
            <p className="mt-5 text-[1.02rem] leading-[1.8] text-slate-600">{HOME_INTRO_TEASER}</p>
            <ul className="mt-8 grid gap-x-8 gap-y-4 border-b border-slate-200 pb-8 sm:grid-cols-2">
              {DIVISIONS.map((d, i) => (
                <li key={d.to}>
                  <Link to={d.to} className="group flex items-center gap-3 text-[0.95rem] text-ink hover:text-primary-600">
                    <span
                      className={`h-3 w-3 shrink-0 rounded-full ${i % 2 ? "border-2 border-primary-500" : "bg-primary-600"}`}
                      aria-hidden="true"
                    />
                    {d.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/business-divisions" className="btn-outline mt-8">
              Learn More <ArrowRight size={16} />
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <CornerMorph className="relative aspect-[5/4] overflow-hidden bg-panel" min={28} max={220}>
              <ScrollScale className="absolute inset-0" from={1.15}>
                <img src="/about_why_choose.png" alt="Our team at work" loading="lazy" className="h-full w-full object-cover" />
              </ScrollScale>
            </CornerMorph>
          </Reveal>
        </div>
      </section>

      {/* 4. Product range: one dark feature card, three cards, three text items */}
      <section className="pb-16 sm:pb-24">
        <div className="container-page">
          <Reveal>
            <h2 className="section-title">
              Our <Sweep>product range</Sweep>
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <Spotlight className="mt-10 grid overflow-hidden rounded-3xl bg-gradient-to-br from-primary-950 via-primary-900 to-primary-700 lg:grid-cols-2">
              <div className="relative z-10 flex flex-col justify-center p-8 sm:p-12">
                <h3 className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-medium leading-tight text-white">
                  Pharmaceutical products across 18 therapeutic areas
                </h3>
                <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-white/80">
                  Our core range across multiple dosage forms, for distributors, hospitals and institutions. Search by name,
                  generic, strength or therapeutic area.
                </p>
                <Link to="/products" className="btn mt-8 self-start bg-white text-primary-700 hover:bg-primary-50">
                  Browse the catalogue <ArrowRight size={16} />
                </Link>
              </div>
              <div className="relative min-h-[240px]">
                <img src="/therapies/portfolio-pharma.jpg" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/40 to-transparent" />
              </div>
            </Spotlight>
          </Reveal>

          <RevealGroup className="mt-6 grid gap-6 md:grid-cols-3" stagger={0.06}>
            {PORTFOLIOS.map((p, i) => (
              <Link key={p.to} to={p.to} className="group block">
                <ClipReveal delay={i * 0.12} className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-primary-800">
                  <img
                    src={p.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/85 via-primary-800/20 to-transparent" />
                  <p className="absolute bottom-5 left-5 right-5 font-display text-[1.3rem] font-medium leading-snug text-white">{p.title}</p>
                </ClipReveal>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-600">{p.text}</p>
                <span className="link-arrow mt-3">
                  Read More <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 5. Therapies: two-tone heading, image cards */}
      <section className="section-muted section">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal className="max-w-2xl">
              <h2 className="section-title">
                Covering <Sweep>18 therapeutic areas</Sweep> for our partners
              </h2>
              <p className="mt-4 text-[1.02rem] text-slate-600">
                Eighteen specialities, from cardiovascular and oncology to hospital care products.
              </p>
            </Reveal>
            <Link to="/therapeutic-areas" className="btn-outline">
              All Therapeutic Areas <ArrowRight size={16} />
            </Link>
          </div>

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
            {THERAPEUTIC_AREAS.slice(0, 6).map((a, i) => (
              <Link key={a.slug} to={`/therapeutic-areas/${a.slug}`} className="group block">
                <ClipReveal delay={(i % 3) * 0.12} className="aspect-[4/3] overflow-hidden rounded-2xl bg-white">
                  <img
                    src={`/therapies/${a.slug}.jpg`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </ClipReveal>
                <h3 className="mt-5 font-display text-[1.25rem] font-medium text-ink group-hover:text-primary-600">{a.name}</h3>
                <p className="mt-2 line-clamp-2 text-[0.93rem] leading-relaxed text-slate-600">{a.summary}</p>
              </Link>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 6. Services: big image + side list with thumbnails */}
      <section className="section">
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <h2 className="section-title">
              Supporting <Sweep>manufacturers</Sweep>, <Sweep>hospitals</Sweep> and{" "}
              <Sweep>institutions</Sweep>
            </h2>
            <p className="mt-4 text-[1.02rem] text-slate-600">
              Manufacturing, healthcare access and institutional supply under one roof.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <Link to="/services" className="group block">
                <ClipReveal className="relative aspect-[16/11] overflow-hidden rounded-3xl bg-panel">
                  <ScrollScale className="absolute inset-0" from={1.12}>
                    <img
                      src="/banners/pharma_manufacturing.png"
                      alt="Automated production line"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </ScrollScale>
                </ClipReveal>
                <h3 className="mt-6 font-display text-[1.5rem] font-medium text-ink group-hover:text-primary-600">Our manufacturing hub in India</h3>
                <p className="mt-2 max-w-xl text-[0.97rem] leading-relaxed text-slate-600">
                  WHO-GMP systems, several dosage forms and in-house product development let us take on a wide spread of
                  molecules and therapy areas, for both regulated and emerging markets.
                </p>
              </Link>
            </Reveal>

            <div className="divide-y divide-slate-200 lg:col-span-5">
              {SERVICES.map((s, i) => (
                <Reveal key={s.to} delay={i * 0.05}>
                  <Link to={s.to} className="group flex gap-5 py-6 first:pt-0">
                    <div className="h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-panel sm:h-28 sm:w-32">
                      <img src={s.image} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.15rem] font-medium leading-snug text-ink group-hover:text-primary-600">{s.title}</h3>
                      <p className="mt-1.5 text-[0.92rem] leading-relaxed text-slate-600">{s.text}</p>
                      <span className="link-arrow mt-2">
                        Read More <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="pb-16 sm:pb-24">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="section-title">
                Featured <Sweep>products</Sweep>
              </h2>
              <Link to="/products" className="btn-outline">
                All Products <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Where we work */}
      <section className="pb-16 sm:pb-24">
        <div className="container-page text-center">
          <Reveal>
            <h2 className="section-title">
              Where <Sweep>we work</Sweep>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[1.02rem] text-slate-600">
              Manufacturing in India, regional hubs in Guatemala and Thailand, and a presence in El Salvador.
            </p>
          </Reveal>
        </div>
        <div className="mt-10">
          <Marquee
            speed={50}
            className="font-display text-[1.7rem] font-normal text-primary-300 sm:text-[2.2rem]"
            items={REGIONS.map((r) => (
              <span className="flex items-center gap-12">
                {r}
                <span className="h-2.5 w-2.5 rounded-full bg-primary-500" aria-hidden="true" />
              </span>
            ))}
          />
        </div>
        <div className="container-page mt-10 text-center">
          <Link to="/about/global-presence" className="btn-outline">
            Global Presence <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 8. Partnership feature */}
      <section className="container-page pb-16 sm:pb-24">
        <Spotlight className="grid overflow-hidden rounded-3xl bg-gradient-to-br from-primary-950 via-primary-900 to-primary-700 lg:grid-cols-2">
          <div className="relative min-h-[260px] lg:order-2">
            <img src="/partnership_cta.png" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 to-transparent lg:from-primary-900" />
          </div>
          <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:order-1">
            <h2 className="font-display text-display-sm font-normal text-white">
              Looking for a <span className="text-primary-300">manufacturing</span> or{" "}
              <span className="text-primary-300">distribution</span> partner?
            </h2>
            <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-white/80">
              We take on manufacturing partnerships, regional distribution, licensing and co-marketing. Tell us what you
              need and the market you are selling into.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/partnership" className="btn bg-white text-primary-700 hover:bg-primary-50">
                Partnership Options <ArrowRight size={16} />
              </Link>
              <Link to="/inquiry-center" className="btn border border-white/40 text-white hover:bg-white hover:text-primary-700">
                Send an Inquiry
              </Link>
            </div>
          </div>
        </Spotlight>
      </section>

      <ContactBand />
    </>
  );
}
