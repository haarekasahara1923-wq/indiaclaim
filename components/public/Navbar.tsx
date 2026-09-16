"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Menu,
  X,
  ShieldAlert,
  ChevronRight,
  Home,
  Briefcase,
  Layers,
  Users,
  Images,
  Star,
  MessageSquare,
  Lock,
  MapPin,
} from "lucide-react";

interface NavbarProps {
  phone?: string;
  whatsappNumber?: string;
  siteTitle?: string;
}

const DESKTOP_NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Gallery & Proofs", href: "/gallery" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

const DRAWER_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Core Services", href: "/services", icon: Briefcase },
  { name: "Insurance Verticals", href: "/services#categories", icon: Layers },
  { name: "About Us & Founder", href: "/about", icon: Users },
  { name: "Settlement Proofs", href: "/gallery", icon: Images },
  { name: "Client Testimonials", href: "/testimonials", icon: Star },
  { name: "Contact & Consultation", href: "/contact", icon: Phone },
];

export default function Navbar({
  phone = "+91 75668 42783",
  whatsappNumber = "917566842783",
}: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const cleanPhone = phone.replace(/\s+/g, "");
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi India Claim, I need help with an insurance claim issue."
  )}`;

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        {/* Desktop Emergency & Contact strip */}
        <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 hidden sm:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium">
                Insurance Claim Expert with Legal Law Adviser — No Win No Fee
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-1.5 hover:text-white font-semibold transition"
              >
                <Phone className="w-3 h-3 text-amber-400" />
                <span>{phone}</span>
              </a>
              <Link
                href="/admin/login"
                className="text-slate-400 hover:text-white transition text-[11px] flex items-center gap-1"
              >
                <Lock className="w-2.5 h-2.5" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main App Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Left: Mobile Hamburger Button & Logo */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6 text-slate-800" />
              </button>

              {/* Brand Logo */}
              <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition">
                  <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                </div>
                <div>
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 block leading-tight">
                    India<span className="text-blue-700">Claim</span>
                  </span>
                  <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 block leading-none sm:mt-0.5">
                    Insurance &amp; Legal Expert
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {DESKTOP_NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? "text-blue-700 bg-blue-50"
                        : "text-slate-700 hover:text-blue-700 hover:bg-slate-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Call & WhatsApp on mobile + Consultation CTA on desktop */}
            <div className="flex items-center gap-2">
              {/* Mobile quick call icon */}
              <a
                href={`tel:${cleanPhone}`}
                aria-label="Call Claim Expert"
                className="lg:hidden p-2 rounded-xl bg-blue-50 text-blue-700 active:scale-95 transition flex items-center justify-center"
              >
                <Phone className="w-5 h-5 text-blue-700" />
              </a>

              {/* Mobile quick WhatsApp icon */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="lg:hidden p-2 rounded-xl bg-emerald-50 text-emerald-600 active:scale-95 transition flex items-center justify-center"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
              </a>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Free Consultation</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Android-Style Material Navigation Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Overlay */}
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
          />

          {/* Slide-out Drawer Panel */}
          <div className="relative w-[85vw] max-w-xs h-full bg-white z-50 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Drawer Header with Brand Profile Card */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-5 relative">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 active:scale-95 transition"
                aria-label="Close navigation drawer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-white shadow-inner">
                  <ShieldAlert className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight leading-tight">
                    India<span className="text-blue-400">Claim</span>
                  </h2>
                  <span className="text-[10px] font-semibold text-emerald-300 flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Claim Advisory
                  </span>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-2.5 text-xs text-slate-200 border border-white/10">
                <p className="font-semibold text-amber-300">विशेष गारंटी: No Win No Fee</p>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Claim account me aane ke baad hi fee charge hoti hai.
                </p>
              </div>
            </div>

            {/* Drawer Navigation List */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1 block">
                Menu
              </span>

              {DRAWER_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-bold"
                        : "text-slate-700 hover:bg-slate-100/70 active:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}

              {/* Quick Action Contact Cards */}
              <div className="pt-4 border-t border-slate-100 mt-3 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 block">
                  Quick Actions
                </span>

                <a
                  href={`tel:${cleanPhone}`}
                  className="flex items-center justify-center gap-2.5 w-full bg-slate-900 active:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-sm transition"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call: {phone}</span>
                </a>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full bg-emerald-600 active:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-sm transition"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Location Snippet */}
              <div className="pt-3 px-3">
                <div className="flex items-start gap-2 text-slate-500 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>101, Mahipat Plaza, Thatipur, Gwalior – 474011</span>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <span>© India Claim 2024</span>
              <Link
                href="/admin/login"
                onClick={() => setDrawerOpen(false)}
                className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
