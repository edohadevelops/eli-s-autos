import React, { useState, useRef } from "react";
import { Upload, Link as LinkIcon, X } from "lucide-react";
import { COLORS as DEFAULT_COLORS } from "../../utils/constants.js";

// Drop-in image field: drag a file, click to browse, or fall back to a
// pasted URL. Uploaded files are read as base64 data URLs (no real file
// storage yet. See README "Moving to a real backend" for the Supabase
// Storage swap, which just means this field passes a File instead of a
// base64 string).
export default function ImageUploadField({ value, onChange, colors = DEFAULT_COLORS }) {
  const [dragOver, setDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const isDataUrl = value && value.startsWith("data:");

  return (
    <div className="flex flex-col gap-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="rounded-lg cursor-pointer flex flex-col items-center justify-center gap-2 py-6 transition-colors relative overflow-hidden"
        style={{
          background: colors.surface,
          border: `1px dashed ${dragOver ? colors.brass : colors.border}`,
        }}
      >
        {value ? (
          <div className="relative w-full px-4">
            <img src={value} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(""); }}
              className="absolute top-2 right-6 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: "rgba(20,19,15,0.7)" }}
              aria-label="Remove photo"
            >
              <X size={14} color="#FFFFFF" />
            </button>
          </div>
        ) : (
          <>
            <Upload size={20} color={colors.textFaint} />
            <span className="text-xs" style={{ color: colors.textFaint }}>Drag a photo here, or click to browse</span>
          </>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      </div>

      <button
        type="button"
        onClick={() => setShowUrlInput((s) => !s)}
        className="flex items-center gap-1 text-[11px] w-fit"
        style={{ color: colors.textFaint }}
      >
        <LinkIcon size={11} /> {showUrlInput ? "Hide URL field" : "Or paste an image URL instead"}
      </button>
      {showUrlInput && (
        <input
          value={!isDataUrl ? value || "" : ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="px-3 py-2 rounded-lg outline-none text-xs"
          style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text }}
        />
      )}
      <p className="text-[10px]" style={{ color: colors.textFaint }}>
        Uploaded photos are stored in this browser for now. Large images may hit storage limits until real image storage is added.
      </p>
    </div>
  );
}
