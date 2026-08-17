import React, { useState } from "react";
import { X } from "lucide-react";
import Modal from "../ui/Modal.jsx";
import LoadingButton from "../ui/LoadingButton.jsx";
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

export default function RentalFormModal({ onSave, onClose }) {
  const { vehicles } = useContent();
  const availableVehicles = vehicles.filter((v) => v.category === "rental" && v.status === "available_rent");

  const [vehicleId, setVehicleId] = useState(availableVehicles[0]?.id || "");
  const [customer, setCustomer] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const selectedVehicle = vehicles.find((v) => v.id === vehicleId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vehicleId || !customer.trim() || !startDate || !endDate) {
      setError("Fill in the vehicle, customer, and both dates.");
      return;
    }
    setError("");
    setSaving(true);
    setTimeout(() => {
      onSave({
        vehicleId,
        vehicleLabel: `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`,
        customer,
        startDate,
        endDate,
        dailyRate: selectedVehicle.price,
        status: "active",
      });
      setSaving(false);
    }, 400);
  };

  return (
    <Modal onClose={onClose} maxWidth="max-w-md">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-lg font-semibold" style={{ color: COLORS.text }}>New rental booking</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: COLORS.surface }}>
            <X size={16} color={COLORS.text} />
          </button>
        </div>

        {availableVehicles.length === 0 ? (
          <p className="text-sm" style={{ color: COLORS.textFaint }}>
            No rental vehicles are currently available. Mark one as returned first, or add a new rental vehicle in Inventory.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} style={inputStyle}>
              {availableVehicles.map((v) => (
                <option key={v.id} value={v.id}>{v.year} {v.make} {v.model} (${v.price}/day)</option>
              ))}
            </select>
            <input value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Customer name" style={inputStyle} />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] block mb-1" style={{ color: COLORS.textFaint }}>Start date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label className="text-[11px] block mb-1" style={{ color: COLORS.textFaint }}>End date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={inputStyle} />
              </div>
            </div>
            {error && <span className="text-xs" style={{ color: COLORS.dangerLight }}>{error}</span>}
            <LoadingButton
              type="submit"
              loading={saving}
              className="py-2.5 rounded-lg text-sm font-semibold mt-1"
              style={{ background: COLORS.brass, color: COLORS.base }}
            >
              Create booking
            </LoadingButton>
          </form>
        )}
      </div>
    </Modal>
  );
}
