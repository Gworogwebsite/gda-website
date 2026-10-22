import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      
      {/* 1. TOP ANNOUNCEMENT TICKER (Scrolling Left to Right) */}
      <div className="bg-emerald-950/95 text-emerald-200 text-xs py-2.5 border-b border-emerald-800/60 overflow-hidden relative w-full">
        {/* Inline CSS Keyframe Animation for Left-to-Right Scrolling */}
        <style>{`
          @keyframes scrollLeftToRight {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100vw);
            }
          }
          .ticker-left-to-right {
            display: inline-block;
            white-space: nowrap;
            animation: scrollLeftToRight 24s linear infinite;
          }
          .ticker-left-to-right:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="ticker-left-to-right cursor-pointer" title="Hover to pause">
          <span className="font-bold text-emerald-300 mr-2">📢 Official Notice:</span>
          Preparation for the upcoming Afan National Festival &amp; Annual Membership Verification is now underway.
          <span className="mx-8 text-emerald-600 font-bold">•</span>
          <span className="font-bold text-emerald-300 mr-2">📢 Official Notice:</span>
          Preparation for the upcoming Afan National Festival 2027 is in progress &amp; Annual Membership Verification is now underway.
        </div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="border-b border-stone-800 sticky top-0 z-50 bg-stone-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-extrabold flex items-center justify-center text-lg shadow-inner">
              GDA
            </div>
            <div>
              <span className="text-lg font-black tracking-wide text-white block leading-tight">
                Gwòròg Development Association
              </span>
              <span className="text-[10px] tracking-widest text-emerald-400 uppercase font-semibold block">
                Kagoro • Unity • Progress • Heritage
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
            <Link href="/" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-emerald-400 transition-colors">
              About GDA
            </Link>
            <Link href="/history" className="hover:text-emerald-400 transition-colors">
              History & Heritage
            </Link>
            <Link href="/contact" className="hover:text-emerald-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Authentication Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-300 hover:text-white border border-stone-700 hover:border-emerald-500 rounded-lg transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-md hover:shadow-emerald-600/30 transition-all"
            >
              Join GDA
            </Link>
          </div>

        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-6">
            Preserving Heritage • Fostering Self-Reliance
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none">
            Empowering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Gwòròg Nation</span> for Sustainable Progress
          </h1>
          <p className="mt-6 text-base sm:text-lg text-stone-400 max-w-2xl mx-auto leading-relaxed">
            The umbrella socio-cultural organization for all sons, daughters, and friends of Kagoro. Uniting our branches, youth, women, and diaspora network under one purposeful vision.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-xl hover:shadow-emerald-600/40 transition-all transform active:scale-95"
            >
              Register as a Member
            </Link>
            <Link
              href="/login"
              className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-bold text-sm uppercase tracking-wider rounded-xl transition-all"
            >
              Access Member Portal
            </Link>
          </div>
        </div>
      </section>

      {/* 4. GDA REVENUE & SUSTAINABILITY SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-stone-800/80 bg-stone-900/40">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
              Community Funding & Accountability
            </h2>
            <p className="mt-2 text-3xl font-black text-white">
              GDA Sustainable Development Pillars
            </p>
            <p className="mt-3 text-sm text-stone-400">
              Transparent projects directly supported through annual dues, community sponsors, and our global diaspora network.
            </p>
          </div>

          {/* PROJECT FUNDING PROGRESS CARD */}
          <div className="mb-14 p-8 rounded-2xl bg-stone-900 border border-emerald-800/40 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                  Priority Project
                </span>
                <h3 className="text-xl font-bold text-white mt-2">
                  Kagoro Community Clean Water & Solar Infrastructure
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Solar boreholes and reticulation across high-demand wards in Gwòròg.
                </p>
              </div>
              <div className="text-right flex md:flex-col justify-between items-end">
                <span className="text-xs text-stone-400 uppercase tracking-wider">Target Budget</span>
                <span className="text-2xl font-black text-emerald-400">₦10,000,000</span>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 text-center">
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-xs text-stone-400 block uppercase">Raised So Far</span>
                <span className="text-xl font-bold text-emerald-400 mt-1 block">₦6,250,000</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-xs text-stone-400 block uppercase">Balance Needed</span>
                <span className="text-xl font-bold text-amber-400 mt-1 block">₦3,750,000</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-xs text-stone-400 block uppercase">Project Progress</span>
                <span className="text-xl font-bold text-white mt-1 block">62.5%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-stone-950 h-3 rounded-full overflow-hidden border border-stone-800">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full rounded-full w-[62.5%]"></div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
              <span>Verified and monitored under GDA Transparency Portal guidelines.</span>
              <Link
                href="/login"
                className="font-bold text-emerald-400 hover:text-emerald-300 underline"
              >
                Log in to Sponsor this Project →
              </Link>
            </div>
          </div>

          {/* 3 REVENUE CHANNELS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-emerald-800/60 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-4">
                  01
                </div>
                <h4 className="text-lg font-bold text-white">Annual Membership Dues</h4>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                  Active participation begins with your civic contribution. Generates steady institutional strength to support student bursaries and youth development.
                </p>
              </div>
              <Link
                href="/register"
                className="mt-6 text-xs uppercase tracking-wider font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
              >
                Register & Pay Dues →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-emerald-800/60 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-teal-600/20 text-teal-400 flex items-center justify-center font-bold text-lg mb-4">
                  02
                </div>
                <h4 className="text-lg font-bold text-white">GDA Diaspora Network</h4>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                  Connecting Kagoro indigenes across the UK, USA, Europe, and beyond. Facilitates direct project adoption, medical missions, and diaspora philanthropy.
                </p>
              </div>
              <Link
                href="/register"
                className="mt-6 text-xs uppercase tracking-wider font-bold text-teal-400 hover:text-teal-300 inline-flex items-center gap-1"
              >
                Join Diaspora Network →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-emerald-800/60 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-lg mb-4">
                  03
                </div>
                <h4 className="text-lg font-bold text-white">Afan Festival Partnerships</h4>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                  Commercial vendors, cultural artisans, and corporate sponsors partnering for Northern Nigeria&apos;s premier cultural hill-climbing celebration.
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-6 text-xs uppercase tracking-wider font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
              >
                Partner With Us →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5. AFAN FESTIVAL & HERITAGE SPOTLIGHT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-stone-800 bg-stone-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Living Cultural Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 leading-tight">
              The Historic Afan National Festival
            </h2>
            <p className="mt-4 text-sm text-stone-400 leading-relaxed">
              Every 1st of January, the majestic Kagoro Hills welcome dignitaries, sons, daughters, and tourists from across the globe to celebrate the conquest of the hills and the bountiful harvest.
            </p>
            <p className="mt-3 text-sm text-stone-400 leading-relaxed">
              Under the custody of the Gwòròg Traditional Council (His Highness the Chief of Kagoro) and GDA, the festival remains a powerhouse for cultural tourism and community solidarity.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                href="/history"
                className="px-5 py-3 rounded-lg bg-stone-900 border border-stone-700 text-stone-200 text-xs font-bold uppercase tracking-wider hover:border-emerald-500 transition-colors"
              >
                Read Gwòròg History
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-8 space-y-5">
            <h3 className="text-lg font-bold text-white border-b border-stone-800 pb-3">
              Association Wings & Organs
            </h3>
            <div className="space-y-4 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">●</span>
                <div>
                  <strong className="text-white block">National Executive Council (NEC)</strong>
                  Elected stewards leading administrative coordination and strategic community development.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">●</span>
                <div>
                  <strong className="text-white block">Board of Trustees (BOT)</strong>
                  Constitutional custodians offering visionary oversight and operational guidance.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">●</span>
                <div>
                  <strong className="text-white block">Traditional Council Linkage</strong>
                  Working in close synergy with His Highness, Title Holders, District, Village, and Ward Heads.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">●</span>
                <div>
                  <strong className="text-white block">Youth & Women Wings</strong>
                  Driving grassroots mobilization, skills acquisition, and community security.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="mt-auto border-t border-stone-800 bg-stone-950 py-12 px-4 sm:px-6 lg:px-8 text-stone-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-white font-bold block text-sm">
              Gwòròg Development Association (GDA)
            </span>
            <p className="mt-1">Official Digital Community & Administrative Portal</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-stone-300 transition-colors">About</Link>
            <Link href="/history" className="hover:text-stone-300 transition-colors">History</Link>
            <Link href="/contact" className="hover:text-stone-300 transition-colors">Contact</Link>
            <Link href="/login" className="hover:text-stone-300 transition-colors">Member Portal</Link>
          </div>
          <div className="text-center md:text-right">
            <p>&copy; 2026 GDA. All Rights Reserved.</p>
            <p className="text-[10px] text-stone-600 mt-1">Built with Next.js & Firebase (Free Tier Architecture)</p>
          </div>
        </div>
      </footer>

    </div>
  );
}