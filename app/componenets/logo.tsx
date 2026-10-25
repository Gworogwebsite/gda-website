"use client";

import React, { useState } from "react";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  // Dimension presets
  const dimensions = {
    sm: "w-10 h-10 text-sm",
    md: "w-13 h-13 text-base",
    lg: "w-16 h-16 text-xl",
  };

  const pixelSizes = {
    sm: 40,
    md: 52,
    lg: 64,
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full p-1 
        bg-gradient-to-br from-[#8A1A31] via-[#4A0D1A] to-[#120407] 
        border-2 border-[#EADCC8]/40 
        shadow-[inset_0_2px_4px_rgba(255,255,255,0.35),0_6px_15px_rgba(0,0,0,0.7)] 
        transition-transform duration-300 hover:scale-105 ${dimensions[size]}`}
      title="Gwòròg Development Association"
    >
      {/* If your logo.png exists in public/logo.png, it displays here */}
      {!imageError ? (
        <Image
          src="/logo.png"
          alt="GDA Crest"
          width={pixelSizes[size]}
          height={pixelSizes[size]}
          className="w-full h-full object-contain rounded-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          onError={() => setImageError(true)}
        />
      ) : (
        /* Fallback embossed text badge if logo.png is not yet in public folder */
        <span className="font-black tracking-wider text-[#FDFBF7] drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
          GDA
        </span>
      )}
    </div>
  );
}