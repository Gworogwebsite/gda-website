"use client";
import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      
      {/* Header / Nav */}
      <header className="border-b border-stone-800 bg-stone-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-extrabold flex items-center justify-center text-base">
              GDA
            </div>
            <span className="text-base font-black tracking-wide text-white">Gwòròg Dev. Assoc.</span>
          </Link>
          <nav className="flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-300">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <Link href="/about" className="text-emerald-400 font-bold">About</Link>
            <Link href="/history" className="hover:text-emerald-400 transition-colors">History</Link>
            <Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link>
            <Link href="/login" className="px-3 py-1.5 rounded-lg border border-stone-700 text-xs font-semibold hover:border-emerald-500">Sign In</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Who We Are</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-2">
            About Gwòròg Development Association
          </h1>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            The umbrella socio-cultural development body for all sons, daughters, and friends of Kagoro Chiefdom at home and in the diaspora.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-stone-900 border border-stone-800">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-4">
              🎯
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Our Mission</h2>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              To unite the Gwòròg people, preserve our rich cultural heritage, promote socio-economic self-reliance, and implement sustainable community infrastructure projects in health, education, and youth empowerment.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-stone-900 border border-stone-800">
            <div className="w-10 h-10 rounded-lg bg-teal-600/20 text-teal-400 flex items-center justify-center font-bold text-lg mb-4">
              🔭
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Our Vision</h2>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              A peaceful, prosperous, and culturally vibrant Gwòròg nation recognized globally for tourism excellence, academic leadership, and community solidarity.
            </p>
          </div>
        </div>

        {/* Organizational Structure */}
        <div className="p-8 rounded-2xl bg-stone-900/60 border border-emerald-800/30 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">GDA Governance Structure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs text-stone-300">
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
              <h3 className="font-bold text-emerald-400 text-sm mb-1">National Executive (NEC)</h3>
              <p className="text-stone-400 leading-relaxed">Executive administration elected to direct programs, financial stewardship, and branch coordination.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
              <h3 className="font-bold text-teal-400 text-sm mb-1">Board of Trustees (BOT)</h3>
              <p className="text-stone-400 leading-relaxed">Constitutional custodians providing oversight, strategic advice, and asset management.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
              <h3 className="font-bold text-amber-400 text-sm mb-1">Traditional Council</h3>
              <p className="text-stone-400 leading-relaxed">Synergy with His Highness the Chief of Kagoro, title holders, district, village, and ward heads.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
              <h3 className="font-bold text-emerald-400 text-sm mb-1">Youth Wing</h3>
              <p className="text-stone-400 leading-relaxed">Grassroots action, sports development, vocational training, and security vigilance.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
              <h3 className="font-bold text-pink-400 text-sm mb-1">Women Wing</h3>
              <p className="text-stone-400 leading-relaxed">Economic empowerment, maternal health awareness, and cultural preservation.</p>
            </div>
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
              <h3 className="font-bold text-purple-400 text-sm mb-1">Diaspora Network</h3>
              <p className="text-stone-400 leading-relaxed">Mobilizing Gwòròg indigenes across continents for project funding, partnerships, and skills transfer.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/register"
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
          >
            Become a Registered GDA Member
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-950 py-8 px-4 text-center text-stone-500 text-xs">
        <p>© {new Date().getFullYear()} Gwòròg Development Association (GDA). All Rights Reserved.</p>
      </footer>
    </div>
  );
}