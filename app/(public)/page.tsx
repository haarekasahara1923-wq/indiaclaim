import React from "react";
import Link from "next/link";
import { getHeroSettings } from "@/actions/hero";
import { getServices } from "@/actions/services";
import { getCategories } from "@/actions/categories";
import { getTestimonials } from "@/actions/testimonials";
import { getGalleryItems } from "@/actions/gallery";
import { getSiteSettings } from "@/actions/settings";
import HeroSection from "@/components/public/HeroSection";
import ServicesGrid from "@/components/public/ServicesGrid";
import InsuranceCategories from "@/components/public/InsuranceCategories";
import TestimonialsCarousel from "@/components/public/TestimonialsCarousel";
import GalleryPreview from "@/components/public/GalleryPreview";
import { Award, ArrowRight } from "lucide-react";

export const revalidate = 0; // Ensures fresh data or on-demand revalidation

export default async function HomePage() {
  const [hero, servicesList, categoriesList, testimonialsList, galleryList, settings] =
    await Promise.all([
      getHeroSettings(),
      getServices(true),
      getCategories(),
      getTestimonials(true),
      getGalleryItems(),
      getSiteSettings(),
    ]);

  const whatsappNumber = settings?.whatsappNumber || "917566842783";

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        headline={hero?.headline || undefined}
        subheadline={hero?.subheadline || undefined}
        ctaText={hero?.ctaText || undefined}
        ctaLink={hero?.ctaLink || undefined}
        stats={hero?.stats || undefined}
        whatsappNumber={whatsappNumber}
      />

      {/* Brand Message & Hindi Intro Banner */}
      <section className="bg-slate-900 text-white py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-amber-500/30">
            <Award className="w-4 h-4 text-amber-400" />
            <span>All in One Insurance Solution Platform</span>
          </div>

          <blockquote className="text-lg sm:text-2xl font-bold leading-relaxed text-slate-100 max-w-4xl mx-auto">
            &ldquo;India Claim se khareedi gayi har prakar ki policy par aapko claim guarantee sahayata pradan ki jaati hai. Hamare yahan sabhi prakar ke beema claim dilvaane evam aapko jhoothi jaankari dekar bechi gayi policy ka paisa vaapas karvaane se sambandhit karya kiye jaate hain.&rdquo;
          </blockquote>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <div className="text-xs sm:text-sm font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-4 py-2 rounded-xl">
              Co-Founder: <strong>Devesh Sharma</strong> — Legal Law Adviser &amp; Claim Expert
            </div>
            <Link
              href="/about"
              className="text-xs sm:text-sm font-bold text-white hover:text-amber-400 flex items-center gap-1.5 transition underline underline-offset-4"
            >
              <span>Read Our Full Story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <ServicesGrid services={servicesList} showAllLink={true} />

      {/* Insurance Categories Strip */}
      <InsuranceCategories categories={categoriesList} />

      {/* Why Choose Us - Quick Highlights */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
              Why India Claim
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3">
              Why Thousands Trust Us With Their Insurance Claims
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 font-black text-lg">
                01
              </div>
              <h3 className="text-lg font-bold text-white">
                No Win, No Fee Promise
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                We take zero advance fee. Our consultation charge applies only after the claim money is credited into your bank account.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 font-black text-lg">
                02
              </div>
              <h3 className="text-lg font-bold text-white">
                Full Legal &amp; Ombudsman Power
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                We handle legal notices, IRDAI Bima Bharosa escalations, Insurance Ombudsman hearings, and Consumer Forum complaints.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 font-black text-lg">
                03
              </div>
              <h3 className="text-lg font-bold text-white">
                100% Transparency &amp; Pan-India Reach
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Direct WhatsApp consultation with our co-founder and legal advisers. Transparent case updates at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel testimonials={testimonialsList} />

      {/* Gallery & Proofs Preview */}
      <GalleryPreview items={galleryList} />

      {/* Bottom Emergency Action Section */}
      <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Have a Rejected or Delayed Claim Right Now?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Do not let the 30-day appeal deadline pass. Contact our legal advisers today for a free case assessment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded-xl text-sm sm:text-base shadow-xl transition hover:scale-105"
            >
              Submit Your Case for Free Review
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "Hi India Claim, I need immediate assistance with an insurance claim."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl text-sm sm:text-base shadow-xl transition hover:scale-105"
            >
              WhatsApp Claim Expert
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
