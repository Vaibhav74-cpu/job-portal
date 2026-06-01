import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchText } from "@/redux/jobSlice";
import { motion } from "framer-motion";
import {
  LayoutDashboardIcon,
  MonitorSmartphoneIcon,
  ServerIcon,
  CodeIcon,
  SmartphoneIcon,
  BrainCircuitIcon,
  PenToolIcon,
  CloudIcon,
} from "lucide-react";

const categories = [
  {
    label: "Fullstack Developer",
    icon: LayoutDashboardIcon,
    openings: "1,240+",
    accent: "from-amber-500/20 to-yellow-500/10",
    border: "hover:border-amber-500/50",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
  },
  {
    label: "Frontend Developer",
    icon: MonitorSmartphoneIcon,
    openings: "980+",
    accent: "from-sky-500/20 to-cyan-500/10",
    border: "hover:border-sky-500/50",
    iconColor: "text-sky-400",
    iconBg: "bg-sky-500/10",
  },
  {
    label: "Backend Developer",
    icon: ServerIcon,
    openings: "1,100+",
    accent: "from-violet-500/20 to-purple-500/10",
    border: "hover:border-violet-500/50",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10",
  },
  {
    label: "Python Developer",
    icon: CodeIcon,
    openings: "860+",
    accent: "from-emerald-500/20 to-green-500/10",
    border: "hover:border-emerald-500/50",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
  {
    label: "Flutter Developer",
    icon: SmartphoneIcon,
    openings: "520+",
    accent: "from-rose-500/20 to-pink-500/10",
    border: "hover:border-rose-500/50",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10",
  },
  {
    label: "AI / ML Engineer",
    icon: BrainCircuitIcon,
    openings: "740+",
    accent: "from-orange-500/20 to-amber-500/10",
    border: "hover:border-orange-500/50",
    iconColor: "text-orange-400",
    iconBg: "bg-orange-500/10",
  },
  {
    label: "UI/UX Designer",
    icon: PenToolIcon,
    openings: "430+",
    accent: "from-fuchsia-500/20 to-pink-500/10",
    border: "hover:border-fuchsia-500/50",
    iconColor: "text-fuchsia-400",
    iconBg: "bg-fuchsia-500/10",
  },
  {
    label: "Cloud Engineer",
    icon: CloudIcon,
    openings: "650+",
    accent: "from-teal-500/20 to-cyan-500/10",
    border: "hover:border-teal-500/50",
    iconColor: "text-teal-400",
    iconBg: "bg-teal-500/10",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function CategoryCarousel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchHandler = (text) => {
    dispatch(setSearchText(text));
    navigate("/browse");
  };

  return (
    <section className="bg-[#0a0f1e] py-20 px-4">
      {/* ── Section header ── */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="inline-block text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Explore by Role
        </span>
        <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight">
          Browse Top{" "}
          <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
            Job Categories
          </span>
        </h2>
        <p className="text-slate-400 mt-3 max-w-md mx-auto text-sm leading-relaxed">
          Thousands of curated openings across the most in-demand tech roles.
          Click any category to start exploring.
        </p>
      </motion.div>

      {/* ── Carousel ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <Carousel
          className="w-full max-w-5xl mx-auto"
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent className="-ml-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <CarouselItem
                  key={cat.label}
                  className="pl-3 basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <motion.div variants={cardVariant}>
                    <motion.button
                      onClick={() => searchHandler(cat.label)}
                      className={`
                        group w-full text-left
                        relative overflow-hidden
                        bg-white/[0.04] backdrop-blur-sm
                        border border-white/[0.08] ${cat.border}
                        rounded-2xl p-5
                        transition-all duration-300
                        hover:bg-white/[0.08] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
                      `}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    >
                      {/* gradient shine on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${cat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                      />

                      <div className="relative z-10 flex flex-col gap-4">
                        {/* icon */}
                        <div
                          className={`${cat.iconBg} ${cat.iconColor} w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* text */}
                        <div>
                          <p className="text-white font-semibold text-sm leading-snug group-hover:text-white transition-colors">
                            {cat.label}
                          </p>
                          <p className={`${cat.iconColor} text-xs font-medium mt-1 opacity-80`}>
                            {cat.openings} openings
                          </p>
                        </div>

                        {/* arrow hint */}
                        <div className={`${cat.iconColor} text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0`}>
                          Explore →
                        </div>
                      </div>
                    </motion.button>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* custom nav buttons */}
          <CarouselPrevious className="hidden sm:flex -left-5 bg-white/5 border-white/10 text-white hover:bg-amber-500/20 hover:border-amber-500/40 hover:text-amber-400 transition-all duration-200" />
          <CarouselNext className="hidden sm:flex -right-5 bg-white/5 border-white/10 text-white hover:bg-amber-500/20 hover:border-amber-500/40 hover:text-amber-400 transition-all duration-200" />
        </Carousel>
      </motion.div>

      {/* ── Bottom CTA ── */}
      <motion.div
        className="text-center mt-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <button
          onClick={() => { dispatch(setSearchText("")); navigate("/browse"); }}
          className="text-slate-400 hover:text-amber-400 text-sm font-medium transition-colors duration-200 border-b border-dashed border-slate-600 hover:border-amber-500 pb-0.5"
        >
          View all job categories →
        </button>
      </motion.div>
    </section>
  );
}

export default CategoryCarousel;