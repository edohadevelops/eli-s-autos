import React, { useState } from "react";
import { Plus, Calendar, Car, CheckCircle2, Trash2 } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import MetricCard from "../../components/ui/MetricCard.jsx";
import RentalFormModal from "../../components/admin/RentalFormModal.jsx";
import { COLORS } from "../../utils/constants.js";
import { money } from "../../utils/format.js";
import { useContent } from "../../lib/contentStore.jsx";

const STATUS_META = {
  active: { label: "Active", color: COLORS.success },
  upcoming: { label: "Upcoming", color: COLORS.petrol },
  completed: { label: "Completed", color: COLORS.textFaint },
};

const SECTIONS = [
  { status: "active", title: "Active rentals" },
  { status: "upcoming", title: "Upcoming" },
  { status: "completed", title: "Completed" },
];

export default function Rentals() {
  const { rentals, completeRentalBooking, deleteRentalBooking, addRentalBooking } = useContent();
  const [showForm, setShowForm] = useState(false);

  const active = rentals.filter((r) => r.status === "active");
  const upcoming = rentals.filter((r) => r.status === "upcoming");
  const monthRevenue = rentals
    .filter((r) => r.status !== "upcoming")
    .reduce((sum, r) => {
      const days = Math.max(1, Math.round((new Date(r.endDate) - new Date(r.startDate)) / 86400000));
      return sum + days * r.dailyRate;
    }, 0);

  const handleSave = (booking) => {
    addRentalBooking(booking);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Rentals</h1>
          <p className="text-sm mt-0.5" style={{ color: COLORS.textDim }}>Active bookings, upcoming pickups, and rental history</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
          style={{ background: COLORS.brass, color: COLORS.base }}
        >
          <Plus size={16} /> New booking
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="Active rentals" value={active.length} icon={Car} accent={COLORS.success} />
        <MetricCard label="Upcoming bookings" value={upcoming.length} icon={Calendar} accent={COLORS.petrol} />
        <MetricCard label="Rental revenue tracked" value={money(monthRevenue)} icon={CheckCircle2} accent={COLORS.brass} />
      </div>

      {SECTIONS.map((section) => {
        const list = rentals.filter((r) => r.status === section.status);
        if (list.length === 0) return null;
        return (
          <Card key={section.status} className="overflow-hidden">
            <div className="p-5 pb-0">
              <h3 className="font-display text-[15px] font-semibold" style={{ color: COLORS.text }}>{section.title}</h3>
            </div>
            <div className="flex flex-col gap-3 p-5">
              {list.map((r) => {
                const meta = STATUS_META[r.status];
                const days = Math.max(1, Math.round((new Date(r.endDate) - new Date(r.startDate)) / 86400000));
                return (
                  <div
                    key={r.id}
                    className="flex items-center gap-5 p-4 rounded-lg"
                    style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13.5px] font-semibold" style={{ color: COLORS.text }}>{r.customer}</span>
                        <span className="text-xs" style={{ color: COLORS.textFaint }}>{r.vehicleLabel}</span>
                      </div>
                      <div className="text-[11.5px] mt-1" style={{ color: COLORS.textFaint }}>
                        {r.startDate} → {r.endDate} · {days} day{days !== 1 ? "s" : ""}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono text-[13px] font-medium" style={{ color: COLORS.text }}>{money(days * r.dailyRate)}</div>
                      <div className="text-[11px]" style={{ color: COLORS.textFaint }}>{money(r.dailyRate)}/day</div>
                    </div>
                    <span
                      className="text-[10px] font-semibold px-2 py-1 rounded shrink-0"
                      style={{ background: `${meta.color}22`, color: meta.color }}
                    >
                      {meta.label}
                    </span>
                    {r.status === "active" && (
                      <button
                        onClick={() => completeRentalBooking(r.id)}
                        className="text-[11px] font-semibold px-3 py-2 rounded-lg shrink-0"
                        style={{ background: `${COLORS.success}22`, color: COLORS.successLight }}
                      >
                        Mark returned
                      </button>
                    )}
                    <button
                      onClick={() => window.confirm(`Delete this booking for ${r.customer}?`) && deleteRentalBooking(r.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
                      aria-label="Delete"
                    >
                      <Trash2 size={13} color={COLORS.textFaint} />
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })}

      {rentals.length === 0 && (
        <p className="text-sm text-center py-10" style={{ color: COLORS.textFaint }}>No rental bookings yet.</p>
      )}

      {showForm && <RentalFormModal onSave={handleSave} onClose={() => setShowForm(false)} />}
    </div>
  );
}
