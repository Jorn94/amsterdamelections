import { useState, useEffect } from "react";

const PARTIES = ["VVD", "D66", "PvdA", "GroenLinks", "CDA", "JA21", "FVD", "Volt"];

const PARTY_COLORS = {
  VVD: "#FF6600",
  D66: "#01AF36",
  PvdA: "#E12B1F",
  GroenLinks: "#5FA82B",
  CDA: "#007B5F",
  JA21: "#1D3557",
  FVD: "#8B1A2B",
  Volt: "#502379",
};

const PARTY_DESCRIPTIONS = {
  VVD: "Liberal-conservative — free enterprise, personal responsibility, pragmatic governance.",
  D66: "Social-liberal — individual freedom, innovation, European orientation, climate action.",
  PvdA: "Social-democratic — equality, solidarity, affordable public services. Aligned with GroenLinks.",
  GroenLinks: "Green-left — climate action, social justice, sustainable development. Aligned with PvdA.",
  CDA: "Christian-democratic — family values, community, tradition, moderate reform.",
  JA21: "Conservative-liberal — law & order, economic freedom, strict immigration.",
  FVD: "National-conservative — sovereignty, anti-establishment, climate scepticism.",
  Volt: "Pan-European progressive — evidence-based policy, innovation, inclusivity.",
};

const questions = [
  {
    theme: "Economy & Entrepreneurship",
    icon: "💼",
    question: "What should Amsterdam prioritise in its economic policy?",
    options: [
      { text: "Reduce taxes and regulations so entrepreneurs can thrive freely", parties: { VVD: 3, JA21: 3, FVD: 2 } },
      { text: "Invest in innovation, startups, and attracting international talent", parties: { D66: 3, Volt: 3, VVD: 1 } },
      { text: "Build a fair economy that fights poverty and supports local SMEs", parties: { PvdA: 3, CDA: 2, GroenLinks: 1 } },
      { text: "Transition to a sustainable, circular economy with fair wages for all", parties: { GroenLinks: 3, PvdA: 2, Volt: 1 } },
    ],
  },
  {
    theme: "Safety & Public Order",
    icon: "🛡️",
    question: "How should Amsterdam approach safety?",
    options: [
      { text: "Stricter enforcement, visible policing, and zero tolerance for disorder", parties: { VVD: 3, JA21: 3, FVD: 2, CDA: 1 } },
      { text: "Smart prevention, neighbourhood policing, and tackling undermining crime", parties: { D66: 3, CDA: 2, Volt: 1 } },
      { text: "Focus on social safety — especially for women, LGBTQIA+, and minorities", parties: { PvdA: 3, GroenLinks: 2, Volt: 2 } },
      { text: "Address root causes of crime through social programmes and community building", parties: { GroenLinks: 3, PvdA: 2, Volt: 1 } },
    ],
  },
  {
    theme: "Housing",
    icon: "🏠",
    question: "What's the best approach to Amsterdam's housing crisis?",
    options: [
      { text: "Build more owner-occupied homes; let developers invest; reduce social housing share", parties: { VVD: 3, JA21: 2, FVD: 1 } },
      { text: "Massively increase supply — 7,500+ new homes/year with innovative concepts", parties: { D66: 3, Volt: 2, JA21: 1 } },
      { text: "Protect and expand social rental housing; regulate investors and speculation", parties: { PvdA: 3, GroenLinks: 3, CDA: 1 } },
      { text: "Better use existing stock — enable house-sharing, learn from Vienna and Copenhagen", parties: { Volt: 3, D66: 2, GroenLinks: 1 } },
    ],
  },
  {
    theme: "Environment & Sustainability",
    icon: "🌿",
    question: "What should Amsterdam's environmental policy look like?",
    options: [
      { text: "Pragmatic measures with a business case — no wind turbines near homes, focus on insulation", parties: { VVD: 3, CDA: 2, JA21: 1 } },
      { text: "Ambitious climate targets, new city parks, and a full energy transition", parties: { D66: 3, GroenLinks: 2, Volt: 1 } },
      { text: "10,000 new trees, wind energy expansion, and a climate-resilient green city", parties: { GroenLinks: 3, PvdA: 2, Volt: 1 } },
      { text: "Stop climate mandates — no wind turbines, no forced gas-free transition", parties: { FVD: 3, JA21: 3 } },
    ],
  },
  {
    theme: "Vision for Amsterdam",
    icon: "🌍",
    question: "Which statement best captures your vision for Amsterdam?",
    options: [
      { text: "A free, clean, and safe city where personal initiative and enterprise are rewarded", parties: { VVD: 3, JA21: 2, CDA: 1 } },
      { text: "An open, innovative city that leads on climate and learns from Europe's best", parties: { D66: 3, Volt: 3 } },
      { text: "A solidary city where everyone has a fair shot, regardless of income or background", parties: { PvdA: 3, GroenLinks: 3 } },
      { text: "A city that protects its traditions and sovereignty — less ideology, more common sense", parties: { JA21: 2, FVD: 3, CDA: 2 } },
    ],
  },
];

