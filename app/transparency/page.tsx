"use client";

import React from "react";
import Link from "next/link";

export default function TransparencyPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      
      {/* Navigation */}
      <header className="border-b border-stone-800 bg-stone-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-extrabold flex items-center justify-center text-sm shadow-inner">
              GDA
            </div>
            <div>
              <span className="text-sm font-black tracking-wide text-white block">Gwòròg Dev. Assoc.</span>
              <span className="text-[10px] tracking-widest text-emerald-400 uppercase font-semibold block">Public Transparency Portal</span>
            </div>
          </Link>
          <nav className="flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-300">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-emerald-400 transition-colors">About</Link>
            <Link href="/transparency" className="text-emerald-400 font-bold">Transparency</Link>
            <Link href="/pay" className="hover:text-emerald-400 transition-colors">Donate / Dues</Link>
            <Link href="/login" className="px-3 py-1.5 rounded-lg border border-stone-700 text-xs font-semibold hover:border-emerald-500">Sign In</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-12">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
            Institutional Accountability
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-2">
            GDA Public Transparency Portal
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-stone-400 leading-relaxed">
            Open financial metrics, community project accounting, and verified dues tracking for all sons, daughters, and supporters of the Gwòròg Nation.
          </p>
        </div>

        {/* 4 HIGH-LEVEL METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium block">Total Funds Mobilized</span>
            <span className="text-3xl font-black text-emerald-400 block mt-2">₦12,450,000</span>
            <span className="text-[10px] text-stone-500 mt-1 block">Consolidated across all channels</span>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium block">Projects Completed</span>
            <span className="text-3xl font-black text-teal-400 block mt-2">18</span>
            <span className="text-[10px] text-stone-500 mt-1 block">Boreholes, schools &amp; civic repairs</span>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium block">Current Active Projects</span>
            <span className="text-3xl font-black text-amber-400 block mt-2">7</span>
            <span className="text-[10px] text-stone-500 mt-1 block">Phase 1 reticulation underway</span>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 shadow-xl">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium block">Registered Members</span>
            <span className="text-3xl font-black text-sky-400 block mt-2">1,420+</span>
            <span className="text-[10px] text-stone-500 mt-1 block">Across 12 branches &amp; diaspora</span>
          </div>
        </div>

        {/* ACTIVE PROJECTS TRACKER */}
        <div className="p-8 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-stone-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Active Community Development Projects</h2>
              <p className="text-xs text-stone-400 mt-0.5">Real-time status of capital and cultural infrastructure</p>
            </div>
            <Link
              href="/pay?purpose=water-project"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all self-start sm:self-auto"
            >
              Sponsor an Active Project →
            </Link>
          </div>

          <div className="space-y-6 text-xs">
            {/* Project 1 */}
            <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <span className="font-bold text-white text-sm">1. Kagoro Clean Water &amp; Solar Reticulation</span>
                  <span className="ml-3 px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-semibold border border-emerald-800 text-[10px]">
                    Active • 62.5%
                  </span>
                </div>
                <div className="font-mono text-stone-400">
                  Raised: <span className="text-emerald-400 font-bold">₦6,250,000</span> / Target: ₦10,000,000
                </div>
              </div>
              <div className="w-full bg-stone-900 h-2.5 rounded-full overflow-hidden border border-stone-800">
                <div className="bg-emerald-500 h-full rounded-full w-[62.5%]"></div>
              </div>
              <p className="text-stone-400 text-[11px]">
                Contract awarded for solar submersible pumps across high-density wards in Fadan Kagoro and Agbam.
              </p>
            </div>

            {/* Project 2 */}
            <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <span className="font-bold text-white text-sm">2. Kagoro Hills Tourist Footpath &amp; Safety Rails</span>
                  <span className="ml-3 px-2 py-0.5 rounded bg-teal-950 text-teal-400 font-semibold border border-teal-800 text-[10px]">
                    Active • 45%
                  </span>
                </div>
                <div className="font-mono text-stone-400">
                  Raised: <span className="text-teal-400 font-bold">₦2,250,000</span> / Target: ₦5,000,000
                </div>
              </div>
              <div className="w-full bg-stone-900 h-2.5 rounded-full overflow-hidden border border-stone-800">
                <div className="bg-teal-500 h-full rounded-full w-[45%]"></div>
              </div>
              <p className="text-stone-400 text-[11px]">
                Enhancing tourist safety for mountaineers and Afan Festival visitors climbing the sacred hills.
              </p>
            </div>

            {/* Project 3 */}
            <div className="p-5 rounded-xl bg-stone-950 border border-stone-800 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <span className="font-bold text-white text-sm">3. Gwòròg Bible Translation &amp; Literacy Orthography</span>
                  <span className="ml-3 px-2 py-0.5 rounded bg-amber-950 text-amber-400 font-semibold border border-amber-800 text-[10px]">
                    Ongoing • Community Sponsored
                  </span>
                </div>
                <div className="font-mono text-stone-400">
                  Raised: <span className="text-amber-400 font-bold">₦1,800,000</span> / Target: ₦3,000,000
                </div>
              </div>
              <div className="w-full bg-stone-900 h-2.5 rounded-full overflow-hidden border border-stone-800">
                <div className="bg-amber-500 h-full rounded-full w-[60%]"></div>
              </div>
              <p className="text-stone-400 text-[11px]">
                Preserving the Gwòròg language grammar, school reader booklets, and community translation archives.
              </p>
            </div>
          </div>
        </div>

        {/* INFLOW BREAKDOWN TABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-stone-900 border border-stone-800">
            <h3 className="text-base font-bold text-white mb-4">Revenue Breakdown by Stream</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2.5 border-b border-stone-800">
                <span className="text-stone-400">Annual Membership Dues</span>
                <span className="font-mono font-bold text-emerald-400">₦2,200,000 (17.7%)</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-stone-800">
                <span className="text-stone-400">Kagoro Clean Water Donations</span>
                <span className="font-mono font-bold text-emerald-400">₦6,250,000 (50.2%)</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-stone-800">
                <span className="text-stone-400">Afan Festival Vendor &amp; Stall Permits</span>
                <span className="font-mono font-bold text-emerald-400">₦2,500,000 (20.1%)</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-stone-800">
                <span className="text-stone-400">Diaspora Direct Project Contributions</span>
                <span className="font-mono font-bold text-emerald-400">₦1,500,000 (12.0%)</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white mb-2">Audit &amp; Oversight Statement</h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">
                All financial disbursements must carry constitutional triple-signature authorization by the GDA National President, Secretary-General, and Financial Secretary/Treasurer, in accordance with the GDA Constitution.
              </p>
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-300 space-y-1">
                <div>✓ Bank Reconciliation: Verified Monthly</div>
                <div>✓ Audited by: GDA Board of Trustees Audit Committee</div>
                <div>✓ Transparency Frequency: Updated Real-Time</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-500">Need specific financial records?</span>
              <Link href="/contact" className="text-emerald-400 font-bold hover:underline">
                Contact Audit Committee →
              </Link>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-950 py-8 px-4 text-center text-stone-500 text-xs">
        <p>&copy; 2026 Gwòròg Development Association (GDA). All Rights Reserved.</p>
      </footer>
    </div>
  );
}