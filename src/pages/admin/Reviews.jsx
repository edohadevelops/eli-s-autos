import React, { useState } from "react";
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, X } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import Modal from "../../components/ui/Modal.jsx";
import LoadingButton from "../../components/ui/LoadingButton.jsx";
import { COLORS } from "../../utils/constants.js";
import { useContent } from "../../lib/contentStore.jsx";

const inputStyle = {
  background: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  color: COLORS.text,
  padding: "10px 12px",
  borderRadius: 8,
  fontSize: 13,
};

export default function Reviews() {
  const { reviews, addReview, updateReview, deleteReview } = useContent();
  const [editing, setEditing] = useState(null); // null | "add" | review object

  const handleSave = (data) => {
    if (editing && editing !== "add") {
      updateReview(editing.id, data);
    } else {
      addReview({ ...data, published: true });
    }
    setEditing(null);
  };

  const handleDelete = (r) => {
    if (window.confirm(`Delete the review from ${r.name}?`)) deleteReview(r.id);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Reviews</h1>
          <p className="text-sm mt-0.5" style={{ color: COLORS.textDim }}>
            Shown in the homepage carousel and the public reviews page. Unpublish to hide without deleting.
          </p>
        </div>
        <button
          onClick={() => setEditing("add")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
          style={{ background: COLORS.brass, color: COLORS.base }}
        >
          <Plus size={16} /> Add review
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {reviews.map((r) => (
          <Card key={r.id} className="p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13.5px] font-semibold" style={{ color: COLORS.text }}>{r.name}</span>
                <span className="text-[11px]" style={{ color: COLORS.textFaint }}>{r.country} · {r.car}</span>
                <span className="flex gap-0.5 ml-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} fill={i < r.rating ? COLORS.brass : "none"} color={COLORS.brass} />
                  ))}
                </span>
              </div>
              <p className="text-xs mt-1 truncate" style={{ color: COLORS.textDim }}>{r.quote}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => updateReview(r.id, { published: !r.published })}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: COLORS.surface }}
                aria-label={r.published ? "Unpublish" : "Publish"}
                title={r.published ? "Published. Click to hide." : "Hidden. Click to publish."}
              >
                {r.published ? <Eye size={14} color={COLORS.successLight} /> : <EyeOff size={14} color={COLORS.textFaint} />}
              </button>
              <button onClick={() => setEditing(r)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.surface }} aria-label="Edit">
                <Pencil size={14} color={COLORS.textDim} />
              </button>
              <button onClick={() => handleDelete(r)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.surface }} aria-label="Delete">
                <Trash2 size={14} color={COLORS.dangerLight} />
              </button>
            </div>
          </Card>
        ))}
        {reviews.length === 0 && (
          <p className="text-sm text-center py-10" style={{ color: COLORS.textFaint }}>No reviews yet.</p>
        )}
      </div>

      {editing && (
        <ReviewFormModal review={editing === "add" ? null : editing} onSave={handleSave} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}

function ReviewFormModal({ review, onSave, onClose }) {
  const isEdit = Boolean(review);
  const [form, setForm] = useState(review || { name: "", country: "", car: "", rating: 5, quote: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.quote.trim()) {
      setError("Fill in a name and the quote.");
      return;
    }
    setError("");
    setSaving(true);
    setTimeout(() => {
      onSave({ ...form, rating: Number(form.rating) });
      setSaving(false);
    }, 400);
  };

  return (
    <Modal onClose={onClose} maxWidth="max-w-md">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-lg font-semibold" style={{ color: COLORS.text }}>{isEdit ? "Edit review" : "Add review"}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.surface }}>
            <X size={16} color={COLORS.text} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Customer name" style={inputStyle} />
          <input value={form.country} onChange={(e) => set("country", e.target.value)} placeholder="Country (optional)" style={inputStyle} />
          <input value={form.car} onChange={(e) => set("car", e.target.value)} placeholder="Car or service (e.g. 2019 Toyota Camry)" style={inputStyle} />
          <select value={form.rating} onChange={(e) => set("rating", e.target.value)} style={inputStyle}>
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} star{n !== 1 ? "s" : ""}</option>)}
          </select>
          <textarea value={form.quote} onChange={(e) => set("quote", e.target.value)} placeholder="What did they say?" rows={3} style={{ ...inputStyle, resize: "none" }} />
          {error && <span className="text-xs" style={{ color: COLORS.dangerLight }}>{error}</span>}
          <LoadingButton type="submit" loading={saving} className="py-2.5 rounded-lg text-sm font-semibold mt-1" style={{ background: COLORS.brass, color: COLORS.base }}>
            {isEdit ? "Save changes" : "Add review"}
          </LoadingButton>
        </form>
      </div>
    </Modal>
  );
}
