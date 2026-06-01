import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  BriefcaseIcon,
  SearchXIcon,
  SlidersHorizontalIcon,
  XIcon,
  SparklesIcon,
  FilterIcon,
} from "lucide-react";
import Footer from "./shared/Footer";

// ── Skeleton card ────────────────────────────────────────────────────────────
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
function EmptyState({ searchText, onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full min-h-[420px] text-center px-6"
    >
      {/* Animated icon */}
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
        {searchText
          ? `We couldn't find any jobs matching "${searchText}". Try a different keyword or clear your filters.`
          : "No jobs are available right now. Try adjusting your filters."}
      </p>

      <button
        onClick={onClear}
        className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
      >
        <XIcon className="w-4 h-4" />
        Clear Filters
      </button>
    </motion.div>
  );
}

// ── Mobile Filter Drawer ──────────────────────────────────────────────────────
function MobileFilterDrawer({ open, onClose, jobCount }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 bottom-0 z-50 w-80 bg-[#0a0f1e] border-r border-white/[0.07] overflow-y-auto lg:hidden"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.07] sticky top-0 bg-[#0a0f1e] z-10">
              <span className="font-bold text-white flex items-center gap-2">
                <FilterIcon className="w-4 h-4 text-amber-400" />
                Filters
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-slate-400 hover:text-white"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <FilterCard jobCount={jobCount} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main Jobs page ────────────────────────────────────────────────────────────
function Jobs() {
  const { allJobs, searchText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Original filter logic — unchanged
  useEffect(() => {
    if (!searchText) {
      setFilterJobs(allJobs);
    } else {
      const filterdJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchText.toLowerCase()) ||
          job.description.toLowerCase().includes(searchText.toLowerCase()) ||
          job.location.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setFilterJobs(filterdJobs);
    }
  }, [allJobs, searchText]);

  // Simulated loading state (real data arrives via Redux)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClearFilters = () => {
    // Dispatching empty string clears the Redux search — FilterCard handles its own state
    // We trigger a re-render by simulating a no-op; actual clear is in FilterCard
    window.dispatchEvent(new CustomEvent("clearJobFilters"));
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Navbar />

      {/* ── Page header ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06] bg-[#0a0f1e]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_-20%,rgba(217,119,6,0.12),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold tracking-widest uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                <SparklesIcon className="w-3 h-3" />
                Live Opportunities
              </span>
            </div>
            <h1 className="text-white font-extrabold text-3xl sm:text-4xl tracking-tight mb-2">
              Find Your{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Perfect Opportunity
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Explore thousands of verified jobs from top companies. Your next
              career move is one click away.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 mt-5"
          >
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <BriefcaseIcon className="w-4 h-4 text-amber-400" />
              <span>
                <span className="text-white font-semibold">{allJobs.length}</span> total jobs
              </span>
            </div>
            {searchText && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-slate-400 text-sm"
              >
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span>
                  <span className="text-amber-400 font-semibold">{filterJobs.length}</span>{" "}
                  results for{" "}
                  <span className="text-white font-medium">"{searchText}"</span>
                </span>
              </motion.div>
            )}

            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="ml-auto lg:hidden flex items-center gap-2 text-sm font-medium text-slate-300 bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.09] px-3 py-2 rounded-xl transition-all"
            >
              <SlidersHorizontalIcon className="w-4 h-4 text-amber-400" />
              Filters
              {searchText && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-6 items-start">

          {/* ── Sidebar (desktop) ── */}
          <aside className="hidden lg:block w-[260px] shrink-0">
            <FilterCard jobCount={filterJobs.length} />
          </aside>

          {/* ── Job listings ── */}
          <main className="flex-1 min-w-0">
            {isLoading ? (
              // Skeleton grid
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filterJobs.length === 0 ? (
              <EmptyState searchText={searchText} onClear={handleClearFilters} />
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job._id}
                      variants={cardVariants}
                      layout
                      exit="exit"
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* ── Mobile filter drawer ── */}
      <MobileFilterDrawer
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        jobCount={filterJobs.length}
      />

      <Footer/>
    </div>
  );
}

export default Jobs;