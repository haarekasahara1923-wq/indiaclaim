import React from "react";
import Link from "next/link";
import { getTestimonials } from "@/actions/testimonials";
import { Star, Quote, ShieldCheck, ArrowRight } from "lucide-react";

export const revalidate = 0;

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials(true);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-amber-400/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Real Policyholder Reviews</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Client Testimonials &amp; Success Stories
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover how India Claim helped individuals and families across India recover their rightful claim amounts after rejection or delay.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
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
                    <Quote className="w-7 h-7 text-blue-200" />
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;{t.message}&rdquo;
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-700 to-indigo-900 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {t.clientName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {t.clientName}
                    </h4>
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Verified Claim Settled
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="mt-16 bg-blue-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black">
              Ready to Win Your Insurance Claim?
            </h3>
            <p className="text-blue-200 text-sm max-w-xl mx-auto">
              Our legal law advisers evaluate your case for free. You only pay after your money is credited to your bank account.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl text-sm transition hover:scale-105"
              >
                <span>Request Free Case Evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
