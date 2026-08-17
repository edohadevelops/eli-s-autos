import React from "react";
import { Link } from "react-router-dom";
import { Wrench, Car, ShieldCheck, ArrowRight, Search, Camera } from "lucide-react";
import { PUBLIC_COLORS as COLORS } from "../../utils/publicTheme.js";
import DealBadge from "../../components/ui/DealBadge.jsx";
import VehicleImage from "../../components/ui/VehicleImage.jsx";
import ReviewsCarousel from "../../components/ui/ReviewsCarousel.jsx";
import Reveal from "../../components/ui/Reveal.jsx";
import { useContent } from "../../lib/contentStore.jsx";

// Icons cycle by index so admin-added pillars (edited in Settings) still get
// a reasonable icon even without a way to pick one in the form yet.
const PILLAR_ICONS = [Car, Wrench, ShieldCheck];

const HERO_IMAGE = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80";

export default function Home() {
  const { vehicles, gallery, siteSettings } = useContent();
  const featured = vehicles.filter((v) => v.category === "sale" && v.status === "for_sale").slice(0, 3);
  const galleryPreview = gallery.filter((g) => g.status === "approved").slice(0, 4);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[480px] w-full overflow-hidden">
          <img src={HERO_IMAGE} alt="Car showroom" className="w-full h-full object-cover hero-img" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(16,24,40,0.78) 0%, rgba(16,24,40,0.45) 45%, rgba(16,24,40,0.15) 100%)" }}
          />
          <div className="absolute inset-0 flex items-center px-8">
            <div className="max-w-xl reveal in-view" style={{ animation: "fadeInUp 0.8s ease-out" }}>
              <h1 className="font-display text-5xl font-semibold leading-tight text-white">
                {siteSettings.heroHeadline}
              </h1>
              <p className="text-base mt-4 max-w-md text-white/85">
                {siteSettings.heroSubhead}
              </p>
              <div className="flex gap-3 mt-7">
                <Link to="/cars" className="px-5 py-3 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg hover-lift" style={{ background: COLORS.brassDim, color: "#FFFFFF" }}>
                  Browse cars <ArrowRight size={15} />
                </Link>
                <Link to="/services" className="px-5 py-3 rounded-lg text-sm font-semibold backdrop-blur hover-lift" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.4)", color: "#FFFFFF" }}>
                  Book a repair
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating quick-search card, AutoNation-style */}
        <div className="max-w-4xl mx-auto -mt-10 relative z-10 px-8">
          <div
            className="rounded-2xl p-5 flex items-center gap-4 flex-wrap hover-lift"
            style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, boxShadow: "0 12px 32px rgba(16,24,40,0.12)" }}
          >
            <div className="flex items-center gap-2 flex-1 min-w-[220px]">
              <Search size={16} color={COLORS.textFaint} />
              <span className="text-sm" style={{ color: COLORS.textDim }}>Find your next car by make, price, or mileage</span>
            </div>
            <Link to="/cars" className="px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ background: COLORS.brassDim, color: "#FFFFFF" }}>
              Search inventory
            </Link>
          </div>
        </div>
      </section>

      <Reveal className="max-w-5xl mx-auto px-8 w-full">
        <div className="grid grid-cols-3 gap-5">
          {siteSettings.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
            return (
              <div key={i} className="p-5 rounded-xl hover-lift" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 12px rgba(16,24,40,0.04)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: `${COLORS.brass}1A` }}>
                  <Icon size={16} color={COLORS.brassLight} />
                </div>
                <div className="font-display text-base font-semibold" style={{ color: COLORS.text }}>{p.title}</div>
                <p className="text-xs mt-1.5 leading-relaxed" style={{ color: COLORS.textDim }}>{p.text}</p>
              </div>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="max-w-5xl mx-auto px-8 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-semibold" style={{ color: COLORS.text }}>Available now</h2>
          <Link to="/cars" className="text-xs font-medium" style={{ color: COLORS.brassLight }}>View all cars</Link>
        </div>
        {featured.length === 0 ? (
          <p className="text-sm" style={{ color: COLORS.textFaint }}>No cars listed for sale right now.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {featured.map((v) => (
              <Link
                key={v.id}
                to={`/cars/${v.id}`}
                className="rounded-xl overflow-hidden block hover-lift"
                style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 12px rgba(16,24,40,0.04)" }}
              >
                <div className="overflow-hidden">
                  <VehicleImage
                    src={v.photo}
                    alt={`${v.make} ${v.model}`}
                    className="w-full h-32 object-cover transition-transform duration-500 hover:scale-105"
                    colors={COLORS}
                  />
                </div>
                <div className="p-3.5">
                  <div className="font-display text-sm font-semibold" style={{ color: COLORS.text }}>{v.year} {v.make} {v.model}</div>
                  <div className="font-mono text-xs mt-1" style={{ color: COLORS.brassLight }}>${v.price.toLocaleString()}</div>
                  <div className="mt-2">
                    <DealBadge price={v.price} marketPrice={v.marketPrice} colors={COLORS} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Reveal>

      <Reveal className="max-w-4xl mx-auto px-8 w-full">
        <div className="text-center mb-6">
          <h2 className="font-display text-xl font-semibold" style={{ color: COLORS.text }}>What the community says</h2>
        </div>
        <ReviewsCarousel />
      </Reveal>

      {galleryPreview.length > 0 && (
        <Reveal className="max-w-5xl mx-auto px-8 w-full">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-xl font-semibold" style={{ color: COLORS.text }}>Customer gallery</h2>
              <p className="text-xs mt-1" style={{ color: COLORS.textDim }}>Real customers, real cars. Just picked one up? Share your photo.</p>
            </div>
            <Link to="/gallery" className="flex items-center gap-1.5 text-xs font-medium shrink-0" style={{ color: COLORS.brassLight }}>
              <Camera size={13} /> View gallery
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {galleryPreview.map((g) => (
              <Link
                key={g.id}
                to="/gallery"
                className="rounded-xl overflow-hidden block hover-lift"
                style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}
              >
                <img src={g.photo} alt={g.name} className="w-full h-32 object-cover" />
                <div className="p-2.5">
                  <div className="text-xs font-semibold truncate" style={{ color: COLORS.text }}>{g.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
