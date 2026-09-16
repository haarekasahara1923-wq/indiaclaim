import React from "react";
import Link from "next/link";
import {
  FileCheck2,
  AlertTriangle,
  Clock,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface ServiceItem {
  id: number;
  title: string;
  description: string | null;
  iconUrl: string | null;
  displayOrder: number;
  isActive: boolean;
}

interface ServicesGridProps {
  services: ServiceItem[];
  title?: string;
  subtitle?: string;
  showAllLink?: boolean;
}

const DEFAULT_ICONS: Record<string, React.ReactNode> = {
  "Insurance Claim": <FileCheck2 className="w-8 h-8 text-blue-600" />,
  "Mis-Selling": <AlertTriangle className="w-8 h-8 text-amber-600" />,
  "Delay in Claim Process": <Clock className="w-8 h-8 text-red-600" />,
  "Claim Short Settled": <TrendingDown className="w-8 h-8 text-purple-600" />,
};

export default function ServicesGrid({
  services,
  title = "Our Core Claim & Advisory Services",
  subtitle = "Professional legal assistance to resolve claim denials, delays, unfair deductions, and agent fraud across India.",
  showAllLink = false,
}: ServicesGridProps) {
  // If no services from DB, display fallback core services
  const displayServices =
    services && services.length > 0
      ? services
      : [
          {
            id: 1,
            title: "Insurance Claim",
            description:
              "Complete guidance and legal representation for submitting, proving, and winning contested insurance claims across all insurers.",
            iconUrl: null,
            displayOrder: 1,
            isActive: true,
          },
          {
            id: 2,
            title: "Mis-Selling",
            description:
              "Misled by an insurance agent with fake return promises or hidden clauses? We take legal action to get 100% refund of your premium.",
            iconUrl: null,
            displayOrder: 2,
            isActive: true,
          },
          {
            id: 3,
            title: "Delay in Claim Process",
            description:
              "Insurance companies deliberately delaying your settlement? We issue legal demand notices and approach Ombudsman to enforce fast resolution.",
            iconUrl: null,
            displayOrder: 3,
            isActive: true,
          },
          {
            id: 4,
            title: "Claim Short Settled",
            description:
              "Insurer approved only partial claim citing obscure deductions? We dispute wrongful depreciation & exclusion deductions to recover full dues.",
            iconUrl: null,
            displayOrder: 4,
            isActive: true,
          },
        ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Expert Legal &amp; Claim Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-base text-slate-600 mt-3">{subtitle}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {displayServices.map((service, index) => {
            const icon =
              DEFAULT_ICONS[service.title] || (
                <FileCheck2 className="w-8 h-8 text-blue-600" />
              );

            return (
              <div
                key={service.id || index}
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-blue-600/10 flex items-center justify-center mb-5 transition">
                    {icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-700 transition">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature badges */}
                  <ul className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Zero upfront fee</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>IRDAI &amp; Ombudsman support</span>
                    </li>
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href={`/contact?service=${encodeURIComponent(
                      service.title
                    )}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 group-hover:text-blue-900 group-hover:gap-2 transition-all"
                  >
                    <span>Request Assistance</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {showAllLink && (
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition"
            >
              <span>Explore All Services &amp; Coverage Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
