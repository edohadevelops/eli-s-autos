import React, { useState } from "react";
import { Plus, Wrench, Clock, CheckCircle2, Pencil, Trash2 } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import MetricCard from "../../components/ui/MetricCard.jsx";
import RepairFormModal from "../../components/admin/RepairFormModal.jsx";
import { COLORS } from "../../utils/constants.js";
import { money } from "../../utils/format.js";
import { useContent } from "../../lib/contentStore.jsx";

const STATUS_META = {
  requested: { label: "Requested", color: COLORS.warn },
  in_progress: { label: "In progress", color: COLORS.petrol },
  waiting_parts: { label: "Waiting on parts", color: COLORS.brassLight },
  completed: { label: "Completed", color: COLORS.success },
};

const SECTIONS = [
  { status: "requested", title: "Requested" },
  { status: "in_progress", title: "In progress" },
  { status: "waiting_parts", title: "Waiting on parts" },
  { status: "completed", title: "Completed" },
];

export default function Repairs() {
  const { repairs, addRepairJob, updateRepairJob, completeRepairJob, deleteRepairJob } = useContent();
  const [editing, setEditing] = useState(null); // null | "add" | job object

  const requested = repairs.filter((j) => j.status === "requested").length;
  const inProgress = repairs.filter((j) => j.status === "in_progress" || j.status === "waiting_parts").length;
  const completedRevenue = repairs
    .filter((j) => j.status === "completed")
    .reduce((sum, j) => sum + j.laborCost + j.partsCost, 0);

  const handleSave = (data) => {
    if (editing && editing !== "add") {
      updateRepairJob(editing.id, data);
    } else {
      addRepairJob(data);
    }
    setEditing(null);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Repairs</h1>
          <p className="text-sm mt-0.5" style={{ color: COLORS.textDim }}>Every job, from intake to completion</p>
        </div>
        <button
          onClick={() => setEditing("add")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
          style={{ background: COLORS.brass, color: COLORS.base }}
        >
          <Plus size={16} /> New repair job
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <MetricCard label="Awaiting scheduling" value={requested} icon={Clock} accent={COLORS.warn} />
        <MetricCard label="In the shop" value={inProgress} icon={Wrench} accent={COLORS.petrol} />
        <MetricCard label="Completed revenue" value={money(completedRevenue)} icon={CheckCircle2} accent={COLORS.success} />
      </div>

      {SECTIONS.map((section) => {
        const list = repairs.filter((j) => j.status === section.status);
        if (list.length === 0) return null;
        return (
          <Card key={section.status} className="overflow-hidden">
            <div className="p-5 pb-0">
              <h3 className="font-display text-[15px] font-semibold" style={{ color: COLORS.text }}>{section.title}</h3>
            </div>
            <div className="flex flex-col gap-3 p-5">
              {list.map((j) => {
                const meta = STATUS_META[j.status];
                return (
                  <div
                    key={j.id}
                    className="flex items-center gap-5 p-4 rounded-lg"
                    style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
                  >
                    {j.photo && (
                      <img src={j.photo} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13.5px] font-semibold" style={{ color: COLORS.text }}>{j.customer}</span>
                        <span className="text-xs" style={{ color: COLORS.textFaint }}>{j.vehicleDescription}</span>
                      </div>
                      <div className="text-[11.5px] mt-1" style={{ color: COLORS.textDim }}>{j.issue}</div>
                      {j.notes && <div className="text-[11px] mt-0.5" style={{ color: COLORS.textFaint }}>{j.notes}</div>}
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-mono text-[13px] font-medium" style={{ color: COLORS.text }}>
                        {money(j.laborCost + j.partsCost)}
                      </div>
                      <div className="text-[11px]" style={{ color: COLORS.textFaint }}>checked in {j.checkedIn}</div>
                    </div>
                    <span
                      className="text-[10px] font-semibold px-2 py-1 rounded shrink-0"
                      style={{ background: `${meta.color}22`, color: meta.color }}
                    >
                      {meta.label}
                    </span>
                    <div className="flex gap-1 shrink-0">
                      {j.status !== "completed" && (
                        <button
                          onClick={() => completeRepairJob(j.id)}
                          className="text-[11px] font-semibold px-3 py-2 rounded-lg"
                          style={{ background: `${COLORS.success}22`, color: COLORS.successLight }}
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => setEditing(j)}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
                        aria-label="Edit"
                      >
                        <Pencil size={13} color={COLORS.textDim} />
                      </button>
                      <button
                        onClick={() => window.confirm(`Delete this job for ${j.customer}?`) && deleteRepairJob(j.id)}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}
                        aria-label="Delete"
                      >
                        <Trash2 size={13} color={COLORS.textFaint} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })}

      {repairs.length === 0 && (
        <p className="text-sm text-center py-10" style={{ color: COLORS.textFaint }}>No repair jobs yet.</p>
      )}

      {editing && (
        <RepairFormModal job={editing === "add" ? null : editing} onSave={handleSave} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}
