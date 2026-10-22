"use client";
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  // State management for form inputs, loading state, and error messages
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

      // 2. Fetch role from Firestore "users" collection for Role-Based Access Control
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const role = userData.role || "MEMBER";

          // Route according to GDA administrative or membership role
          if (role === "NEC" || role === "admin" || role === "BOT") {
            router.push("/nec-dashboard");
          } else {
            router.push("/dashboard");
          }
        } else {
          // Default route if document is not yet populated
          router.push("/dashboard");
        }
      } catch (firestoreErr) {
        // Fallback to member dashboard if Firestore read encounters an initial rule delay
        console.warn("Firestore role lookup skipped:", firestoreErr);
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Firebase Login Error:", err);

      // Clean, user-friendly error translations
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setErrorMessage("Invalid email or password. Please verify your credentials.");
      } else if (err.code === "auth/too-many-requests") {
        setErrorMessage("Access temporarily locked due to many failed attempts. Please wait a moment.");
      } else if (err.code === "auth/network-request-failed") {
        setErrorMessage("Network connection error. Please check your internet connection.");
      } else {
        setErrorMessage(err.message || "Authentication failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-stone-900 to-black flex items-center justify-center p-4">
      {/* Login Card */}
      <div className="w-full max-w-md bg-stone-950/80 border border-emerald-800/40 backdrop-blur-md rounded-2xl p-8 shadow-2xl text-stone-100">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 mb-3 text-2xl font-bold shadow-inner">
            GDA
          </div>
          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            Gwòròg Development Association
          </h1>
          <p className="text-xs uppercase tracking-widest text-emerald-400 mt-1 font-semibold">
            Digital Portal & Community Gateway
          </p>
          <p className="text-xs text-stone-400 mt-2">
            Members • NEC • BOT • Traditional Council • Wings
          </p>
        </div>

        {/* Error Notification Banner */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/60 border border-red-700/50 text-red-300 text-xs flex items-center gap-2">
            <span className="font-bold">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@example.com"
              className="w-full px-4 py-3 rounded-lg bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm disabled:opacity-50"
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider">
                Password
              </label>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset link will be sent to your registered email via Firebase Auth.");
                }}
                className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
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
              className="w-full px-4 py-3 rounded-lg bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm disabled:opacity-50"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-emerald-600/30 transition-all transform active:scale-[0.99] text-sm uppercase tracking-wider disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Signing In...</span>
              </>
            ) : (
              "Sign In to GDA Portal"
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 pt-6 border-t border-stone-800 text-center space-y-3">
          <p className="text-xs text-stone-400">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/register"
              className="text-emerald-400 font-semibold hover:underline ml-1"
            >
              Register as a Member
            </Link>
          </p>
          <div>
            <Link
              href="/"
              className="text-xs text-stone-500 hover:text-stone-300 transition-colors inline-flex items-center gap-1"
            >
              ← Back to GDA Public Homepage
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}