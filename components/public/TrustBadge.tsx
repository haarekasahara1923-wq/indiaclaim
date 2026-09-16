import React from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

interface TrustBadgeProps {
  className?: string;
  showCta?: boolean;
}

export default function TrustBadge({
  className = "",
  showCta = true,
}: TrustBadgeProps) {
  return (
    <div
      className={`bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white shadow-lg ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full shrink-0">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="bg-white text-amber-800 text-xs font-black uppercase px-2 py-0.5 rounded tracking-wider shadow-sm">
                  विशेष गारंटी
                </span>
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white drop-shadow-sm">
                  No Win — No Fee Commitment
                </span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-amber-50 mt-0.5">
                <span className="font-bold text-white">
                  &ldquo;जब आपका पैसा आपके खाते में आ जाता है, उसके बाद ही हम फीस लेते हैं।&rdquo;
                </span>{" "}
                (Zero Upfront Consultation Fee)
              </p>
            </div>
          </div>

          {showCta && (
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-white text-slate-900 hover:bg-slate-100 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow transition-all hover:scale-105 shrink-0"
            >
              <span>Get Free Advice</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
