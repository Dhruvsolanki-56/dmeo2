import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, Mail, ShoppingCart, ChevronDown, ArrowRight, Menu } from "lucide-react";
import Logo from "./Logo";
import { useQuoteCart } from "../context/QuoteCartContext";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { useLenis, usePrefersReducedMotion } from "./motion/SmoothScroll";

export const NAV_LINKS = [
  {
    to: "/about",
    label: "About",
    children: [
      { to: "/about", label: "About Us" },
      { to: "/about/global-presence", label: "Global Presence" },
      { to: "/about/why-choose-strikar", label: "Why Choose Strikar" },
      { to: "/about/why-partner", label: "Why Partner With Us" },
      { to: "/about/strategic-alliances", label: "Strategic Alliances" },
      { to: "/partnership", label: "Partnership Opportunities" },
    ],
  },
  {
    to: "/business-divisions",
    label: "Divisions",
    children: [
      { to: "/business-divisions", label: "All Divisions" },
      { to: "/business-divisions/pharmaceutical-manufacturing", label: "Pharmaceutical Manufacturing" },
      { to: "/business-divisions/nutraceutical-manufacturing", label: "Nutraceutical Manufacturing" },
      { to: "/business-divisions/hospital-healthcare-medical-solutions", label: "Hospital & Healthcare Solutions" },
      { to: "/business-divisions/emergency-supply-patient-access", label: "Emergency Supply & Patient Access" },
      { to: "/business-divisions/personal-hygiene-consumer-care", label: "Personal Hygiene & Consumer Care" },
    ],
  },
  {
    to: "/services",
    label: "Services",
    children: [
      { to: "/services", label: "All Services" },
      { to: "/services/manufacturing-solutions", label: "Manufacturing Solutions" },
      { to: "/services/healthcare-access-solutions", label: "Healthcare Access Solutions" },
      { to: "/services/healthcare-institutional-solutions", label: "Healthcare & Institutional Solutions" },
    ],
  },
  {
    to: "/products",
    label: "Products",
    children: [
      { to: "/product-portfolio", label: "Portfolio Overview" },
      { to: "/products", label: "Pharmaceutical Products" },
      { to: "/therapeutic-areas", label: "Therapeutic Areas" },
      { to: "/product-portfolio/nutraceutical-products", label: "Nutraceutical Products" },
      { to: "/product-portfolio/high-surveillance-regulatory-markets", label: "High-Surveillance Markets" },
    ],
  },
  {
    to: "/quality",
    label: "Quality",
    children: [
      { to: "/quality", label: "Quality & Compliance" },
      { to: "/quality/certifications-standards", label: "Certifications & Standards" },
      { to: "/quality/manufacturing-infrastructure", label: "Manufacturing Infrastructure" },
      { to: "/quality/regulatory-affairs-market-access", label: "Regulatory Affairs & Market Access" },
    ],
  },
  {
    to: "/contact",
    label: "Contact",
    children: [
      { to: "/contact", label: "Contact Us" },
      { to: "/inquiry-center", label: "Inquiry Center" },
      { to: "/request-quote", label: "Request a Quote" },
    ],
  },
];

// Products is the one section whose landing route differs from its first
// child's, so match it against every route it owns.
const SECTION_PREFIXES = {
  Products: ["/products", "/product-portfolio", "/therapeutic-areas"],
  Contact: ["/contact", "/inquiry-center", "/request-quote"],
  About: ["/about", "/partnership"],
};

const isSectionActive = (link, pathname) => {
  const prefixes = SECTION_PREFIXES[link.label] || [link.to];
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
};

// One line under each section name in the mega panel.
const SECTION_BLURBS = {
  About: "A diversified healthcare company with over 35 years of combined industry expertise.",
  Divisions: "Five divisions serving healthcare systems, distributors and institutions.",
  Services: "Manufacturing, healthcare access and institutional supply under one roof.",
  Products: "Pharmaceutical, high-surveillance and nutraceutical portfolios.",
  Quality: "Quality built into every stage, from raw material to release.",
  Contact: "Questions, product requirements or partnership ideas, all in one place.",
};

