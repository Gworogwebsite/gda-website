"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { 
  collection, 
  query, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  addDoc, 
  serverTimestamp, 
  limit 
} from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

interface MemberRecord {
  id: string;
  fullName?: string;
  email?: string;
  phone?: string;
  district?: string;
  wing?: string;
  role?: string;
  duesStatus?: string;
}

export default function NecAdminDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"finance" | "members" | "announcements">("finance");

  // Member Management State
  const [members, setMembers] = useState<MemberRecord[]>([]);
  const [updatingMemberId, setUpdatingMemberId] = useState<string | null>(null);

  // Announcement State
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [targetAudience, setTargetAudience] = useState("all");
  const [postingAnnouncement, setPostingAnnouncement] = useState(false);
  const [announcementNotice, setAnnouncementNotice] = useState("");

  // 1. Auth Guard & Role Verification
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
          const data = docSnap.data();
          const role = data.role || "MEMBER";
          setUserRole(role);

          // If user is Admin or NEC, fetch member roster
          if (role === "admin" || role === "NEC" || role === "BOT") {
            fetchMembersList();
          }
        } else {
          setUserRole("MEMBER");
        }
      } catch (err) {
        console.error("Role lookup error:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 2. Fetch Members from Firestore
  const fetchMembersList = async () => {
    try {
      const q = query(collection(db, "users"), limit(50));
      const querySnapshot = await getDocs(q);
      const list: MemberRecord[] = [];
      querySnapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      setMembers(list);
    } catch (err) {
      console.error("Error loading members:", err);
    }
  };

  // 3. Toggle Dues Status in Firestore
  const handleToggleDues = async (memberId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Paid" ? "Unpaid" : "Paid";
    setUpdatingMemberId(memberId);
    try {
      const memberRef = doc(db, "users", memberId);
      await updateDoc(memberRef, {
        duesStatus: newStatus,
      });

      // Update local state instantly
      setMembers((prev) =>
        prev.map((m) => (m.id === memberId ? { ...m, duesStatus: newStatus } : m))
      );
    } catch (err) {
      console.error("Error updating dues:", err);
      alert("Failed to update status. Check security permissions.");
    } finally {
      setUpdatingMemberId(null);
    }
  };

  // 4. Publish Announcement to Firestore
  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostingAnnouncement(true);
    setAnnouncementNotice("");

    try {
      await addDoc(collection(db, "announcements"), {
        title: announcementTitle.trim(),
        content: announcementContent.trim(),
        targetAudience: targetAudience,
        authorUid: currentUser?.uid,
        authorEmail: currentUser?.email,
        createdAt: serverTimestamp(),
      });

      setAnnouncementNotice("Announcement published successfully to Firestore!");
      setAnnouncementTitle("");
      setAnnouncementContent("");
    } catch (err: any) {
      console.error("Error publishing announcement:", err);
      setAnnouncementNotice("Failed to publish: " + err.message);
    } finally {
      setPostingAnnouncement(false);
    }
  };

  // 5. Handle Sign Out
  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-stone-200">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
        <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
          Verifying NEC Administrative Credentials...
        </p>
      </div>
    );
  }

  // Permission Guard Screen (If logged in as a normal MEMBER)
  if (userRole !== "admin" && userRole !== "NEC" && userRole !== "BOT") {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-stone-900 border border-stone-800 rounded-2xl p-8 text-center text-stone-300">
          <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mx-auto mb-4">
            🔒
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Restricted Leadership Portal</h1>
          <p className="text-xs text-stone-400 mb-6 leading-relaxed">
            Your account is currently registered as a standard <strong className="text-white">MEMBER</strong>. Access to this executive ledger is restricted to NEC, BOT, and System Administrators.
          </p>
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="block w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
            >
              Go to Member Dashboard
            </Link>
            <button
              onClick={handleSignOut}
              className="text-xs text-stone-500 hover:text-stone-300 transition-colors"
            >
              Sign In with different account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      
      {/* 1. ADMIN HEADER */}
      <header className="border-b border-stone-800 bg-stone-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-600/20 border border-amber-500/40 text-amber-400 font-extrabold flex items-center justify-center text-sm shadow-inner">
              NEC
            </div>
            <div>
              <span className="text-sm font-black tracking-wide text-white block leading-tight">
                GDA Executive Hub & Financial Ledger
              </span>
              <span className="text-[10px] tracking-widest text-amber-400 uppercase font-semibold block">
                Role: {userRole} • National Secretariat
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-xs text-stone-400 hover:text-stone-200 transition-colors hidden sm:block"
            >
              Member View
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

      {/* 2. TAB CONTROLS */}
      <div className="border-b border-stone-800 bg-stone-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 text-xs uppercase tracking-wider font-bold">
          <button
            onClick={() => setActiveTab("finance")}
            className={`py-4 border-b-2 transition-colors ${
              activeTab === "finance"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-stone-400 hover:text-stone-200"
            }`}
          >
            💰 Financial Transparency
          </button>
          <button
            onClick={() => setActiveTab("members")}
            className={`py-4 border-b-2 transition-colors ${
              activeTab === "members"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-stone-400 hover:text-stone-200"
            }`}
          >
            👥 Member Directory & Dues ({members.length})
          </button>
          <button
            onClick={() => setActiveTab("announcements")}
            className={`py-4 border-b-2 transition-colors ${
              activeTab === "announcements"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-stone-400 hover:text-stone-200"
            }`}
          >
            📢 Broadcast Announcement
          </button>
        </div>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        
        {/* TAB 1: FINANCIAL TRANSPARENCY PORTAL */}
        {activeTab === "finance" && (
          <div className="space-y-8">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
                <span className="text-xs uppercase tracking-wider text-stone-400 block font-medium">Total Funds Mobilized</span>
                <span className="text-2xl font-black text-emerald-400 block mt-2">₦12,450,000</span>
                <span className="text-[10px] text-stone-500 mt-1 block">All accounts consolidated</span>
              </div>

              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
                <span className="text-xs uppercase tracking-wider text-stone-400 block font-medium">Annual Dues Received</span>
                <span className="text-2xl font-black text-teal-400 block mt-2">₦2,200,000</span>
                <span className="text-[10px] text-stone-500 mt-1 block">From verified members</span>
              </div>

              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
                <span className="text-xs uppercase tracking-wider text-stone-400 block font-medium">Kagoro Clean Water Fund</span>
                <span className="text-2xl font-black text-sky-400 block mt-2">₦6,250,000</span>
                <span className="text-[10px] text-stone-500 mt-1 block">Target: ₦10,000,000 (62.5%)</span>
              </div>

              <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
                <span className="text-xs uppercase tracking-wider text-stone-400 block font-medium">Afan Festival & Vendors</span>
                <span className="text-2xl font-black text-amber-400 block mt-2">₦4,000,000</span>
                <span className="text-[10px] text-stone-500 mt-1 block">Stall bookings & sponsors</span>
              </div>
            </div>

            {/* Financial Ledger Summary */}
            <div className="p-8 rounded-2xl bg-stone-900/60 border border-stone-800">
              <h2 className="text-lg font-bold text-white mb-2">GDA Operating Revenue & Surplus</h2>
              <p className="text-xs text-stone-400 mb-6">
                Real-time reconciliation maintained under the oversight of the Financial Secretary & Treasurer.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center py-3 border-b border-stone-800">
                  <span className="text-stone-300">Total Inflow (Dues, Sponsorships, Donations)</span>
                  <span className="font-bold text-emerald-400 font-mono">₦12,450,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-stone-800">
                  <span className="text-stone-300">Approved Project Disbursements (Phase 1 Reticulation)</span>
                  <span className="font-bold text-red-400 font-mono">- ₦4,100,000</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-stone-800">
                  <span className="text-stone-300">Secretariat Operations & Afan Festival Staging Logistics</span>
                  <span className="font-bold text-red-400 font-mono">- ₦1,250,000</span>
                </div>
                <div className="flex justify-between items-center py-4 bg-stone-950/80 px-4 rounded-xl border border-stone-800 font-bold">
                  <span className="text-white uppercase tracking-wider">Net Reserve in Bank Accounts</span>
                  <span className="text-emerald-400 font-mono text-base">₦7,100,000</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEMBERSHIP ROSTER & DUES RECONCILIATION */}
        {activeTab === "members" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-white">Registered Member Records</h2>
                <p className="text-xs text-stone-400">
                  Click the dues badge to toggle and reconcile bank transfer payments.
                </p>
              </div>
              <button
                onClick={fetchMembersList}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-semibold uppercase tracking-wider"
              >
                🔄 Refresh Member List
              </button>
            </div>

            {/* Member Table */}
            <div className="overflow-x-auto rounded-2xl border border-stone-800 bg-stone-900/60">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-950/80 text-stone-400 uppercase tracking-wider border-b border-stone-800">
                  <tr>
                    <th className="py-3.5 px-4">Member Name</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">District</th>
                    <th className="py-3.5 px-4">Wing</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4 text-right">Dues Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 text-stone-300">
                  {members.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-stone-500">
                        No member documents found in Firestore yet.
                      </td>
                    </tr>
                  ) : (
                    members.map((member) => (
                      <tr key={member.id} className="hover:bg-stone-900/90 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-white">
                          {member.fullName || "Unnamed Member"}
                        </td>
                        <td className="py-3.5 px-4 text-stone-400">
                          <div>{member.email}</div>
                          <div className="text-[10px] text-stone-500">{member.phone || "No phone"}</div>
                        </td>
                        <td className="py-3.5 px-4">{member.district || "Kagoro"}</td>
                        <td className="py-3.5 px-4">{member.wing || "General"}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-mono text-[10px]">
                            {member.role || "MEMBER"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            disabled={updatingMemberId === member.id}
                            onClick={() => handleToggleDues(member.id, member.duesStatus || "Unpaid")}
                            className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase transition-all ${
                              member.duesStatus === "Paid"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-700 hover:bg-emerald-900"
                                : "bg-amber-950 text-amber-400 border border-amber-700 hover:bg-amber-900"
                            }`}
                          >
                            {updatingMemberId === member.id ? "Updating..." : member.duesStatus === "Paid" ? "✅ Paid" : "⏳ Unpaid (Click)"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: BROADCAST OFFICIAL ANNOUNCEMENT */}
        {activeTab === "announcements" && (
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white">Post Official Announcement</h2>
              <p className="text-xs text-stone-400 mt-1">
                Broadcasts official NEC notices directly to the website noticeboard and member portals.
              </p>
            </div>

            {announcementNotice && (
              <div className="p-3 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 text-xs">
                {announcementNotice}
              </div>
            )}

            <form onSubmit={handlePostAnnouncement} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 uppercase tracking-wider mb-1 font-medium">
                  Announcement Title
                </label>
                <input
                  type="text"
                  required
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  placeholder="e.g. Schedule for Afan National Festival Vendor Allocations"
                  className="w-full px-4 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-stone-300 uppercase tracking-wider mb-1 font-medium">
                  Target Audience
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                >
                  <option value="all">All (Public & All Members)</option>
                  <option value="nec">NEC & BOT Only</option>
                  <option value="youth">Youth Wing</option>
                  <option value="women">Women Wing</option>
                  <option value="diaspora">Diaspora Network</option>
                  <option value="afan">Afan Festival Vendors</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-300 uppercase tracking-wider mb-1 font-medium">
                  Announcement Message Content
                </label>
                <textarea
                  rows={5}
                  required
                  value={announcementContent}
                  onChange={(e) => setAnnouncementContent(e.target.value)}
                  placeholder="Type the official message here..."
                  className="w-full px-4 py-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={postingAnnouncement}
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg uppercase tracking-wider shadow-md transition-all text-xs disabled:opacity-50"
              >
                {postingAnnouncement ? "Publishing to Firestore..." : "Publish Announcement"}
              </button>
            </form>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-stone-800 bg-stone-950 py-6 px-4 text-center text-stone-600 text-xs">
        <p>© {new Date().getFullYear()} Gwòròg Development Association • Executive Oversight & Financial Management</p>
      </footer>
    </div>
  );
}