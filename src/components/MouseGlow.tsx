"use client";

import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-30 transition-transform duration-300 ease-out -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "350px",
        height: "350px",
        background: "radial-gradient(circle, rgba(41, 151, 255, 0.08) 0%, rgba(139, 92, 246, 0.04) 50%, rgba(0,0,0,0) 100%)",
      }}
    />
  );
}
