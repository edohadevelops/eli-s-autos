import React, { useState } from "react";
import { X } from "lucide-react";
import Modal from "../ui/Modal.jsx";
import LoadingButton from "../ui/LoadingButton.jsx";
import ImageUploadField from "../ui/ImageUploadField.jsx";
import { COLORS } from "../../utils/constants.js";

const inputStyle = {
  background: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  color: COLORS.text,
  padding: "10px 12px",
  borderRadius: 8,
  fontSize: 13,
  width: "100%",
};

export default function RepairFormModal({ job, onSave, onClose }) {
  const isEdit = Boolean(job);
  const [form, setForm] = useState(
    job || { customer: "", vehicleDescription: "", issue: "", laborCost: 0, partsCost: 0, status: "requested", notes: "", photo: "" }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.customer.trim() || !form.vehicleDescription.trim() || !form.issue.trim()) {
      setError("Fill in the customer, vehicle, and what needs fixing.");
      return;
    }
    setError("");
    setSaving(true);
    setTimeout(() => {
      onSave({ ...form, laborCost: Number(form.laborCost) || 0, partsCost: Number(form.partsCost) || 0 });
      setSaving(false);
    }, 400);
  };

  return (
    <Modal onClose={onClose} maxWidth="max-w-md">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-lg font-semibold" style={{ color: COLORS.text }}>{isEdit ? "Edit repair job" : "New repair job"}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.surface }}>
            <X size={16} color={COLORS.text} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input value={form.customer} onChange={(e) => set("customer", e.target.value)} placeholder="Customer name" style={inputStyle} />
          <input value={form.vehicleDescription} onChange={(e) => set("vehicleDescription", e.target.value)} placeholder="Vehicle (e.g. 2017 Ford Fusion)" style={inputStyle} />
          <textarea value={form.issue} onChange={(e) => set("issue", e.target.value)} placeholder="What needs fixing?" rows={2} style={{ ...inputStyle, resize: "none" }} />
          <ImageUploadField value={form.photo} onChange={(v) => set("photo", v)} colors={COLORS} />
          <div className="grid grid-cols-2 gap-3">
            <input type="number" value={form.laborCost} onChange={(e) => set("laborCost", e.target.value)} placeholder="Labor cost" style={inputStyle} />
            <input type="number" value={form.partsCost} onChange={(e) => set("partsCost", e.target.value)} placeholder="Parts cost" style={inputStyle} />
          </div>
          <select value={form.status} onChange={(e) => set("status", e.target.value)} style={inputStyle}>
            <option value="requested">Requested</option>
            <option value="in_progress">In progress</option>
            <option value="waiting_parts">Waiting on parts</option>
            <option value="completed">Completed</option>
          </select>
          <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Notes (optional)" rows={2} style={{ ...inputStyle, resize: "none" }} />
          {error && <span className="text-xs" style={{ color: COLORS.dangerLight }}>{error}</span>}
          <LoadingButton
            type="submit"
            loading={saving}
            className="py-2.5 rounded-lg text-sm font-semibold mt-1"
            style={{ background: COLORS.brass, color: COLORS.base }}
          >
            {isEdit ? "Save changes" : "Add job"}
          </LoadingButton>
        </form>
      </div>
    </Modal>
  );
}
