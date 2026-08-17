import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { PUBLIC_COLORS as COLORS } from "../../utils/publicTheme.js";
import DealBadge from "../../components/ui/DealBadge.jsx";
import VehicleImage from "../../components/ui/VehicleImage.jsx";
import { useContent } from "../../lib/contentStore.jsx";

const TABS = [
  { id: "sale", label: "For sale" },
  { id: "rental", label: "For rent" },
];

const SORTS = [
  { id: "price_asc", label: "Price: low to high" },
  { id: "price_desc", label: "Price: high to low" },
  { id: "year_desc", label: "Newest first" },
  { id: "mileage_asc", label: "Lowest mileage" },
];

export default function Cars() {
  const { vehicles } = useContent();
  const [tab, setTab] = useState("sale");
  const [make, setMake] = useState("all");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sort, setSort] = useState("price_asc");

  const base = vehicles.filter((v) => v.category === tab && v.status !== "repossessed" && v.status !== "in_repair");
  const makes = ["all", ...new Set(base.map((v) => v.make))];

  const list = useMemo(() => {
    let result = base.filter((v) => (make === "all" || v.make === make) && v.price <= maxPrice);
    switch (sort) {
      case "price_desc": result = [...result].sort((a, b) => b.price - a.price); break;
      case "year_desc": result = [...result].sort((a, b) => b.year - a.year); break;
      case "mileage_asc": result = [...result].sort((a, b) => a.mileage - b.mileage); break;
      default: result = [...result].sort((a, b) => a.price - b.price);
    }
    return result;
  }, [base, make, maxPrice, sort]);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6 px-8 py-10">
      <div>
        <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Cars</h1>
        <p className="text-sm mt-1" style={{ color: COLORS.textDim }}>Every listing is a car Eli has personally inspected.</p>
      </div>

      <div className="flex items-center gap-2 text-xs" style={{ color: COLORS.textDim }}>
        <ShieldCheck size={14} color={COLORS.successLight} />
        No hidden fees. The price you see includes everything but tax, title, and registration.
      </div>

      <div className="flex items-center gap-1 p-1 rounded-lg w-fit" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setMake("all"); setMaxPrice(t.id === "rental" ? 80 : 20000); }}
            className="px-4 py-1.5 rounded-md text-xs font-medium"
            style={{
              background: tab === t.id ? COLORS.card : "transparent",
              color: tab === t.id ? COLORS.text : COLORS.textDim,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-4 flex-wrap p-4 rounded-xl" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
        <div>
          <label className="text-[11px] block mb-1" style={{ color: COLORS.textFaint }}>Make</label>
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs outline-none"
            style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
          >
            {makes.map((m) => <option key={m} value={m}>{m === "all" ? "All makes" : m}</option>)}
          </select>
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="text-[11px] block mb-1" style={{ color: COLORS.textFaint }}>
            Max price: ${maxPrice.toLocaleString()}{tab === "rental" ? "/day" : ""}
          </label>
          <input
            type="range"
            min={tab === "rental" ? 20 : 5000}
            max={tab === "rental" ? 80 : 20000}
            step={tab === "rental" ? 5 : 500}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="text-[11px] block mb-1" style={{ color: COLORS.textFaint }}>Sort by</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs outline-none"
            style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
          >
            {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="text-sm text-center py-10" style={{ color: COLORS.textFaint }}>No cars match those filters right now.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {list.map((v) => (
            <Link
              key={v.id}
              to={`/cars/${v.id}`}
              className="rounded-xl overflow-hidden block hover-lift"
              style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}
            >
              <div className="overflow-hidden">
                <VehicleImage
                  src={v.photo}
                  alt={`${v.make} ${v.model}`}
                  className="w-full h-36 object-cover transition-transform duration-500 hover:scale-105"
                  colors={COLORS}
                />
              </div>
              <div className="p-3.5">
                <div className="font-display text-sm font-semibold" style={{ color: COLORS.text }}>{v.year} {v.make} {v.model}</div>
                <div className="text-xs mt-1" style={{ color: COLORS.textFaint }}>{v.mileage.toLocaleString()} mi · {v.color}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-mono text-xs" style={{ color: COLORS.brassLight }}>
                    {tab === "rental" ? `$${v.price}/day` : `$${v.price.toLocaleString()}`}
                  </span>
                </div>
                {tab === "sale" && (
                  <div className="mt-2">
                    <DealBadge price={v.price} marketPrice={v.marketPrice} />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
