"use client";

import { useState, useEffect } from "react";
import { 
  Lock, Loader2, Search, Filter, Download, Plus, Trash2, Edit, Save, 
  Check, X, RefreshCw, Layers, Settings, Users, ArrowUpDown, ChevronDown, ChevronUp
} from "lucide-react";
import Navbar from "@/components/Navbar";
import InnovationFooter from "@/components/InnovationFooter";
import MouseGlow from "@/components/MouseGlow";

interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url";
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
  degree?: string;
  github?: string;
  linkedin?: string;
  [key: string]: any;
}

interface Registration {
  id: string;
  hackathonId: string;
  teamSize: number;
  members: Member[];
  cashfreeOrderId: string;
  cashfreePaymentId?: string;
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED";
  paymentAmount: number;
  registeredAt: string;
}

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"registrations" | "hackathons">("registrations");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [hackathons, setHackathons] = useState<HackathonConfig[]>([]);
  const [loadingRegs, setLoadingRegs] = useState(false);
  const [loadingHackathons, setLoadingHackathons] = useState(false);
  const [regError, setRegError] = useState("");
  const [hackathonError, setHackathonError] = useState("");

  // Search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "SUCCESS" | "PENDING" | "FAILED">("ALL");
  const [expandedReg, setExpandedReg] = useState<string | null>(null);

  // Hackathon Editor State
  const [selectedHackathonId, setSelectedHackathonId] = useState<string>("");
  const [editingHackathon, setEditingHackathon] = useState<HackathonConfig | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [savingHackathon, setSavingHackathon] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");

  // Load auth from sessionStorage on mount
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
        // Load data
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

  const handleLogout = () => {
    sessionStorage.removeItem("admin_passcode");
    setIsAuthenticated(false);
    setPasscode("");
  };

  // CSV Export logic
  const handleExportCSV = () => {
    if (registrations.length === 0) return;

    // Flatten registrations to one row per participant
    const headers = [
      "Participant Name", "Email", "Phone", "College", "Degree", "GitHub", "LinkedIn", 
      "Team Registration ID", "Team Size", "Order ID", "Payment ID", "Payment Status", "Payment Amount (INR)", "Registered At"
    ];

    const rows = registrations
      .filter(reg => statusFilter === "ALL" || reg.paymentStatus === statusFilter)
      .flatMap(reg => {
        return reg.members.map((member, index) => {
          return [
            member.fullName,
            member.email,
            member.phone,
            member.college,
            member.degree || "",
            member.github || "",
            member.linkedin || "",
            reg.id,
            reg.teamSize,
            reg.cashfreeOrderId,
            reg.cashfreePaymentId || "",
            reg.paymentStatus,
            index === 0 ? reg.paymentAmount : 0, // put amount only on first row to avoid double counting totals in excel
            new Date(reg.registeredAt).toLocaleString()
          ].map(val => `"${val.toString().replace(/"/g, '""')}"`); // escape quotes
        });
      });

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `calmstacks_hackathon_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Hackathon Editor functions
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
      id: "new-hackathon-" + Date.now().toString().slice(-4),
      name: "New Hackathon " + new Date().getFullYear(),
      registrationFee: 100,
      active: false,
      fields: [
        { name: "fullName", label: "Full Name", type: "text", required: true },
        { name: "email", label: "Email Address", type: "email", required: true },
        { name: "phone", label: "Phone Number", type: "tel", required: true },
        { name: "college", label: "College/University", type: "text", required: true },
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
      
      // Auto synchronize name field if label is modified and it is a new custom field
      if (prop === "label" && !["fullName", "email", "phone", "college"].includes(updatedFields[idx].name)) {
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
          { name: "field_" + Date.now().toString().slice(-4), label: "Custom Field", type: "text", required: false }
        ]
      };
    });
  };

  const handleRemoveField = (idx: number) => {
    if (!editingHackathon) return;
    const field = editingHackathon.fields[idx];
    if (["fullName", "email", "phone", "college"].includes(field.name)) {
      alert("Core registration fields (Name, Email, Phone, College) cannot be removed.");
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
        setSaveSuccessMessage("Hackathon configuration saved successfully!");
        fetchHackathons(passcode);
        setIsCreatingNew(false);
      } else {
        setHackathonError(data.error || "Failed to save hackathon settings.");
      }
    } catch (err) {
      setHackathonError("Error calling save hackathon API.");
    } finally {
      setSavingHackathon(false);
    }
  };

  // Filtering registrations based on search + status
  const filteredRegs = registrations.filter(reg => {
    const matchesStatus = statusFilter === "ALL" || reg.paymentStatus === statusFilter;
    
    const term = searchQuery.toLowerCase().trim();
    if (!term) return matchesStatus;

    const matchesSearch = 
      reg.id.toLowerCase().includes(term) ||
      reg.cashfreeOrderId.toLowerCase().includes(term) ||
      (reg.cashfreePaymentId && reg.cashfreePaymentId.toLowerCase().includes(term)) ||
      reg.members.some(m => 
        m.fullName.toLowerCase().includes(term) ||
        m.email.toLowerCase().includes(term) ||
        m.phone.toLowerCase().includes(term) ||
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
            /* Login Screen */
            <div className="max-w-md mx-auto card glass-card border border-border-subtle bg-surface/10 backdrop-blur-lg rounded-2xl p-8 space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Admin Dashboard</h3>
                <p className="text-xs text-text-secondary mt-1">
                  Authenticate to manage CalmStacks registrations
                </p>
              </div>

              {authError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center">
                  {authError}
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
                    <span>Enter Dashboard</span>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Admin Panel Dashboard */
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white">CalmStacks Admin</h2>
                  <p className="text-xs text-text-secondary mt-1">
                    Manage participants, payment statuses, and hackathon structures.
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
                  <span>Hackathons & Fields</span>
                </button>
              </div>

              {/* Registrations List Tab */}
              {activeTab === "registrations" && (
                <div className="space-y-4">
                  {/* Search, Filter, Export Bar */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 card glass-card border border-border-subtle/50 bg-surface/5 p-4 rounded-xl">
                    <div className="flex-1 flex gap-3">
                      {/* Search */}
                      <div className="flex-1 relative">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                          type="text"
                          placeholder="Search name, email, college, order id..."
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
                          <option value="SUCCESS">Confirmed</option>
                          <option value="PENDING">Pending</option>
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
                      No registrations found matching the filters.
                    </div>
                  ) : (
                    /* Registrations list */
                    <div className="space-y-4">
                      {filteredRegs.map((reg) => {
                        const isExpanded = expandedReg === reg.id;
                        const leader = reg.members[0];
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
                                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">Leader / Name</span>
                                  <span className="text-sm font-semibold text-white">{leader.fullName}</span>
                                  {reg.teamSize > 1 && (
                                    <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full ml-2">
                                      Team ({reg.teamSize})
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">Email & Phone</span>
                                  <span className="text-xs text-text-secondary block truncate">{leader.email}</span>
                                  <span className="text-xs text-text-muted block font-mono">{leader.phone}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">College</span>
                                  <span className="text-xs text-text-secondary block truncate">{leader.college}</span>
                                </div>
                                <div className="sm:col-span-3 md:col-span-1">
                                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">Date Registered</span>
                                  <span className="text-xs text-text-secondary block">
                                    {new Date(reg.registeredAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-border-subtle/40">
                                <div>
                                  <span className="text-[10px] text-text-muted uppercase tracking-wider block text-left md:text-right">Amount</span>
                                  <span className="text-sm font-bold text-white block">₹{reg.paymentAmount}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                                    reg.paymentStatus === "SUCCESS"
                                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                      : reg.paymentStatus === "FAILED"
                                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  }`}>
                                    {reg.paymentStatus === "SUCCESS" ? "Confirmed" : reg.paymentStatus}
                                  </span>
                                  {isExpanded ? <ChevronUp className="w-4 h-4 text-text-secondary" /> : <ChevronDown className="w-4 h-4 text-text-secondary" />}
                                </div>
                              </div>
                            </div>

                            {/* Details Panel (Expanded) */}
                            {isExpanded && (
                              <div className="border-t border-border-subtle/50 bg-surface/5 p-4 md:p-6 space-y-4 animate-slide-up">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-b border-border-subtle/30 pb-4">
                                  <div>
                                    <span className="text-text-muted uppercase tracking-wider block mb-1">Cashfree Order ID</span>
                                    <span className="text-white font-mono">{reg.cashfreeOrderId}</span>
                                  </div>
                                  <div>
                                    <span className="text-text-muted uppercase tracking-wider block mb-1">Cashfree Payment ID</span>
                                    <span className="text-white font-mono">{reg.cashfreePaymentId || "Not available"}</span>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-3">All Team Members ({reg.teamSize})</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {reg.members.map((member, mIdx) => (
                                      <div key={mIdx} className="p-3.5 rounded-xl border border-border-subtle/60 bg-surface/5 space-y-1.5 text-xs relative">
                                        <p className="font-bold text-white">
                                          {member.fullName} {mIdx === 0 && <span className="text-primary text-[10px] ml-1">(Leader)</span>}
                                        </p>
                                        <p className="text-text-secondary">{member.college} {member.degree && `• ${member.degree}`}</p>
                                        <div className="flex justify-between items-center text-text-muted mt-2 border-t border-border-subtle/20 pt-2">
                                          <span>{member.email}</span>
                                          <span>{member.phone}</span>
                                        </div>
                                        <div className="flex gap-2.5 pt-1.5">
                                          {member.github && (
                                            <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                                              GitHub
                                            </a>
                                          )}
                                          {member.github && member.linkedin && <span className="text-text-muted">•</span>}
                                          {member.linkedin && (
                                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                                              LinkedIn
                                            </a>
                                          )}
                                        </div>
                                        {/* Dynamic/custom fields if present */}
                                        {Object.keys(member).filter(k => !["fullName", "email", "phone", "college", "degree", "github", "linkedin"].includes(k)).map(k => (
                                          <div key={k} className="mt-1 border-t border-border-subtle/10 pt-1.5 text-[10px] text-text-muted">
                                            <span className="font-semibold capitalize">{k}:</span> {member[k]}
                                          </div>
                                        ))}
                                      </div>
                                    ))}
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
                  
                  {/* Sidebar - list of hackathons */}
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

                  {/* Main editing area */}
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

                        {/* Hackathon Name / ID / Fee */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                              Hackathon Identifier (Unique ID)
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
                              Hackathon Display Name
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

                        {/* Fields Config */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-t border-border-subtle/30 pt-4">
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Registration Form Fields</h4>
                            <button
                              type="button"
                              onClick={handleAddField}
                              className="text-[11px] text-primary font-bold hover:text-primary-hover flex items-center gap-1 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Custom Field</span>
                            </button>
                          </div>

                          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                            {editingHackathon.fields.map((field, idx) => {
                              const isCore = ["fullName", "email", "phone", "college"].includes(field.name);
                              return (
                                <div 
                                  key={idx} 
                                  className="p-3.5 rounded-xl border border-border-subtle/50 bg-surface/5 flex flex-col sm:flex-row gap-3 items-end sm:items-center justify-between"
                                >
                                  <div className="flex-grow grid grid-cols-3 gap-2.5 w-full">
                                    <div className="col-span-1">
                                      <span className="text-[9px] text-text-muted uppercase tracking-wider block mb-1">Field Key (ID)</span>
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
                                        title="Remove field"
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

                        {/* CTA Controls */}
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
                        Select a hackathon or create a new one to begin editing.
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
