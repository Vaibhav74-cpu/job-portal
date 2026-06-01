import { BookmarkIcon, MapPinIcon, BriefcaseIcon, DollarSignIcon, UsersIcon, ClockIcon, ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Job({ job }) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  // Original dayAgo logic — unchanged
  const dayAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const daysLabel =
    dayAgo(job?.createdAt) === 0
      ? "Today"
      : `${dayAgo(job?.createdAt)}d ago`;

  const badges = [
    { icon: UsersIcon, label: `${job?.position} Position${job?.position > 1 ? "s" : ""}`, color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/20" },
    { icon: BriefcaseIcon, label: job?.jobType, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { icon: DollarSignIcon, label: `${job?.salary} LPA`, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  ];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="group relative flex flex-col bg-[#0d1424] border border-white/[0.07] hover:border-amber-500/30 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] transition-all duration-300 h-full"
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

      {/* ── Top row: date + bookmark ── */}
      <div className="flex items-center justify-between px-5 pt-4 pb-0">
        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <ClockIcon className="w-3 h-3" />
          {daysLabel}
        </span>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setSaved((v) => !v)}
          className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-200 ${
            saved
              ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
              : "bg-white/[0.04] border-white/[0.08] text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/20"
          }`}
          aria-label="Save job"
        >
          <BookmarkIcon className={`w-3.5 h-3.5 transition-all ${saved ? "fill-amber-400" : ""}`} />
        </motion.button>
      </div>

      {/* ── Company info ── */}
      <div className="px-5 pt-4 pb-0 flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] overflow-hidden shrink-0 flex items-center justify-center">
          <Avatar className="w-full h-full">
            <AvatarImage
              src={job?.company?.logo}
              alt={job?.company?.name}
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="bg-amber-500/20 text-amber-400 text-sm font-bold w-full h-full flex items-center justify-center">
              {job?.company?.name?.[0]?.toUpperCase() ?? "C"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="min-w-0">
          <h2 className="text-white font-semibold text-sm truncate leading-tight">
            {job?.company?.name}
          </h2>
          <span className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
            <MapPinIcon className="w-3 h-3 shrink-0" />
            India
          </span>
        </div>
      </div>

      {/* ── Job title + description ── */}
      <div className="px-5 pt-3 pb-0 flex-1">
        <h3 className="text-white font-bold text-base leading-snug mb-1.5 group-hover:text-amber-100 transition-colors duration-200">
          {job?.title}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* ── Badges ── */}
      <div className="px-5 pt-3 pb-0 flex flex-wrap gap-1.5">
        {badges.map(({ icon: Icon, label, color, bg }) =>
          label ? (
            <span
              key={label}
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${bg} ${color}`}
            >
              <Icon className="w-3 h-3" />
              {label}
            </span>
          ) : null
        )}
      </div>

      {/* ── Divider ── */}
      <div className="mx-5 mt-4 border-t border-white/[0.05]" />

      {/* ── Actions ── */}
      <div className="flex items-center gap-3 px-5 py-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/discription/${job?._id}`)}
          className="flex-1 h-9 text-xs font-semibold bg-transparent border-white/[0.1] text-slate-300 hover:text-white hover:bg-white/[0.07] hover:border-white/20 rounded-xl transition-all duration-200 group/btn"
        >
          View Details
          <ArrowRightIcon className="w-3.5 h-3.5 ml-1.5 opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-200" />
        </Button>
        <Button
          onClick={() => setSaved((v) => !v)}
          className={`flex-1 h-9 text-xs font-bold rounded-xl shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] ${
            saved
              ? "bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30 shadow-none"
              : "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 shadow-amber-500/20 hover:shadow-amber-500/35"
          }`}
        >
          {saved ? "✓ Saved" : "Save for Later"}
        </Button>
      </div>
    </motion.div>
  );
}

export default Job;