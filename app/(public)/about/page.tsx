import React from "react";
import Link from "next/link";
import {
  Award,
  Scale,
  UserCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { getAboutContent } from "@/actions/about";
import { getSiteSettings } from "@/actions/settings";

export const revalidate = 0;

export default async function AboutPage() {
  const [about, settings] = await Promise.all([
    getAboutContent(),
    getSiteSettings(),
  ]);

  const founderName = about?.founderName || "Devesh Sharma";
  const founderDesignation =
    about?.founderDesignation || "Co-Founder, India Claim";
  const founderBio =
    about?.founderBio ||
    "With extensive experience in insurance advisory, consumer protection laws, and legal claim recovery, Devesh Sharma established India Claim in Gwalior to provide policyholders with dedicated, fearless representation against unfair claim repudiations and deceptive mis-selling across India.";
  const founderPhoto = about?.founderPhotoUrl;

  const whyChooseUs = about?.whyChooseUs || [
    {
      title: "No Win — No Fee Commitment",
      description:
        "Zero upfront charges. We charge our nominal fee only when your rightful claim amount is safely credited into your bank account.",
    },
    {
      title: "Comprehensive Legal & Ombudsman Expertise",
      description:
        "We draft formal legal representations, approach the Insurance Ombudsman, and handle consumer forum litigation on your behalf.",
    },
    {
      title: "All 5 Major Insurance Categories",
      description:
        "Deep domain expertise covering Term, Health (Mediclaim), Life, Motor, and Travel insurance claims.",
    },
    {
      title: "Pan-India Dedicated Support",
      description:
        "Seamless assistance via phone, WhatsApp, and online document review for policyholders across all states in India.",
    },
  ];

  const storyContent =
    about?.storyRichtext ||
    `<p>India Claim se khareedi gayi har prakar ki policy par aapko claim guarantee sahayata pradan ki jaati hai. Hamare yahan sabhi prakar ke beema claim dilvaane evam aapko jhoothi jaankari dekar bechi gayi policy ka paisa vaapas karvaane se sambandhit karya kiye jaate hain.</p>`;

  const phone = settings?.phone || "+91 75668 42783";
  const whatsappNumber = settings?.whatsappNumber || "917566842783";

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-amber-400/30">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>About India Claim</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Your Shield Against Unfair Insurance Rejections
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            All in One Insurance Solution Platform — Insurance &amp; Claim Expert with Legal Law Adviser based in Thatipur, Gwalior, serving clients across India.
          </p>
        </div>
      </section>

      {/* Founder Profile Block */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
              {/* Photo */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-slate-800 border-4 border-amber-400/40 shadow-xl flex items-center justify-center">
                  {founderPhoto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={founderPhoto}
                      alt={founderName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-amber-400 p-4">
                      <UserCheck className="w-20 h-20 mb-2" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        {founderName}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {founderName}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-amber-400">
                    {founderDesignation}
                  </p>
                  <span className="inline-block mt-2 text-[11px] font-bold bg-blue-800/80 text-blue-200 px-3 py-1 rounded-full border border-blue-600/40">
                    Insurance &amp; Legal Law Adviser
                  </span>
                </div>
              </div>

              {/* Bio & Vision */}
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-amber-500/30">
                  <Award className="w-3.5 h-3.5" />
                  <span>Founder&apos;s Mission</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  &ldquo;Every Policyholder Deserves Their Legitimate Claim Money Without Fear or Delay.&rdquo;
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {founderBio}
                </p>

                {/* Trust guarantee banner inside founder block */}
                <div className="bg-amber-400/10 border-l-4 border-amber-400 p-4 rounded-r-xl">
                  <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Our No Win, No Fee Guarantee
                  </p>
                  <p className="text-sm font-medium text-white mt-1">
                    &ldquo;Vishesh: Jab aapka paisa aapke khaate mein aa jaata hai, uske baad hi hum fees lete hain.&rdquo;
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    You never take any financial risk when consulting India Claim.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      "Hi Devesh ji, I would like to consult with you regarding an insurance claim issue."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-lg transition hover:scale-105"
                  >
                    Direct WhatsApp with Co-Founder
                  </a>
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm border border-white/20 transition"
                  >
                    Call: {phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story & Mission */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                About The Platform
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                India Claim Platform Overview
              </h2>
            </div>

            <div
              className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: storyContent }}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Points */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Key Advantages
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3">
              Why Choose India Claim?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Our unique approach combines deep insurance domain experience with legal escalation capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-blue-400 transition hover:shadow-md flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl text-sm sm:text-base shadow-lg transition hover:scale-105"
            >
              <span>Get Your Claim Evaluated Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
