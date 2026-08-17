import React, { useState } from "react";
import { Wrench } from "lucide-react";
import { PUBLIC_COLORS as COLORS } from "../../utils/publicTheme.js";
import { useContent } from "../../lib/contentStore.jsx";
import RepairRequestModal from "../../components/ui/RepairRequestModal.jsx";
import Reveal from "../../components/ui/Reveal.jsx";

export default function Services() {
  const { siteSettings } = useContent();
  const services = siteSettings.services || [];
  const [requesting, setRequesting] = useState(false);

  return (
    <div className="px-8 py-10 max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Services</h1>
          <p className="text-sm mt-1 max-w-md" style={{ color: COLORS.textDim }}>
            Honest pricing, real explanations. Eli does the work himself.
          </p>
        </div>
        <button
          onClick={() => setRequesting(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold shrink-0 hover-lift"
          style={{ background: COLORS.brassDim, color: "#FFFFFF" }}
        >
          <Wrench size={16} /> Request a repair
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 60}>
            <div className="p-5 rounded-xl h-full hover-lift" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-base font-semibold" style={{ color: COLORS.text }}>{s.title}</h3>
                <span className="font-mono text-xs shrink-0" style={{ color: COLORS.brassLight }}>{s.priceRange}</span>
              </div>
              <p className="text-xs mt-2 leading-relaxed" style={{ color: COLORS.textDim }}>{s.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {requesting && <RepairRequestModal onClose={() => setRequesting(false)} colors={COLORS} />}
    </div>
  );
}
