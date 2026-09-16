import React from "react";
import Link from "next/link";
import { getServices } from "@/actions/services";
import { getCategories } from "@/actions/categories";
import {
  FileCheck2,
  AlertTriangle,
  Clock,
  TrendingDown,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  HeartPulse,
  Car,
  Plane,
  FileText,
  Shield,
} from "lucide-react";

export const revalidate = 0;

const DEFAULT_SERVICE_ICONS: Record<string, React.ReactNode> = {
  "Insurance Claim": <FileCheck2 className="w-10 h-10 text-blue-600" />,
  "Mis-Selling": <AlertTriangle className="w-10 h-10 text-amber-600" />,
  "Delay in Claim Process": <Clock className="w-10 h-10 text-red-600" />,
  "Claim Short Settled": <TrendingDown className="w-10 h-10 text-purple-600" />,
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Term Insurance": <Shield className="w-8 h-8 text-blue-600" />,
  "Health Insurance": <HeartPulse className="w-8 h-8 text-emerald-600" />,
  "Life Insurance": <FileText className="w-8 h-8 text-indigo-600" />,
  "Motor Insurance": <Car className="w-8 h-8 text-amber-600" />,
  "Travel Insurance": <Plane className="w-8 h-8 text-purple-600" />,
};

export default async function ServicesPage() {
  const [servicesList, categoriesList] = await Promise.all([
    getServices(true),
    getCategories(),
  ]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-blue-500/30">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Legal Law Advisory &amp; Claim Settlement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Comprehensive Insurance Claim Services
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From wrongful claim repudiations and deceptive agent mis-selling to delayed hospital reimbursements and partial settlements.
          </p>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Our 4 Core Claim Recovery Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Every service backed by our signature <strong>No Win, No Fee</strong> policy. We only charge after your money is in your bank account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesList.map((service) => {
              const icon =
                DEFAULT_SERVICE_ICONS[service.title] || (
                  <FileCheck2 className="w-10 h-10 text-blue-600" />
                );

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                      {icon}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      {service.title}
                    </h3>

                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-2.5">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        What We Do For You:
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Complete legal file audit and policy terms review</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Formal escalation to Insurer Grievance Redressal Officer</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Ombudsman petition drafting and hearing representation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>No advance consultation fee — pay only upon credit</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      No Win No Fee
                    </span>
                    <Link
                      href={`/contact?service=${encodeURIComponent(
                        service.title
                      )}`}
                      className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow transition hover:scale-105"
                    >
                      <span>File Case Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Insurance Categories Detail (सुविधा) */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Insurance Verticals (सुविधा)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Insurance Types Covered Under Our Advisory
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              We provide claim recovery and dispute management across all five major insurance categories in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {categoriesList.map((cat) => {
              const icon =
                CATEGORY_ICONS[cat.name] || (
                  <Shield className="w-8 h-8 text-blue-600" />
                );

              return (
                <div
                  key={cat.id}
                  className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-xs">
                      {icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60">
                    <Link
                      href={`/contact?category=${encodeURIComponent(cat.name)}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition"
                    >
                      <span>Consult on {cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
