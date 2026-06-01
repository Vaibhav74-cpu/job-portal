// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@radix-ui/react-popover";
// import React from "react";
// import { Button } from "../ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import { LogOutIcon, User2Icon } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "sonner";
// import axios from "axios";
// import { USER_API_ENDPOINT } from "@/utils/constant";
// import { setUser } from "@/redux/authSlice";
// // import { store } from "@/redux/store";

// function Navbar() {
//   // const user = false;
//   const { user } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();
//   const naviagate = useNavigate();

//   const logoutHandler = async (e) => {
//     try {
//       const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(null));
//         naviagate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//       console.log(error);
//     }
//   };
//   return (
//     <div className="bg-white">
//       <div className="flex items-center justify-between mx-auto max-w-7xl ">
//         <div>
//           {" "}
//           <h1 className="text-2xl font-bold">
//             Job<span className="text-[#f83002]">Hunt</span>
//           </h1>
//         </div>
//         <div>
//           <div className="flex gap-5">
//             <ul className="flex items-center gap-5 font-medium ">
//               {user && user.role === "student" ? (
//                 <>
//                   <li>
//                     <Link to="/"> Home</Link>
//                   </li>
//                   <li>
//                     <Link to="/jobs">Jobs</Link>
//                   </li>
//                   <li>
//                     <Link to="/browse">Browse</Link>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li>
//                     <Link to="/admin/companies">Companies</Link>{" "}
//                   </li>
//                   <li>
//                     <Link to="/admin/jobs">Jobs</Link>{" "}
//                   </li>
//                 </>
//               )}
//             </ul>
//             {!user ? (
//               <div className="flex gap-3">
//                 <Button variant="outline" className="">
//                   <Link to="/login">Login</Link>
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="bg-yellow-600 hover:bg-yellow-800"
//                 >
//                   <Link to="/signup">SignUp</Link>
//                 </Button>
//               </div>
//             ) : (
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Avatar className="h-10 w-10 cursor-pointer rounded-full border">
//                     <AvatarImage
//                       src={user?.profile?.profilePhoto}
//                       alt="@shadcn"
//                       className="rounded-full h-10 w-10"
//                     />
//                     <AvatarFallback>VB</AvatarFallback>
//                   </Avatar>
//                 </PopoverTrigger>
//                 <PopoverContent
//                   align="end"
//                   className="w-64 rounded-xl shadow-md p-4"
//                 >
//                   <div className="flex items-center gap-3 pb-3 border-b">
//                     <Avatar className="h-11 w-11 rounded-full border">
//                       <AvatarImage
//                         src={user?.profile?.profilePhoto}
//                         alt="@shadcn"
//                       />
//                     </Avatar>

//                     <div>
//                       <h3 className="font-semibold">{user?.fullname}</h3>
//                       <p className="text-sm text-gray-500">
//                         {user?.profile?.bio}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex gap-3 text-gray-400">
//                     {user && user.role === "student" && (
//                       <>
//                         <Button variant="link" className="gap-2">
//                           <User2Icon /> <Link to="/profile">View Profile</Link>
//                         </Button>
//                       </>
//                     )}

//                     <div className="flex w-fit items-center gap-2 cursor-pointer">
//                       {" "}
//                       <Button
//                         variant="link"
//                         className="h-4 m-3"
//                         onClick={logoutHandler}
//                       >
//                         <LogOutIcon /> Logout
//                       </Button>
//                     </div>
//                   </div>
//                 </PopoverContent>
//               </Popover>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LogOutIcon,
  User2Icon,
  BriefcaseIcon,
  BellIcon,
  MenuIcon,
  XIcon,
  BuildingIcon,
  HomeIcon,
  SearchIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const studentLinks = [
  { to: "/", label: "Home", icon: HomeIcon },
  { to: "/jobs", label: "Jobs", icon: BriefcaseIcon },
  { to: "/browse", label: "Browse", icon: SearchIcon },
];

