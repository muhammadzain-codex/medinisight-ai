import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MedInSight AI",
  description: "AI-Powered Health Intelligence System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{
          background: "#0d1629",
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #1e3a5f",
          position: "sticky",
          top: 0,
          zIndex: 100
        }}>
          <Link href="/" style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#38bdf8"
          }}>
            🏥 MedInSight AI
          </Link>

          <div style={{ display: "flex", gap: "24px", fontSize: "15px" }}>
            <Link href="/symptom-checker" style={{ color: "#94a3b8" }}>Symptom Checker</Link>
            <Link href="/health-tips" style={{ color: "#94a3b8" }}>Health Tips</Link>
            <Link href="/doctor-finder" style={{ color: "#94a3b8" }}>Doctor Finder</Link>
            <Link href="/medicine-info" style={{ color: "#94a3b8" }}>Medicine Info</Link>
          </div>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}