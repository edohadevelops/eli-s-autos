import React, { useState } from "react";
import { X, Wrench } from "lucide-react";
import Modal from "./Modal.jsx";
import LoadingButton from "./LoadingButton.jsx";
import { COLORS as DEFAULT_COLORS } from "../../utils/constants.js";
import { useContent } from "../../lib/contentStore.jsx";

export default function RepairRequestModal({ onClose, colors = DEFAULT_COLORS }) {
  const { submitRepairRequest } = useContent();
  const [customer, setCustomer] = useState("");
  const [contact, setContact] = useState("");
  const [vehicleDescription, setVehicleDescription] = useState("");
  const [issue, setIssue] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.trim() || !contact.trim() || !vehicleDescription.trim() || !issue.trim()) {
      setError("Fill in your name, contact info, vehicle, and what's going on.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      submitRepairRequest({ customer, contact, vehicleDescription, issue, notes: "" });
      setLoading(false);
      setSubmitted(true);
    }, 3000);
  };

  return (
    <Modal onClose={onClose} maxWidth="max-w-sm" colors={colors}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wrench size={16} color={colors.brassLight} />
            <h3 className="font-display text-base font-semibold" style={{ color: colors.text }}>Request a repair</h3>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: colors.surface }}>
            <X size={14} color={colors.text} />
          </button>
        </div>

        {submitted ? (
          <div className="p-3.5 rounded-lg text-sm" style={{ background: `${colors.success}18`, border: `1px solid ${colors.success}55`, color: colors.text }}>
            Got it. Gloria or Eli will reach out to schedule a time.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
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
              value={vehicleDescription}
              onChange={(e) => setVehicleDescription(e.target.value)}
              placeholder="Your car (e.g. 2016 Honda Accord)"
              className="px-3 py-2.5 rounded-lg outline-none text-sm"
              style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text }}
            />
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="What's going on with it?"
              rows={3}
              className="px-3 py-2.5 rounded-lg outline-none text-sm resize-none"
              style={{ background: colors.surface, border: `1px solid ${colors.border}`, color: colors.text }}
            />
            {error && <span className="text-xs" style={{ color: colors.dangerLight }}>{error}</span>}
            <LoadingButton
              type="submit"
              loading={loading}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold mt-1"
              style={{ background: colors.brassDim, color: "#FFFFFF" }}
            >
              Send request
            </LoadingButton>
          </form>
        )}
      </div>
    </Modal>
  );
}