const recruiterLinks = [
  { to: "/admin/companies", label: "Companies", icon: BuildingIcon },
  { to: "/admin/jobs", label: "Jobs", icon: BriefcaseIcon },
];

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const navLinks = user?.role === "recruiter" ? recruiterLinks : studentLinks;

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0f1e]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/[0.06]"
            : "bg-[#0a0f1e]/70 backdrop-blur-md border-b border-white/[0.04]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          {/* ── Brand ── */}
          <Link to="/" className="flex flex-col leading-none shrink-0 group">
            <span className="text-xl font-extrabold tracking-tight text-white">
              Job<span className="text-amber-400">Verse</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase hidden sm:block group-hover:text-amber-500/70 transition-colors">
             Connecting Talent With Opportunity
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive(to)
                    ? "text-amber-400"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
                {isActive(to) && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-amber-500/10 border border-amber-500/20 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link to="/login" className="hidden sm:block">
                  <Button
                    variant="ghost"
                    className="text-slate-300 hover:text-white hover:bg-white/[0.07] border border-white/10 hover:border-white/20 rounded-xl text-sm h-9 px-4 transition-all duration-200"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-bold rounded-xl text-sm h-9 px-4 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {/* Bell */}
                <button className="hidden sm:flex w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200 relative">
                  <BellIcon className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full" />
                </button>

                {/* Profile Popover */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-2 py-1.5 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 group">
                      <Avatar className="h-7 w-7 rounded-lg overflow-hidden shrink-0">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt={user?.fullname}
                          className="h-7 w-7 object-cover"
                        />
                        <AvatarFallback className="bg-amber-500/20 text-amber-400 text-xs font-bold rounded-lg">
                          {user?.fullname?.[0]?.toUpperCase() ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:block text-sm text-slate-300 font-medium max-w-[96px] truncate group-hover:text-white transition-colors">
                        {user?.fullname?.split(" ")[0]}
                      </span>
                      <ChevronRightIcon className="w-3 h-3 text-slate-500 hidden sm:block rotate-90" />
                    </button>
                  </PopoverTrigger>

                  <PopoverContent
                    align="end"
                    sideOffset={8}
                    className="w-64 bg-[#111827] border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-0 overflow-hidden"
                  >
                    {/* User info header */}
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-white/[0.05] to-transparent border-b border-white/[0.07]">
                      <Avatar className="h-11 w-11 rounded-xl overflow-hidden shrink-0">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt={user?.fullname}
                          className="h-11 w-11 object-cover"
                        />
                        <AvatarFallback className="bg-amber-500/20 text-amber-400 font-bold text-base rounded-xl">
                          {user?.fullname?.[0]?.toUpperCase() ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{user?.fullname}</p>
                        <p className="text-slate-400 text-xs truncate mt-0.5">{user?.email}</p>
                        {user?.profile?.bio && (
                          <p className="text-slate-500 text-xs truncate mt-0.5">{user?.profile?.bio}</p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-2">
                      {user?.role === "student" && (
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.07] text-sm font-medium transition-all duration-200 group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/20 transition-colors">
                            <User2Icon className="w-3.5 h-3.5 text-sky-400" />
                          </div>
                          View Profile
                        </Link>
                      )}

                      <button
                        onClick={logoutHandler}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-300 hover:text-rose-400 hover:bg-rose-500/[0.08] text-sm font-medium transition-all duration-200 group mt-1"
                      >
                        <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors">
                          <LogOutIcon className="w-3.5 h-3.5 text-rose-400" />
                        </div>
                        Logout
                      </button>
                    </div>

                    {/* Role badge */}
                    <div className="px-4 pb-3 pt-1">
                      <span className="inline-flex items-center text-[10px] font-semibold tracking-widest uppercase text-amber-400/70 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                        {user?.role}
                      </span>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <XIcon className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0d1424] border-l border-white/[0.07] flex flex-col md:hidden shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/[0.07]">
                <span className="text-lg font-extrabold text-white">
                  Job<span className="text-amber-400">Hunt</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
                {navLinks.map(({ to, label, icon: Icon }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1 }}
                  >
                    <Link
                      to={to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive(to)
                          ? "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Drawer footer */}
              <div className="p-4 border-t border-white/[0.07]">
                {!user ? (
                  <div className="flex flex-col gap-2">
                    <Link to="/login">
                      <Button
                        variant="outline"
                        className="w-full bg-transparent border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.07] rounded-xl"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-bold rounded-xl hover:from-amber-400 hover:to-yellow-400">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {user?.role === "student" && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.05] text-sm font-medium transition-all"
                      >
                        <User2Icon className="w-4 h-4 text-sky-400" />
                        View Profile
                      </Link>
                    )}
                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:text-rose-400 hover:bg-rose-500/[0.08] text-sm font-medium transition-all"
                    >
                      <LogOutIcon className="w-4 h-4 text-rose-400" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Spacer so page content isn't hidden under fixed navbar */}
      <div className="h-16" />
    </>
  );
}

export default Navbar;