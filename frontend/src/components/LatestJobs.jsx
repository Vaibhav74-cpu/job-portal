import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BriefcaseIcon, ArrowRightIcon, SparklesIcon } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function LatestJobs() {
  const navigate = useNavigate();
  const { allJobs } = useSelector((store) => store.job); // original — unchanged

  return (
    <section className="bg-[#0a0f1e] py-20 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-64 bg-amber-500/[0.06] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-48 bg-sky-500/[0.05] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold tracking-widest uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-3">
              <SparklesIcon className="w-3 h-3" />
              Fresh Opportunities
            </span>
            <h2 className="text-white font-extrabold text-3xl sm:text-4xl tracking-tight">
              Latest &{" "}
              <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Top Openings
              </span>
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-md">
              Handpicked opportunities from the most in-demand companies — updated daily.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/jobs")}
            className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 px-4 py-2.5 rounded-xl transition-all duration-200 shrink-0 group"
          >
            <BriefcaseIcon className="w-4 h-4 text-amber-400" />
            View All Jobs
            <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </motion.button>
        </motion.div>

        {/* ── Job cards grid ── */}
        {allJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <BriefcaseIcon className="w-7 h-7 text-amber-400/60" />
            </div>
            <p className="text-slate-400 text-sm">No jobs available right now. Check back soon.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {allJobs.slice(0, 6).map((job) => (
              <motion.div key={job._id} variants={cardVariants}>
                <LatestJobCards job={job} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── Bottom CTA ── */}
        {allJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mt-10"
          >
            <button
              onClick={() => navigate("/jobs")}
              className="text-slate-400 hover:text-amber-400 text-sm font-medium transition-colors duration-200 border-b border-dashed border-slate-600 hover:border-amber-500 pb-0.5"
            >
              Explore all {allJobs.length} jobs →
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default LatestJobs;