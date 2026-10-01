import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Facebook, Linkedin, Twitter, Instagram, ArrowRight } from "lucide-react";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { COMPANY_NAME, CERTIFICATIONS } from "../data/siteContent";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/about/global-presence", label: "Global Presence" },
      { to: "/about/why-choose-strikar", label: "Why Choose Strikar" },
      { to: "/about/strategic-alliances", label: "Strategic Alliances" },
      { to: "/partnership", label: "Partnership" },
    ],
  },
  {
    title: "What we do",
    links: [
      { to: "/business-divisions", label: "Business Divisions" },
      { to: "/services", label: "Services" },
      { to: "/quality", label: "Quality & Compliance" },
      { to: "/quality/manufacturing-infrastructure", label: "Manufacturing Infrastructure" },
      { to: "/quality/regulatory-affairs-market-access", label: "Regulatory Affairs" },
    ],
  },
  {
    title: "Products",
    links: [
      { to: "/product-portfolio", label: "Product Portfolio" },
      { to: "/products", label: "Pharmaceutical Products" },
      { to: "/therapeutic-areas", label: "Therapeutic Areas" },
      { to: "/product-portfolio/nutraceutical-products", label: "Nutraceutical Products" },
      { to: "/inquiry-center", label: "Inquiry Center" },
    ],
  },
];

export default function Footer() {
  const { settings } = useSiteSettings();

  const whatsappNumber = (settings.whatsapp || "").replace(/[^\d+]/g, "").replace("+", "");

  const socials = [
    { url: settings.linkedin_url, icon: Linkedin, label: "LinkedIn" },
    { url: settings.facebook_url, icon: Facebook, label: "Facebook" },
    { url: settings.twitter_url, icon: Twitter, label: "Twitter" },
    { url: settings.instagram_url, icon: Instagram, label: "Instagram" },
    { url: whatsappNumber ? `https://wa.me/${whatsappNumber}` : "", icon: MessageCircle, label: "WhatsApp" },
  ].filter((s) => s.url);

  const companyName = settings.company_name || COMPANY_NAME;

  return (
    <footer className="mt-20 bg-primary-950 text-white sm:mt-28">
      <div className="container-page">
        {/* Contact prompt */}
        <div className="footer-prompt grid gap-8 border-b border-white/15 py-14 lg:grid-cols-12 lg:items-end lg:py-20">
          <p className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-normal leading-[1.2] text-white lg:col-span-8">
            Questions about a product, a quotation or a partnership? <span className="text-primary-300">Talk to our team.</span>
          </p>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Link to="/contact" className="btn bg-white text-primary-700 hover:bg-primary-50">
              Contact Us <ArrowRight size={16} />
            </Link>
            <Link to="/request-quote" className="btn border border-white/40 text-white hover:bg-white hover:text-primary-700">
              Request a Quote
            </Link>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <p className="font-display text-lg font-semibold text-white">{companyName}</p>
            <ul className="mt-5 space-y-3 text-[0.93rem] text-white/65">
              {settings.address && <li className="max-w-xs leading-relaxed">{settings.address}</li>}
              {settings.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="break-all underline-offset-4 hover:text-white hover:underline">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.phone && (
                <li>
                  <a href={`tel:${settings.phone}`} className="underline-offset-4 hover:text-white hover:underline">
                    {settings.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-[0.93rem] text-white/65 underline-offset-4 transition-colors hover:text-white hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            {CERTIFICATIONS.length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-white">Standards</h3>
                <ul className="mt-5 space-y-3 text-[0.93rem] text-white/65">
                  {CERTIFICATIONS.slice(0, 4).map((c) => (
                    <li key={c.title} className="flex items-center gap-2.5">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-primary-300" aria-hidden="true" />
                      {c.title}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {socials.length > 0 && (
              <div className="mt-8 flex gap-2">
                {socials.map(({ url, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Legal row */}
        <div className="flex flex-col gap-3 border-t border-white/15 py-6 text-[0.82rem] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className="-my-1.5 flex flex-wrap gap-x-5">
            <Link to="/privacy-policy" className="py-1.5 hover:text-white">Privacy Policy</Link>
            <Link to="/terms-conditions" className="py-1.5 hover:text-white">Terms &amp; Conditions</Link>
            <Link to="/disclaimer" className="py-1.5 hover:text-white">Disclaimer</Link>
          </div>
          <p>
            Developed by{" "}
            <a href="https://techsentinals.in/" target="_blank" rel="noopener" className="font-semibold text-white/80 hover:text-white">
              Techsentinals LLP
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
