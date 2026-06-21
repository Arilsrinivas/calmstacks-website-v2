"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/hackathon");
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="mt-3 text-sm text-text-secondary">Redirecting to Admin Hackathon panel...</p>
    </div>
  );
}
