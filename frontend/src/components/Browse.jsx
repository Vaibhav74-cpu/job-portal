import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import Footer from "./shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchText } from "@/redux/jobSlice";
import { motion } from "framer-motion";
import {
  SearchIcon,
  BriefcaseIcon,
  SparklesIcon,
  SearchXIcon,
  XIcon,
} from "lucide-react";

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-[#0d1424] border border-white/[0.07] rounded-2xl p-5 animate-pulse">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-white/[0.06] shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-3.5 bg-white/[0.06] rounded-full w-3/4" />
          <div className="h-2.5 bg-white/[0.04] rounded-full w-1/2" />
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <div className="h-2.5 bg-white/[0.04] rounded-full w-full" />
        <div className="h-2.5 bg-white/[0.04] rounded-full w-5/6" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-white/[0.04] rounded-full" />
        <div className="h-6 w-20 bg-white/[0.04] rounded-full" />
        <div className="h-6 w-14 bg-white/[0.04] rounded-full" />
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-full flex flex-col items-center justify-center min-h-[400px] text-center px-6"
    >
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-amber-500/[0.08] border border-amber-500/20 flex items-center justify-center">
          <SearchXIcon className="w-10 h-10 text-amber-400/60" />
        </div>
        <motion.div
          className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <XIcon className="w-3.5 h-3.5 text-rose-400" />
        </motion.div>
      </div>
      <h3 className="text-white font-bold text-xl mb-2">No jobs found</h3>
      <p className="text-slate-400 text-sm max-w-xs leading-relaxed mb-6">
        We couldn't find any jobs matching your search. Try a different keyword
        or clear your search.
      </p>
      <button
        onClick={onClear}
        className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
      >
        <XIcon className="w-4 h-4" />
        Clear Search
      </button>
    </motion.div>
  );
}

// ── Container + card stagger variants ─────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Main component ────────────────────────────────────────────────────────────
function Browse() {
  // Original logic — unchanged
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs, searchText } = useSelector((store) => store.job);

  const handleClear = () => dispatch(setSearchText(""));

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex flex-col">
      <Navbar />

      {/* ── Page header ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_-20%,rgba(217,119,6,0.12),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Pill badge */}
            <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold tracking-widest uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-3">
              <SparklesIcon className="w-3 h-3" />
              Browse All Jobs
            </span>

            <h1 className="text-white font-extrabold text-3xl sm:text-4xl tracking-tight mb-2">
              {searchText ? (
                <>
                  Results for{" "}
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                    "{searchText}"
                  </span>
                </>
              ) : (
                <>
                  Explore{" "}
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                    All Opportunities
                  </span>
                </>
              )}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              {searchText
                ? `Showing ${allJobs.length} job${allJobs.length !== 1 ? "s" : ""} matching your search.`
                : "Discover verified roles from top companies across India."}
            </p>
          </motion.div>

          {/* Stats + active search tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mt-5"
          >
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <BriefcaseIcon className="w-4 h-4 text-amber-400" />
              <span>
                <span className="text-white font-semibold">{allJobs.length}</span>{" "}
                {searchText ? "results" : "jobs available"}
              </span>
            </div>

            {/* Active search chip */}
            {searchText && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="inline-flex items-center gap-2 text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full">
                  <SearchIcon className="w-3 h-3" />
                  {searchText}
                  <button
                    onClick={handleClear}
                    className="hover:text-white transition-colors ml-0.5"
                    aria-label="Clear search"
                  >
                    <XIcon className="w-3 h-3" />
                  </button>
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Job grid ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {allJobs.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Show skeletons while loading */}
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {allJobs.map((job) => (
              <motion.div key={job?._id} variants={cardVariants}>
                <Job job={job} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Browse;