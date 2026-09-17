import React from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ArrowRight,
  CheckCircle,
  Scale,
} from "lucide-react";

interface HeroSectionProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaLink?: string;
  stats?: Array<{ label: string; value: string }>;
  whatsappNumber?: string;
}

export default function HeroSection({
  headline = "India Claim — All in One Insurance Solution Platform",
  subheadline = "Insurance & Claim Expert with Legal Law Adviser. We fight for your rightful insurance claim money across Term, Health, Life, Motor, and Travel insurance — No Win, No Fee.",
  ctaText = "Free Claim Consultation",
  ctaLink = "/contact",
  stats = [
    { label: "Claims Settled", value: "500+" },
    { label: "Claim Recovery Rate", value: "98%" },
    { label: "Years Experience", value: "10+" },
    { label: "Happy Clients", value: "1,200+" },
  ],
  whatsappNumber = "917566842783",
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 bg-blue-800/60 border border-blue-600/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-200 shadow-inner">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Insurance &amp; Claim Expert with Legal Law Adviser</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {subheadline}
            </p>

            {/* Guarantee Highlight */}
            <div className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border-l-4 border-amber-400 p-4 rounded-r-xl text-left">
              <p className="text-xs sm:text-sm font-semibold text-amber-300">
                विशेष गारंटी (Our Trust Commitment):
              </p>
              <p className="text-sm font-medium text-white mt-0.5">
                &ldquo;जब आपका पैसा आपके खाते में आ जाता है, उसके बाद ही हम फीस लेते हैं।&rdquo;
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Zero upfront charges. You pay only after successful claim settlement into your bank account.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href={ctaLink}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  "Hi India Claim, I need urgent assistance with my rejected/delayed insurance claim."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Trust bullet checkmarks */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>IRDAI Legal Support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>All India Services</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Solutions Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-blue-950 backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-amber-400">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      How Can We Help You?
                    </h3>
                    <p className="text-xs text-slate-400">
                      Founder: Devesh Sharma
                    </p>
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Open Now
                </span>
              </div>

              {/* Problem solutions list */}
              <div className="mt-5 space-y-3">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Insurance Claim Rejection
                    </h4>
                    <p className="text-xs text-slate-400">
                      Wrongly rejected by insurer? We re-open and dispute the rejection.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Mis-Selling &amp; Fraud Policies
                    </h4>
                    <p className="text-xs text-slate-400">
                      Sold fraudulent policy with false promises? We claim your full refund.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Unreasonable Delays in Settlement
                    </h4>
                    <p className="text-xs text-slate-400">
                      Weeks or months without updates? We expedite with legal escalations.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Claim Short Settled / Deductions
                    </h4>
                    <p className="text-xs text-slate-400">
                      Paid only half amount? We recover wrongful deductions and balance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom quick contact */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Head Office: Thatipur, Gwalior</span>
                <Link
                  href="/contact"
                  className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                >
                  <span>Locate Office</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        {stats && stats.length > 0 && (
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-slate-800/80">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 sm:p-6 text-center hover:border-blue-500/40 transition"
              >
                <div className="text-2xl sm:text-4xl font-black text-amber-400 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
