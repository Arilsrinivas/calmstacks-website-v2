"use client";

import { useState, useEffect } from "react";
import { 
  Lock, Loader2, Search, Filter, Download, Plus, Trash2, Edit, Save, 
  Check, X, RefreshCw, Settings, Users, ChevronDown, ChevronUp, AlertCircle, Image, ExternalLink
} from "lucide-react";
import Navbar from "@/components/Navbar";
import InnovationFooter from "@/components/InnovationFooter";
import MouseGlow from "@/components/MouseGlow";

interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "textarea";
  required: boolean;
}

interface HackathonConfig {
  id: string;
  name: string;
  registrationFee: number;
  active: boolean;
  fields: FieldConfig[];
}

interface Member {
  fullName: string;
  email: string;
  phone: string;
  college: string;
}

interface Registration {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  degree?: string;
  year_of_study: string;
  team_name: string;
  team_size: number;
  github?: string;
  linkedin?: string;
  motivation: string;
  payment_id?: string;
  payment_status: "PENDING_VERIFICATION" | "SUCCESS" | "FAILED";
  team_members: Member[];
  screenshot_path: string;
}

export default function AdminHackathonPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<"registrations" | "hackathons">("registrations");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [hackathons, setHackathons] = useState<HackathonConfig[]>([]);
  const [loadingRegs, setLoadingRegs] = useState(false);
  const [loadingHackathons, setLoadingHackathons] = useState(false);
  const [regError, setRegError] = useState("");
  const [hackathonError, setHackathonError] = useState("");

  // Action states
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [manualPaymentId, setManualPaymentId] = useState<string>("");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING_VERIFICATION" | "SUCCESS" | "FAILED">("ALL");
  const [expandedReg, setExpandedReg] = useState<string | null>(null);

  // Hackathon Editor State
  const [selectedHackathonId, setSelectedHackathonId] = useState<string>("");
  const [editingHackathon, setEditingHackathon] = useState<HackathonConfig | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [savingHackathon, setSavingHackathon] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");

  // Session check on mount
  useEffect(() => {
    const savedPass = sessionStorage.getItem("admin_passcode");
    if (savedPass) {
      setPasscode(savedPass);
      verifyAuth(savedPass);
    }
  }, []);

  const verifyAuth = async (pass: string) => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await fetch(`/api/admin/registrations?passcode=${encodeURIComponent(pass)}`);
      if (res.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_passcode", pass);
        fetchRegistrations(pass);
        fetchHackathons(pass);
      } else {
        const data = await res.json();
        setAuthError(data.error || "Invalid passcode.");
        sessionStorage.removeItem("admin_passcode");
      }
    } catch (err) {
      setAuthError("Failed to connect to authentication server.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    verifyAuth(passcode);
  };

  const fetchRegistrations = async (pass = passcode) => {
    setLoadingRegs(true);
    setRegError("");
    try {
      const res = await fetch(`/api/admin/registrations?passcode=${encodeURIComponent(pass)}`);
      const data = await res.json();
      if (res.ok) {
        setRegistrations(data.registrations || []);
      } else {
        setRegError(data.error || "Failed to load registrations.");
      }
    } catch (err) {
      setRegError("Error loading registrations.");
    } finally {
      setLoadingRegs(false);
    }
  };

  const fetchHackathons = async (pass = passcode) => {
    setLoadingHackathons(true);
    setHackathonError("");
    try {
      const res = await fetch(`/api/admin/hackathons?passcode=${encodeURIComponent(pass)}`);
      const data = await res.json();
      if (res.ok) {
        setHackathons(data.hackathons || []);
        
        // Auto select active hackathon for editing
        const active = data.hackathons.find((h: HackathonConfig) => h.active);
        if (active) {
          setSelectedHackathonId(active.id);
          setEditingHackathon(JSON.parse(JSON.stringify(active)));
        } else if (data.hackathons.length > 0) {
          setSelectedHackathonId(data.hackathons[0].id);
          setEditingHackathon(JSON.parse(JSON.stringify(data.hackathons[0])));
        }
      } else {
        setHackathonError(data.error || "Failed to load hackathons.");
      }
    } catch (err) {
      setHackathonError("Error loading hackathons.");
    } finally {
      setLoadingHackathons(false);
    }
  };

  const handleApproveRegistration = async (registrationId: string) => {
    setActionLoadingId(registrationId);
    try {
      const response = await fetch("/api/admin/registrations/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          passcode,
          registrationId,
          paymentId: manualPaymentId || undefined
        })
      });

      const data = await response.json();
      if (response.ok) {
        setManualPaymentId("");
        fetchRegistrations(passcode); // reload registrations
      } else {
        alert(data.error || "Failed to approve registration.");
      }
    } catch (err) {
      console.error("Approve registration error:", err);
      alert("Error communicating with approval server.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_passcode");
    setIsAuthenticated(false);
    setPasscode("");
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) return;

    // Flatten registrations to CSV format
    const headers = [
      "Participant Name", "Email", "Phone", "College", "Degree", "Year of Study", "Team Name", "Team Size", 
      "Role", "Motivation", "Screenshot File", "Payment Verification ID", "Payment Status", "Registered At"
    ];

    const rows = registrations
      .filter(reg => statusFilter === "ALL" || reg.payment_status === statusFilter)
      .flatMap(reg => {
        const teamRows = [];
        
        // Leader Row
        teamRows.push([
          reg.full_name,
          reg.email,
          reg.phone,
          reg.college,
          reg.degree || "",
          reg.year_of_study,
          reg.team_name,
          reg.team_size,
          "Leader",
          reg.motivation,
          reg.screenshot_path,
          reg.payment_id || "",
          reg.payment_status,
          new Date(reg.created_at).toLocaleString()
        ].map(val => `"${val.toString().replace(/"/g, '""')}"`));

        // Additional Members Rows
        if (reg.team_members && reg.team_members.length > 0) {
          reg.team_members.forEach((m, idx) => {
            teamRows.push([
              m.fullName,
              m.email,
              m.phone,
              m.college,
              "", // degree
              "", // year
              reg.team_name,
              reg.team_size,
              `Member ${idx + 2}`,
              "", // motivation
              reg.screenshot_path,
              reg.payment_id || "",
              reg.payment_status,
              new Date(reg.created_at).toLocaleString()
            ].map(val => `"${val.toString().replace(/"/g, '""')}"`));
          });
        }

        return teamRows;
      });

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `hackathon_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Hackathon Editor Configuration
  const handleSelectHackathonChange = (id: string) => {
    setSelectedHackathonId(id);
    const hack = hackathons.find(h => h.id === id);
    if (hack) {
      setEditingHackathon(JSON.parse(JSON.stringify(hack)));
      setIsCreatingNew(false);
    }
  };

  const handleInitNewHackathon = () => {
    setIsCreatingNew(true);
    setEditingHackathon({
      id: "new-hack-" + Date.now().toString().slice(-4),
      name: "New Internship Hackathon " + new Date().getFullYear(),
      registrationFee: 100,
      active: false,
      fields: [
        { name: "fullName", label: "Full Name", type: "text", required: true },
        { name: "email", label: "Email Address", type: "email", required: true },
        { name: "phone", label: "Phone Number", type: "tel", required: true },
        { name: "college", label: "College / University", type: "text", required: true },
        { name: "degree", label: "Degree / Branch", type: "text", required: true },
        { name: "year_of_study", label: "Year of Study", type: "text", required: true },
        { name: "team_name", label: "Team Name", type: "text", required: true },
        { name: "motivation", label: "Why do you want to participate?", type: "textarea", required: true },
      ]
    });
  };

  const handleFieldChange = (idx: number, prop: keyof FieldConfig, val: any) => {
    if (!editingHackathon) return;
    setEditingHackathon(prev => {
      if (!prev) return null;
      const updatedFields = [...prev.fields];
      updatedFields[idx] = {
        ...updatedFields[idx],
        [prop]: val
      };
      
      if (prop === "label" && !["fullName", "email", "phone", "college", "degree", "year_of_study", "team_name", "motivation"].includes(updatedFields[idx].name)) {
        updatedFields[idx].name = val.toLowerCase().replace(/[^a-z0-9]/g, "");
      }
      return {
        ...prev,
        fields: updatedFields
      };
    });
  };

  const handleAddField = () => {
    if (!editingHackathon) return;
    setEditingHackathon(prev => {
      if (!prev) return null;
      return {
        ...prev,
        fields: [
          ...prev.fields,
          { name: "custom_" + Date.now().toString().slice(-4), label: "Custom Text Input", type: "text", required: false }
        ]
      };
    });
  };

  const handleRemoveField = (idx: number) => {
    if (!editingHackathon) return;
    const field = editingHackathon.fields[idx];
    if (["fullName", "email", "phone", "college", "degree", "year_of_study", "team_name", "motivation"].includes(field.name)) {
      alert("Core registration fields cannot be deleted.");
      return;
    }
    setEditingHackathon(prev => {
      if (!prev) return null;
      const updatedFields = [...prev.fields];
      updatedFields.splice(idx, 1);
      return {
        ...prev,
        fields: updatedFields
      };
    });
  };

  const handleSaveHackathon = async () => {
    if (!editingHackathon) return;
    setSavingHackathon(true);
    setSaveSuccessMessage("");
    setHackathonError("");

    try {
      const res = await fetch("/api/admin/hackathons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          passcode,
          hackathon: editingHackathon
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        setSaveSuccessMessage("Hackathon configuration updated successfully!");
        fetchHackathons(passcode);
        setIsCreatingNew(false);
      } else {
        setHackathonError(data.error || "Failed to save hackathon configuration.");
      }
    } catch (err) {
      setHackathonError("Error saving hackathon configuration.");
    } finally {
      setSavingHackathon(false);
    }
  };

  // Searching + Filtering registrations
  const filteredRegs = registrations.filter(reg => {
    const matchesStatus = statusFilter === "ALL" || reg.payment_status === statusFilter;
    
    const term = searchQuery.toLowerCase().trim();
    if (!term) return matchesStatus;

    const matchesSearch = 
      reg.id.toLowerCase().includes(term) ||
      reg.team_name.toLowerCase().includes(term) ||
      reg.full_name.toLowerCase().includes(term) ||
      reg.email.toLowerCase().includes(term) ||
      reg.phone.toLowerCase().includes(term) ||
      reg.college.toLowerCase().includes(term) ||
      reg.team_members.some(m => 
        m.fullName.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term) ||
        m.college.toLowerCase().includes(term)
      );

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-transparent text-foreground min-h-screen relative overflow-hidden flex flex-col justify-between">
      <MouseGlow />
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-[980px] mx-auto px-6">

          {!isAuthenticated ? (
            /* Passcode Verification Screen */
            <div className="max-w-md mx-auto card glass-card border border-border-subtle bg-surface/10 backdrop-blur-lg rounded-2xl p-8 space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Organizer Panel</h3>
                <p className="text-xs text-text-secondary mt-1">
                  Authenticate to verify payment screenshots
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label htmlFor="passcode-input" className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                    Enter Admin Passcode
                  </label>
                  <input
                    id="passcode-input"
                    type="password"
                    placeholder="Enter passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors text-center font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full btn-primary justify-center cursor-pointer"
                >
                  {authLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Access Dashboard</span>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white">CalmStacks Organizers</h2>
                  <p className="text-xs text-text-secondary mt-1">
                    Manage hackathon active fees, fields, search and verify registrations manually.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      fetchRegistrations();
                      fetchHackathons();
                    }}
                    className="p-2.5 rounded-xl border border-border-subtle bg-surface/5 text-text-secondary hover:text-white transition-colors cursor-pointer"
                    title="Refresh data"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-xs border border-border-subtle hover:bg-surface text-text-primary px-4 py-2.5 rounded-full transition-colors cursor-pointer"
                  >
                    Log Out
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-border-subtle/50 gap-6">
                <button
                  onClick={() => setActiveTab("registrations")}
                  className={`flex items-center gap-2 pb-3.5 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                    activeTab === "registrations"
                      ? "border-primary text-white"
                      : "border-transparent text-text-secondary hover:text-white"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Registrations</span>
                </button>
                <button
                  onClick={() => setActiveTab("hackathons")}
                  className={`flex items-center gap-2 pb-3.5 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                    activeTab === "hackathons"
                      ? "border-primary text-white"
                      : "border-transparent text-text-secondary hover:text-white"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Registration Fee & Fields</span>
                </button>
              </div>

              {/* Registrations List Tab */}
              {activeTab === "registrations" && (
                <div className="space-y-4">
                  {/* Search / Filters / Export Bar */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 card glass-card border border-border-subtle/50 bg-surface/5 p-4 rounded-xl">
                    <div className="flex-1 flex gap-3">
                      {/* Search */}
                      <div className="flex-1 relative">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                          type="text"
                          placeholder="Search name, team, email, college, ID..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border-subtle/50 text-text-primary placeholder:text-text-muted text-xs focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                      
                      {/* Filter */}
                      <div className="relative">
                        <select
                          value={statusFilter}
                          onChange={(e: any) => setStatusFilter(e.target.value)}
                          className="pl-8 pr-4 py-2.5 rounded-xl bg-surface border border-border-subtle/50 text-text-primary text-xs focus:outline-none focus:border-primary/50 transition-colors cursor-pointer appearance-none"
                          style={{
                            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2386868b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                            backgroundSize: '12px'
                          }}
                        >
                          <option value="ALL">All Status</option>
                          <option value="PENDING_VERIFICATION">Under Verification</option>
                          <option value="SUCCESS">Confirmed</option>
                          <option value="FAILED">Failed</option>
                        </select>
                        <Filter className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                      </div>
                    </div>

                    <button
                      onClick={handleExportCSV}
                      disabled={filteredRegs.length === 0}
                      className="btn-primary justify-center text-xs py-2 px-4 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>

                  {regError && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                      {regError}
                    </div>
                  )}

                  {loadingRegs ? (
                    <div className="flex justify-center items-center py-16">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <span className="ml-3 text-text-secondary text-xs">Loading registrations...</span>
                    </div>
                  ) : filteredRegs.length === 0 ? (
                    <div className="text-center py-16 card glass-card border border-border-subtle bg-surface/5 rounded-xl text-text-secondary text-xs">
                      No registrations found.
                    </div>
                  ) : (
                    /* Registrations list table */
                    <div className="space-y-4">
                      {filteredRegs.map((reg) => {
                        const isExpanded = expandedReg === reg.id;
                        return (
                          <div 
                            key={reg.id} 
                            className="card glass-card border border-border-subtle/80 bg-surface/10 rounded-2xl overflow-hidden transition-all"
                          >
                            {/* Main row */}
                            <div 
                              onClick={() => setExpandedReg(isExpanded ? null : reg.id)}
                              className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-surface/5 transition-colors"
                            >
                              <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 items-center">
                                <div>
                                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">Participant (Leader)</span>
                                  <span className="text-sm font-semibold text-white">{reg.full_name}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">Team / Size</span>
                                  <span className="text-xs text-text-secondary font-semibold block">{reg.team_name}</span>
                                  <span className="text-[10px] text-text-muted block">Size: {reg.team_size} {reg.team_size === 1 ? "(Solo)" : "members"}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">College & Contact</span>
                                  <span className="text-xs text-text-secondary block truncate">{reg.college}</span>
                                  <span className="text-xs text-text-muted block truncate">{reg.email} • {reg.phone}</span>
                                </div>
                                <div className="sm:col-span-3 md:col-span-1">
                                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">Submission Date</span>
                                  <span className="text-xs text-text-secondary block">
                                    {new Date(reg.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-border-subtle/40">
                                <div>
                                  <span className="text-[10px] text-text-muted uppercase tracking-wider block text-left md:text-right font-medium">Verified ID</span>
                                  <span className="text-xs text-white block font-mono">{reg.payment_id || "N/A"}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                                    reg.payment_status === "SUCCESS"
                                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                      : reg.payment_status === "FAILED"
                                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  }`}>
                                    {reg.payment_status === "PENDING_VERIFICATION" ? "Pending Review" : reg.payment_status === "SUCCESS" ? "Confirmed" : reg.payment_status}
                                  </span>
                                  {isExpanded ? <ChevronUp className="w-4 h-4 text-text-secondary" /> : <ChevronDown className="w-4 h-4 text-text-secondary" />}
                                </div>
                              </div>
                            </div>

                            {/* Details Panel (Expanded) */}
                            {isExpanded && (
                              <div className="border-t border-border-subtle/50 bg-surface/5 p-4 md:p-6 space-y-5 animate-slide-up">
                                
                                {/* Verification Area (if status is PENDING_VERIFICATION) */}
                                {reg.payment_status === "PENDING_VERIFICATION" && (
                                  <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-4">
                                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                                      <Lock className="w-4 h-4" />
                                      <span>Verify Payment Screenshot</span>
                                    </h4>
                                    
                                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                                      <div className="flex-grow">
                                        <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1.5 font-bold">
                                          Enter Verification Transaction ID (Optional)
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="e.g. UPI Ref / Bank ID / Transaction ID"
                                          value={manualPaymentId}
                                          onChange={(e) => setManualPaymentId(e.target.value)}
                                          className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-border-subtle/50 text-text-primary text-xs focus:outline-none focus:border-primary/50 transition-colors font-mono"
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        disabled={actionLoadingId === reg.id}
                                        onClick={() => handleApproveRegistration(reg.id)}
                                        className="btn-primary justify-center text-xs py-2.5 px-6 flex items-center gap-2 cursor-pointer w-full sm:w-auto"
                                      >
                                        {actionLoadingId === reg.id ? (
                                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                                        ) : (
                                          <Check className="w-4 h-4" />
                                        )}
                                        <span>Confirm & Approve</span>
                                      </button>
                                    </div>
                                  </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  {/* Left: General Details */}
                                  <div className="md:col-span-2 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-b border-border-subtle/30 pb-4">
                                      <div>
                                        <span className="text-text-muted uppercase tracking-wider block mb-1">Registration ID</span>
                                        <span className="text-white font-mono">{reg.id}</span>
                                      </div>
                                      <div>
                                        <span className="text-text-muted uppercase tracking-wider block mb-1">Degree & Year of study</span>
                                        <span className="text-white">{reg.degree || "N/A"} (Year {reg.year_of_study})</span>
                                      </div>
                                      <div>
                                        <span className="text-text-muted uppercase tracking-wider block mb-1">Profiles</span>
                                        <div className="flex gap-2">
                                          {reg.github && <a href={reg.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>}
                                          {reg.github && reg.linkedin && <span className="text-text-muted">|</span>}
                                          {reg.linkedin && <a href={reg.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a>}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="text-xs border-b border-border-subtle/30 pb-4">
                                      <span className="text-text-muted uppercase tracking-wider block mb-1 font-bold">Why do you want to participate?</span>
                                      <p className="text-text-secondary whitespace-pre-wrap bg-surface/5 p-3 rounded-xl border border-border-subtle/30 leading-relaxed font-light">{reg.motivation}</p>
                                    </div>

                                    <div>
                                      <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-3">All Team Members ({reg.team_size})</h4>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="p-3.5 rounded-xl border border-border-subtle/60 bg-surface/5 space-y-1 text-xs">
                                          <p className="font-bold text-white">
                                            {reg.full_name} <span className="text-primary text-[10px] ml-1">(Leader)</span>
                                          </p>
                                          <p className="text-text-secondary">{reg.college}</p>
                                          <p className="text-text-muted">{reg.email} • {reg.phone}</p>
                                        </div>
                                        
                                        {reg.team_members && reg.team_members.map((member, mIdx) => (
                                          <div key={mIdx} className="p-3.5 rounded-xl border border-border-subtle/60 bg-surface/5 space-y-1 text-xs">
                                            <p className="font-bold text-white">
                                              {member.fullName} <span className="text-text-muted text-[10px] ml-1">(Member {mIdx + 2})</span>
                                            </p>
                                            <p className="text-text-secondary">{member.college}</p>
                                            <p className="text-text-muted">{member.email} • {member.phone}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right: Payment Screenshot */}
                                  <div className="md:col-span-1 space-y-2">
                                    <span className="text-[10px] text-text-muted uppercase tracking-wider block font-bold">Uploaded Screenshot</span>
                                    <div className="relative border border-border-subtle bg-surface/5 rounded-2xl overflow-hidden p-2 flex flex-col items-center justify-center min-h-[220px]">
                                      {reg.screenshot_path ? (
                                        <>
                                          <img 
                                            src={`/api/admin/screenshot?passcode=${encodeURIComponent(passcode)}&path=${encodeURIComponent(reg.screenshot_path)}`}
                                            alt="Payment Receipt Screenshot" 
                                            className="max-h-56 w-auto object-contain rounded-xl shadow-md border border-border-subtle/30"
                                          />
                                          <a 
                                            href={`/api/admin/screenshot?passcode=${encodeURIComponent(passcode)}&path=${encodeURIComponent(reg.screenshot_path)}`}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-[10px] text-primary font-bold mt-3 hover:underline flex items-center gap-1"
                                          >
                                            <span>Open Full Image</span>
                                            <ExternalLink className="w-3 h-3" />
                                          </a>
                                        </>
                                      ) : (
                                        <div className="text-center p-4">
                                          <Image className="w-8 h-8 text-text-muted mx-auto mb-2" />
                                          <span className="text-[10px] text-text-secondary">No screenshot uploaded</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Hackathons & Fields Settings Tab */}
              {activeTab === "hackathons" && (
                <div className="grid md:grid-cols-3 gap-6 items-start">
                  
                  {/* Sidebar */}
                  <div className="md:col-span-1 card glass-card border border-border-subtle p-5 rounded-2xl space-y-4 bg-surface/5">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Select Hackathon</h4>
                      <button
                        onClick={handleInitNewHackathon}
                        className="text-xs text-primary font-bold hover:text-primary-hover flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Create New</span>
                      </button>
                    </div>

                    {loadingHackathons ? (
                      <div className="flex justify-center items-center py-6">
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {hackathons.map((h) => (
                          <button
                            key={h.id}
                            type="button"
                            onClick={() => handleSelectHackathonChange(h.id)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                              !isCreatingNew && selectedHackathonId === h.id
                                ? "border-primary bg-primary/10 text-white font-bold"
                                : "border-border-subtle/50 bg-surface/5 text-text-secondary hover:text-white"
                            }`}
                          >
                            <span className="block truncate">{h.name}</span>
                            <span className="flex items-center gap-1.5 mt-1.5">
                              <span className={`w-1.5 h-1.5 rounded-full ${h.active ? "bg-emerald-500" : "bg-text-muted"}`} />
                              <span className="text-[10px] text-text-muted font-normal">
                                {h.active ? "Active" : "Inactive"} • ₹{h.registrationFee}/person
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Form panel */}
                  <div className="md:col-span-2 card glass-card border border-border-subtle p-5 md:p-6 rounded-2xl space-y-6">
                    {hackathonError && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        {hackathonError}
                      </div>
                    )}

                    {saveSuccessMessage && (
                      <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>{saveSuccessMessage}</span>
                      </div>
                    )}

                    {editingHackathon ? (
                      <div className="space-y-6 animate-fade-in">
                        <div className="border-b border-border-subtle/50 pb-4 flex justify-between items-center">
                          <h3 className="text-lg font-bold text-white">
                            {isCreatingNew ? "Create New Hackathon" : "Configure Hackathon"}
                          </h3>
                          <span className="text-[10px] text-text-muted font-mono">{editingHackathon.id}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                              Hackathon ID (Unique Key)
                            </label>
                            <input
                              type="text"
                              value={editingHackathon.id}
                              disabled={!isCreatingNew}
                              onChange={(e) => setEditingHackathon({ ...editingHackathon, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
                              className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border-subtle/50 text-text-primary text-xs focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                              Hackathon Title
                            </label>
                            <input
                              type="text"
                              value={editingHackathon.name}
                              onChange={(e) => setEditingHackathon({ ...editingHackathon, name: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border-subtle/50 text-text-primary text-xs focus:outline-none focus:border-primary/50 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                              Registration Fee (INR per participant)
                            </label>
                            <input
                              type="number"
                              min={0}
                              value={editingHackathon.registrationFee}
                              onChange={(e) => setEditingHackathon({ ...editingHackathon, registrationFee: Number(e.target.value) })}
                              className="w-full px-4 py-2.5 rounded-xl bg-surface border border-border-subtle/50 text-text-primary text-xs focus:outline-none focus:border-primary/50 transition-colors"
                            />
                          </div>
                          <div className="flex items-end pb-2">
                            <label className="flex items-center gap-2.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={editingHackathon.active}
                                onChange={(e) => setEditingHackathon({ ...editingHackathon, active: e.target.checked })}
                                className="w-4 h-4 rounded border-border-subtle text-primary bg-surface focus:ring-0 focus:ring-offset-0 cursor-pointer"
                              />
                              <span className="text-xs font-semibold text-text-primary">
                                Set as Active Hackathon
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* Fields configurations */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-t border-border-subtle/30 pt-4">
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Registration Form Fields</h4>
                            <button
                              type="button"
                              onClick={handleAddField}
                              className="text-[11px] text-primary font-bold hover:text-primary-hover flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Dynamic Field</span>
                            </button>
                          </div>

                          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                            {editingHackathon.fields.map((field, idx) => {
                              const isCore = ["fullName", "email", "phone", "college", "degree", "year_of_study", "team_name", "motivation"].includes(field.name);
                              return (
                                <div 
                                  key={idx} 
                                  className="p-3.5 rounded-xl border border-border-subtle/50 bg-surface/5 flex flex-col sm:flex-row gap-3 items-end sm:items-center justify-between"
                                >
                                  <div className="flex-grow grid grid-cols-3 gap-2.5 w-full">
                                    <div className="col-span-1">
                                      <span className="text-[9px] text-text-muted uppercase tracking-wider block mb-1">Field ID</span>
                                      <span className="text-xs text-white font-mono block py-2">{field.name}</span>
                                    </div>
                                    <div className="col-span-1">
                                      <span className="text-[9px] text-text-muted uppercase tracking-wider block mb-1">Field Label</span>
                                      <input
                                        type="text"
                                        value={field.label}
                                        disabled={isCore}
                                        onChange={(e) => handleFieldChange(idx, "label", e.target.value)}
                                        className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-border-subtle/30 text-text-primary text-xs focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                                      />
                                    </div>
                                    <div className="col-span-1">
                                      <span className="text-[9px] text-text-muted uppercase tracking-wider block mb-1">Input Type</span>
                                      <select
                                        value={field.type}
                                        disabled={isCore}
                                        onChange={(e: any) => handleFieldChange(idx, "type", e.target.value)}
                                        className="w-full px-2 py-1.5 rounded-lg bg-surface border border-border-subtle/30 text-text-primary text-xs focus:outline-none focus:border-primary/50 transition-colors cursor-pointer disabled:opacity-50 appearance-none"
                                        style={{
                                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2386868b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                                          backgroundRepeat: 'no-repeat',
                                          backgroundPosition: 'right 8px center',
                                          backgroundSize: '10px'
                                        }}
                                      >
                                        <option value="text">Text</option>
                                        <option value="email">Email</option>
                                        <option value="tel">Phone</option>
                                        <option value="url">URL Link</option>
                                        <option value="textarea">Textarea</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3.5 border-t sm:border-t-0 pt-2.5 sm:pt-0 border-border-subtle/10 w-full sm:w-auto justify-end">
                                    <label className="flex items-center gap-1.5 cursor-pointer select-none">
                                      <input
                                        type="checkbox"
                                        checked={field.required}
                                        disabled={isCore}
                                        onChange={(e) => handleFieldChange(idx, "required", e.target.checked)}
                                        className="w-3.5 h-3.5 rounded border-border-subtle text-primary bg-surface focus:ring-0 focus:ring-offset-0 cursor-pointer disabled:opacity-50"
                                      />
                                      <span className="text-[10px] font-semibold text-text-secondary uppercase">Req</span>
                                    </label>
                                    {!isCore && (
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveField(idx)}
                                        className="p-1.5 text-text-muted hover:text-red-400 rounded-lg hover:bg-surface transition-colors cursor-pointer"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex justify-end gap-3.5 border-t border-border-subtle/30 pt-6">
                          {isCreatingNew && (
                            <button
                              type="button"
                              onClick={() => {
                                setIsCreatingNew(false);
                                handleSelectHackathonChange(selectedHackathonId);
                              }}
                              className="text-xs border border-border-subtle hover:bg-surface text-text-primary px-4 py-2.5 rounded-full transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            type="button"
                            disabled={savingHackathon}
                            onClick={handleSaveHackathon}
                            className="btn-primary justify-center text-xs py-2 px-5 flex items-center gap-2 cursor-pointer"
                          >
                            {savingHackathon ? (
                              <Loader2 className="w-4 h-4 animate-spin text-white" />
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            <span>Save Configuration</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-16 text-text-secondary text-xs">
                        Select a hackathon or create a new one to begin.
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

        </div>
      </main>

      <InnovationFooter />
    </div>
  );
}
