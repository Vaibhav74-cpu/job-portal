import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import axios from "axios";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  BriefcaseIcon,
  DollarSignIcon,
  UsersIcon,
  CalendarIcon,
  StarIcon,
  CheckCircle2Icon,
  SendIcon,
  BuildingIcon,
  ClockIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function InfoRow({ icon: Icon, label, value, color = "text-slate-400" }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-white/[0.05] last:border-0">
      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0 mt-0.5">
        <Icon className={`w-3.5 h-3.5 ${color}`} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-sm text-slate-200 leading-relaxed">{value}</p>
      </div>
    </div>
  );
}

function JobDescription() {
  // ── Original logic — unchanged ──────────────────────────────────────────────
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;
  const navigate = useNavigate();

  const initiallyApplied = singleJob?.applications?.some(
    (application) => application.applicant === user?._id
  ) || false;

  const [isApplied, setIsApplied] = useState(initiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        console.log(res.data.message);
        setIsApplied(true);
        const updatedJobs = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedJobs));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log(res);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);
  // ── End original logic ───────────────────────────────────────────────────────

  const badges = [
    { icon: UsersIcon, label: `${singleJob?.position} Position${singleJob?.position > 1 ? "s" : ""}`, color: "text-sky-400", bg: "bg-sky-500/10 border-sky-500/20" },
    { icon: BriefcaseIcon, label: singleJob?.jobType, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { icon: DollarSignIcon, label: `${singleJob?.salary} LPA`, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <Navbar />

      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_-20%,rgba(217,119,6,0.12),transparent)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 relative z-10">

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-6 group transition-colors duration-200"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to Jobs
          </motion.button>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            {/* Left: company + title */}
            <motion.div
              variants={fadeUp} custom={0} initial="hidden" animate="visible"
              className="flex items-start gap-4"
            >
              {/* Company logo placeholder */}
              <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.09] flex items-center justify-center shrink-0 overflow-hidden">
                {singleJob?.company?.logo ? (
                  <img src={singleJob.company.logo} alt={singleJob?.company?.name} className="w-full h-full object-cover" />
                ) : (
                  <BuildingIcon className="w-6 h-6 text-amber-400/60" />
                )}
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">
                  {singleJob?.company?.name ?? "Company"}
                </p>
                <h1 className="text-white font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight">
                  {singleJob?.title}
                </h1>
                {/* Badges row */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {badges.map(({ icon: Icon, label, color, bg }) =>
                    label ? (
                      <span key={label} className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${bg} ${color}`}>
                        <Icon className="w-3 h-3" />
                        {label}
                      </span>
                    ) : null
                  )}
                </div>
              </div>
            </motion.div>

            {/* Right: Apply CTA */}
            <motion.div
              variants={fadeUp} custom={1} initial="hidden" animate="visible"
              className="shrink-0"
            >
              {isApplied ? (
                <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-semibold text-sm px-5 py-3 rounded-2xl">
                  <CheckCircle2Icon className="w-4 h-4" />
                  Already Applied
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={applyJobHandler}
                  className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-200"
                >
                  <SendIcon className="w-4 h-4" />
                  Apply Now
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Description column ── */}
          <motion.div
            variants={fadeUp} custom={2} initial="hidden" animate="visible"
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* About the role */}
            <div className="bg-[#0d1424] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                <StarIcon className="w-4 h-4 text-amber-400" />
                About the Role
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {singleJob?.description}
              </p>
            </div>

            {/* Requirements / details */}
            <div className="bg-[#0d1424] border border-white/[0.07] rounded-2xl p-6">
              <h2 className="text-white font-bold text-base mb-2 flex items-center gap-2">
                <BriefcaseIcon className="w-4 h-4 text-amber-400" />
                Job Details
              </h2>
              <div className="mt-2">
                <InfoRow icon={BriefcaseIcon} label="Role" value={singleJob?.title} color="text-amber-400" />
                <InfoRow icon={MapPinIcon} label="Location" value={singleJob?.location} color="text-sky-400" />
                <InfoRow icon={StarIcon} label="Description" value={singleJob?.description} color="text-violet-400" />
                <InfoRow icon={ClockIcon} label="Experience" value={singleJob?.experiencelevel ? `${singleJob.experiencelevel} years` : null} color="text-emerald-400" />
                <InfoRow icon={DollarSignIcon} label="Salary" value={singleJob?.salary ? `${singleJob.salary} LPA` : null} color="text-emerald-400" />
                <InfoRow icon={CalendarIcon} label="Posted Date" value={singleJob?.createdAt?.split("T")[0]} color="text-slate-400" />
              </div>
            </div>
          </motion.div>

          {/* ── Sidebar column ── */}
          <motion.div
            variants={fadeUp} custom={3} initial="hidden" animate="visible"
            className="flex flex-col gap-4"
          >
            {/* Quick stats card */}
            <div className="bg-[#0d1424] border border-white/[0.07] rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm mb-4">Quick Overview</h3>
              <div className="flex flex-col gap-3">
                {[
                  { icon: UsersIcon, label: "Open Positions", value: singleJob?.position, color: "text-sky-400", bg: "bg-sky-500/10" },
                  { icon: UsersIcon, label: "Total Applications", value: singleJob?.applications?.length, color: "text-violet-400", bg: "bg-violet-500/10" },
                  { icon: DollarSignIcon, label: "Salary Package", value: singleJob?.salary ? `${singleJob.salary} LPA` : "—", color: "text-emerald-400", bg: "bg-emerald-500/10" },
                  { icon: ClockIcon, label: "Experience", value: singleJob?.experiencelevel ? `${singleJob.experiencelevel} yrs` : "—", color: "text-amber-400", bg: "bg-amber-500/10" },
                ].map(({ icon: Icon, label, value, color, bg }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-3.5 h-3.5 ${color}`} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{label}</p>
                      <p className={`text-sm font-bold ${color}`}>{value ?? "—"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply CTA card (sticky on desktop) */}
            <div className="bg-gradient-to-br from-amber-500/[0.08] to-yellow-500/[0.04] border border-amber-500/20 rounded-2xl p-5 sticky top-24">
              <h3 className="text-white font-bold text-sm mb-1">Ready to apply?</h3>
              <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                Join {singleJob?.applications?.length ?? 0} other applicants who have already applied.
              </p>
              {isApplied ? (
                <div className="flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-semibold text-sm px-4 py-2.5 rounded-xl w-full">
                  <CheckCircle2Icon className="w-4 h-4" />
                  Application Submitted
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={applyJobHandler}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all duration-200"
                >
                  <SendIcon className="w-4 h-4" />
                  Apply Now
                </motion.button>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default JobDescription;