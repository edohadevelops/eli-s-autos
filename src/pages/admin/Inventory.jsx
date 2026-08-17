import React, { useState } from "react";
import { Search, Plus, X, Gauge, Fuel, Users, FileText, Pencil, Trash2 } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Modal from "../../components/ui/Modal.jsx";
import DealBadge from "../../components/ui/DealBadge.jsx";
import VehicleImage from "../../components/ui/VehicleImage.jsx";
import VehicleFormModal from "../../components/admin/VehicleFormModal.jsx";
import { COLORS, STATUS_META } from "../../utils/constants.js";
import { money } from "../../utils/format.js";
import { useContent } from "../../lib/contentStore.jsx";

const TABS = [
  { id: "all", label: "All vehicles" },
  { id: "sale", label: "For sale / financed" },
  { id: "rental", label: "Rentals" },
  { id: "repair", label: "In repair" },
];

export default function Inventory() {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useContent();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [formMode, setFormMode] = useState(null); // null | "add" | "edit"

  const selected = vehicles.find((v) => v.id === selectedId) || null;

  const filtered = vehicles.filter((v) => {
    const matchesFilter = filter === "all" || v.category === filter;
    const matchesQuery = `${v.make} ${v.model} ${v.vin}`.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const handleSave = (data) => {
    if (formMode === "edit" && selected) {
      updateVehicle(selected.id, data);
    } else {
      addVehicle(data);
    }
    setFormMode(null);
  };

  const handleDelete = () => {
    if (!selected) return;
    if (window.confirm(`Remove ${selected.year} ${selected.make} ${selected.model} from inventory?`)) {
      deleteVehicle(selected.id);
      setSelectedId(null);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Inventory</h1>
          <p className="text-sm mt-0.5" style={{ color: COLORS.textDim }}>{vehicles.length} vehicles across sales, rentals, and repair</p>
        </div>
        <button
          onClick={() => { setSelectedId(null); setFormMode("add"); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg"
          style={{ background: COLORS.brass, fontFamily: "Inter", fontSize: 13, fontWeight: 600, color: COLORS.base }}
        >
          <Plus size={16} /> Add vehicle
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className="px-3.5 py-1.5 rounded-md text-xs font-medium"
              style={{
                background: filter === t.id ? COLORS.card : "transparent",
                color: filter === t.id ? COLORS.text : COLORS.textDim,
                border: filter === t.id ? `1px solid ${COLORS.border}` : "1px solid transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="relative w-64">
          <Search size={15} color={COLORS.textFaint} className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search make, model, VIN"
            className="w-full pl-9 pr-3 py-2 rounded-lg outline-none text-xs"
            style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filtered.map((v) => {
          const meta = STATUS_META[v.status];
          return (
            <Card key={v.id} className="overflow-hidden cursor-pointer hover:opacity-95" onClick={() => setSelectedId(v.id)}>
              <div className="relative h-36 overflow-hidden">
                <VehicleImage src={v.photo} alt={`${v.make} ${v.model}`} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge color={meta.color}>{meta.label}</Badge>
                </div>
              </div>
              <div className="p-3.5">
                <div className="font-display text-[15px] font-semibold" style={{ color: COLORS.text }}>
                  {v.year} {v.make} {v.model}
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-[11.5px]" style={{ color: COLORS.textFaint }}>
                    <Gauge size={12} /> {v.mileage.toLocaleString()} mi
                  </span>
                  <span className="flex items-center gap-1 text-[11.5px]" style={{ color: COLORS.textFaint }}>
                    <Fuel size={12} /> {v.color}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${COLORS.border}` }}>
                  <span className="font-mono text-[13px] font-medium" style={{ color: COLORS.brassLight }}>
                    {v.category === "rental" ? `${money(v.price)}/day` : v.price > 0 ? money(v.price) : "N/A"}
                  </span>
                  {v.customer && <span className="text-[11px]" style={{ color: COLORS.textFaint }}>{v.customer}</span>}
                </div>
                {v.category === "sale" && v.marketPrice && (
                  <div className="mt-2">
                    <DealBadge price={v.price} marketPrice={v.marketPrice} />
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {selected && !formMode && (
        <VehicleModal
          vehicle={selected}
          onClose={() => setSelectedId(null)}
          onEdit={() => setFormMode("edit")}
          onDelete={handleDelete}
        />
      )}

      {formMode && (
        <VehicleFormModal
          vehicle={formMode === "edit" ? selected : null}
          onSave={handleSave}
          onClose={() => setFormMode(null)}
        />
      )}
    </div>
  );
}

function VehicleModal({ vehicle, onClose, onEdit, onDelete }) {
  const meta = STATUS_META[vehicle.status];
  return (
    <Modal onClose={onClose}>
      <div className="relative h-56">
        <VehicleImage src={vehicle.photo} alt="" className="w-full h-full object-cover" />
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(20,19,15,0.7)" }}>
          <X size={16} color={COLORS.text} />
        </button>
        <div className="absolute bottom-3 left-3">
          <Badge color={meta.color}>{meta.label}</Badge>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-display text-xl font-semibold" style={{ color: COLORS.text }}>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </div>
            <div className="font-mono text-xs mt-1" style={{ color: COLORS.textFaint }}>VIN {vehicle.vin}</div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={onEdit} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.surface }} aria-label="Edit">
              <Pencil size={14} color={COLORS.textDim} />
            </button>
            <button onClick={onDelete} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.surface }} aria-label="Delete">
              <Trash2 size={14} color={COLORS.dangerLight} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="p-3 rounded-lg" style={{ background: COLORS.surface }}>
            <div className="text-[11px]" style={{ color: COLORS.textFaint }}>Mileage</div>
            <div className="text-sm font-semibold" style={{ color: COLORS.text }}>{vehicle.mileage.toLocaleString()}</div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: COLORS.surface }}>
            <div className="text-[11px]" style={{ color: COLORS.textFaint }}>Color</div>
            <div className="text-sm font-semibold" style={{ color: COLORS.text }}>{vehicle.color}</div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: COLORS.surface }}>
            <div className="text-[11px]" style={{ color: COLORS.textFaint }}>Price</div>
            <div className="text-sm font-semibold" style={{ color: COLORS.brassLight }}>
              {vehicle.category === "rental" ? `${money(vehicle.price)}/day` : vehicle.price > 0 ? money(vehicle.price) : "N/A"}
            </div>
          </div>
        </div>

        {vehicle.customer && (
          <div className="mt-4 p-3 rounded-lg flex items-center gap-2" style={{ background: COLORS.surface }}>
            <Users size={14} color={COLORS.textDim} />
            <span className="text-xs" style={{ color: COLORS.text }}>Linked to {vehicle.customer}</span>
          </div>
        )}

        <div className="mt-4 p-3 rounded-lg" style={{ background: COLORS.surface, border: `1px dashed ${COLORS.border}` }}>
          <div className="flex items-center gap-2">
            <FileText size={13} color={COLORS.textFaint} />
            <span className="text-[11.5px]" style={{ color: COLORS.textFaint }}>
              Condition photos, service history, and title documents attach here once connected to storage.
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
