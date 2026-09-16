"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

interface TestimonialItem {
  id: number;
  clientName: string;
  photoUrl: string | null;
  message: string;
  rating: number | null;
  isActive: boolean;
}

interface TestimonialsCarouselProps {
  testimonials: TestimonialItem[];
}

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : [
          {
            id: 1,
            clientName: "Rajesh Verma",
            photoUrl: null,
            message:
              "Mera 8 lakh ka health insurance claim company ne reject kar diya tha. India Claim ki team ne IRDAI guidelines ke tehat case file kiya aur 3 hafte mein poora paisa account mein aa gaya!",
            rating: 5,
            isActive: true,
          },
          {
            id: 2,
            clientName: "Sunita Gupta",
            photoUrl: null,
            message:
              "Agent ne galat ULIP policy bech di thi guarantee returns bol kar. Devesh ji aur India Claim ne mera 3 saal ka premium 100% refund karwaya. Truly grateful for their legal expertise!",
            rating: 5,
            isActive: true,
          },
          {
            id: 3,
            clientName: "Amitabh Dubey",
            photoUrl: null,
            message:
              "Motor claim mein company ne 40% depreciation lagakar claim short-settle kiya tha. India Claim ne appeal ki aur baaki ka ₹65,000 bhi dila diya. Sabse achhi baat — unhone pehle koi fees nahi li!",
            rating: 5,
            isActive: true,
          },
        ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Real Stories &amp; Success
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
            What Our Clients Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Read how we recovered rightful settlements for policyholders whose claims were delayed, short-settled, or rejected.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayTestimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (t.rating || 5)
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-blue-200" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{t.message}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-800 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  {t.clientName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                    {t.clientName}
                  </h4>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Verified Claim Settled
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
