"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // points to app/firebase.js

export default function Navigation() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUserRole(data.role || "member");
          }
        } catch (err) {
          console.error("Error reading role:", err);
          setUserRole("member");
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isPrivileged =
    userRole === "super_admin" ||
    userRole === "secretariat" ||
    userRole === "admin";

  return (
    <nav className="bg-[#0f2e1b] border-b border-[#EADCC8]/20 px-6 py-4 text-white flex items-center justify-between">
      {/* Brand & Left Navigation Links */}
      <div className="flex items-center gap-6">
        <Link href="/" className="font-extrabold text-lg text-[#EADCC8] tracking-tight">
          GDA National
        </Link>
        <Link href="/" className="text-sm hover:text-[#EADCC8] transition">
          Home
        </Link>
        <Link href="/about" className="text-sm hover:text-[#EADCC8] transition">
          About GDA
        </Link>
        <Link href="/history" className="text-sm hover:text-[#EADCC8] transition">
          History & Heritage
        </Link>
        <Link href="/transparency" className="text-sm hover:text-[#EADCC8] transition">
          Transparency
        </Link>
        <Link href="/contact" className="text-sm hover:text-[#EADCC8] transition">
          Contact
        </Link>
      </div>

      {/* Right Action Links */}
      <div className="flex items-center gap-3">
        {/* 🔥 SUPER ADMIN TAB: Only renders if logged in as super_admin, secretariat, or admin */}
        {!loading && isPrivileged && (
          <Link
            href="/super-admin"
            className="flex items-center gap-1.5 bg-amber-400 text-black font-black text-xs px-3 py-1.5 rounded-lg shadow-md hover:bg-amber-300 transition-all border border-amber-200 uppercase tracking-wider"
          >
            <span>🛡️</span>
            <span>Super Admin</span>
          </Link>
        )}

        {!currentUser ? (
          <>
            <Link
              href="/login"
              className="text-xs bg-black/40 border border-[#EADCC8]/30 px-3 py-1.5 rounded-lg hover:bg-white/10 font-bold"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-xs bg-[#8B1E3F] text-white px-3.5 py-1.5 rounded-lg hover:bg-[#a02349] font-bold"
            >
              Join GDA
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="text-xs border border-[#EADCC8]/40 px-3 py-1.5 rounded-lg hover:bg-[#EADCC8]/10 text-[#EADCC8] font-bold"
            >
              My Dashboard
            </Link>
            <button
              onClick={() => signOut(auth)}
              className="text-xs text-rose-300 hover:text-rose-100 font-semibold px-2 py-1"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}