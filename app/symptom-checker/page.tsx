"use client";
import { useState } from "react";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const checkSymptoms = async () => {
    if (!symptoms.trim()) return;
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
                text: `You are a medical AI assistant. User has these symptoms: ${symptoms}. 
                Provide: 1) Possible conditions 2) Severity level 3) Recommended actions 4) Warning signs to watch for.
                Keep response clear and structured. Always recommend consulting a doctor.`
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
        color: "#ef4444",
        marginBottom: "8px"
      }}>🩺 Symptom Checker</h1>
      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
        Apne symptoms daalo — AI possible conditions batayega
      </p>

      <textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Jaise: mujhe bukhaar hai, sar dard ho raha hai, naak beh rahi hai..."
        style={{
          width: "100%",
          height: "140px",
          background: "#0d1629",
          border: "1px solid #1e3a5f",
          borderRadius: "10px",
          padding: "16px",
          color: "#e2e8f0",
          fontSize: "15px",
          resize: "none",
          outline: "none",
          marginBottom: "16px"
        }}
      />

      <button
        onClick={checkSymptoms}
        disabled={loading}
        style={{
          background: loading ? "#334155" : "#ef4444",
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
        {loading ? "⏳ Analyzing..." : "Check Symptoms →"}
      </button>

      {result && (
        <div style={{
          background: "#0d1629",
          border: "1px solid #ef4444",
          borderRadius: "12px",
          padding: "24px",
          color: "#e2e8f0",
          lineHeight: "1.8",
          whiteSpace: "pre-wrap"
        }}>
          <h3 style={{ color: "#ef4444", marginBottom: "12px" }}>🤖 AI Analysis:</h3>
          {result}
        </div>
      )}

      <p style={{ color: "#334155", marginTop: "30px", fontSize: "13px" }}>
        ⚠️ Ye sirf educational purposes ke liye hai — doctor ki jagah nahi le sakta
      </p>
    </div>
  );
}