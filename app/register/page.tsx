"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

export default function RegisterPage() {
  const router = useRouter();

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("Fadan Kagoro");
  const [wing, setWing] = useState("General Member");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validation checks
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Auth Account in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCredential.user;

      // 2. Create User Profile Document in Firestore ('users' collection)
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        district: district,
        wing: wing,
        role: "MEMBER",
        duesStatus: "Unpaid",
        membershipStatus: "Pending Approval", // <-- ENSURE THIS SAYS "Pending Approval"
        createdAt: serverTimestamp(),
      });

      setSuccessMessage("Registration successful! Redirecting to your dashboard...");

      // 3. Short delay so user can see success message before routing
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      console.error("Registration Error:", err);

      if (err.code === "auth/email-already-in-use") {
        setErrorMessage("This email is already registered. Please sign in instead.");
      } else if (err.code === "auth/invalid-email") {
        setErrorMessage("Please enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setErrorMessage("The password is too weak. Please use at least 6 characters.");
      } else {
        setErrorMessage(err.message || "Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-stone-900 to-black flex items-center justify-center p-4 py-12">
      {/* Registration Card */}
      <div className="w-full max-w-xl bg-stone-950/85 border border-emerald-800/40 backdrop-blur-md rounded-2xl p-8 shadow-2xl text-stone-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 mb-3 text-xl font-bold shadow-inner">
            GDA
          </div>
          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            GDA Membership Registration
          </h1>
          <p className="text-xs uppercase tracking-widest text-emerald-400 mt-1 font-semibold">
            Gwòròg Development Association
          </p>
          <p className="text-xs text-stone-400 mt-1">
            Join the collective community platform for heritage, unity, and progress
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/70 border border-red-700/60 text-red-300 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Notification */}
        {successMessage && (
          <div className="mb-5 p-3 rounded-lg bg-emerald-950/70 border border-emerald-600/60 text-emerald-300 text-xs flex items-center gap-2">
            <span>✅</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              disabled={loading}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Bitrus Luka"
              className="w-full px-4 py-2.5 rounded-lg bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm disabled:opacity-50"
            />
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@example.com"
                className="w-full px-4 py-2.5 rounded-lg bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                disabled={loading}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                className="w-full px-4 py-2.5 rounded-lg bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm disabled:opacity-50"
              />
            </div>
          </div>

          {/* District & Wing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1">
                District / Chapter
              </label>
              <select
                disabled={loading}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-stone-900/90 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm disabled:opacity-50"
              >
                <option value="Fadan Kagoro">Fadan Kagoro</option>
                <option value="Agbam">Agbam</option>
                <option value="Dusai">Dusai</option>
                <option value="Madaki">Madaki</option>
                <option value="Uguwan Gaiya">Uguwan Gaiya</option>
                <option value="Malagum">Malagum</option>
                <option value="Gidan Waya Branch">Gidan Waya Branch</option>
                <option value="Kaduna Chapter">Kaduna Chapter</option>
                <option value="Abuja Chapter">Abuja Chapter</option>
                <option value="Jos Chapter">Jos Chapter</option>
                <option value="Diaspora / International">Diaspora / International</option>
                <option value="Other">Other Branch</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1">
                Membership Wing
              </label>
              <select
                disabled={loading}
                value={wing}
                onChange={(e) => setWing(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-stone-900/90 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm disabled:opacity-50"
              >
                <option value="General Member">General Member</option>
                <option value="Youth Wing">Youth Wing</option>
                <option value="Women Wing">Women Wing</option>
                <option value="Student Wing">Student Wing</option>
                <option value="Diaspora Network">Diaspora Network</option>
                <option value="Elders / Advisory">Elders / Advisory</option>
              </select>
            </div>
          </div>

          {/* Password & Confirm Password Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-2.5 rounded-lg bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 uppercase tracking-wider mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                required
                disabled={loading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full px-4 py-2.5 rounded-lg bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm disabled:opacity-50"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-emerald-600/30 transition-all transform active:scale-[0.99] text-sm uppercase tracking-wider disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Creating Member Profile...</span>
              </>
            ) : (
              "Complete GDA Registration"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-stone-800 text-center space-y-2">
          <p className="text-xs text-stone-400">
            Already registered?{" "}
            <Link
              href="/login"
              className="text-emerald-400 font-semibold hover:underline ml-1"
            >
              Sign In here
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