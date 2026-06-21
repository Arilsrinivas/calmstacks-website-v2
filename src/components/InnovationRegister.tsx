"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, Users, ArrowRight, UserCheck, AlertCircle, Upload, FileImage, Image } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";

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

export default function InnovationRegister() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const router = useRouter();

  const [hackathon, setHackathon] = useState<HackathonConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [teamSize, setTeamSize] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<number>(0); // 0 = Leader, 1 = Member 2, etc.
  
  // Screenshot file state
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string>("");

  // Leader details state (matches dynamic fields)
  const [leaderDetails, setLeaderDetails] = useState<any>({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    year_of_study: "",
    team_name: "",
    github: "",
    linkedin: "",
    motivation: "",
  });

  // Additional members details state
  const [additionalMembers, setAdditionalMembers] = useState<any[]>([
    { fullName: "", email: "", phone: "", college: "" }, // Member 2
    { fullName: "", email: "", phone: "", college: "" }, // Member 3
    { fullName: "", email: "", phone: "", college: "" }, // Member 4
  ]);

  // Fetch active hackathon details
  useEffect(() => {
    async function fetchActiveHackathon() {
      try {
        const response = await fetch("/api/hackathon/active");
        const data = await response.json();
        if (data.success) {
          setHackathon(data.hackathon);
        } else {
          setError("Could not load hackathon configuration.");
        }
      } catch (err) {
        console.error("Error loading hackathon settings:", err);
        setError("Error loading hackathon configuration.");
      } finally {
        setLoading(false);
      }
    }
    fetchActiveHackathon();
  }, []);

  const handleLeaderChange = (fieldName: string, value: string) => {
    setLeaderDetails((prev: any) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleMemberChange = (memberIndex: number, fieldName: string, value: string) => {
    setAdditionalMembers((prev) => {
      const updated = [...prev];
      updated[memberIndex] = {
        ...updated[memberIndex],
        [fieldName]: value,
      };
      return updated;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshotFile(file);
      
      // Generate image preview if file is an image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setScreenshotPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setScreenshotPreview(""); // no preview for PDFs/non-images
      }
    }
  };

  // Check if a member tab has all required fields completed
  const isMemberValid = (idx: number) => {
    if (idx === 0) {
      if (!hackathon) return false;
      return hackathon.fields.every((field) => {
        if (!field.required) return true;
        const val = leaderDetails[field.name];
        return val && val.toString().trim() !== "";
      });
    } else {
      const member = additionalMembers[idx - 1];
      if (!member) return false;
      return (
        member.fullName.trim() !== "" &&
        member.email.trim() !== "" &&
        member.phone.trim() !== "" &&
        member.college.trim() !== ""
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hackathon) return;

    setError("");
    setRegistering(true);

    // 1. Client-side validations
    if (!isMemberValid(0)) {
      setError("Please fill in all required fields for the Team Leader.");
      setActiveTab(0);
      setRegistering(false);
      return;
    }

    if (teamSize > 1) {
      for (let i = 1; i < teamSize; i++) {
        if (!isMemberValid(i)) {
          setError(`Please fill in all details for Member ${i + 1}.`);
          setActiveTab(i);
          setRegistering(false);
          return;
        }
      }
    }

    if (!screenshotFile) {
      setError("Please upload a payment verification screenshot.");
      setRegistering(false);
      return;
    }

    try {
      // 2. Prepare FormData
      const formData = new FormData();
      
      // Append Leader dynamic fields
      Object.keys(leaderDetails).forEach((key) => {
        formData.append(key, leaderDetails[key]);
      });

      // Append general fields
      formData.append("team_size", teamSize.toString());
      formData.append("hackathonId", hackathon.id);
      
      // Filter only active members to send
      const activeMembersData = additionalMembers.slice(0, teamSize - 1);
      formData.append("team_members", JSON.stringify(activeMembersData));

      // Append screenshot file
      formData.append("screenshot", screenshotFile);

      // 3. Post to API
      const response = await fetch("/api/register", {
        method: "POST",
        body: formData, // fetch sets content-type multipart/form-data automatically for FormData
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration details submitted successfully!");
        router.push(`/innovation-challenge/success?registration_id=${data.registrationId}`);
      } else {
        setError(data.error || "Failed to submit registration. Please try again.");
        setRegistering(false);
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err?.message || "An unexpected error occurred. Please try again.");
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-text-secondary text-sm">Loading registration form...</span>
      </div>
    );
  }

  const fee = hackathon?.registrationFee || 100;
  const totalAmount = fee * teamSize;

  return (
    <section ref={ref} id="register" className="register-section py-20 relative bg-transparent">
      <div className="max-w-[700px] mx-auto px-6">
        <div className="section-divider mb-16" />

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            REGISTRATION
          </span>
          <h3 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-4 mb-4">
            {hackathon?.name || "Internship Hackathon 2026"}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
            Scan the UPI QR code below to pay the registration fee, upload your payment screenshot, and fill in the registration details.
          </p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card glass-card p-6 md:p-8 border border-border-subtle bg-surface/10 backdrop-blur-lg rounded-2xl relative overflow-hidden"
        >
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
                <CheckCircle2 className="w-8 h-8 animate-pulse" />
              </div>
              <h4 className="text-xl font-semibold text-text-primary mb-3">Submission Received</h4>
              <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto mb-6">
                {success}
              </p>
              <div className="flex justify-center items-center gap-2 text-xs text-text-muted">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span>Redirecting you to success page...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Alert */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-xs font-medium leading-relaxed">{error}</p>
                </div>
              )}

              {/* Team Size Selector */}
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
                  Team Size (1–4 Participants)
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {[1, 2, 3, 4].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setTeamSize(size);
                        setActiveTab(0);
                      }}
                      className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        teamSize === size
                          ? "border-primary bg-primary/10 text-white font-bold"
                          : "border-border-subtle bg-surface/5 text-text-secondary hover:text-white"
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>{size === 1 ? "1 (Solo)" : `${size} Members`}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* UPI QR Code Section */}
              <div className="p-6 rounded-2xl border border-border-subtle bg-surface/5 flex flex-col items-center">
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest mb-4 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  Step 1: Scan & Pay ₹{totalAmount}
                </span>
                
                <div className="bg-white p-3 rounded-2xl mb-4 shadow-md w-fit flex items-center justify-center">
                  <img 
                    src="/assets/payment_qr.jpg" 
                    alt="UPI QR Code" 
                    className="w-40 h-auto object-contain rounded-lg"
                  />
                </div>
                
                <p className="text-xs text-text-primary font-semibold mb-1 text-center">
                  Scan using PhonePe, GPay, Paytm, or any UPI App
                </p>
                <p className="text-[10px] text-text-muted font-mono text-center select-all">
                  UPI ID: ARIL SRINIVAS
                </p>
                
                <div className="w-full border-t border-border-subtle/30 mt-6 pt-5 space-y-4">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-widest block text-center">
                    Step 2: Upload Payment Screenshot
                  </span>
                  
                  {/* File Upload Box */}
                  <div className="flex flex-col items-center justify-center">
                    <label 
                      htmlFor="screenshot-upload"
                      className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-border-subtle hover:border-primary/50 bg-surface/5 rounded-xl cursor-pointer transition-all hover:bg-surface/10 group"
                    >
                      {screenshotFile ? (
                        <div className="text-center space-y-3">
                          {screenshotPreview ? (
                            <img 
                              src={screenshotPreview} 
                              alt="Screenshot Preview" 
                              className="max-h-24 w-auto object-contain rounded-lg mx-auto shadow-md border border-border-subtle"
                            />
                          ) : (
                            <FileImage className="w-8 h-8 text-primary mx-auto" />
                          )}
                          <p className="text-xs text-white font-medium truncate max-w-xs mx-auto">
                            {screenshotFile.name}
                          </p>
                          <span className="text-[10px] text-primary group-hover:underline">
                            Change screenshot
                          </span>
                        </div>
                      ) : (
                        <div className="text-center space-y-2">
                          <Upload className="w-8 h-8 text-text-secondary group-hover:text-primary transition-colors mx-auto" />
                          <p className="text-xs text-text-primary font-semibold">
                            Click to Upload Screenshot
                          </p>
                          <p className="text-[10px] text-text-muted">
                            Supports PNG, JPG, JPEG, or PDF (Max 5MB)
                          </p>
                        </div>
                      )}
                      <input 
                        id="screenshot-upload"
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileChange}
                        required
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Member Tabs for Multi-member Teams */}
              {teamSize > 1 && (
                <div className="flex border-b border-border-subtle/50 mb-2 overflow-x-auto scrollbar-none gap-2 py-1">
                  {Array.from({ length: teamSize }).map((_, idx) => {
                    const isValid = isMemberValid(idx);
                    const isActive = activeTab === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveTab(idx)}
                        className={`flex items-center gap-1.5 px-4 py-2 border-b-2 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? "border-primary text-white"
                            : "border-transparent text-text-secondary hover:text-white"
                        }`}
                      >
                        <span>{idx === 0 ? "Leader (M1)" : `Member ${idx + 1}`}</span>
                        {isValid ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400/50" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Dynamic Member Input Form */}
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Step 3: {teamSize > 1
                      ? activeTab === 0
                        ? "Fill Leader (M1) Details"
                        : `Fill Member ${activeTab + 1} Details`
                      : "Fill Registration Details"}
                  </h4>
                  {teamSize > 1 && activeTab < teamSize - 1 && (
                    <button
                      type="button"
                      onClick={() => setActiveTab((prev) => prev + 1)}
                      className="text-xs text-primary font-medium hover:text-primary-hover flex items-center gap-1 cursor-pointer"
                    >
                      <span>Next Tab</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {activeTab === 0 ? (
                  /* Team Leader Form - Full Fields */
                  hackathon?.fields.map((field) => {
                    const val = leaderDetails[field.name] || "";
                    if (field.type === "textarea") {
                      return (
                        <div key={field.name}>
                          <label
                            htmlFor={`field-${field.name}`}
                            className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2"
                          >
                            {field.label} {field.required && <span className="text-primary">*</span>}
                          </label>
                          <textarea
                            id={`field-${field.name}`}
                            placeholder={`Describe briefly...`}
                            value={val}
                            rows={4}
                            onChange={(e) => handleLeaderChange(field.name, e.target.value)}
                            required={field.required}
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none font-light"
                          />
                        </div>
                      );
                    }
                    return (
                      <div key={field.name}>
                        <label
                          htmlFor={`field-${field.name}`}
                          className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2"
                        >
                          {field.label} {field.required && <span className="text-primary">*</span>}
                        </label>
                        <input
                          id={`field-${field.name}`}
                          type={field.type === "tel" ? "tel" : field.type === "url" ? "url" : "text"}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          value={val}
                          onChange={(e) => handleLeaderChange(field.name, e.target.value)}
                          required={field.required}
                          className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    );
                  })
                ) : (
                  /* Additional Members Form - Name, Email, Phone, College */
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
                        Full Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        value={additionalMembers[activeTab - 1]?.fullName || ""}
                        onChange={(e) => handleMemberChange(activeTab - 1, "fullName", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
                        Email Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={additionalMembers[activeTab - 1]?.email || ""}
                        onChange={(e) => handleMemberChange(activeTab - 1, "email", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
                        Phone Number <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={additionalMembers[activeTab - 1]?.phone || ""}
                        onChange={(e) => handleMemberChange(activeTab - 1, "phone", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
                        College / University <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter college/university name"
                        value={additionalMembers[activeTab - 1]?.college || ""}
                        onChange={(e) => handleMemberChange(activeTab - 1, "college", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-border-subtle text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Price Calculation Card */}
              <div className="p-4 rounded-xl border border-border-subtle bg-surface/5 flex justify-between items-center gap-3">
                <div className="flex items-center gap-2 text-text-secondary">
                  <UserCheck className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-xs font-medium">
                    ₹{fee} per participant x {teamSize}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-text-muted uppercase tracking-wider block">
                    TOTAL AMOUNT PAID
                  </span>
                  <span className="text-lg font-bold text-white">₹{totalAmount}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={registering}
                className="w-full btn-primary justify-center disabled:opacity-50 mt-2 cursor-pointer"
              >
                {registering ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Submitting Details...</span>
                  </>
                ) : (
                  <span>Submit Registration</span>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
