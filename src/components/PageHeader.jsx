import React from "react";
import { useLocation } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import Reveal, { RevealText } from "./motion/Reveal";
import { ClipReveal, ScrollScale } from "./motion/Premium";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { TAGLINE } from "../data/siteContent";

/**
 * Inner-page header, identical on every page: a rounded photo banner with
 * the title set large in white at the lower left and the breadcrumb trail at
 * the lower right, joined to a white strip carrying the page's standfirst and
 * a support line.
 */

// Route -> banner. Longest prefix wins; a page can override via `image`.
const BANNERS = [
  ["/about/global-presence", "/banners/global_presence.png"],
  ["/about/why-choose-strikar", "/banners/why_choose.png"],
  ["/about/why-partner", "/banners/why_partner.png"],
  ["/about/strategic-alliances", "/banners/strategic_alliances.png"],
  ["/about", "/banners/about.png"],
  ["/business-divisions/pharmaceutical-manufacturing", "/banners/pharma_manufacturing.png"],
  ["/business-divisions/nutraceutical-manufacturing", "/banners/nutra_manufacturing.png"],
  ["/business-divisions/hospital-healthcare-medical-solutions", "/banners/hospital_solutions.png"],
  ["/business-divisions/emergency-supply-patient-access", "/banners/emergency_supply.png"],
  ["/business-divisions/personal-hygiene-consumer-care", "/banners/hygiene_care.png"],
  ["/business-divisions", "/banners/business_divisions.png"],
  ["/services/manufacturing-solutions", "/showcase/manufacturing.jpg"],
  ["/services/healthcare-access-solutions", "/showcase/access.jpg"],
  ["/services/healthcare-institutional-solutions", "/showcase/institutional.jpg"],
  ["/services", "/banners/pharma_manufacturing.png"],
  ["/partnership", "/banners/partnership.png"],
  ["/product-portfolio/high-surveillance-regulatory-markets", "/banners/high_surveillance.png"],
  ["/product-portfolio/nutraceutical-products", "/banners/nutra_manufacturing.png"],
  ["/product-portfolio", "/therapies/portfolio-pharma.jpg"],
  ["/products", "/showcase/manufacturing.jpg"],
  ["/therapeutic-areas", "/banners/hospital_solutions.png"],
  ["/quality/certifications-standards", "/banners/certifications.png"],
  ["/quality/manufacturing-infrastructure", "/banners/pharma_manufacturing.png"],
  ["/quality/regulatory-affairs-market-access", "/banners/high_surveillance.png"],
  ["/quality", "/banners/quality.png"],
  ["/contact", "/banners/global_presence.png"],
  ["/inquiry-center", "/therapies/link-inquiry.jpg"],
  ["/request-quote", "/therapies/link-quote.jpg"],
];

const DEFAULT_BANNER = "/banners/about.png";

