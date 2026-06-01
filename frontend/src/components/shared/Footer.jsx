


import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseIcon,
  LinkedinIcon,
  GithubIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  SendIcon,
  ArrowRightIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Browse Jobs" },
  { to: "/browse", label: "Companies" },
];

const resources = [
  { label: "Resume Tips", href: "#" },
  { label: "Interview Prep", href: "#" },
  { label: "Career Guidance", href: "#" },
  { label: "Salary Insights", href: "#" },
  { label: "FAQs", href: "#" },
];

const company = [
  { label: "About Us", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Sitemap", href: "#" },
];

const socials = [
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30" },
  { icon: GithubIcon, href: "https://github.com", label: "GitHub", color: "hover:text-slate-200 hover:bg-white/10 hover:border-white/20" },
  { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter", color: "hover:text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30" },
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook", color: "hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram", color: "hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/30" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FooterColumn({ title, children, custom }) {
  return (
    <motion.div variants={fadeUp} custom={custom} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
      <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-4">{title}</h4>
      {children}
    </motion.div>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("You're subscribed! 🎉");
    setEmail("");
  };

  return (
    <footer className="bg-[#080d19] border-t border-white/[0.06] relative overflow-hidden">
      {/* ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-48 bg-amber-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-40 bg-sky-500/5 blur-[80px] pointer-events-none" />

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column — 2/5 width on lg */}
          <motion.div
            className="lg:col-span-2"
            variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <BriefcaseIcon className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Job<span className="text-amber-400">Verse</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              India's #1 job platform connecting ambitious professionals with
              top-tier companies. Your next great opportunity starts here.
            </p>

            {/* Contact mini-list */}
            <ul className="flex flex-col gap-2 mb-6">
              <li className="flex items-center gap-2 text-xs text-slate-500">
                <MapPinIcon className="w-3.5 h-3.5 text-amber-400/60 shrink-0" />
                Bangalore, Karnataka, India
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-500">
                <MailIcon className="w-3.5 h-3.5 text-amber-400/60 shrink-0" />
                hello@jobVerse.in
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-500">
                <PhoneIcon className="w-3.5 h-3.5 text-amber-400/60 shrink-0" />
                +91 98765 43210
              </li>
            </ul>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-slate-500 transition-all duration-200 ${color}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <FooterColumn title="Quick Links" custom={1}>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200 group"
                  >
                    <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Resources */}
          <FooterColumn title="Resources" custom={2}>
            <ul className="flex flex-col gap-2.5">
              {resources.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200 group"
                  >
                    <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all duration-200" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Company */}
          <FooterColumn title="Company" custom={3}>
            <ul className="flex flex-col gap-2.5">
              {company.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200 group"
                  >
                    <ArrowRightIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all duration-200" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        {/* ── Newsletter ── */}
        <motion.div
          variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-amber-500/[0.08] to-sky-500/[0.06] border border-white/[0.06] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between"
        >
          <div>
            <h4 className="text-white font-bold text-lg">Stay ahead of the market</h4>
            <p className="text-slate-400 text-sm mt-1 max-w-sm">
              Get weekly job alerts, career tips, and hiring trends — straight to your inbox.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex items-center gap-2 w-full sm:w-auto shrink-0"
          >
            <div className="flex items-center flex-1 sm:w-64 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3 gap-2 focus-within:border-amber-500/40 transition-colors">
              <MailIcon className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent outline-none border-none text-sm text-white placeholder:text-slate-500 py-2.5"
              />
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 font-bold rounded-xl px-4 h-[42px] shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0"
            >
              <SendIcon className="w-4 h-4" />
              <span className="hidden sm:inline ml-1.5">Subscribe</span>
            </Button>
          </form>
        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500"
        >
          <p>© {currentYear} JobVerse. All rights reserved.</p>
          <p>
            Designed &amp; built with ❤️ by the{" "}
            <span className="text-amber-400/80 font-medium">JobVerse Team</span>
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookies</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;