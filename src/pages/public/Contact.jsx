import React, { useState } from "react";
import { PUBLIC_COLORS as COLORS } from "../../utils/publicTheme.js";
import LoadingButton from "../../components/ui/LoadingButton.jsx";

export default function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !message.trim()) {
      setError("Fill in your name, contact info, and a message.");
      return;
    }
    setError("");
    setLoading(true);
    // TODO: wire this up to a real submit handler once the backend exists.
    // 3s minimum so the loading state is visible, not a flash.
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto flex flex-col gap-5 px-8 py-10">
      <div>
        <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Contact</h1>
        <p className="text-sm mt-1" style={{ color: COLORS.textDim }}>Questions about a car, a rental, or a repair? Reach out.</p>
      </div>

      {sent ? (
        <div className="p-3.5 rounded-lg text-sm" style={{ background: `${COLORS.success}18`, border: `1px solid ${COLORS.success}55`, color: COLORS.text }}>
          Message sent. Gloria will get back to you shortly.
        </div>
      ) : (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="px-3 py-2.5 rounded-lg outline-none text-sm"
            style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
          />
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Email or phone"
            className="px-3 py-2.5 rounded-lg outline-none text-sm"
            style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What do you need?"
            rows={4}
            className="px-3 py-2.5 rounded-lg outline-none text-sm resize-none"
            style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
          />
          {error && <span className="text-xs" style={{ color: COLORS.dangerLight }}>{error}</span>}
          <LoadingButton
            type="submit"
            loading={loading}
            className="px-5 py-3 rounded-lg text-sm font-semibold"
            style={{ background: COLORS.brassDim, color: "#FFFFFF" }}
          >
            Send message
          </LoadingButton>
        </form>
      )}
    </div>
  );
}
