import React, { useState } from "react";
import { Camera, X } from "lucide-react";
import { PUBLIC_COLORS as COLORS } from "../../utils/publicTheme.js";
import PhotoUploadModal from "../../components/ui/PhotoUploadModal.jsx";
import Reveal from "../../components/ui/Reveal.jsx";
import { useContent } from "../../lib/contentStore.jsx";

export default function Gallery() {
  const { gallery } = useContent();
  const approved = gallery.filter((g) => g.status === "approved");
  const [uploading, setUploading] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="px-8 py-10 max-w-5xl mx-auto flex flex-col gap-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Customer gallery</h1>
          <p className="text-sm mt-1 max-w-md" style={{ color: COLORS.textDim }}>
            Real customers, real cars. Just picked up your car from Eli? Share your photo.
          </p>
        </div>
        <button
          onClick={() => setUploading(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold shrink-0 hover-lift"
          style={{ background: COLORS.brassDim, color: "#FFFFFF" }}
        >
          <Camera size={16} /> Share your photo
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {approved.map((g, i) => (
          <Reveal key={g.id} delay={i * 60}>
            <button
              onClick={() => setLightbox(g)}
              className="rounded-xl overflow-hidden block w-full text-left hover-lift"
              style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}
            >
              <img src={g.photo} alt={g.name} className="w-full h-48 object-cover" />
              <div className="p-3">
                <div className="text-sm font-semibold" style={{ color: COLORS.text }}>{g.name}</div>
                <div className="text-xs mt-0.5" style={{ color: COLORS.textFaint }}>{g.car}</div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(16,24,40,0.75)" }}
          onClick={() => setLightbox(null)}
        >
          <div onClick={(e) => e.stopPropagation()} className="max-w-md w-full rounded-xl overflow-hidden" style={{ background: COLORS.card }}>
            <img src={lightbox.photo} alt={lightbox.name} className="w-full h-72 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold" style={{ color: COLORS.text }}>{lightbox.name}</div>
                <button onClick={() => setLightbox(null)} aria-label="Close">
                  <X size={16} color={COLORS.textDim} />
                </button>
              </div>
              <p className="text-xs mt-1.5" style={{ color: COLORS.textDim }}>{lightbox.caption}</p>
              <div className="text-xs mt-2" style={{ color: COLORS.textFaint }}>{lightbox.car}</div>
            </div>
          </div>
        </div>
      )}

      {uploading && <PhotoUploadModal onClose={() => setUploading(false)} colors={COLORS} />}
    </div>
  );
}
