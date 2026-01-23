import "./globals.css";
import React from "react";

export const metadata = {
  title: "Crop Yield Prediction",
  description: "AI-Based Crop Health & Yield Analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
