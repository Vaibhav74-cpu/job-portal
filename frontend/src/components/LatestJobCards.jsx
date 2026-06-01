import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  BriefcaseIcon,
  DollarSignIcon,
  UsersIcon,
  BuildingIcon,
  ArrowRightIcon,
} from "lucide-react";

function LatestJobCards({ job }) {
  const navigate = useNavigate(); // original — unchanged

  const badges = [
    { icon: UsersIcon, label: `${job?.position} Position${job?.position > 1 ? "s" : ""}`, color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/20" },
    { icon: BriefcaseIcon, label: job?.jobType, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { icon: DollarSignIcon, label: job?.salary ? `${job.salary} LPA` : null, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  ];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      onClick={() => navigate(`discription/${job._id}`)} // original — unchanged
      className="group relative flex flex-col bg-[#0d1424] border border-white/[0.07] hover:border-amber-500/30 rounded-2xl p-5 cursor-pointer overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] transition-all duration-300 h-full"
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

      {/* ── Company row ── */}
      <div className="flex items-center gap-3 mb-3 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 overflow-hidden">
          {job?.company?.logo ? (
            <img src={job.company.logo} alt={job?.company?.name} className="w-full h-full object-cover" />
          ) : (
            <BuildingIcon className="w-4 h-4 text-amber-400/60" />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-sm truncate leading-tight">
            {job?.company?.name}
          </h3>
          <span className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
            <MapPinIcon className="w-3 h-3 shrink-0" />
            India
          </span>
        </div>
      </div>

      {/* ── Job title + description ── */}
      <div className="flex-1 relative z-10">
        <h2 className="text-white font-bold text-base leading-snug mb-1.5 group-hover:text-amber-100 transition-colors duration-200">
          {job?.title}
        </h2>
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* ── Badges ── */}
      <div className="flex flex-wrap gap-1.5 mt-4 relative z-10">
        {badges.map(({ icon: Icon, label, color, bg }) =>
          label ? (
            <span key={label} className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${bg} ${color}`}>
              <Icon className="w-3 h-3" />
              {label}
            </span>
          ) : null
        )}
      </div>

      {/* ── Footer row ── */}
      <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-white/[0.05] relative z-10">
        <span className="text-xs text-slate-500 font-medium">View details</span>
        <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.07] group-hover:bg-amber-500/10 group-hover:border-amber-500/20 flex items-center justify-center transition-all duration-200">
          <ArrowRightIcon className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </div>
    </motion.div>
  );
}

export default LatestJobCards;