"use client";

import React from "react";
import Link from "next/link";

export default function HistoryPage() {
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
            <Link href="/about" className="hover:text-emerald-400 transition-colors">About</Link>
            <Link href="/history" className="text-emerald-400 font-bold">History</Link>
            <Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link>
            <Link href="/login" className="px-3 py-1.5 rounded-lg border border-stone-700 text-xs font-semibold hover:border-emerald-500">Sign In</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Sacred Heritage</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-2">
            History of the Gwòròg (Kagoro) People
          </h1>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            The story of bravery, the natural fortress of the Kagoro Hills, and a rich legacy of peaceful coexistence.
          </p>
        </div>

        {/* Narrative Articles */}
        <div className="space-y-12 text-stone-300 text-sm sm:text-base leading-relaxed">
          
          <section className="p-8 rounded-2xl bg-stone-900/70 border border-stone-800">
            <h2 className="text-2xl font-bold text-white mb-4">Origins &amp; The Sanctuary of the Hills</h2>
            <p className="mb-4 text-stone-400">
              The Gwòròg people, widely known across modern Nigeria as the Kagoro, are situated around the breathtaking Kagoro Hills in Southern Kaduna. For centuries, the massive rock formations and caves of the hills provided a natural fortress that shielded the community against historical incursions and slave raids.
            </p>
            <p className="text-stone-400">
              Living atop and around the hills fostered a resilient, agrarian lifestyle deeply centered on community solidarity, mutual assistance (daza), and reverence for the natural landscape.
            </p>
          </section>

          <section className="p-8 rounded-2xl bg-stone-900/70 border border-stone-800">
            <h2 className="text-2xl font-bold text-white mb-4">The Afan National Festival</h2>
            <p className="mb-4 text-stone-400">
              &ldquo;Afan&rdquo; translates to &ldquo;mountain&rdquo; or &ldquo;hill&rdquo; in the Gwòròg language. The Afan Festival is a historic cultural celebration held every 1st of January to mark the conquest of the hills, celebrate the close of the harvest season, and usher in the New Year.
            </p>
            <p className="text-stone-400">
              Historically initiated when the people descended from the hilltop settlements to the lower plains, the festival has grown into one of Northern Nigeria&apos;s oldest and most prestigious cultural carnivals, featuring traditional dances, royal displays, hunting rituals, and mountaineering.
            </p>
          </section>

          <section className="p-8 rounded-2xl bg-stone-900/70 border border-stone-800">
            <h2 className="text-2xl font-bold text-white mb-4">Traditional Leadership &amp; Continuity</h2>
            <p className="mb-4 text-stone-400">
              Under the revered leadership of the Gwòròg Traditional Council led by His Highness the Chief of Kagoro, the chiefdom transitioned into an educational and cultural beacon in Northern Nigeria.
            </p>
            <p className="text-stone-400">
              The Gwòròg Development Association (GDA) operates hand-in-hand with the traditional authority to ensure that modern advancements in technology and development stay rooted in timeless cultural pride.
            </p>
          </section>

        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-xs text-stone-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1 font-semibold"
          >
            &larr; Back to GDA Homepage
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-950 py-8 px-4 text-center text-stone-500 text-xs">
        <p>&copy; 2026 Gwòròg Development Association (GDA). All Rights Reserved.</p>
      </footer>
    </div>
  );
}