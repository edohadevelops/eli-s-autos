import React, { useState } from "react";
import { X, Calendar } from "lucide-react";
import Modal from "./Modal.jsx";
import LoadingButton from "./LoadingButton.jsx";
import { COLORS } from "../../utils/constants.js";

export default function ScheduleModal({ title = "Schedule a test drive", vehicleLabel, onClose, colors = COLORS }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !date) {
      setError("Fill in your name, contact info, and a preferred date.");
      return;
    }
    setError("");
    setLoading(true);
    // TODO: replace with a real submit to Supabase once the backend exists.
    // 3s minimum so the loading state is visible, not a flash.
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 3000);
  };

  return (
    <Modal onClose={onClose} maxWidth="max-w-sm" colors={colors}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} color={colors.brassLight} />
            <h3 className="font-display text-base font-semibold" style={{ color: colors.text }}>{title}</h3>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: colors.surface }}>
            <X size={14} color={colors.text} />
          </button>
        </div>

        {vehicleLabel && (
          <p className="text-xs mb-4" style={{ color: colors.textDim }}>{vehicleLabel}</p>
        )}

        {submitted ? (
          <div className="p-3.5 rounded-lg text-sm" style={{ background: `${colors.success}18`, border: `1px solid ${colors.success}55`, color: colors.text }}>
            Request sent. Gloria will confirm your time by text or email shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="px-3 py-2.5 rounded-lg outline-none text-sm"
              style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text }}
            />
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Email or phone"
              className="px-3 py-2.5 rounded-lg outline-none text-sm"
              style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text }}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-2.5 rounded-lg outline-none text-sm"
              style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text }}
            />
            {error && <span className="text-xs" style={{ color: colors.dangerLight }}>{error}</span>}
            <LoadingButton
              type="submit"
              loading={loading}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold mt-1"
              style={{ background: colors.brassDim, color: "#FFFFFF" }}
            >
              Request this time
            </LoadingButton>
          </form>
        )}
      </div>
    </Modal>
  );
}
