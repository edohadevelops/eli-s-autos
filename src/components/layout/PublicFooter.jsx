import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Twitter, Car } from "lucide-react";
import { PUBLIC_COLORS as COLORS } from "../../utils/publicTheme.js";
import { useContent } from "../../lib/contentStore.jsx";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/cars", label: "Cars" },
  { to: "/services", label: "Services" },
  { to: "/reviews", label: "Reviews" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const SOCIAL_ICONS = { instagram: Instagram, facebook: Facebook, twitter: Twitter };

export default function PublicFooter() {
  const { siteSettings } = useContent();
  const socials = siteSettings.socials || {};
  const activeSocials = Object.entries(socials).filter(([, url]) => url);

  return (
    <footer style={{ borderTop: `1px solid ${COLORS.border}`, background: COLORS.surface }}>
      <div className="max-w-5xl mx-auto px-8 py-12 grid grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: COLORS.brass }}>
              <Car size={14} color="#FFFFFF" strokeWidth={2.5} />
            </div>
            <span className="font-display font-semibold text-sm tracking-wide" style={{ color: COLORS.text }}>
              ELI'S AUTOS
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: COLORS.textFaint }}>
            Sales, rentals, and repairs for Springfield's international student community.
          </p>
          {activeSocials.length > 0 && (
            <div className="flex items-center gap-2 mt-4">
              {activeSocials.map(([key, url]) => {
                const Icon = SOCIAL_ICONS[key];
                if (!Icon) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full flex items-center justify-center hover-lift"
                    style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}
                    aria-label={key}
                  >
                    <Icon size={14} color={COLORS.textDim} />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="col-span-1">
          <h4 className="text-xs font-semibold tracking-wide mb-3" style={{ color: COLORS.text }}>QUICK LINKS</h4>
          <div className="flex flex-col gap-2">
            {QUICK_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="text-xs" style={{ color: COLORS.textFaint }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="col-span-1">
          <h4 className="text-xs font-semibold tracking-wide mb-3" style={{ color: COLORS.text }}>CONTACT</h4>
          <div className="flex flex-col gap-2.5">
            <a href={`mailto:${siteSettings.contactEmail}`} className="flex items-start gap-2 text-xs" style={{ color: COLORS.textFaint }}>
              <Mail size={13} className="mt-0.5 shrink-0" /> {siteSettings.contactEmail}
            </a>
            <a href={`tel:${siteSettings.contactPhone}`} className="flex items-start gap-2 text-xs" style={{ color: COLORS.textFaint }}>
              <Phone size={13} className="mt-0.5 shrink-0" /> {siteSettings.contactPhone}
            </a>
          </div>
        </div>

        {/* Location & hours */}
        <div className="col-span-1">
          <h4 className="text-xs font-semibold tracking-wide mb-3" style={{ color: COLORS.text }}>VISIT</h4>
          <div className="flex flex-col gap-2.5">
            {siteSettings.address && (
              <div className="flex items-start gap-2 text-xs" style={{ color: COLORS.textFaint }}>
                <MapPin size={13} className="mt-0.5 shrink-0" /> {siteSettings.address}
              </div>
            )}
            {siteSettings.hours && (
              <div className="flex items-start gap-2 text-xs" style={{ color: COLORS.textFaint }}>
                <Clock size={13} className="mt-0.5 shrink-0" /> {siteSettings.hours}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: COLORS.border }}>
        <div className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between flex-wrap gap-2">
          <span className="text-[11px]" style={{ color: COLORS.textFaint }}>{siteSettings.footerLine}</span>
          <span className="text-[11px]" style={{ color: COLORS.textFaint }}>
            &copy; {new Date().getFullYear()} Eli's Autos. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
