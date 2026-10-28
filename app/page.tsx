"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// EMBOSSED GDA SEAL COMPONENT (3D Beveled Shadow)
function EmbossedLogo({ size = 52 }: { size?: number }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      style={{ width: size, height: size }}
      className="relative rounded-full p-1 flex items-center justify-center 
        bg-gradient-to-br from-[#9E1B32] via-[#5C0A19] to-[#1A0307] 
        border-2 border-[#F5EBE1]/60 
        shadow-[inset_0_2px_5px_rgba(255,255,255,0.45),_0_6px_14px_rgba(0,0,0,0.85)] 
        transition-transform duration-300 hover:scale-105 shrink-0"
      title="Gwòròg Development Association"
    >
      {!imageError ? (
        <img
          src="/Logo (2).PNG"
          alt="GDA Crest"
          className="w-full h-full object-contain rounded-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-black text-xs tracking-wider text-[#FDFBF7] drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
          GDA
        </span>
      )}
    </div>
  );
}

export default function HomePage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          if (db) {
            const docRef = doc(db, "users", user.uid);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
              setUserRole(snap.data().role || "member");
            }
          }
        } catch (error) {
          console.error("Error reading role:", error);
          setUserRole("member");
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const isSuperAdmin =
    userRole === "super_admin" ||
    userRole === "secretariat" ||
    userRole === "admin";

  return (
    <div className="flex flex-col font-sans selection:bg-[#7A1428] selection:text-[#FDFBF7] bg-[#0A0A0A] text-[#FDFBF7] min-h-screen">
      {/* 1. TICKER BAR */}
      <div className="bg-[#5C0A19] text-[#FDFBF7] py-3.5 border-b-2 border-[#8A1A31] overflow-hidden relative w-full shadow-xl">
        <style>{`
          @keyframes scrollLeftToRight {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100vw); }
          }
          .ticker-scroll {
            display: inline-block;
            white-space: nowrap;
            animation: scrollLeftToRight 26s linear infinite;
            font-size: 1.05rem;
            font-weight: 800;
            letter-spacing: 0.02em;
          }
          .ticker-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="ticker-scroll cursor-pointer" title="Hover to pause">
          <span className="inline-block px-3 py-1 rounded bg-[#7A1428] border border-[#F5EBE1]/40 text-[#FDFBF7] mr-3 uppercase text-xs font-black shadow-inner">
            📢 Official Notice:
          </span>
          Preparation for the upcoming Afan National Festival 2027 is on &amp; Annual Membership Registration is on now.
          <span className="mx-8 text-[#EADCC8] font-bold">•</span>
          <span className="inline-block px-3 py-1 rounded bg-[#7A1428] border border-[#F5EBE1]/40 text-[#FDFBF7] mr-3 uppercase text-xs font-black shadow-inner">
            📢 Official Notice:
          </span>
          Every Gwòròg son and daughter is invited to register and verify their digital identity.
        </div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="border-b border-[#262223] sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center gap-3">
            <EmbossedLogo size={48} />
            <div>
              <span className="text-base sm:text-lg font-black tracking-wide text-[#FDFBF7] block leading-tight">
                Gwòròg Development Association
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#EADCC8]/60 uppercase block">
                Kagoro • Unity • Progress • Heritage
              </span>
            </div>
          </Link>

          {/* Menu Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-semibold text-[#EADCC8] hover:text-white transition">
              Home
            </Link>
            <Link href="/about" className="text-sm font-semibold text-[#EADCC8]/80 hover:text-white transition">
              About GDA
            </Link>
            <Link href="/history" className="text-sm font-semibold text-[#EADCC8]/80 hover:text-white transition">
              History & Heritage
            </Link>
            <Link href="/transparency" className="text-sm font-semibold text-[#EADCC8]/80 hover:text-white transition">
              Transparency
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-[#EADCC8]/80 hover:text-white transition">
              Contact
            </Link>

            {/* 🔥 SUPER ADMIN TAB: Renders only for super_admin or secretariat */}
            {isSuperAdmin && (
              <Link
                href="/super-admin"
                className="bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider hover:bg-amber-300 transition-all flex items-center gap-1 shadow-md border border-amber-300 animate-pulse"
              >
                <span>🛡️</span>
                <span>Super Admin</span>
              </Link>
            )}
          </nav>

          {/* Right Buttons: Sign In / Join GDA / Dashboard */}
          <div className="flex items-center gap-3">
            {!currentUser ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-bold text-white bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
                >
                  SIGN IN
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#7A1428] rounded-lg hover:bg-[#8f1930] transition shadow-md"
                >
                  JOIN GDA
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="px-4 py-2 text-xs font-bold text-[#EADCC8] bg-white/5 border border-[#EADCC8]/30 rounded-lg hover:bg-white/10 transition"
              >
                MY DASHBOARD
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1F040A] via-[#0A0A0A] to-[#0A0A0A]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#38050E] border border-[#7A1428] text-[#FDFBF7] text-xs font-bold uppercase tracking-widest mb-6 shadow-md">
            Preserving Heritage • Fostering Self-Reliance
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-[#FDFBF7] tracking-tight leading-tight sm:leading-none">
            Empowering the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E0526C] via-[#FDFBF7] to-[#EADCC8]">
              Gwòròg Nation
            </span>{" "}
            for Sustainable Progress
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#EADCC8]/85 max-w-2xl mx-auto leading-relaxed">
            The umbrella socio-cultural organization for all sons, daughters, and friends of Kagoro. Uniting our branches, youth, women, and diaspora network under one purposeful vision.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="px-6 py-3.5 bg-[#7A1428] hover:bg-[#5C0A19] text-[#FDFBF7] font-bold text-sm uppercase tracking-wider rounded-xl shadow-xl hover:shadow-[#7A1428]/50 border border-[#9E1B32] transition-all transform active:scale-95"
            >
              Register as a Member
            </Link>
            <Link
              href="/login"
              className="px-6 py-3.5 bg-[#141212] hover:bg-[#1F1C1D] text-[#FDFBF7] border border-[#332D2F] font-bold text-sm uppercase tracking-wider rounded-xl transition-all"
            >
              Access Member Portal
            </Link>
          </div>
        </div>
      </section>

      {/* 4. GDA REVENUE & SUSTAINABILITY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#262223] bg-[#121011]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-black tracking-widest text-[#E0526C]">
              Community Funding &amp; Accountability
            </h2>
            <p className="mt-2 text-3xl font-black text-[#FDFBF7]">
              GDA Sustainable Development Pillars
            </p>
            <p className="mt-3 text-sm text-[#EADCC8]/75">
              Transparent projects directly supported through annual dues, community sponsors, and our global diaspora network.
            </p>
          </div>

          {/* PROJECT FUNDING PROGRESS CARD */}
          <div className="mb-14 p-8 rounded-2xl bg-[#171415] border border-[#383133] shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#262223]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-[#38050E] text-[#FDFBF7] border border-[#7A1428]">
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
              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#262223]">
                <span className="text-xs text-[#EADCC8]/70 block uppercase">Raised So Far</span>
                <span className="text-xl font-bold text-[#FDFBF7] mt-1 block">₦6,250,000</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#262223]">
                <span className="text-xs text-[#EADCC8]/70 block uppercase">Balance Needed</span>
                <span className="text-xl font-bold text-[#E0526C] mt-1 block">₦3,750,000</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#262223]">
                <span className="text-xs text-[#EADCC8]/70 block uppercase">Project Progress</span>
                <span className="text-xl font-bold text-[#FDFBF7] mt-1 block">62.5%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#0A0A0A] h-3 rounded-full overflow-hidden border border-[#262223]">
              <div className="bg-gradient-to-r from-[#7A1428] via-[#A8203B] to-[#FDFBF7] h-full rounded-full w-[62.5%]"></div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EADCC8]/75">
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
            <div className="p-6 rounded-2xl bg-[#171415] border border-[#262223] hover:border-[#7A1428] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#38050E] text-[#FDFBF7] border border-[#7A1428] flex items-center justify-center font-bold text-lg mb-4">
                  01
                </div>
                <h4 className="text-lg font-bold text-[#FDFBF7]">Annual Membership Dues</h4>
                <p className="text-xs text-[#EADCC8]/75 mt-2 leading-relaxed">
                  Active participation begins with your civic contribution. Generates steady institutional strength to support student bursaries and youth development.
                </p>
              </div>
              <Link
                href="/pay?purpose=dues"
                className="mt-6 text-xs uppercase tracking-wider font-bold text-[#E0526C] hover:text-[#FDFBF7] inline-flex items-center gap-1"
              >
                Pay Annual Dues →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-[#171415] border border-[#262223] hover:border-[#7A1428] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#38050E] text-[#FDFBF7] border border-[#7A1428] flex items-center justify-center font-bold text-lg mb-4">
                  02
                </div>
                <h4 className="text-lg font-bold text-[#FDFBF7]">GDA Diaspora Network</h4>
                <p className="text-xs text-[#EADCC8]/75 mt-2 leading-relaxed">
                  Connecting Kagoro indigenes across the UK, USA, Europe, and beyond. Facilitates direct project adoption, medical missions, and diaspora philanthropy.
                </p>
              </div>
              <Link
                href="/register"
                className="mt-6 text-xs uppercase tracking-wider font-bold text-[#E0526C] hover:text-[#FDFBF7] inline-flex items-center gap-1"
              >
                Join Diaspora Network →
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-[#171415] border border-[#262223] hover:border-[#7A1428] transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#38050E] text-[#FDFBF7] border border-[#7A1428] flex items-center justify-center font-bold text-lg mb-4">
                  03
                </div>
                <h4 className="text-lg font-bold text-[#FDFBF7]">Afan Festival Partnerships</h4>
                <p className="text-xs text-[#EADCC8]/75 mt-2 leading-relaxed">
                  Commercial vendors, cultural artisans, and corporate sponsors partnering for Northern Nigeria&apos;s premier cultural hill-climbing celebration.
                </p>
              </div>
              <Link
                href="/pay?purpose=afan-vendor"
                className="mt-6 text-xs uppercase tracking-wider font-bold text-[#E0526C] hover:text-[#FDFBF7] inline-flex items-center gap-1"
              >
                Book Vendor Stall →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="mt-auto border-t border-[#262223] bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8 text-[#EADCC8]/60 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left flex items-center gap-3">
            <EmbossedLogo size={40} />
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