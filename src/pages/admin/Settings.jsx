import React, { useState, useEffect } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
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
  width: "100%",
};

const label = { fontSize: 11, color: COLORS.textFaint, display: "block", marginBottom: 4 };

export default function Settings() {
  const { siteSettings, updateSiteSettings } = useContent();
  const [form, setForm] = useState(siteSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm(siteSettings), [siteSettings]);

  const setField = (key, val) => { setForm((f) => ({ ...f, [key]: val })); setSaved(false); };
  const setSocial = (key, val) => {
    setForm((f) => ({ ...f, socials: { ...f.socials, [key]: val } }));
    setSaved(false);
  };
  const setPillar = (i, key, val) => {
    setForm((f) => {
      const pillars = [...f.pillars];
      pillars[i] = { ...pillars[i], [key]: val };
      return { ...f, pillars };
    });
    setSaved(false);
  };
  const setService = (i, key, val) => {
    setForm((f) => {
      const services = [...(f.services || [])];
      services[i] = { ...services[i], [key]: val };
      return { ...f, services };
    });
    setSaved(false);
  };
  const addService = () => {
    setForm((f) => ({ ...f, services: [...(f.services || []), { title: "", priceRange: "", description: "" }] }));
    setSaved(false);
  };
  const removeService = (i) => {
    setForm((f) => ({ ...f, services: f.services.filter((_, idx) => idx !== i) }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      updateSiteSettings(form);
      setSaving(false);
      setSaved(true);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Site content</h1>
        <p className="text-sm mt-0.5" style={{ color: COLORS.textDim }}>
          Edit the homepage copy, footer, and contact details. Changes appear on the public site immediately.
        </p>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <Card className="p-5 flex flex-col gap-3">
          <h3 className="font-display text-[15px] font-semibold" style={{ color: COLORS.text }}>Homepage hero</h3>
          <div>
            <label style={label}>Headline</label>
            <input value={form.heroHeadline} onChange={(e) => setField("heroHeadline", e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={label}>Subheadline</label>
            <textarea value={form.heroSubhead} onChange={(e) => setField("heroSubhead", e.target.value)} rows={2} style={{ ...inputStyle, resize: "none" }} />
          </div>
        </Card>

        <Card className="p-5 flex flex-col gap-4">
          <h3 className="font-display text-[15px] font-semibold" style={{ color: COLORS.text }}>Trust pillars</h3>
          {form.pillars.map((p, i) => (
            <div key={i} className="flex flex-col gap-2 pb-3" style={{ borderBottom: i < form.pillars.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
              <input value={p.title} onChange={(e) => setPillar(i, "title", e.target.value)} placeholder="Pillar title" style={inputStyle} />
              <textarea value={p.text} onChange={(e) => setPillar(i, "text", e.target.value)} placeholder="Pillar description" rows={2} style={{ ...inputStyle, resize: "none" }} />
            </div>
          ))}
        </Card>

        <Card className="p-5 flex flex-col gap-3">
          <h3 className="font-display text-[15px] font-semibold" style={{ color: COLORS.text }}>Footer & contact</h3>
          <div>
            <label style={label}>Footer line</label>
            <input value={form.footerLine} onChange={(e) => setField("footerLine", e.target.value)} style={inputStyle} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={label}>Contact email</label>
              <input value={form.contactEmail} onChange={(e) => setField("contactEmail", e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={label}>Contact phone</label>
              <input value={form.contactPhone} onChange={(e) => setField("contactPhone", e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={label}>Address</label>
            <input value={form.address || ""} onChange={(e) => setField("address", e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={label}>Hours</label>
            <input value={form.hours || ""} onChange={(e) => setField("hours", e.target.value)} style={inputStyle} />
          </div>
        </Card>

        <Card className="p-5 flex flex-col gap-3">
          <h3 className="font-display text-[15px] font-semibold" style={{ color: COLORS.text }}>Social links</h3>
          <p className="text-xs" style={{ color: COLORS.textDim }}>Leave blank to hide an icon from the footer.</p>
          <div>
            <label style={label}>Instagram URL</label>
            <input value={form.socials?.instagram || ""} onChange={(e) => setSocial("instagram", e.target.value)} placeholder="https://instagram.com/..." style={inputStyle} />
          </div>
          <div>
            <label style={label}>Facebook URL</label>
            <input value={form.socials?.facebook || ""} onChange={(e) => setSocial("facebook", e.target.value)} placeholder="https://facebook.com/..." style={inputStyle} />
          </div>
          <div>
            <label style={label}>Twitter / X URL</label>
            <input value={form.socials?.twitter || ""} onChange={(e) => setSocial("twitter", e.target.value)} placeholder="https://x.com/..." style={inputStyle} />
          </div>
        </Card>

        <Card className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-[15px] font-semibold" style={{ color: COLORS.text }}>Services menu</h3>
            <button
              type="button"
              onClick={addService}
              className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg"
              style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.textDim }}
            >
              <Plus size={12} /> Add service
            </button>
          </div>
          <p className="text-xs" style={{ color: COLORS.textDim }}>Shown on the public Services page.</p>
          {(form.services || []).map((s, i) => (
            <div key={i} className="flex flex-col gap-2 pb-3" style={{ borderBottom: i < form.services.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
              <div className="flex gap-2">
                <input value={s.title} onChange={(e) => setService(i, "title", e.target.value)} placeholder="Service name" style={inputStyle} />
                <input value={s.priceRange} onChange={(e) => setService(i, "priceRange", e.target.value)} placeholder="Price range" style={{ ...inputStyle, maxWidth: 140 }} />
                <button
                  type="button"
                  onClick={() => removeService(i)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
                  aria-label="Remove service"
                >
                  <Trash2 size={13} color={COLORS.dangerLight} />
                </button>
              </div>
              <textarea value={s.description} onChange={(e) => setService(i, "description", e.target.value)} placeholder="Description" rows={2} style={{ ...inputStyle, resize: "none" }} />
            </div>
          ))}
        </Card>

        <div className="flex items-center gap-3">
          <LoadingButton
            type="submit"
            loading={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold w-fit"
            style={{ background: COLORS.brass, color: COLORS.base }}
          >
            <Save size={14} /> Save changes
          </LoadingButton>
          {saved && <span className="text-xs" style={{ color: COLORS.successLight }}>Saved.</span>}
        </div>
      </form>
    </div>
  );
}