function ProgressBar({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            background: i <= current ? "#1a2a4a" : "#d0d8e8",
            transition: "background 0.4s ease",
          }}
        />
      ))}
    </div>
  );
}

function QuestionCard({ q, index, total, onSelect, selected }) {
  return (
    <div
      style={{
        animation: "fadeSlide 0.45s ease-out",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: "#7a8aa8", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>
          {q.theme}
        </span>
      </div>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#0f1f3d",
          lineHeight: 1.35,
          margin: "0 0 24px 0",
          fontFamily: "'Newsreader', 'Georgia', serif",
        }}
      >
        <span style={{ fontSize: 28, marginRight: 8 }}>{q.icon}</span>
        {q.question}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt, oi) => {
          const isSelected = selected === oi;
          return (
            <button
              key={oi}
              onClick={() => onSelect(oi)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                padding: "14px 18px",
                border: isSelected ? "2px solid #1a2a4a" : "2px solid #e0e6ef",
                borderRadius: 12,
                background: isSelected ? "#eef2f9" : "#fff",
                cursor: "pointer",
                textAlign: "left",
                fontSize: 15,
                lineHeight: 1.5,
                color: "#1a2a4a",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.2s ease",
                boxShadow: isSelected ? "0 2px 12px rgba(26,42,74,0.1)" : "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: isSelected ? "2px solid #1a2a4a" : "2px solid #c0c8d8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: isSelected ? "#fff" : "#7a8aa8",
                  background: isSelected ? "#1a2a4a" : "transparent",
                  marginTop: 1,
                  transition: "all 0.2s ease",
                }}
              >
                {String.fromCharCode(65 + oi)}
              </span>
              <span style={{ fontWeight: isSelected ? 600 : 400 }}>{opt.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultsScreen({ scores }) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const maxScore = sorted[0][1];
  const winners = sorted.filter(([, s]) => s === maxScore);
  const topParty = winners[0][0];

  return (
    <div style={{ animation: "fadeSlide 0.5s ease-out" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🗳️</div>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#0f1f3d",
            margin: "0 0 6px 0",
            fontFamily: "'Newsreader', 'Georgia', serif",
          }}
        >
          Your closest match{winners.length > 1 ? "es" : ""}
        </h2>
        <p style={{ fontSize: 14, color: "#7a8aa8", margin: 0 }}>
          Based on your 5 answers
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {sorted.map(([party, score], i) => {
          const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
          const isTop = score === maxScore;
          return (
            <div
              key={party}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                borderRadius: 10,
                background: isTop ? "#f0f4fb" : "#fafbfd",
                border: isTop ? `2px solid ${PARTY_COLORS[party]}` : "1px solid #e8ecf2",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: PARTY_COLORS[party],
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontWeight: isTop ? 800 : 600,
                  fontSize: isTop ? 16 : 14,
                  color: "#0f1f3d",
                  width: 90,
                  flexShrink: 0,
                }}
              >
                {party}
              </span>
              <div style={{ flex: 1, height: 8, background: "#e0e6ef", borderRadius: 4, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    background: PARTY_COLORS[party],
                    borderRadius: 4,
                    transition: "width 0.8s ease-out",
                  }}
                />
              </div>
              <span style={{ fontSize: 13, color: "#7a8aa8", fontWeight: 600, width: 32, textAlign: "right" }}>
                {score}pt
              </span>
            </div>
          );
        })}
      </div>

      {winners.map(([party]) => (
        <div
          key={party}
          style={{
            padding: "16px 18px",
            borderRadius: 12,
            background: `linear-gradient(135deg, ${PARTY_COLORS[party]}11, ${PARTY_COLORS[party]}22)`,
            borderLeft: `4px solid ${PARTY_COLORS[party]}`,
            marginBottom: 12,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 15, color: PARTY_COLORS[party], marginBottom: 4 }}>
            {party}
          </div>
          <div style={{ fontSize: 13, color: "#3a4a6a", lineHeight: 1.5 }}>
            {PARTY_DESCRIPTIONS[party]}
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: 20,
          padding: "14px 16px",
          borderRadius: 10,
          background: "#f8f9fc",
          border: "1px solid #e0e6ef",
        }}
      >
        <p style={{ fontSize: 12, color: "#7a8aa8", lineHeight: 1.6, margin: 0 }}>
          <strong>Disclaimer:</strong> This is a simplified quiz based on the 2026 Amsterdam election programmes. It covers only 5 themes and cannot capture the full complexity of each party's platform. For a thorough comparison, consult the official StemWijzer, Kieskompas, or the full verkiezingsprogramma of each party. This quiz does not recommend any party.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  function handleSelect(optionIndex) {
    setSelected(optionIndex);
  }

  function handleNext() {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ + 1 >= questions.length) {
      // Calculate results
      setShowResults(true);
    } else {
      setCurrentQ(currentQ + 1);
      setAnimKey((k) => k + 1);
    }
  }

  function handleRestart() {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setShowResults(false);
    setAnimKey((k) => k + 1);
  }

  function getScores() {
    const scores = {};
    PARTIES.forEach((p) => (scores[p] = 0));
    answers.forEach((ansIdx, qIdx) => {
      const parties = questions[qIdx].options[ansIdx].parties;
      Object.entries(parties).forEach(([p, s]) => {
        scores[p] = (scores[p] || 0) + s;
      });
    });
    return scores;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Newsreader:opsz,wght@6..72,400;6..72,700&display=swap');
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "32px 24px",
          fontFamily: "'DM Sans', sans-serif",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#eef2f9",
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              color: "#4a5a7a",
              letterSpacing: 0.8,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            🇳🇱 Amsterdam · 18 March 2026
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#0f1f3d",
              margin: "0 0 4px 0",
              fontFamily: "'Newsreader', 'Georgia', serif",
              lineHeight: 1.2,
            }}
          >
            Which party fits you?
          </h1>
          <p style={{ fontSize: 14, color: "#7a8aa8", margin: 0 }}>
            5 questions · Amsterdam municipal elections
          </p>
        </div>

        {!showResults ? (
          <>
            <ProgressBar current={currentQ} total={questions.length} />
            <div key={animKey}>
              <QuestionCard
                q={questions[currentQ]}
                index={currentQ}
                total={questions.length}
                onSelect={handleSelect}
                selected={selected}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
              <button
                onClick={handleNext}
                disabled={selected === null}
                style={{
                  padding: "12px 32px",
                  borderRadius: 10,
                  border: "none",
                  background: selected !== null ? "#1a2a4a" : "#c0c8d8",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: selected !== null ? "pointer" : "default",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s ease",
                  boxShadow: selected !== null ? "0 4px 14px rgba(26,42,74,0.25)" : "none",
                }}
              >
                {currentQ === questions.length - 1 ? "See results" : "Next →"}
              </button>
            </div>
          </>
        ) : (
          <>
            <ResultsScreen scores={getScores()} />
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button
                onClick={handleRestart}
                style={{
                  padding: "10px 28px",
                  borderRadius: 10,
                  border: "2px solid #1a2a4a",
                  background: "transparent",
                  color: "#1a2a4a",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                ↺ Take quiz again
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
