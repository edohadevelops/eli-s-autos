import React, { useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import CustomerFormModal from "../../components/admin/CustomerFormModal.jsx";
import { COLORS } from "../../utils/constants.js";
import { initials } from "../../utils/format.js";
import { useContent } from "../../lib/contentStore.jsx";

const COLUMNS = ["Customer", "Origin", "Contact", "Vehicles", "Reliability", "Member since", ""];

export default function Customers() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useContent();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null); // null | "add" | customer object
  const filtered = customers.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  const handleSave = (data) => {
    if (editing && editing !== "add") {
      updateCustomer(editing.id, data);
    } else {
      addCustomer(data);
    }
    setEditing(null);
  };

  const handleDelete = (c) => {
    if (window.confirm(`Remove ${c.name} from customers?`)) {
      deleteCustomer(c.id);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Customers</h1>
          <p className="text-sm mt-0.5" style={{ color: COLORS.textDim }}>{customers.length} customers across the community</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search size={15} color={COLORS.textFaint} className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search customers"
              className="w-full pl-9 pr-3 py-2 rounded-lg outline-none text-xs"
              style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
            />
          </div>
          <button
            onClick={() => setEditing("add")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold shrink-0"
            style={{ background: COLORS.brass, color: COLORS.base }}
          >
            <Plus size={16} /> Add customer
          </button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              {COLUMNS.map((h) => (
                <th key={h} className="text-left px-4 py-3 text-[11.5px] font-semibold tracking-wide" style={{ color: COLORS.textFaint }}>
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-display text-[13px] font-semibold"
                      style={{ background: `${COLORS.brass}22`, color: COLORS.brassLight }}
                    >
                      {initials(c.name)}
                    </div>
                    <span className="text-[13.5px] font-semibold" style={{ color: COLORS.text }}>{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-[13px]" style={{ color: COLORS.textDim }}>{c.country}</td>
                <td className="px-4 py-3.5">
                  <div className="text-xs" style={{ color: COLORS.textDim }}>{c.email}</div>
                  <div className="text-[12px]" style={{ color: COLORS.textFaint }}>{c.phone}</div>
                </td>
                <td className="px-4 py-3.5 text-[13px]" style={{ color: COLORS.text }}>{c.vehicles?.length || 0}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2 w-28">
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: COLORS.border }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${c.reliability}%`, background: c.reliability > 70 ? COLORS.success : c.reliability > 40 ? COLORS.warn : COLORS.danger }}
                      />
                    </div>
                    <span className="font-mono text-[11.5px]" style={{ color: COLORS.textDim }}>{c.reliability}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs" style={{ color: COLORS.textFaint }}>{c.joined}</td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-1 justify-end">
                    <button onClick={() => setEditing(c)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: COLORS.surface }} aria-label="Edit">
                      <Pencil size={12} color={COLORS.textDim} />
                    </button>
                    <button onClick={() => handleDelete(c)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: COLORS.surface }} aria-label="Delete">
                      <Trash2 size={12} color={COLORS.dangerLight} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {editing && (
        <CustomerFormModal
          customer={editing === "add" ? null : editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
