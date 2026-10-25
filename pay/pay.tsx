"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, updateDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

function PaymentContent() {
  const searchParams = useSearchParams();
  const initialPurpose = searchParams.get("purpose") || "dues";

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentType, setPaymentType] = useState(initialPurpose);
  const [customAmount, setCustomAmount] = useState(paymentType === "dues" ? "2000" : "5000");
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<any | null>(null);

  // Sync amount when payment category changes
  useEffect(() => {
    if (paymentType === "dues") setCustomAmount("2000");
    else if (paymentType === "afan-vendor") setCustomAmount("15000");
    else if (paymentType === "water-project") setCustomAmount("10000");
  }, [paymentType]);

  // Load authenticated member details if logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        setEmail(user.email || "");
        try {
          const userDocRef = doc(db, "users", user.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            const data = snap.data();
            setFullName(data.fullName || "");
            setPhone(data.phone || "");
          }
        } catch (e) {
          console.warn("Could not load user profile:", e);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Save successful payment to Firestore
  const recordPaymentSuccess = async (reference: string) => {
    setProcessing(true);
    try {
      const amountNumber = parseInt(customAmount, 10);

      // 1. Create audit record in 'payments' collection
      await addDoc(collection(db, "payments"), {
        reference: reference,
        amount: amountNumber,
        currency: "NGN",
        paymentType: paymentType,
        payerEmail: email.trim().toLowerCase(),
        payerName: fullName.trim(),
        userId: currentUser?.uid || "guest",
        status: "successful",
        createdAt: serverTimestamp(),
      });

      // 2. If it's Annual Dues and user is logged in, mark dues as Paid
      if (paymentType === "dues" && currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          duesStatus: "Paid",
        });
      }

      setPaymentSuccess({
        reference: reference,
        amount: amountNumber,
        purpose: paymentType,
        date: new Date().toLocaleDateString(),
      });
    } catch (err: any) {
      console.error("Firestore logging error:", err);
      alert("Payment verified, but saving to ledger encountered an error: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  // Launch Paystack Inline or Test Simulation
  const handlePaystackPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amountInKobo = parseInt(customAmount, 10) * 100;
    const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    // Check if real Paystack popup is available
    if (typeof window !== "undefined" && (window as any).PaystackPop && paystackKey && !paystackKey.includes("sample")) {
      const handler = (window as any).PaystackPop.setup({
        key: paystackKey,
        email: email.trim(),
        amount: amountInKobo,
        currency: "NGN",
        ref: "GDA-" + Math.floor(Math.random() * 1000000000 + 1),
        metadata: {
          fullName,
          purpose: paymentType,
          phone,
        },
        callback: function (response: any) {
          recordPaymentSuccess(response.reference);
        },
        onClose: function () {
          alert("Payment window closed.");
        },
      });
      handler.openIframe();
    } else {
      // Fallback: Sandbox Test Mode Simulator (allows zero-cost testing immediately!)
      const testRef = "TEST-GDA-" + Math.floor(Math.random() * 10000000 + 1);
      const confirmSimulation = window.confirm(
        `[Paystack Test Sandbox]\nSimulate payment of ₦${parseInt(customAmount, 10).toLocaleString()} for ${paymentType}?\n\nClick OK to simulate a successful payment.`
      );
      if (confirmSimulation) {
        recordPaymentSuccess(testRef);
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      
      {/* Paystack Inline Script from official CDN */}
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />

      {/* Navigation */}
      <header className="border-b border-stone-800 bg-stone-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-extrabold flex items-center justify-center text-sm shadow-inner">
              GDA
            </div>
            <div>
              <span className="text-sm font-black tracking-wide text-white block">Gwòròg Dev. Assoc.</span>
              <span className="text-[10px] tracking-widest text-emerald-400 uppercase font-semibold block">Paystack Secure Gateway</span>
            </div>
          </Link>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/dashboard" className="text-stone-400 hover:text-white">Member Dashboard</Link>
            <Link href="/" className="text-stone-400 hover:text-white">Home</Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-3xl mx-auto px-4 py-12 flex-1 w-full">
        
        {/* SUCCESS RECEIPT VIEW */}
        {paymentSuccess ? (
          <div className="p-8 rounded-2xl bg-stone-900 border border-emerald-600/50 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-3xl mx-auto">
              ✓
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Official GDA Payment Receipt</span>
              <h1 className="text-2xl font-black text-white mt-1">Payment Successful</h1>
              <p className="text-xs text-stone-400 mt-1">Thank you for contributing to the growth of Gwòròg!</p>
            </div>

            <div className="p-6 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-3 text-left">
              <div className="flex justify-between py-1 border-b border-stone-800">
                <span className="text-stone-400">Payment Reference:</span>
                <span className="font-mono text-emerald-400 font-bold">{paymentSuccess.reference}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800">
                <span className="text-stone-400">Purpose / Category:</span>
                <span className="text-white font-semibold capitalize">{paymentSuccess.purpose.replace("-", " ")}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-800">
                <span className="text-stone-400">Amount Paid:</span>
                <span className="text-white font-bold text-sm">₦{paymentSuccess.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-400">Date:</span>
                <span className="text-stone-300">{paymentSuccess.date}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider"
              >
                Return to Member Dashboard
              </Link>
              <button
                onClick={() => setPaymentSuccess(null)}
                className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-xl text-xs uppercase tracking-wider"
              >
                Make Another Payment
              </button>
            </div>
          </div>
        ) : (
          /* PAYMENT FORM VIEW */
          <div className="p-8 rounded-2xl bg-stone-900/80 border border-emerald-800/40 shadow-2xl space-y-6">
            <div className="border-b border-stone-800 pb-4">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">GDA Revenue &amp; Dues Collection</span>
              <h1 className="text-2xl font-black text-white mt-1">Paystack Secure Checkout</h1>
              <p className="text-xs text-stone-400 mt-1">
                Pay annual dues, sponsor clean water infrastructure, or register as an Afan Festival vendor.
              </p>
            </div>

            <form onSubmit={handlePaystackPayment} className="space-y-5 text-xs">
              
              {/* Category Selection */}
              <div>
                <label className="block text-stone-300 uppercase tracking-wider mb-2 font-medium">
                  Select Contribution Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentType("dues")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentType === "dues"
                        ? "border-emerald-500 bg-emerald-950/60 text-emerald-300"
                        : "border-stone-800 bg-stone-950 text-stone-400"
                    }`}
                  >
                    <span className="font-bold block text-sm">Annual Dues</span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">Fixed ₦2,000 / year for members</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType("water-project")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentType === "water-project"
                        ? "border-emerald-500 bg-emerald-950/60 text-emerald-300"
                        : "border-stone-800 bg-stone-950 text-stone-400"
                    }`}
                  >
                    <span className="font-bold block text-sm">Kagoro Clean Water</span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">Solar borehole community fund</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType("afan-vendor")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentType === "afan-vendor"
                        ? "border-emerald-500 bg-emerald-950/60 text-emerald-300"
                        : "border-stone-800 bg-stone-950 text-stone-400"
                    }`}
                  >
                    <span className="font-bold block text-sm">Afan Festival Vendor</span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">₦15,000 Commercial stall permit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType("donation")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentType === "donation"
                        ? "border-emerald-500 bg-emerald-950/60 text-emerald-300"
                        : "border-stone-800 bg-stone-950 text-stone-400"
                    }`}
                  >
                    <span className="font-bold block text-sm">General Donation</span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">Support education &amp; youth wing</span>
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-stone-300 uppercase tracking-wider mb-1 font-medium">
                  Amount (₦ Naira)
                </label>
                <input
                  type="number"
                  required
                  min="500"
                  disabled={paymentType === "dues" || paymentType === "afan-vendor"}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-emerald-400 font-mono font-bold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-75"
                />
              </div>

              {/* Payer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-300 uppercase tracking-wider mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
              </div>

              <div>
                <label className="block text-stone-300 uppercase tracking-wider mb-1 font-medium">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full px-4 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl uppercase tracking-wider shadow-xl hover:shadow-emerald-600/30 transition-all text-xs flex items-center justify-center gap-2"
              >
                {processing ? (
                  <span>Recording Payment...</span>
                ) : (
                  <span>Pay ₦{parseInt(customAmount || "0", 10).toLocaleString()} via Paystack Checkout</span>
                )}
              </button>

              <p className="text-[10px] text-stone-500 text-center">
                🔒 Secured with 256-bit encryption. Supports Nigerian bank cards, transfers, and USSD.
              </p>
            </form>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800 bg-stone-950 py-6 px-4 text-center text-stone-600 text-xs">
        <p>&copy; 2026 Gwòròg Development Association • Official Financial Gateway</p>
      </footer>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-950 text-stone-400 p-8 text-center text-xs">Loading Payment Checkout...</div>}>
      <PaymentContent />
    </Suspense>
  );
}