"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Menu,
  X,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";

interface NavbarProps {
  phone?: string;
  whatsappNumber?: string;
  siteTitle?: string;
}

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Gallery & Proofs", href: "/gallery" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar({
  phone = "+91 75668 42783",
  whatsappNumber = "917566842783",
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const cleanPhone = phone.replace(/\s+/g, "");

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top emergency / contact strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline font-medium">
              Insurance Claim Expert with Legal Law Adviser
            </span>
            <span className="sm:hidden font-medium">Claim Expert & Legal Advice</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1.5 hover:text-white font-semibold transition"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{phone}</span>
            </a>
            <Link
              href="/admin/login"
              className="text-slate-400 hover:text-white transition text-[11px]"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition">
              <ShieldAlert className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 block leading-tight">
                India<span className="text-blue-700">Claim</span>
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                All in One Insurance Solution
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
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

          {/* Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "Hi India Claim, I need help with an insurance claim issue."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition hover:scale-105"
            >
              <span>Free Consultation</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <div className="grid gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-bold"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-sm"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Expert: {phone}</span>
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "Hi India Claim, I need help with an insurance claim issue."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm"
            >
              <span>WhatsApp Free Consultation</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
