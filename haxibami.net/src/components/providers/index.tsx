"use client";

import React from "react";

import { ThemeProvider } from "next-themes";

// components/providers.tsx
export default function Providers({ children }: { children: React.ReactNode }) {
  // can add more providers here if needed.
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}
