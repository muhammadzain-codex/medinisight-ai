"use client";
import { useState } from "react";

export default function HealthTips() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const quickTopics = [
    "Weight loss tips",
    "Better sleep advice",
    "Stress management",
    "Healthy diet plan",
    "Exercise for beginners",
    "Boost immunity"
  ];

  const getTips = async (topic?: string) => {
    const input = topic || query;
    if (!input.trim()) return;
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
                text: `You are a health advisor. Give practical, actionable health tips about: ${input}.
                Include: 1) Top 5 tips 2) Daily routine suggestions 3) Foods to eat/avoid 4) Exercise recommendations.
                Keep it friendly, clear and easy to follow.`
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
        color: "#22c55e",
        marginBottom: "8px"
      }}>💡 Health Tips</h1>
      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>
        Koi bhi health topic likho — AI personalized tips dega
      </p>

      {/* Quick Topics */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "20px"
      }}>
        {quickTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => { setQuery(topic); getTips(topic); }}
            style={{
              background: "#0d1629",
              border: "1px solid #22c55e",
              color: "#22c55e",
              padding: "8px 16px",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "13px"
            }}
          >
            {topic}
          </button>
        ))}
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ya apna topic likho jaise: diabetes management, back pain relief..."
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
        onClick={() => getTips()}
        disabled={loading}
        style={{
          background: loading ? "#334155" : "#22c55e",
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
        {loading ? "⏳ Loading..." : "Get Health Tips →"}
      </button>

      {result && (
        <div style={{
          background: "#0d1629",
          border: "1px solid #22c55e",
          borderRadius: "12px",
          padding: "24px",
          color: "#e2e8f0",
          lineHeight: "1.8",
          whiteSpace: "pre-wrap"
        }}>
          <h3 style={{ color: "#22c55e", marginBottom: "12px" }}>🤖 AI Health Tips:</h3>
          {result}
        </div>
      )}
    </div>
  );
}