"use client";
import { useState } from "react";

export default function MedicineInfo() {
  const [medicine, setMedicine] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const commonMedicines = [
    "Panadol", "Augmentin", "Brufen", "Flagyl",
    "Omeprazole", "Metformin", "Disprin", "Zyrtec"
  ];

  const getMedicineInfo = async (med?: string) => {
    const input = med || medicine;
    if (!input.trim()) return;
    setLoading(true);
    setResult("");

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a pharmacist assistant. Give detailed information about medicine: ${input}
                Include:
                1) What it is used for
                2) How to take it (dosage)
                3) Common side effects
                4) Important warnings & precautions
                5) Drug interactions to avoid
                6) Is it available in Pakistan & approximate price
                Keep it clear and easy to understand. Always recommend consulting a doctor or pharmacist.`
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
        color: "#a855f7",
        marginBottom: "8px"
      }}>💊 Medicine Info</h1>
      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
        Kisi bhi medicine ka naam likho — AI poori detail batayega
      </p>

      {/* Common Medicines */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "20px"
      }}>
        {commonMedicines.map((med) => (
          <button
            key={med}
            onClick={() => { setMedicine(med); getMedicineInfo(med); }}
            style={{
              background: "#0d1629",
              border: "1px solid #a855f7",
              color: "#a855f7",
              padding: "8px 16px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "13px"
            }}
          >
            {med}
          </button>
        ))}
      </div>

      <input
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && getMedicineInfo()}
        placeholder="Medicine ka naam likho jaise: Panadol, Amoxicillin, Aspirin..."
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

      <button
        onClick={() => getMedicineInfo()}
        disabled={loading}
        style={{
          background: loading ? "#334155" : "#a855f7",
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
        {loading ? "⏳ Searching..." : "Get Medicine Info →"}
      </button>

      {result && (
        <div style={{
          background: "#0d1629",
          border: "1px solid #a855f7",
          borderRadius: "12px",
          padding: "24px",
          color: "#e2e8f0",
          lineHeight: "1.8",
          whiteSpace: "pre-wrap"
        }}>
          <h3 style={{ color: "#a855f7", marginBottom: "12px" }}>🤖 AI Medicine Info:</h3>
          {result}
        </div>
      )}

      <p style={{ color: "#334155", marginTop: "30px", fontSize: "13px" }}>
        ⚠️ Ye sirf educational purposes ke liye hai — doctor ya pharmacist se zaroor consult karo
      </p>
    </div>
  );
}