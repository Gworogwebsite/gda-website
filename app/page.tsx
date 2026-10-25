import React from "react";
import Link from "next/link";
import Logo from "./components/Logo";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FDFBF7] flex flex-col font-sans selection:bg-[#7A1428] selection:text-[#FDFBF7]">
      
      {/* 1. TOP ANNOUNCEMENT TICKER (Maroon & Cream with Increased Font Size) */}
      <div className="bg-gradient-to-r from-[#4A0D1A] via-[#6B1426] to-[#4A0D1A] text-[#FDFBF7] py-3.5 border-b-2 border-[#8A1A31] overflow-hidden relative w-full shadow-lg">
        <style>{`
          @keyframes scrollLeftToRight {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100vw); }
          }
          .ticker-left-to-right {
            display: inline-block;
            white-space: nowrap;
            animation: scrollLeftToRight 28s linear infinite;
            font-size: 0.95rem; /* Increased readable font size */
            font-weight: 700;
            letter-spacing: 0.025em;
          }
          .ticker-left-to-right:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="ticker-left-to-right cursor-pointer" title="Hover to pause">
          <span className="inline-block px-2.5 py-0.5 rounded bg-[#8A1A31] border border-[#F4EDE1]/40 text-[#FDFBF7] mr-3 uppercase text-xs font-black tracking-wider shadow-inner">
            📢 Official Notice:
          </span>
          Preparation for the upcoming Afan National Festival &amp; Annual Membership Verification is now underway.
          <span className="mx-8 text-[#EADCC8] font-bold">•</span>
          <span className="inline-block px-2.5 py-0.5 rounded bg-[#8A1A31] border border-[#F4EDE1]/40 text-[#FDFBF7] mr-3 uppercase text-xs font-black tracking-wider shadow-inner">
            📢 Official Notice:
          </span>
          Preparation for the upcoming Afan National Festival &amp; Annual Membership Verification is now underway.
        </div>
      </div>

      {/* 2. NAVIGATION BAR (Deep Black with Cream Trims & Embossed Logo) */}
      <header className="border-b border-[#2B2627] sticky top-0 z-50 bg-[#0C0A09]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <Logo size="md" />
            <div>
              <span className="text-lg font-black tracking-wide text-[#FDFBF7] block leading-tight group-hover:text-[#EADCC8] transition-colors">
                Gwòròg Development Association
              </span>
              <span className="text-[10px] tracking-widest text-[#D94F68] uppercase font-bold block">
                Kagoro • Unity • Progress • Heritage
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#EADCC8]">
            <Link href="/" className="text-[#FDFBF7] border-b-2 border-[#7A1428] pb-1 font-bold">
              Home
            </Link>
            <Link href="/about" className="hover:text-[#FDFBF7] hover:border-b-2 hover:border-[#7A1428] pb-1 transition-all">
              About GDA
            </Link>
            <Link href="/history" className="hover:text-[#FDFBF7] hover:border-b-2 hover:border-[#7A1428] pb-1 transition-all">
              History &amp; Heritage
            </Link>
            <Link href="/transparency" className="hover:text-[#FDFBF7] hover:border-b-2 hover:border-[#7A1428] pb-1 transition-all">
              Transparency
            </Link>
            <Link href="/contact" className="hover:text-[#FDFBF7] hover:border-b-2 hover:border-[#7A1428] pb-1 transition-all">
              Contact
            </Link>
          </nav>

          {/* Auth Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#FDFBF7] hover:text-[#0C0A09] hover:bg-[#FDFBF7] border border-[#4A3E40] rounded-lg transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#7A1428] hover:bg-[#5E0F1E] text-[#FDFBF7] border border-[#9A223B] rounded-lg shadow-lg hover:shadow-[#7A1428]/40 transition-all"
            >
              Join GDA
            </Link>
          </div>

        </div>
      </header>

      {/* 3. HERO SECTION (Black & Maroon Gradient with Luxurious Cream Text) */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1C060A] via-[#0C0A09] to-[#0C0A09]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#3D0A14] border border-[#7A1428] text-[#FDFBF7] text-xs font-bold uppercase tracking-widest mb-6 shadow-md">
            Preserving Heritage • Fostering Self-Reliance
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-[#FDFBF7] tracking-tight leading-tight sm:leading-none">
            Empowering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D94F68] via-[#F4EDE1] to-[#EADCC8]">Gwòròg Nation</span> for Sustainable Progress
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#EADCC8]/80 max-w-2xl mx-auto leading-relaxed">
            The umbrella socio-cultural organization for all sons, daughters, and friends of Kagoro. Uniting our branches, youth, women, and diaspora network under one purposeful vision.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="px-6 py-3.5 bg-[#7A1428] hover:bg-[#5E0F1E] text-[#FDFBF7] font-bold text-sm uppercase tracking-wider rounded-xl shadow-xl hover:shadow-[#7A1428]/50 border border-[#9A223B] transition-all transform active:scale-95"
            >
              Register as a Member
            </Link>
            <Link
              href="/login"
              className="px-6 py-3.5 bg-[#171415] hover:bg-[#242021] text-[#FDFBF7] border border-[#3D3537] font-bold text-sm uppercase tracking-wider rounded-xl transition-all"
            >
              Access Member Portal
            </Link>
          </div>
        </div>
      </section>

      {/* 4. GDA REVENUE & SUSTAINABILITY (Cream Accents on Black Cards) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#2B2627] bg-[#141212]/50">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-black tracking-widest text-[#D94F68]">
              Community Funding &amp; Accountability
            </h2>
            <p className="mt-2 text-3xl font-black text-[#FDFBF7]">
              GDA Sustainable Development Pillars
            </p>
            <p className="mt-3 text-sm text-[#EADCC8]/70">
              Transparent projects directly supported through annual dues, community sponsors, and our global diaspora network.
            </p>
          </div>

          {/* PROJECT FUNDING PROGRESS CARD */}
          <div className="mb-14 p-8 rounded-2xl bg-[#171415] border border-[#3D3537] shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#2B2627]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-[#3D0A14] text-[#FDFBF7] border border-[#7A1428]">
                  Priority Capital Project
                </span>
                <h3 className="text-xl font-bold text-[#FDFBF7] mt-2">
                  Kagoro Community Clean Water &amp; Solar Infrastructure
                </h3>
                <p className="text-xs text-[#EADCC8]/70 mt-1">
                  Solar boreholes and reticulation across high-demand wards in Gwòròg.
                </p>
              </div>
              <div className="text-right flex md:flex-col justify-between items-end">
                <span className="text-xs text-[#EADCC8]/70 uppercase tracking-wider">Target Budget</span>
                <span className="text-2xl font-black text-[#FDFBF7]">₦10,000,000</span>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 text-center">
              <div className="p-4 rounded-xl bg-[#0C0A09] border border-[#2B2627]">
                <span className="text-xs text-[#EADCC8]/70 block uppercase">Raised So Far</span>
                <span className="text-xl font-bold text-[#FDFBF7] mt-1 block">₦6,250,000</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0C0A09] border border-[#2B2627]">
                <span className="text-xs text-[#EADCC8]/70 block uppercase">Balance Needed</span>
                <span className="text-xl font-bold text-[#D94F68] mt-1 block">₦3,750,000</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0C0A09] border border-[#2B2627]">
                <span className="text-xs text-[#EADCC8]/70 block uppercase">Project Progress</span>
                <span className="text-xl font-bold text-[#FDFBF7] mt-1 block">62.5%</span>
              </div>
            </div>

            {/* Progress Bar (Maroon & Cream) */}
            <div className="w-full bg-[#0C0A09] h-3 rounded-full overflow-hidden border border-[#2B2627]">
              <div className="bg-gradient-to-r from-[#7A1428] via-[#B82B46] to-[#EADCC8] h-full rounded-full w-[62.5%]"></div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EADCC8]/70">
              <span>Verified and monitored under GDA Transparency Portal guidelines.</span>
              <Link
                href="/pay?purpose=water-project"
                className="font-bold text-[#FDFBF7] hover:text-[#EADCC8] underline"
              >
                Sponsor this Project Online →
              </Link>
            </div>
          </div>

          {/* 3 REVENUE CHANNELS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#171415] border border-[#2B2627] hover:border-[#7A1428] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#3D0A14] text-[#FDFBF7] border border-[#7A1428] flex items-center justify-center font-bold text-lg mb-4">
                  01
                </div>
                <h4 className="text-lg font-bold text-[#FDFBF7]">Annual Membership Dues</h4>
                <p className="text-xs text-[#EADCC8]/70 mt-2 leading-relaxed">
                  Active participation begins with your civic contribution. Generates steady institutional strength to support student bursaries and youth development.
                </p>
              </div>
              <Link
                href="/pay?purpose=dues"
                className="mt-6 text-xs uppercase tracking-wider font-bold text-[#D94F68] hover:text-[#FDFBF7] inline-flex items-center gap-1"
              >
                Pay Annual Dues →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-[#171415] border border-[#2B2627] hover:border-[#7A1428] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#3D0A14] text-[#FDFBF7] border border-[#7A1428] flex items-center justify-center font-bold text-lg mb-4">
                  02
                </div>
                <h4 className="text-lg font-bold text-[#FDFBF7]">GDA Diaspora Network</h4>
                <p className="text-xs text-[#EADCC8]/70 mt-2 leading-relaxed">
                  Connecting Kagoro indigenes across the UK, USA, Europe, and beyond. Facilitates direct project adoption, medical missions, and diaspora philanthropy.
                </p>
              </div>
              <Link
                href="/register"
                className="mt-6 text-xs uppercase tracking-wider font-bold text-[#D94F68] hover:text-[#FDFBF7] inline-flex items-center gap-1"
              >
                Join Diaspora Network →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-[#171415] border border-[#2B2627] hover:border-[#7A1428] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#3D0A14] text-[#FDFBF7] border border-[#7A1428] flex items-center justify-center font-bold text-lg mb-4">
                  03
                </div>
                <h4 className="text-lg font-bold text-[#FDFBF7]">Afan Festival Partnerships</h4>
                <p className="text-xs text-[#EADCC8]/70 mt-2 leading-relaxed">
                  Commercial vendors, cultural artisans, and corporate sponsors partnering for Northern Nigeria&apos;s premier cultural hill-climbing celebration.
                </p>
              </div>
              <Link
                href="/pay?purpose=afan-vendor"
                className="mt-6 text-xs uppercase tracking-wider font-bold text-[#D94F68] hover:text-[#FDFBF7] inline-flex items-center gap-1"
              >
                Book Vendor Stall →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="mt-auto border-t border-[#2B2627] bg-[#0C0A09] py-12 px-4 sm:px-6 lg:px-8 text-[#EADCC8]/60 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left flex items-center gap-3">
            <Logo size="sm" />
            <div>
              <span className="text-[#FDFBF7] font-bold block text-sm">
                Gwòròg Development Association (GDA)
              </span>
              <p className="mt-0.5">Official Digital Community &amp; Administrative Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#FDFBF7] transition-colors">About</Link>
            <Link href="/history" className="hover:text-[#FDFBF7] transition-colors">History</Link>
            <Link href="/transparency" className="hover:text-[#FDFBF7] transition-colors">Transparency</Link>
            <Link href="/contact" className="hover:text-[#FDFBF7] transition-colors">Contact</Link>
            <Link href="/login" className="hover:text-[#FDFBF7] transition-colors">Member Portal</Link>
          </div>
          <div className="text-center md:text-right">
            <p>&copy; 2026 GDA. All Rights Reserved.</p>
            <p className="text-[10px] text-[#EADCC8]/40 mt-1">Colors of Gwòròg: Cream • Black • Maroon</p>
          </div>
        </div>
      </footer>

    </div>
  );
}