function CartCount({ count }) {
  if (!count) return null;
  return (
    <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-primary-700">
      {count}
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [mega, setMega] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useQuoteCart();
  const { settings } = useSiteSettings();
  const { pathname } = useLocation();
  const lenis = useLenis();
  const reduced = usePrefersReducedMotion();

  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const openedAtPathnameRef = useRef(pathname);
  const closeTimer = useRef(null);

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
    setMega(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mega) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMega(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mega]);

  // Lock scroll behind the mobile menu. If a link inside it navigated, the
  // route's own scroll-to-top ran while scrolling was still locked (a no-op),
  // so finish that job here once unlocked.
  useEffect(() => {
    if (!open) return undefined;
    openedAtPathnameRef.current = pathnameRef.current;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      if (lenis) lenis.start();
      document.body.style.overflow = "";
      if (pathnameRef.current !== openedAtPathnameRef.current) {
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    };
  }, [open, lenis]);

  const count = items.length;
  const megaLink = NAV_LINKS.find((l) => l.label === mega);

  const openMega = (label) => {
    clearTimeout(closeTimer.current);
    setMega(label);
  };
  const closeMegaSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(null), 120);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled && !mega ? "bg-white/80 shadow-[0_10px_30px_-20px_rgba(28,15,66,0.35)] backdrop-blur-xl" : "bg-white"
        } ${mega ? "shadow-[0_1px_0_0_#ede9fe]" : ""}`}
        onMouseLeave={closeMegaSoon}
      >
        <div className={`container-page flex items-center justify-between gap-6 transition-[height] duration-300 ${scrolled ? "h-[64px] lg:h-[70px]" : "h-[72px] lg:h-[84px]"}`}>
          <Logo />

          <nav aria-label="Main" className="hidden h-full lg:block">
            <ul className="flex h-full items-center gap-1 xl:gap-3">
              {NAV_LINKS.map((link) => {
                const active = isSectionActive(link, pathname);
                const isMega = mega === link.label;
                return (
                  <li key={link.label} className="relative flex h-full items-center" onMouseEnter={() => openMega(link.label)}>
                    <NavLink
                      to={link.to}
                      onFocus={() => openMega(link.label)}
                      aria-expanded={isMega}
                      className={`relative flex h-full items-center gap-1 px-3 text-[0.95rem] font-medium transition-colors ${
                        active || isMega ? "text-primary-600" : "text-slate-600 hover:text-primary-600"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isMega ? "rotate-180" : ""}`} />
                      <span
                        className={`absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-primary-600 transition-opacity ${
                          active || isMega ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-5">
            {settings.phone && (
              <a href={`tel:${settings.phone}`} className="hidden items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-600 xl:inline-flex">
                <Phone size={15} /> {settings.phone}
              </a>
            )}
            <Link
              to="/request-quote"
              aria-label={count > 0 ? `Request a quote, ${count} item${count === 1 ? "" : "s"} added` : "Request a quote"}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-700 sm:px-5"
            >
              <ShoppingCart size={16} />
              <span className="hidden sm:inline">Request a Quote</span>
              <CartCount count={count} />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-primary-100 px-4 text-sm font-semibold text-primary-700 shadow-pill lg:hidden"
            >
              <Menu size={18} /> Menu
            </button>
          </div>
        </div>

        {/* Desktop mega panel */}
        <AnimatePresence>
          {megaLink && (
            <motion.div
              key="mega"
              className="absolute inset-x-0 top-full hidden border-t border-slate-100 bg-white shadow-[0_30px_50px_-30px_rgba(28,15,66,0.35)] lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.15 }}
              onMouseEnter={() => openMega(megaLink.label)}
            >
              <div className="container-page grid grid-cols-12 gap-10 py-10">
                <div className="col-span-4 border-r border-slate-200 pr-10">
                  <p className="font-display text-[1.75rem] font-normal leading-tight text-primary-600">{megaLink.label}</p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-500">{SECTION_BLURBS[megaLink.label]}</p>
                  <Link to={megaLink.to} className="btn-outline mt-6">
                    Overview <ArrowRight size={15} />
                  </Link>
                </div>
                <ul key={megaLink.label} className="col-span-8 grid grid-cols-2 gap-x-10">
                  {megaLink.children.map((child, i) => (
                    <motion.li
                      key={child.to}
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.03 * i, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <NavLink
                        to={child.to}
                        end
                        onClick={() => setMega(null)}
                        className={({ isActive }) =>
                          `group flex items-center justify-between gap-4 border-b border-slate-200 py-4 text-[1rem] transition-colors ${
                            isActive ? "font-semibold text-primary-600" : "text-ink hover:text-primary-600"
                          }`
                        }
                      >
                        {child.label}
                        <ArrowRight size={16} className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-600" />
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu: full screen sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[70] flex flex-col bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <div className="container-page flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-primary-100 px-4 text-sm font-semibold text-primary-700 shadow-pill"
              >
                <X size={18} /> Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <ul className="container-page">
                {NAV_LINKS.map((link) => {
                  const isOpen = expanded === link.label;
                  const active = isSectionActive(link, pathname);
                  return (
                    <li key={link.label} className="border-b border-slate-200">
                      <div className="flex items-center justify-between gap-4">
                        <NavLink
                          to={link.to}
                          className={`block flex-1 py-5 font-display text-[1.5rem] font-normal ${active ? "text-primary-600" : "text-ink"}`}
                        >
                          {link.label}
                        </NavLink>
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : link.label)}
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? "Collapse" : "Expand"} ${link.label}`}
                          className="flex h-11 w-11 shrink-0 items-center justify-center text-ink"
                        >
                          <ChevronDown size={20} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduced ? 0 : 0.25 }}
                            className="overflow-hidden"
                          >
                            <ul className="pb-4">
                              {link.children.map((child) => (
                                <li key={child.to}>
                                  <NavLink
                                    to={child.to}
                                    end
                                    className={({ isActive }) =>
                                      `flex items-center justify-between gap-3 py-2.5 pl-1 text-[1rem] ${
                                        isActive ? "font-semibold text-primary-600" : "text-slate-600"
                                      }`
                                    }
                                  >
                                    {child.label}
                                    <ArrowRight size={15} className="shrink-0 text-slate-400" />
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="container-page shrink-0 space-y-3 border-t border-slate-200 py-5 text-sm">
              {settings.phone && (
                <a href={`tel:${settings.phone}`} className="flex items-center gap-3 font-medium text-ink">
                  <Phone size={16} className="text-primary-600" /> {settings.phone}
                </a>
              )}
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="flex items-center gap-3 font-medium text-ink">
                  <Mail size={16} className="text-primary-600" /> {settings.email}
                </a>
              )}
              <Link to="/request-quote" className="btn-primary mt-2 w-full">
                <ShoppingCart size={16} /> Request a Quote {count > 0 && `(${count})`}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