// One specific line per page for the strip under the banner, instead of the
// same company tagline repeated on every page. A page's own `description`
// prop still wins.
const STANDFIRSTS = [
  ["/about/global-presence", "Manufacturing in India, regional hubs in Guatemala and Thailand, and a presence in El Salvador."],
  ["/about/why-choose-strikar", "What distributors, hospitals and procurement agencies gain by sourcing from us."],
  ["/about/why-partner", "How manufacturers, MAHs and innovators grow with us through licensing and co-marketing."],
  ["/about/strategic-alliances", "Our manufacturing and regulatory alliance network, and how partners use it."],
  ["/about", "A diversified healthcare company with over 35 years of combined industry expertise."],
  ["/business-divisions/pharmaceutical-manufacturing", "Development, manufacturing and market access across dosage forms and therapy areas."],
  ["/business-divisions/nutraceutical-manufacturing", "Nutritional and wellness products for preventive healthcare."],
  ["/business-divisions/hospital-healthcare-medical-solutions", "Medical consumables, hospital supplies and institutional programmes."],
  ["/business-divisions/emergency-supply-patient-access", "Supply for critical and time-sensitive needs outside normal commercial channels."],
  ["/business-divisions/personal-hygiene-consumer-care", "Hygiene, wellness and infection-prevention products."],
  ["/business-divisions", "Five divisions serving healthcare systems, distributors and institutions."],
  ["/services/manufacturing-solutions", "CDMO, CMO, third-party and private-label manufacturing with technology transfer."],
  ["/services/healthcare-access-solutions", "Coordinated supply for critical and time-sensitive healthcare needs."],
  ["/services/healthcare-institutional-solutions", "Supply programmes for hospitals, governments and institutions."],
  ["/services", "Manufacturing, healthcare access and institutional supply under one roof."],
  ["/partnership", "Manufacturing partnerships, regional distribution and co-marketing."],
  ["/product-portfolio/high-surveillance-regulatory-markets", "Products prepared for markets with stricter regulatory oversight."],
  ["/product-portfolio/nutraceutical-products", "Nutritional products from our nutraceutical manufacturing division."],
  ["/product-portfolio", "Pharmaceutical, high-surveillance and nutraceutical portfolios."],
  ["/products", "Search the catalogue by name, generic, strength or therapeutic area."],
  ["/therapeutic-areas", "Browse our range by therapeutic area."],
  ["/quality/certifications-standards", "The quality frameworks and practices behind our manufacturing."],
  ["/quality/manufacturing-infrastructure", "Solid dosage, sterile and dedicated beta-lactam facilities."],
  ["/quality/regulatory-affairs-market-access", "Registration strategy, dossiers and market-access support."],
  ["/quality", "Quality built into every stage, from raw material to release."],
  ["/contact", "Questions, product requirements or partnership ideas, all in one place."],
  ["/inquiry-center", "Pick the inquiry type that matches your requirement."],
  ["/request-quote", "Add products to your list and send one request for a quotation."],
];

const lookup = (table, pathname) =>
  table
    .filter(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`))
    .sort((a, b) => b[0].length - a[0].length)[0]?.[1];

const bannerFor = (pathname) => {
  const hit = BANNERS.filter(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`)).sort(
    (a, b) => b[0].length - a[0].length
  )[0];
  return hit ? hit[1] : DEFAULT_BANNER;
};

export default function PageHeader({
  title,
  description,
  breadcrumbLabel,
  noBreadcrumbs = false,
  image,
}) {
  const { pathname } = useLocation();
  const { settings } = useSiteSettings();
  const banner = image || bannerFor(pathname);
  const standfirst = description || lookup(STANDFIRSTS, pathname) || settings.tagline || TAGLINE;

  return (
    <section className="relative overflow-hidden">
      {/* soft lavender wash behind the top of the page */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-panel to-white" aria-hidden="true" />

      <div className="container-page relative pt-10 text-center sm:pt-14">
        {!noBreadcrumbs && (
          <div className="flex justify-center">
            <Breadcrumbs currentLabel={breadcrumbLabel || title} />
          </div>
        )}
        <RevealText
          as="h1"
          immediate
          text={title}
          className="mx-auto mt-6 block max-w-4xl font-display text-display font-normal text-primary-600"
        />
        <Reveal immediate y={10} delay={0.06}>
          <p className="mx-auto mt-5 max-w-2xl text-[1.06rem] leading-relaxed text-slate-600">{standfirst}</p>
        </Reveal>
      </div>

      <div className="container-page relative mt-10 sm:mt-12">
        <ClipReveal immediate delay={0.15} className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-panel sm:aspect-[21/8]">
          <ScrollScale className="absolute inset-0" from={1.1}>
            <img
              src={banner}
              alt=""
              aria-hidden="true"
              loading="eager"
              fetchpriority="high"
              className="h-full w-full object-cover"
            />
          </ScrollScale>
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-primary-600/25 to-transparent" aria-hidden="true" />
        </ClipReveal>
      </div>

      <div className="container-page relative flex justify-center pt-8">
        {settings.phone ? (
          <a href={`tel:${settings.phone}`} className="btn-outline">
            <Phone size={15} /> Need help? Call {settings.phone}
          </a>
        ) : (
          <Link to="/contact" className="btn-outline">
            Contact Us <ArrowRight size={15} />
          </Link>
        )}
      </div>
    </section>
  );
}
