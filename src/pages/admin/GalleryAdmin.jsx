import React from "react";
import { Check, X, Trash2, Clock } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { COLORS } from "../../utils/constants.js";
import { useContent } from "../../lib/contentStore.jsx";

const STATUS_META = {
  pending: { label: "Pending review", color: COLORS.warn },
  approved: { label: "Live on site", color: COLORS.success },
  rejected: { label: "Rejected", color: COLORS.danger },
};

export default function GalleryAdmin() {
  const { gallery, approveGalleryPhoto, rejectGalleryPhoto, deleteGalleryPhoto } = useContent();

  const pending = gallery.filter((g) => g.status === "pending");
  const rest = gallery.filter((g) => g.status !== "pending");

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold" style={{ color: COLORS.text }}>Customer gallery</h1>
        <p className="text-sm mt-0.5" style={{ color: COLORS.textDim }}>
          Photos customers submit from the public site land here first. Nothing goes live until approved.
        </p>
      </div>

      {pending.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={14} color={COLORS.warn} />
            <h3 className="font-display text-[15px] font-semibold" style={{ color: COLORS.text }}>
              Awaiting review ({pending.length})
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {pending.map((g) => (
              <PhotoCard key={g.id} photo={g} onApprove={() => approveGalleryPhoto(g.id)} onReject={() => rejectGalleryPhoto(g.id)} onDelete={() => deleteGalleryPhoto(g.id)} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-display text-[15px] font-semibold mb-3" style={{ color: COLORS.text }}>All submissions</h3>
        {rest.length === 0 ? (
          <p className="text-sm" style={{ color: COLORS.textFaint }}>Nothing here yet.</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {rest.map((g) => (
              <PhotoCard key={g.id} photo={g} onApprove={() => approveGalleryPhoto(g.id)} onReject={() => rejectGalleryPhoto(g.id)} onDelete={() => deleteGalleryPhoto(g.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PhotoCard({ photo, onApprove, onReject, onDelete }) {
  const meta = STATUS_META[photo.status];
  return (
    <Card className="overflow-hidden">
      <div className="relative h-32">
        <img src={photo.photo} alt={photo.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <Badge color={meta.color}>{meta.label}</Badge>
        </div>
      </div>
      <div className="p-3">
        <div className="text-xs font-semibold" style={{ color: COLORS.text }}>{photo.name}</div>
        <div className="text-[11px] mt-0.5" style={{ color: COLORS.textFaint }}>{photo.car}</div>
        {photo.caption && <p className="text-[11px] mt-1.5 line-clamp-2" style={{ color: COLORS.textDim }}>{photo.caption}</p>}
        <div className="flex gap-1.5 mt-3">
          {photo.status !== "approved" && (
            <button onClick={onApprove} className="flex-1 py-1.5 rounded-md flex items-center justify-center gap-1 text-[11px] font-semibold" style={{ background: `${COLORS.success}22`, color: COLORS.successLight }}>
              <Check size={12} /> Approve
            </button>
          )}
          {photo.status !== "rejected" && (
            <button onClick={onReject} className="flex-1 py-1.5 rounded-md flex items-center justify-center gap-1 text-[11px] font-semibold" style={{ background: `${COLORS.danger}22`, color: COLORS.dangerLight }}>
              <X size={12} /> Reject
            </button>
          )}
          <button onClick={onDelete} className="py-1.5 px-2 rounded-md flex items-center justify-center" style={{ background: COLORS.surface }} aria-label="Delete">
            <Trash2 size={12} color={COLORS.textFaint} />
          </button>
        </div>
      </div>
    </Card>
  );
}
