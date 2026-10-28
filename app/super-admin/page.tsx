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
  serverTimestamp, 
  limit 
} from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

interface Applicant {
  id: string;
  fullName?: string;
  email?: string;
  phone?: string;
  district?: string;
  wing?: string;
  role?: string;
  membershipStatus?: string;
  duesStatus?: string;
  createdAt?: any;
}

export default function SuperAdminPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "pages">("pending");
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");

  // 1. Auth Guard - Only SUPER_ADMIN or admin permitted
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

          if (role === "SUPER_ADMIN" || role === "admin") {
            fetchApplicantsList();
          }
        } else {
          setUserRole("MEMBER");
        }
      } catch (err) {
        console.error("Super Admin check error:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 2. Fetch All Registered Users
  const fetchApplicantsList = async () => {
    try {
      const q = query(collection(db, "users"), limit(100));
      const querySnapshot = await getDocs(q);
      const list: Applicant[] = [];
      querySnapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      setApplicants(list);
    } catch (err) {
      console.error("Error loading applicants:", err);
    }
  };

  // 3. Approve Applicant as Verified Gwòròg Citizen / Friend
  const handleApprove = async (applicantId: string, assignedRole = "MEMBER") => {
    setActionLoadingId(applicantId);
    setStatusMessage("");
    try {
      const userRef = doc(db, "users", applicantId);
      await updateDoc(userRef, {
        membershipStatus: "Approved",
        role: assignedRole,
        verifiedBy: currentUser?.email,
        verifiedAt: serverTimestamp(),
      });

      // Update state locally
      setApplicants((prev) =>
        prev.map((app) =>
          app.id === applicantId
            ? { ...app, membershipStatus: "Approved", role: assignedRole }
            : app
        )
      );

      setStatusMessage("✅ Applicant verified and approved successfully!");
    } catch (err: any) {
      console.error("Approval error:", err);
      setStatusMessage("❌ Error approving member: " + err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  // 4. Reject or Revoke Membership
  const handleReject = async (applicantId: string) => {
    const confirmReject = window.confirm("Are you sure you want to decline/reject this membership applicant?");
    if (!confirmReject) return;

    setActionLoadingId(applicantId);
    setStatusMessage("");
    try {
      const userRef = doc(db, "users", applicantId);
      await updateDoc(userRef, {
        membershipStatus: "Rejected",
      });

      setApplicants((prev) =>
        prev.map((app) =>
          app.id === applicantId ? { ...app, membershipStatus: "Rejected" } : app
        )
      );

      setStatusMessage("Application declined.");
    } catch (err: any) {
      console.error("Rejection error:", err);
      setStatusMessage("Error: " + err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  // 5. Change Role (NEC, BOT, Traditional Council, Member)
  const handleChangeRole = async (applicantId: string, newRole: string) => {
    setActionLoadingId(applicantId);
    try {
      const userRef = doc(db, "users", applicantId);
      await updateDoc(userRef, { role: newRole });

      setApplicants((prev) =>
        prev.map((app) => (app.id === applicantId ? { ...app, role: newRole } : app))
      );
      setStatusMessage(`Role updated to ${newRole}`);
    } catch (err: any) {
      alert("Failed to update role: " + err.message);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-[#FDFBF7]">
        <div className="w-12 h-12 border-4 border-[#7A1428]/30 border-t-[#7A1428] rounded-full animate-spin mb-4"></div>
        <p className="text-xs uppercase tracking-widest text-[#E0526C] font-bold">
          Authenticating Super Admin Clearance...
        </p>
      </div>
    );
  }

  // Access Denied Screen (If not Super Admin)
  if (userRole !== "SUPER_ADMIN" && userRole !== "admin") {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#141212] border border-[#3D0A14] rounded-2xl p-8 text-center text-[#EADCC8]">
          <div className="w-16 h-16 rounded-full bg-[#7A1428]/20 border border-[#7A1428] text-[#E0526C] flex items-center justify-center text-3xl mx-auto mb-4">
            🛡️
          </div>
          <h1 className="text-xl font-black text-[#FDFBF7] mb-2">Super Admin Clearance Required</h1>
          <p className="text-xs text-[#EADCC8]/75 mb-6 leading-relaxed">
            This master control hub oversees association membership approvals, traditional verification, and leadership appointments. Your account role (<strong className="text-white">{userRole}</strong>) does not have Super Admin authority.
          </p>
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="block w-full py-2.5 bg-[#7A1428] hover:bg-[#5C0A19] text-[#FDFBF7] font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
            >
              Return to Member Dashboard
            </Link>
            <button
              onClick={handleSignOut}
              className="text-xs text-[#EADCC8]/50 hover:text-[#FDFBF7] transition-colors"
            >
              Sign in with Super Admin account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter queues
  const pendingApplicants = applicants.filter(
    (a) => !a.membershipStatus || a.membershipStatus === "Pending Approval"
  );
  const approvedMembers = applicants.filter(
    (a) => a.membershipStatus === "Approved" || a.membershipStatus === "Active"
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FDFBF7] flex flex-col font-sans">
      
      {/* 1. TOP SUPER ADMIN HEADER */}
      <header className="border-b border-[#262223] bg-[#0A0A0A]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#7A1428] to-[#1A0307] border-2 border-[#EADCC8]/50 flex items-center justify-center text-lg font-black shadow-lg">
              🛡️
            </div>
            <div>
              <span className="text-base font-black tracking-wide text-[#FDFBF7] block leading-tight">
                GDA Super Admin • Master Verification Hub
              </span>
              <span className="text-[10px] tracking-widest text-[#E0526C] uppercase font-bold block">
                Chief Verifier &amp; Supreme System Custodian
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/" className="text-[#EADCC8]/70 hover:text-white hidden sm:block">Public Site</Link>
            <Link href="/nec-dashboard" className="text-[#EADCC8]/70 hover:text-white hidden sm:block">NEC Ledger</Link>
            <button
              onClick={handleSignOut}
              className="px-3.5 py-1.5 rounded-lg border border-[#7A1428] bg-[#38050E] hover:bg-[#5C0A19] text-[#FDFBF7] text-xs font-bold uppercase tracking-wider transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* 2. STATS OVERVIEW */}
      <div className="bg-[#141212] border-b border-[#262223]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#383133]">
            <span className="text-[#EADCC8]/70 uppercase tracking-wider block font-bold">Pending Review Queue</span>
            <span className="text-3xl font-black text-[#E0526C] block mt-1">{pendingApplicants.length}</span>
            <span className="text-[10px] text-[#EADCC8]/50 mt-0.5 block">Awaiting native verification</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#383133]">
            <span className="text-[#EADCC8]/70 uppercase tracking-wider block font-bold">Approved Gwòròg Citizens</span>
            <span className="text-3xl font-black text-[#FDFBF7] block mt-1">{approvedMembers.length}</span>
            <span className="text-[10px] text-[#EADCC8]/50 mt-0.5 block">Verified members &amp; friends</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#383133]">
            <span className="text-[#EADCC8]/70 uppercase tracking-wider block font-bold">Total Accounts Logged</span>
            <span className="text-3xl font-black text-[#EADCC8] block mt-1">{applicants.length}</span>
            <span className="text-[10px] text-[#EADCC8]/50 mt-0.5 block">Across all branches &amp; diaspora</span>
          </div>
        </div>
      </div>

      {/* 3. TABS */}
      <div className="border-b border-[#262223] bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8 text-xs uppercase tracking-wider font-bold">
          <button
            onClick={() => setActiveTab("pending")}
            className={`py-4 border-b-2 transition-colors ${
              activeTab === "pending"
                ? "border-[#7A1428] text-[#FDFBF7]"
                : "border-transparent text-[#EADCC8]/60 hover:text-white"
            }`}
          >
            ⏳ Pending Verification Queue ({pendingApplicants.length})
          </button>
          <button
            onClick={() => setActiveTab("approved")}
            className={`py-4 border-b-2 transition-colors ${
              activeTab === "approved"
                ? "border-[#7A1428] text-[#FDFBF7]"
                : "border-transparent text-[#EADCC8]/60 hover:text-white"
            }`}
          >
            👥 Verified Members &amp; Roles ({approvedMembers.length})
          </button>
          <button
            onClick={() => setActiveTab("pages")}
            className={`py-4 border-b-2 transition-colors ${
              activeTab === "pages"
                ? "border-[#7A1428] text-[#FDFBF7]"
                : "border-transparent text-[#EADCC8]/60 hover:text-white"
            }`}
          >
            🌐 Master Overseer &amp; Page Links
          </button>
        </div>
      </div>

      {/* 4. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-6">
        
        {statusMessage && (
          <div className="p-3.5 rounded-xl bg-[#38050E] border border-[#7A1428] text-[#FDFBF7] text-xs font-bold">
            {statusMessage}
          </div>
        )}

        {/* TAB 1: PENDING APPROVAL QUEUE */}
        {activeTab === "pending" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-black text-[#FDFBF7]">Pending Membership Applications</h2>
              <p className="text-xs text-[#EADCC8]/70 mt-1">
                Carefully review applicant identity, District, and Wing. Only approve those verified as authentic Gwòròg citizens or genuine partners.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#262223] bg-[#141212]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0A0A0A] text-[#EADCC8]/70 uppercase tracking-wider border-b border-[#262223]">
                  <tr>
                    <th className="py-3.5 px-4">Applicant</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">District / Chapter</th>
                    <th className="py-3.5 px-4">Requested Wing</th>
                    <th className="py-3.5 px-4 text-right">Verification Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262223] text-[#FDFBF7]">
                  {pendingApplicants.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-[#EADCC8]/50">
                        🎉 Zero pending applications! All registered applicants have been vetted and processed.
                      </td>
                    </tr>
                  ) : (
                    pendingApplicants.map((app) => (
                      <tr key={app.id} className="hover:bg-[#1A1617] transition-colors">
                        <td className="py-4 px-4 font-bold text-white">
                          {app.fullName || "Unnamed Applicant"}
                          <span className="block text-[10px] text-[#E0526C] font-mono">ID: {app.id.substring(0, 8)}</span>
                        </td>
                        <td className="py-4 px-4 text-[#EADCC8]/80">
                          <div>{app.email}</div>
                          <div className="text-[10px] text-[#EADCC8]/50">{app.phone || "No phone entered"}</div>
                        </td>
                        <td className="py-4 px-4 font-semibold text-[#EADCC8]">{app.district || "Unassigned"}</td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-0.5 rounded bg-[#38050E] text-[#FDFBF7] border border-[#7A1428] text-[10px]">
                            {app.wing || "General"}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              disabled={actionLoadingId === app.id}
                              onClick={() => handleApprove(app.id, "MEMBER")}
                              className="px-3.5 py-1.5 rounded-lg bg-[#7A1428] hover:bg-[#5C0A19] text-white text-[11px] font-bold uppercase tracking-wider transition-all shadow-md"
                            >
                              {actionLoadingId === app.id ? "Processing..." : "✅ Approve Citizen"}
                            </button>
                            <button
                              disabled={actionLoadingId === app.id}
                              onClick={() => handleReject(app.id)}
                              className="px-2.5 py-1.5 rounded-lg border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-400 text-[11px] font-bold"
                              title="Reject application"
                            >
                              ❌
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: VERIFIED MEMBERS & ROLE MANAGEMENT */}
        {activeTab === "approved" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-black text-[#FDFBF7]">Verified Gwòròg Membership Directory</h2>
              <p className="text-xs text-[#EADCC8]/70 mt-1">
                Elevate approved citizens to executive, trustee, or council roles.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#262223] bg-[#141212]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0A0A0A] text-[#EADCC8]/70 uppercase tracking-wider border-b border-[#262223]">
                  <tr>
                    <th className="py-3.5 px-4">Member</th>
                    <th className="py-3.5 px-4">District &amp; Wing</th>
                    <th className="py-3.5 px-4">Current Role</th>
                    <th className="py-3.5 px-4">Dues Status</th>
                    <th className="py-3.5 px-4 text-right">Assign Leadership Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262223] text-[#FDFBF7]">
                  {approvedMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-[#1A1617] transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">
                        {member.fullName}
                        <span className="block text-[10px] text-[#EADCC8]/50">{member.email}</span>
                      </td>
                      <td className="py-3.5 px-4 text-[#EADCC8]">
                        <div>{member.district}</div>
                        <div className="text-[10px] text-[#EADCC8]/60">{member.wing}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-0.5 rounded bg-[#38050E] text-[#FDFBF7] font-mono text-[10px] font-bold border border-[#7A1428]">
                          {member.role || "MEMBER"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[10px]">
                        {member.duesStatus === "Paid" ? "✅ Paid" : "⏳ Unpaid"}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <select
                          disabled={actionLoadingId === member.id}
                          value={member.role || "MEMBER"}
                          onChange={(e) => handleChangeRole(member.id, e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#0A0A0A] border border-[#383133] text-[#FDFBF7] text-xs font-bold"
                        >
                          <option value="MEMBER">Standard Member</option>
                          <option value="NEC">National Executive (NEC)</option>
                          <option value="BOT">Board of Trustees (BOT)</option>
                          <option value="TRADITIONAL_COUNCIL">Traditional Council</option>
                          <option value="YOUTH_LEADER">Youth Wing Executive</option>
                          <option value="WOMEN_LEADER">Women Wing Executive</option>
                          <option value="SUPER_ADMIN">Super Admin (Master)</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MASTER PAGE OVERSEER */}
        {activeTab === "pages" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#141212] border border-[#262223] space-y-3">
              <span className="text-xl">🌐</span>
              <h3 className="font-bold text-white text-sm">Public Presentation</h3>
              <p className="text-xs text-[#EADCC8]/70">Oversee public pages accessible to international visitors and partners.</p>
              <div className="pt-2 flex flex-col gap-1 text-xs text-[#E0526C]">
                <Link href="/" className="hover:underline">→ Homepage</Link>
                <Link href="/about" className="hover:underline">→ About GDA</Link>
                <Link href="/history" className="hover:underline">→ History &amp; Heritage</Link>
                <Link href="/transparency" className="hover:underline">→ Transparency Portal</Link>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#141212] border border-[#262223] space-y-3">
              <span className="text-xl">💰</span>
              <h3 className="font-bold text-white text-sm">Financial &amp; Revenue Ledgers</h3>
              <p className="text-xs text-[#EADCC8]/70">Inspect incoming Paystack dues, borehole donations, and stall permits.</p>
              <div className="pt-2 flex flex-col gap-1 text-xs text-[#E0526C]">
                <Link href="/pay" className="hover:underline">→ Paystack Gateway Checkout</Link>
                <Link href="/nec-dashboard" className="hover:underline">→ NEC Financial Ledger</Link>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#141212] border border-[#262223] space-y-3">
              <span className="text-xl">👥</span>
              <h3 className="font-bold text-white text-sm">Member Portals</h3>
              <p className="text-xs text-[#EADCC8]/70">The private portal experienced by registered and approved members.</p>
              <div className="pt-2 flex flex-col gap-1 text-xs text-[#E0526C]">
                <Link href="/dashboard" className="hover:underline">→ Member Dashboard</Link>
                <Link href="/login" className="hover:underline">→ Login Gateway</Link>
                <Link href="/register" className="hover:underline">→ Registration Form</Link>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#262223] bg-[#0A0A0A] py-6 px-4 text-center text-[#EADCC8]/50 text-xs">
        <p>&copy; 2026 Gwòròg Development Association • Supreme Administrative &amp; Verification Clearance</p>
      </footer>
    </div>
  );
}