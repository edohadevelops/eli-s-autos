import React, { useState } from "react";
import { X, Camera } from "lucide-react";
import Modal from "./Modal.jsx";
import CarLoader from "./CarLoader.jsx";
import LoadingButton from "./LoadingButton.jsx";
import ImageUploadField from "./ImageUploadField.jsx";
import { COLORS as DEFAULT_COLORS } from "../../utils/constants.js";
import { useContent } from "../../lib/contentStore.jsx";

// Fake upload flow: file is read locally for a preview, then "submitted"
// after a short delay. Nothing is actually stored yet. Real image storage
// goes to Supabase Storage once the backend exists, with a moderation step
// before a photo appears in the public gallery.
export default function PhotoUploadModal({ onClose, colors = DEFAULT_COLORS }) {
  const { submitGalleryPhoto } = useContent();
  const [name, setName] = useState("");
  const [car, setCar] = useState("");
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("form"); // form | uploading | done
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !car.trim() || !preview) {
      setError("Add your name, your car, and a photo.");
      return;
    }
    setError("");
    setStatus("uploading");
    // Saved as "pending". It won't show in the public gallery until
    // approved from the admin Gallery page.
    setTimeout(() => {
      submitGalleryPhoto({ name, car, caption, photo: preview });
      setStatus("done");
    }, 3000);
  };

  return (
    <Modal onClose={onClose} maxWidth="max-w-sm" colors={colors}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Camera size={16} color={colors.brassLight} />
            <h3 className="font-display text-base font-semibold" style={{ color: colors.text }}>Share your photo</h3>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: colors.surface }}>
            <X size={14} color={colors.text} />
          </button>
        </div>

        {status === "uploading" && <CarLoader colors={colors} label="Uploading" />}

        {status === "done" && (
          <div className="p-3.5 rounded-lg text-sm" style={{ background: `${colors.success}18`, border: `1px solid ${colors.success}55`, color: colors.text }}>
            Thanks! Your photo is in for review and will appear in the gallery soon.
          </div>
        )}

        {status === "form" && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <ImageUploadField value={preview} onChange={setPreview} colors={colors} />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="px-3 py-2.5 rounded-lg outline-none text-sm"
              style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text }}
            />
            <input
              value={car}
              onChange={(e) => setCar(e.target.value)}
              placeholder="Your car (e.g. 2019 Toyota Camry)"
              className="px-3 py-2.5 rounded-lg outline-none text-sm"
              style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text }}
            />
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="A short caption (optional)"
              className="px-3 py-2.5 rounded-lg outline-none text-sm"
              style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text }}
            />
            {error && <span className="text-xs" style={{ color: colors.dangerLight }}>{error}</span>}
            <LoadingButton
              type="submit"
              loading={false}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold mt-1"
              style={{ background: colors.brassDim, color: "#FFFFFF" }}
            >
              Submit photo
            </LoadingButton>
          </form>
        )}
      </div>
    </Modal>
  );
}

