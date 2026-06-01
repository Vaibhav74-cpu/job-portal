import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setSearchText } from "@/redux/jobSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontalIcon,
  MapPinIcon,
  Building2Icon,
  DollarSignIcon,
  XIcon,
  ChevronDownIcon,
  SearchIcon,
} from "lucide-react";

const FilterData = [
  {
    filterType: "Location",
    icon: MapPinIcon,
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    activeBg: "bg-sky-500/15",
    activeBorder: "border-sky-500/60",
    array: ["Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai"],
  },
  {
    filterType: "Industry",
    icon: Building2Icon,
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    activeBg: "bg-violet-500/15",
    activeBorder: "border-violet-500/60",
    array: [
      "Software Development",
      "Healthcare",
      "Finance",
      "Education",
      "Marketing",
    ],
  },
  {
    filterType: "Salary",
    icon: DollarSignIcon,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    activeBg: "bg-amber-500/15",
    activeBorder: "border-amber-500/60",
    array: [
      "0 - 3 LPA",
      "3 - 6 LPA",
      "6 - 10 LPA",
      "10 - 15 LPA",
      "15 - 20 LPA",
    ],
  },
];

function FilterSection({ data, selectedValue, onSelect }) {
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const Icon = data.icon;

  const filtered = data.array.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="border-b border-white/[0.06] last:border-0">
      {/* Section header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-5 py-4 group"
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg ${data.bgColor} flex items-center justify-center`}>
            <Icon className={`w-3.5 h-3.5 ${data.color}`} />
          </div>
          <span className="text-sm font-semibold text-white">{data.filterType}</span>
          {/* Active badge */}
          {data.array.includes(selectedValue) && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${data.bgColor} ${data.color}`}>
              1
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: open ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDownIcon className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 flex flex-col gap-2">
              {/* Mini search inside section */}
              {data.array.length > 4 && (
                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-lg px-2.5 py-1.5 mb-1">
                  <SearchIcon className="w-3 h-3 text-slate-500 shrink-0" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={`Search ${data.filterType.toLowerCase()}…`}
                    className="bg-transparent outline-none border-none text-xs text-white placeholder:text-slate-600 w-full"
                  />
                </div>
              )}

              {/* Radio items as cards */}
              <RadioGroup value={selectedValue} onValueChange={onSelect}>
                {filtered.map((item, idx) => {
                  const itemId = `filter-${data.filterType}-${idx}`;
                  const isSelected = selectedValue === item;
                  return (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <label
                        htmlFor={itemId}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? `${data.activeBg} ${data.activeBorder}`
                            : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12]"
                        }`}
                      >
                        <RadioGroupItem
                          value={item}
                          id={itemId}
                          className="hidden"
                        />
                        {/* Custom radio dot */}
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                            isSelected
                              ? `${data.color} border-current`
                              : "border-white/20"
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`w-2 h-2 rounded-full ${data.color.replace("text-", "bg-")}`}
                            />
                          )}
                        </div>
                        <span
                          className={`text-xs font-medium transition-colors duration-200 ${
                            isSelected ? "text-white" : "text-slate-400"
                          }`}
                        >
                          {item}
                        </span>
                      </label>
                    </motion.div>
                  );
                })}
              </RadioGroup>

              {filtered.length === 0 && (
                <p className="text-xs text-slate-600 text-center py-2">No matches</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterCard({ jobCount }) {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");

  const changeHandler = (value) => {
    // Toggle off if clicking the already-selected value
    const next = value === selectedValue ? "" : value;
    setSelectedValue(next);
  };

  const clearFilters = () => setSelectedValue("");

  useEffect(() => {
    dispatch(setSearchText(selectedValue));
  }, [selectedValue]);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-[#0d1424] border border-white/[0.07] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.4)] sticky top-20"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07] bg-gradient-to-r from-white/[0.03] to-transparent">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <SlidersHorizontalIcon className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Filters</h2>
            {jobCount !== undefined && (
              <p className="text-[10px] text-slate-500">{jobCount} jobs found</p>
            )}
          </div>
        </div>

        {selectedValue && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 px-2.5 py-1.5 rounded-lg transition-all duration-200"
          >
            <XIcon className="w-3 h-3" />
            Clear
          </motion.button>
        )}
      </div>

      {/* Active filter badge */}
      <AnimatePresence>
        {selectedValue && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-3 bg-amber-500/[0.05] border-b border-amber-500/10">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1.5 font-semibold">Active filter</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full font-medium truncate max-w-[140px]">
                  {selectedValue}
                </span>
                <button
                  onClick={clearFilters}
                  className="text-slate-500 hover:text-rose-400 transition-colors ml-auto shrink-0"
                >
                  <XIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter sections */}
      <div>
        {FilterData.map((data) => (
          <FilterSection
            key={data.filterType}
            data={data}
            selectedValue={selectedValue}
            onSelect={changeHandler}
          />
        ))}
      </div>
    </motion.aside>
  );
}

export default FilterCard;