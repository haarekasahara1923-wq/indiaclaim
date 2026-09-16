"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShieldCheck,
  PhoneCall,
  Images,
  MessageSquare,
} from "lucide-react";

interface BottomNavProps {
  whatsappNumber?: string;
  phone?: string;
}

export default function BottomNav({
  whatsappNumber = "917566842783",
}: BottomNavProps) {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isServices = pathname.startsWith("/services");
  const isGallery = pathname.startsWith("/gallery");
  const isContact = pathname.startsWith("/contact");

  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi India Claim, I need help with an insurance claim issue."
  )}`;

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto items-center px-1">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 transition-all duration-200 ${
            isHome
              ? "text-blue-700 font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <div
            className={`p-1 rounded-full transition-all ${
              isHome ? "bg-blue-100/70 scale-110" : ""
            }`}
          >
            <Home className="w-5 h-5" strokeWidth={isHome ? 2.5 : 1.8} />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
        </Link>

        {/* 2. Services */}
        <Link
          href="/services"
          className={`flex flex-col items-center justify-center py-1 transition-all duration-200 ${
            isServices
              ? "text-blue-700 font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <div
            className={`p-1 rounded-full transition-all ${
              isServices ? "bg-blue-100/70 scale-110" : ""
            }`}
          >
            <ShieldCheck
              className="w-5 h-5"
              strokeWidth={isServices ? 2.5 : 1.8}
            />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Services</span>
        </Link>

        {/* 3. Center Action: Quick WhatsApp Claim Consultation */}
        <div className="flex flex-col items-center justify-center -mt-5">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instant WhatsApp Claim Consultation"
            className="w-13 h-13 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 border-3 border-white ring-2 ring-emerald-400/30 active:scale-95 transition-transform"
          >
            <MessageSquare className="w-6 h-6 fill-current" />
          </a>
          <span className="text-[10px] font-bold text-emerald-700 mt-1 tracking-tight">
            Claim Help
          </span>
        </div>

        {/* 4. Proofs / Gallery */}
        <Link
          href="/gallery"
          className={`flex flex-col items-center justify-center py-1 transition-all duration-200 ${
            isGallery
              ? "text-blue-700 font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <div
            className={`p-1 rounded-full transition-all ${
              isGallery ? "bg-blue-100/70 scale-110" : ""
            }`}
          >
            <Images className="w-5 h-5" strokeWidth={isGallery ? 2.5 : 1.8} />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Proofs</span>
        </Link>

        {/* 5. Contact */}
        <Link
          href="/contact"
          className={`flex flex-col items-center justify-center py-1 transition-all duration-200 ${
            isContact
              ? "text-blue-700 font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <div
            className={`p-1 rounded-full transition-all ${
              isContact ? "bg-blue-100/70 scale-110" : ""
            }`}
          >
            <PhoneCall
              className="w-5 h-5"
              strokeWidth={isContact ? 2.5 : 1.8}
            />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Contact</span>
        </Link>
      </div>
    </nav>
  );
}
