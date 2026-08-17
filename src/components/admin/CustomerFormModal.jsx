import React, { useState } from "react";
import { X } from "lucide-react";
import Modal from "../ui/Modal.jsx";
import LoadingButton from "../ui/LoadingButton.jsx";
import { COLORS } from "../../utils/constants.js";

const inputStyle = {
  background: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  color: COLORS.text,
  padding: "10px 12px",
  borderRadius: 8,
  fontSize: 13,
};

export default function CustomerFormModal({ customer, onSave, onClose }) {
  const isEdit = Boolean(customer);
  const [form, setForm] = useState(
    customer || { name: "", country: "", email: "", phone: "", joined: new Date().toISOString().slice(0, 10), reliability: 80 }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Fill in at least a name and email.");
      return;
    }
    setError("");
    setSaving(true);
    setTimeout(() => {
      onSave({ ...form, reliability: Number(form.reliability) });
      setSaving(false);
    }, 400);
  };

  return (
    <Modal onClose={onClose} maxWidth="max-w-md">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-lg font-semibold" style={{ color: COLORS.text }}>
            {isEdit ? "Edit customer" : "Add customer"}
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.surface }}>
            <X size={16} color={COLORS.text} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Full name" style={inputStyle} />
          <input value={form.country} onChange={(e) => set("country", e.target.value)} placeholder="Country of origin" style={inputStyle} />
          <input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="Email" style={inputStyle} />
          <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="Phone" style={inputStyle} />
          <div>
            <label className="text-[11px] block mb-1" style={{ color: COLORS.textFaint }}>Reliability score: {form.reliability}</label>
            <input
              type="range"
              min={0}
              max={100}
              value={form.reliability}
              onChange={(e) => set("reliability", e.target.value)}
              className="w-full"
            />
          </div>
          {error && <span className="text-xs" style={{ color: COLORS.dangerLight }}>{error}</span>}
          <LoadingButton
            type="submit"
            loading={saving}
            className="py-2.5 rounded-lg text-sm font-semibold mt-1"
            style={{ background: COLORS.brass, color: COLORS.base }}
          >
            {isEdit ? "Save changes" : "Add customer"}
          </LoadingButton>
        </form>
      </div>
    </Modal>
  );
}
