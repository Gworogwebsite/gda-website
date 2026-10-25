"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

interface UserProfile {
  fullName: string;
  email: string;
  phone?: string;
  district: string;
  wing: string;
  role: string;
  duesStatus: string;
  membershipStatus: string;
}

export default function MemberDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      setCurrentUser(user);

      try {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          setProfile({
            fullName: user.displayName || "Gwòròg Member",
            email: user.email || "",
            district: "General Chapter",
            wing: "General Member",
            role: "MEMBER",
            duesStatus: "Unpaid",
            membershipStatus: "Active",
          });
        }
      } catch (err) {
        console.error("Error reading profile:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-stone-200">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
        <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
          Loading GDA Member Portal...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      
      {/* 1. TOP DASHBOARD NAVIGATION */}
      <header className="border-b border-stone-800 bg-stone-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-extrabold flex items-center justify-center text-sm shadow-inner">
              GDA
            </div>
            <div>
              <span className="text-sm font-black tracking-wide text-white block leading-tight">
                GDA Member Portal
              </span>
              <span className="text-[10px] tracking-widest text-emerald-400 uppercase font-semibold block">
                Official Membership Gateway
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-stone-400 hover:text-stone-200 transition-colors hidden sm:block"
            >
              Public Website
            </Link>
            <button
              onClick={handleSignOut}
              className="px-3.5 py-1.5 rounded-lg border border-red-800/60 bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* 2. DASHBOARD BODY */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        {/* WELCOME BANNER & DIGITAL MEMBERSHIP ID */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-stone-900 to-stone-900 border border-emerald-800/50 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Verified Member
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Welcome, {profile?.fullName || "Distinguished Member"}
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              District: <span className="text-stone-200 font-semibold">{profile?.district}</span> • Wing: <span className="text-stone-200 font-semibold">{profile?.wing}</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-950/90 border border-emerald-700/40 text-right self-start md:self-auto">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 block">Digital Membership ID</span>
            <span className="text-lg font-mono font-black text-emerald-400 block mt-0.5">
              GDA-{currentUser?.uid ? currentUser.uid.substring(0, 8).toUpperCase() : "MEMBER"}
            </span>
            <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold border border-emerald-800/50">
              {profile?.membershipStatus || "Active"}
            </span>
          </div>
        </div>

        {/* 3 ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Annual Dues */}
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Annual Dues</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${profile?.duesStatus === "Paid" ? "bg-emerald-950 text-emerald-400 border border-emerald-700" : "bg-amber-950 text-amber-400 border border-amber-700"}`}>
                  {profile?.duesStatus || "Unpaid"}
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">₦2,000</h3>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                Your annual contribution sustains community water facilities, youth bursaries, and cultural programs.
              </p>
            </div>
            
            {profile?.duesStatus === "Paid" ? (
              <div className="mt-6 py-2.5 bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-center font-bold text-xs uppercase tracking-wider rounded-lg">
                ✓ Dues Paid for 2026
              </div>
            ) : (
              <Link
                href="/pay?purpose=dues"
                className="mt-6 block text-center w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md"
              >
                Pay Annual Dues Online (₦2,000)
              </Link>
            )}
          </div>

          {/* Card 2: Community Water Project */}
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Active Project</span>
                <span className="text-xs text-emerald-400 font-bold">62.5%</span>
              </div>
              <h3 className="text-base font-bold text-white">Kagoro Clean Water</h3>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                Solar borehole reticulation across Gwòròg communities. ₦6.25M raised of ₦10M target.
              </p>
            </div>
            <Link
              href="/pay?purpose=water-project"
              className="mt-6 block text-center w-full py-2.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
            >
              Sponsor Water Project
            </Link>
          </div>

          {/* Card 3: Afan Festival Desk */}
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">Afan Festival</span>
                <span className="text-xs text-amber-400 font-bold">Annual 1st Jan</span>
              </div>
              <h3 className="text-base font-bold text-white">Vendor &amp; Stall Permit</h3>
              <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                Book a commercial stall or sponsor cultural festival activities.
              </p>
            </div>
            <Link
              href="/pay?purpose=afan-vendor"
              className="mt-6 block text-center w-full py-2.5 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-600/40 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
            >
              Book Vendor Permit (₦15,000)
            </Link>
          </div>

        </div>

        {/* 4. REAL-TIME COMMUNITY NOTICEBOARD */}
        <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">
            Official Announcements for Members
          </h2>
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800/80">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white">General Congress &amp; NEC Quarterly Briefing</span>
                <span className="text-stone-500">Upcoming</span>
              </div>
              <p className="text-stone-400">
                All branch executives, youth leaders, and women wing delegates are requested to prepare their branch development briefs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800/80">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-white">Gwòròg Literacy &amp; Bible Translation Committee</span>
                <span className="text-stone-500">Active</span>
              </div>
              <p className="text-stone-400">
                Community review sessions for the Gwòròg language orthography dictionary continue at the Kagoro Secretariat.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-stone-800 bg-stone-950 py-6 px-4 text-center text-stone-600 text-xs">
        <p>&copy; 2026 Gwòròg Development Association (GDA) • Member Protected Session</p>
      </footer>
    </div>
  );
}