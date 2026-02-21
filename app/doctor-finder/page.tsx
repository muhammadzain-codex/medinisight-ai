"use client";
import { useState } from "react";

export default function DoctorFinder() {
  const [city, setCity] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const specialties = [
    "General Physician",
    "Cardiologist",
    "Dermatologist",
    "Orthopedic",
    "Neurologist",
    "Pediatrician",
    "Gynecologist",
    "Psychiatrist"
  ];

  const findDoctors = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Act as a medical directory assistant for Pakistan. 
                User is looking for ${specialty || "general"} doctors/hospitals in ${city}, Pakistan.
                Provide: 
                1) Top hospitals in ${city} for ${specialty || "general medicine"}
                2) What to look for when choosing a doctor
                3) Average consultation fee range in Pakistan
                4) Tips for booking appointments
                5) Emergency numbers in Pakistan (like Rescue 1122, Edhi Foundation etc)
                Keep response helpful and practical for Pakistani users.`
              }]
            }]
          })
        }
      );
      const data = await res.json();
      setResult(data.candidates[0].content.parts[0].text);
    } catch {
      setResult("Error aa gaya. API key check karo.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f1e",
      padding: "40px",
      maxWidth: "800px",
      margin: "0 auto"
    }}>
      <h1 style={{
        fontSize: "32px",
        fontWeight: "bold",
        color: "#3b82f6",
        marginBottom: "8px"
      }}>🏥 Doctor Finder</h1>
      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
        Apna city aur specialty batao — AI best options suggest karega
      </p>

      {/* City Input */}
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Apna city likho jaise: Lahore, Karachi, Islamabad..."
        style={{
          width: "100%",
          background: "#0d1629",
          border: "1px solid #1e3a5f",
          borderRadius: "10px",
          padding: "14px 16px",
          color: "#e2e8f0",
          fontSize: "15px",
          outline: "none",
          marginBottom: "16px"
        }}
      />

      {/* Specialty Select */}
      <select
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
        style={{
          width: "100%",
          background: "#0d1629",
          border: "1px solid #1e3a5f",
          borderRadius: "10px",
          padding: "14px 16px",
          color: specialty ? "#e2e8f0" : "#64748b",
          fontSize: "15px",
          outline: "none",
          marginBottom: "16px",
          cursor: "pointer"
        }}
      >
        <option value="">Specialty select karo (optional)</option>
        {specialties.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <button
        onClick={findDoctors}
        disabled={loading}
        style={{
          background: loading ? "#334155" : "#3b82f6",
          color: "white",
          border: "none",
          padding: "14px 32px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: "30px"
        }}
      >
        {loading ? "⏳ Searching..." : "Find Doctors →"}
      </button>

      {result && (
        <div style={{
          background: "#0d1629",
          border: "1px solid #3b82f6",
          borderRadius: "12px",
          padding: "24px",
          color: "#e2e8f0",
          lineHeight: "1.8",
          whiteSpace: "pre-wrap"
        }}>
          <h3 style={{ color: "#3b82f6", marginBottom: "12px" }}>🤖 AI Suggestions:</h3>
          {result}
        </div>
      )}

      {/* Emergency Box */}
      <div style={{
        background: "#1a0a0a",
        border: "1px solid #ef4444",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "30px"
      }}>
        <h3 style={{ color: "#ef4444", marginBottom: "12px" }}>🚨 Emergency Numbers Pakistan</h3>
        <div style={{ color: "#94a3b8", lineHeight: "2" }}>
          <p>🔴 <strong style={{ color: "#e2e8f0" }}>Rescue:</strong> 1122</p>
          <p>🔴 <strong style={{ color: "#e2e8f0" }}>Ambulance (Edhi):</strong> 115</p>
          <p>🔴 <strong style={{ color: "#e2e8f0" }}>Police:</strong> 15</p>
          <p>🔴 <strong style={{ color: "#e2e8f0" }}>Fire Brigade:</strong> 16</p>
        </div>
      </div>
    </div>
  );
}