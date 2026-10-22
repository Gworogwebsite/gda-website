"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <Link href="/history" className="hover:text-emerald-400 transition-colors">History</Link>
            <Link href="/contact" className="text-emerald-400 font-bold">Contact</Link>
            <Link href="/login" className="px-3 py-1.5 rounded-lg border border-stone-700 text-xs font-semibold hover:border-emerald-500">Sign In</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Get in Touch</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-2">
            Contact GDA National Secretariat
          </h1>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            Reach out to the executive leadership for partnership inquiries, Afan Festival vendor registration, or diaspora collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details Card */}
          <div className="p-8 rounded-2xl bg-stone-900 border border-stone-800 space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-stone-800 pb-4">
              National Secretariat &amp; Official Offices
            </h2>

            <div className="space-y-5 text-sm text-stone-300">
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-lg">📍</span>
                <div>
                  <strong className="text-white block">Headquarters:</strong>
                  GDA National Secretariat, Kagoro Chiefdom,<br />
                  Kaura Local Government Area, Kaduna State, Nigeria.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-lg">✉️</span>
                <div>
                  <strong className="text-white block">Email:</strong>
                  secretariat@gworogda.org / info@gworogda.org
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-lg">📞</span>
                <div>
                  <strong className="text-white block">Official Contact Lines:</strong>
                  +234 (0) 800 000 0000 / +234 (0) 700 000 0000
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-lg">🏔️</span>
                <div>
                  <strong className="text-white block">Afan Festival Desk:</strong>
                  Inquiries regarding festival stalls, tourism, and partnerships.
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="p-8 rounded-2xl bg-stone-900/70 border border-stone-800">
            <h2 className="text-xl font-bold text-white mb-6">Send an Official Message</h2>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-sm text-center space-y-3">
                <span className="text-2xl block">✅</span>
                <p className="font-bold">Thank you for your message!</p>
                <p className="text-xs text-stone-300">
                  The GDA Secretariat has received your inquiry and will respond to your email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-300 uppercase tracking-wider mb-1 font-medium">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Bitrus Luka"
                    className="w-full px-4 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 uppercase tracking-wider mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 uppercase tracking-wider mb-1 font-medium">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Afan Festival Sponsorship / Membership Query"
                    className="w-full px-4 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 uppercase tracking-wider mb-1 font-medium">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg uppercase tracking-wider shadow-md transition-all text-xs"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
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