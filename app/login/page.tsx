"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      // 1. Authenticate user credentials with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // 2. Fetch role from Firestore for Role-Based Routing
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const role = userData.role || "MEMBER";

          // Route according to assigned authority:
          if (role === "SUPER_ADMIN") {
            router.push("/super-admin");
          } else if (role === "NEC" || role === "admin" || role === "BOT") {
            router.push("/nec-dashboard");
          } else {
            router.push("/dashboard");
          }
        } else {
          router.push("/dashboard");
        }
      } catch (firestoreErr) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      // Clean inline user messages without triggering dev console overlay
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setErrorMessage("Invalid email or password. Please verify credentials or register first.");
      } else if (err.code === "auth/too-many-requests") {
        setErrorMessage("Access temporarily locked due to many attempts. Please wait a moment.");
      } else {
        setErrorMessage("Authentication failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FDFBF7] flex items-center justify-center p-4">
      {/* Login Card in Gwòròg Maroon, Black, and Cream */}
      <div className="w-full max-w-md bg-[#141212] border border-[#383133] rounded-2xl p-8 shadow-2xl">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#38050E] border-2 border-[#7A1428] text-[#FDFBF7] mb-3 text-2xl font-black shadow-lg">
            GDA
          </div>
          <h1 className="text-2xl font-black tracking-wide text-[#FDFBF7]">
            Gwòròg Development Association
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#E0526C] mt-1 font-bold">
            Portal Gateway &amp; Leadership Access
          </p>
          <p className="text-xs text-[#EADCC8]/60 mt-1">
            Super Admin • NEC • BOT • Traditional Council • Members
          </p>
        </div>

        {/* Error Notification Banner */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-lg bg-[#38050E] border border-[#7A1428] text-[#FDFBF7] text-xs flex items-center gap-2">
            <span className="font-bold">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#EADCC8] uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@example.com"
              className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-[#383133] text-[#FDFBF7] placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-[#7A1428] text-sm disabled:opacity-50"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-[#EADCC8] uppercase tracking-wider">
                Password
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset instructions will be sent to your registered email.");
                }}
                className="text-xs text-[#E0526C] hover:text-[#FDFBF7] transition-colors"
              >
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-[#0A0A0A] border border-[#383133] text-[#FDFBF7] placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-[#7A1428] text-sm disabled:opacity-50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#7A1428] hover:bg-[#5C0A19] text-[#FDFBF7] font-bold rounded-lg shadow-lg hover:shadow-[#7A1428]/40 border border-[#9E1B32] transition-all text-xs uppercase tracking-wider disabled:opacity-60"
          >
            {loading ? "Verifying Credentials..." : "Sign In to GDA Portal"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-[#262223] text-center space-y-3">
          <p className="text-xs text-[#EADCC8]/70">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/register"
              className="text-[#E0526C] font-bold hover:underline ml-1"
            >
              Register as a Member
            </Link>
          </p>
          <div>
            <Link
              href="/"
              className="text-xs text-[#EADCC8]/50 hover:text-white transition-colors"
            >
              ← Back to GDA Public Homepage
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}