"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu } from "@/components/Menu";

const logoUrl =
  "https://www.figma.com/api/mcp/asset/afebdf16-c3ff-40b2-9778-7f09c526774b";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference
                   flex items-center justify-between
                   px-6 py-2
                   pointer-events-none"
      >
        {/* Logo */}
        <div
          className="relative shrink-0 pointer-events-auto"
          style={{ width: "2.477rem", height: "4.744rem" }}
        >
          <Image
            src={logoUrl}
            alt="Hypermotion X logo"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

        {/* Hamburger — three white bars, inverts via mix-blend-difference */}
        <button
          className="flex flex-col items-end pointer-events-auto cursor-pointer"
          style={{ width: "3.184rem", height: "2.313rem", gap: "0.376rem" }}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <span className="block bg-white w-full" style={{ height: "0.532rem" }} />
          <span className="block bg-white w-full" style={{ height: "0.532rem" }} />
          <span className="block bg-white w-full" style={{ height: "0.532rem" }} />
        </button>
      </nav>

      <Menu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
