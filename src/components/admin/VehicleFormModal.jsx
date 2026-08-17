import React, { useState } from "react";
import { X } from "lucide-react";
import Modal from "../ui/Modal.jsx";
import LoadingButton from "../ui/LoadingButton.jsx";
import ImageUploadField from "../ui/ImageUploadField.jsx";
import { COLORS } from "../../utils/constants.js";

const CATEGORIES = ["sale", "rental", "repair"];
const STATUS_BY_CATEGORY = {
  sale: ["for_sale", "sold_financed", "repossessed"],
  rental: ["available_rent", "rented"],
  repair: ["in_repair"],
};

const inputStyle = {
  background: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  color: COLORS.text,
  padding: "10px 12px",
  borderRadius: 8,
  fontSize: 13,
};

export default function VehicleFormModal({ vehicle, onSave, onClose }) {
  const isEdit = Boolean(vehicle);
  const [form, setForm] = useState(
    vehicle || {
      make: "",
      model: "",
      year: new Date().getFullYear(),
      vin: "",
      mileage: 0,
      color: "",
      category: "sale",
      status: "for_sale",
      price: 0,
      marketPrice: "",
      photo: "",
      customer: "",
    }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.make.trim() || !form.model.trim() || !form.vin.trim()) {
      setError("Fill in make, model, and VIN.");
      return;
    }
    setError("");
    setSaving(true);
    setTimeout(() => {
      onSave({
        ...form,
        year: Number(form.year),
        mileage: Number(form.mileage),
        price: Number(form.price),
        marketPrice: form.marketPrice ? Number(form.marketPrice) : undefined,
      });
      setSaving(false);
    }, 400);
  };

  return (
    <Modal onClose={onClose} maxWidth="max-w-lg">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-lg font-semibold" style={{ color: COLORS.text }}>
            {isEdit ? "Edit vehicle" : "Add vehicle"}
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.surface }}>
            <X size={16} color={COLORS.text} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
          <input value={form.make} onChange={(e) => set("make", e.target.value)} placeholder="Make" style={inputStyle} />
          <input value={form.model} onChange={(e) => set("model", e.target.value)} placeholder="Model" style={inputStyle} />
          <input type="number" value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="Year" style={inputStyle} />
          <input value={form.vin} onChange={(e) => set("vin", e.target.value)} placeholder="VIN" style={inputStyle} />
          <input type="number" value={form.mileage} onChange={(e) => set("mileage", e.target.value)} placeholder="Mileage" style={inputStyle} />
          <input value={form.color} onChange={(e) => set("color", e.target.value)} placeholder="Color" style={inputStyle} />

          <select
            value={form.category}
            onChange={(e) => {
              const cat = e.target.value;
              set("category", cat);
              set("status", STATUS_BY_CATEGORY[cat][0]);
            }}
            style={inputStyle}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={form.status} onChange={(e) => set("status", e.target.value)} style={inputStyle}>
            {STATUS_BY_CATEGORY[form.category].map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
            ))}
          </select>

          {form.category !== "repair" && (
            <>
              <input
                type="number"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder={form.category === "rental" ? "Price per day" : "Price"}
                style={inputStyle}
              />
              {form.category === "sale" && (
                <input
                  type="number"
                  value={form.marketPrice || ""}
                  onChange={(e) => set("marketPrice", e.target.value)}
                  placeholder="Market price (optional)"
                  style={inputStyle}
                />
              )}
            </>
          )}

          <div className="col-span-2">
            <ImageUploadField value={form.photo} onChange={(v) => set("photo", v)} colors={COLORS} />
          </div>
          <input
            value={form.customer || ""}
            onChange={(e) => set("customer", e.target.value)}
            placeholder="Linked customer (optional)"
            className="col-span-2"
            style={inputStyle}
          />

          {error && <span className="col-span-2 text-xs" style={{ color: COLORS.dangerLight }}>{error}</span>}

          <LoadingButton
            type="submit"
            loading={saving}
            className="col-span-2 py-2.5 rounded-lg text-sm font-semibold mt-1"
            style={{ background: COLORS.brass, color: COLORS.base }}
          >
            {isEdit ? "Save changes" : "Add vehicle"}
          </LoadingButton>
        </form>
      </div>
    </Modal>
  );
}
