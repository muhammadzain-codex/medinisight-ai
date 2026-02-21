import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: "🩺",
      title: "Symptom Checker",
      desc: "Apne symptoms daalo, AI batayega possible conditions",
      link: "/symptom-checker",
      color: "#ef4444"
    },
    {
      icon: "💡",
      title: "Health Tips",
      desc: "AI se personalized health advice lo",
      link: "/health-tips",
      color: "#22c55e"
    },
    {
      icon: "🏥",
      title: "Doctor Finder",
      desc: "Apne area ke doctors aur hospitals dhundo",
      link: "/doctor-finder",
      color: "#3b82f6"
    },
    {
      icon: "💊",
      title: "Medicine Info",
      desc: "Kisi bhi medicine ke baare mein AI se poocho",
      link: "/medicine-info",
      color: "#a855f7"
    }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f1e",
      padding: "60px 40px",
      textAlign: "center"
    }}>
      {/* Hero Section */}
      <div style={{ marginBottom: "60px" }}>
        <h1 style={{
          fontSize: "48px",
          fontWeight: "bold",
          color: "#38bdf8",
          marginBottom: "16px"
        }}>
          🏥 MedInSight AI
        </h1>
        <p style={{
          fontSize: "20px",
          color: "#94a3b8",
          maxWidth: "600px",
          margin: "0 auto 30px"
        }}>
          AI-powered health intelligence system — symptoms se lekar medicine info tak, sab kuch ek jagah
        </p>
        <Link href="/symptom-checker" style={{
          background: "#38bdf8",
          color: "#0a0f1e",
          padding: "14px 32px",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "16px",
          display: "inline-block"
        }}>
          Start Symptom Check →
        </Link>
      </div>

      {/* Features Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "24px",
        maxWidth: "900px",
        margin: "0 auto"
      }}>
        {features.map((f) => (
          <Link href={f.link} key={f.title}>
            <div style={{
              background: "#0d1629",
              border: "1px solid #1e3a5f",
              borderRadius: "12px",
              padding: "30px 20px",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>{f.icon}</div>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: f.color,
                marginBottom: "8px"
              }}>{f.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: "14px" }}>{f.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <p style={{ color: "#334155", marginTop: "60px", fontSize: "13px" }}>
        ⚠️ MedInSight AI sirf educational purposes ke liye hai — doctor ki jagah nahi le sakta
      </p>
    </div>
  );
}