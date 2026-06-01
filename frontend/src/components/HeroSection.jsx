import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  SearchIcon,
  BriefcaseIcon,
  BuildingIcon,
  UsersIcon,
  SparklesIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

const stats = [
  {
    icon: BriefcaseIcon,
    value: "10,000+",
    label: "Live Jobs",
    color: "text-amber-400",
  },
  {
    icon: BuildingIcon,
    value: "5,000+",
    label: "Companies",
    color: "text-sky-400",
  },
  {
    icon: UsersIcon,
    value: "25,000+",
    label: "Candidates",
    color: "text-emerald-400",
  },
];

const floatingBadges = [
  { text: "React Developer", top: "18%", left: "6%", delay: 0.8 },
  { text: "Remote · Full-time", top: "65%", left: "3%", delay: 1.1 },
  { text: "₹24 LPA avg", top: "40%", right: "4%", delay: 1.3 },
  { text: "New · 142 Openings", top: "75%", right: "6%", delay: 1.0 },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

function HeroSection() {
  useGetAllJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [text, searchText] = useState("");

  const searchHandler = () => {
    dispatch(setSearchText(text));
    navigate("/browse");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchHandler();
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0a0f1e]">
      {/* ── Layered background ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(217,119,6,0.18),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_80%_60%,rgba(14,165,233,0.08),transparent)]" />

      {/* subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Floating ambient blobs ── */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-amber-500/10 blur-[90px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-sky-500/8 blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* ── Floating context badges (desktop only) ── */}
      {floatingBadges.map((b, i) => (
        <motion.div
          key={i}
          className="hidden xl:flex absolute items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-white/70 text-xs font-medium px-3 py-2 rounded-full shadow-lg"
          style={{ top: b.top, left: b.left, right: b.right }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: b.delay, duration: 0.6 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          {b.text}
        </motion.div>
      ))}

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* pill badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
            <SparklesIcon className="w-3.5 h-3.5" />
            India's #1 Job Hunt Platform
          </span>
        </motion.div>

        {/* heading */}
        <motion.h1
          variants={fadeUp}
          className="font-extrabold text-white leading-[1.1] tracking-tight mb-4"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}
        >
          Find Your Next{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">
              Dream Career
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </span>
          <br />
          Opportunity
        </motion.h1>

        {/* sub-text */}
        <motion.p
          variants={fadeUp}
          className="text-slate-400 text-lg max-w-xl mb-8 leading-relaxed"
        >
          Connect with top companies, discover thousands of curated roles, and
          take the next step in your professional journey — all in one place.
        </motion.p>

        {/* ── Search bar ── */}
        <motion.div variants={fadeUp} className="w-full max-w-2xl mb-12">
          <div className="flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-2 shadow-[0_8px_40px_rgba(0,0,0,0.4)] hover:border-amber-500/30 transition-colors duration-300 focus-within:border-amber-500/50 focus-within:shadow-[0_8px_40px_rgba(217,119,6,0.15)]">
            <SearchIcon className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              name="text"
              value={text}
              placeholder="Job title, skill, or company…"
              className="flex-1 bg-transparent outline-none border-none text-white placeholder:text-slate-500 text-base px-3 py-2"
              onChange={(e) => searchText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-amber-500/25 transition-all duration-200 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98]"
              onClick={searchHandler}
            >
              Search Jobs
            </Button>
          </div>

          {/* popular searches */}
          <motion.div
            variants={fadeIn}
            className="flex flex-wrap items-center justify-center gap-2 mt-3"
          >
            <span className="text-slate-500 text-xs">Popular:</span>
            {[
              "UI/UX Designer",
              "Data Analyst",
              "Node.js",
              "Product Manager",
            ].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  searchText(tag);
                  dispatch(setSearchText(tag));
                  navigate("/browse");
                }}
                className="text-xs text-slate-400 hover:text-amber-400 border border-white/10 hover:border-amber-500/40 px-2.5 py-1 rounded-full transition-colors duration-200"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-3 gap-4 w-full max-w-2xl"
        >
          {stats.map(({ icon: Icon, value, label, color }, i) => (
            <motion.div
              key={label}
              className="flex flex-col items-center gap-1.5 bg-white/[0.04] backdrop-blur-sm border border-white/[0.07] rounded-2xl py-5 px-3 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 cursor-default"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`${color} bg-white/5 p-2 rounded-xl`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`font-bold text-xl ${color}`}>{value}</span>
              <span className="text-slate-400 text-xs font-medium tracking-wide uppercase">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
