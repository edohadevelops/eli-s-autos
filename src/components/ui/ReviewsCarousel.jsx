import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { PUBLIC_COLORS as COLORS } from "../../utils/publicTheme.js";
import { useContent } from "../../lib/contentStore.jsx";

export default function ReviewsCarousel() {
  const { reviews } = useContent();
  const published = reviews.filter((r) => r.published);
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (published.length < 2) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % published.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [published.length]);

  if (published.length === 0) {
    return (
      <div className="text-center py-10 text-sm" style={{ color: COLORS.textFaint }}>
        No reviews published yet.
      </div>
    );
  }

  const goTo = (i) => {
    clearInterval(timerRef.current);
    setIndex(i);
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, boxShadow: "0 4px 20px rgba(16,24,40,0.05)" }}
    >
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {published.map((r) => (
          <div key={r.id} className="w-full shrink-0 px-14 py-10 flex flex-col items-center text-center gap-4">
            <Quote size={26} color={COLORS.brassLight} />
            <p className="text-base max-w-xl" style={{ color: COLORS.text, fontStyle: "italic", lineHeight: 1.6 }}>
              {`"${r.quote}"`}
            </p>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill={i < r.rating ? COLORS.brass : "none"} color={COLORS.brass} />
              ))}
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: COLORS.text }}>{r.name}</div>
              <div className="text-xs" style={{ color: COLORS.textFaint }}>{r.country} · {r.car}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => goTo((index - 1 + published.length) % published.length)}
        aria-label="Previous review"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center hover-lift"
        style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
      >
        <ChevronLeft size={16} color={COLORS.text} />
      </button>
      <button
        onClick={() => goTo((index + 1) % published.length)}
        aria-label="Next review"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center hover-lift"
        style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
      >
        <ChevronRight size={16} color={COLORS.text} />
      </button>

      <div className="flex items-center justify-center gap-1.5 pb-5">
        {published.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to review ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{ width: i === index ? 16 : 6, height: 6, background: i === index ? COLORS.brass : COLORS.border }}
          />
        ))}
      </div>
    </div>
  );
}
