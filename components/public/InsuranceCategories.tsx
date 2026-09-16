import React from "react";
import Link from "next/link";
import {
  HeartPulse,
  Shield,
  Car,
  Plane,
  FileText,
  ArrowRight,
} from "lucide-react";

interface CategoryItem {
  id: number;
  name: string;
  description: string | null;
  iconUrl: string | null;
  displayOrder: number;
}

interface InsuranceCategoriesProps {
  categories: CategoryItem[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Term Insurance": <Shield className="w-6 h-6 text-blue-600" />,
  "Health Insurance": <HeartPulse className="w-6 h-6 text-emerald-600" />,
  "Life Insurance": <FileText className="w-6 h-6 text-indigo-600" />,
  "Motor Insurance": <Car className="w-6 h-6 text-amber-600" />,
  "Travel Insurance": <Plane className="w-6 h-6 text-purple-600" />,
};

export default function InsuranceCategories({
  categories,
}: InsuranceCategoriesProps) {
  const displayCategories =
    categories && categories.length > 0
      ? categories
      : [
          {
            id: 1,
            name: "Term Insurance",
            description: "High-cover death claim rejections & non-disclosure disputes.",
            iconUrl: null,
            displayOrder: 1,
          },
          {
            id: 2,
            name: "Health Insurance",
            description: "Mediclaim reimbursement denial, cashless rejections & pre-existing disputes.",
            iconUrl: null,
            displayOrder: 2,
          },
          {
            id: 3,
            name: "Life Insurance",
            description: "Traditional endowment, ULIP mis-selling recovery & death settlements.",
            iconUrl: null,
            displayOrder: 3,
          },
          {
            id: 4,
            name: "Motor Insurance",
            description: "Car & bike own damage, total loss disputes & surveyor discrepancies.",
            iconUrl: null,
            displayOrder: 4,
          },
          {
            id: 5,
            name: "Travel Insurance",
            description: "Overseas medical emergencies, baggage loss & flight cancellation claims.",
            iconUrl: null,
            displayOrder: 5,
          },
        ];

  return (
    <section className="py-14 sm:py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            विस्तृत सुविधा (Categories Covered)
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            All Insurance Verticals Handled Under One Roof
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Whatever your policy type, our legal law advisers and claim specialists navigate company clauses to secure your payment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {displayCategories.map((cat, idx) => {
            const icon =
              CATEGORY_ICONS[cat.name] || (
                <Shield className="w-6 h-6 text-blue-600" />
              );

            return (
              <div
                key={cat.id || idx}
                className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-400 p-5 rounded-2xl transition-all duration-200 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center mb-4">
                    {icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60">
                  <Link
                    href={`/contact?category=${encodeURIComponent(cat.name)}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                  >
                    <span>Claim Help</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
