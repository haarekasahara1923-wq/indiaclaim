import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If not logged in, render just the children (e.g. the login page)
  if (!session) {
    return <div className="min-h-screen bg-slate-950">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      {/* Sidebar (desktop: fixed column | mobile: drawer via internal state) */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 sm:h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0">
          {/* Left side — spacer on mobile so hamburger button doesn't overlap text */}
          <div className="flex items-center gap-2 pl-12 lg:pl-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold text-slate-700 leading-tight">
              India Claim CMS{" "}
              <span className="hidden sm:inline">— Live Sync Enabled</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 hidden sm:block">
              Logged in as:{" "}
              <strong className="text-slate-800">{session.user?.email}</strong>
            </span>
            {/* On mobile show only avatar initial */}
            <div className="sm:hidden w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-black shrink-0">
              {session.user?.email?.[0]?.toUpperCase() ?? "A"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
