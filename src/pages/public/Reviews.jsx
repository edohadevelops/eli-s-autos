import React from "react";
import { Star, Quote } from "lucide-react";
import { PUBLIC_COLORS as COLORS } from "../../utils/publicTheme.js";
import { useContent } from "../../lib/contentStore.jsx";
import Reveal from "../../components/ui/Reveal.jsx";

export default function Reviews() {
  const { reviews } = useContent();
  const published = reviews.filter((r) => r.published);

  return (
    <div className="px-8 py-10 max-w-5xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Reviews</h1>
        <p className="text-sm mt-1" style={{ color: COLORS.textDim }}>
          What the community says after buying, renting, or getting a repair.
        </p>
      </div>
      {published.length === 0 ? (
        <p className="text-sm text-center py-10" style={{ color: COLORS.textFaint }}>No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {published.map((r, i) => (
          <Reveal key={r.id} delay={i * 60}>
            <div className="p-5 rounded-xl h-full hover-lift" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
              <Quote size={20} color={COLORS.brassLight} />
              <p className="text-sm mt-2" style={{ color: COLORS.text, fontStyle: "italic", lineHeight: 1.6 }}>
                {`"${r.quote}"`}
              </p>
              <div className="flex gap-1 mt-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={13} fill={idx < r.rating ? COLORS.brass : "none"} color={COLORS.brass} />
                ))}
              </div>
              <div className="mt-2 text-xs font-semibold" style={{ color: COLORS.text }}>{r.name}</div>
              <div className="text-[11px]" style={{ color: COLORS.textFaint }}>{r.country} · {r.car}</div>
            </div>
          </Reveal>
        ))}
        </div>
      )}
    </div>
  );
}
