import { useState, useRef, useEffect } from "react";

// ─── Utility ────────────────────────────────────────────────────────────────
const cls = (...a) => a.filter(Boolean).join(" ");

const COLORS = {
  bg: "#0B1220",
  card: "#111827",
  surface: "#1F2937",
  border: "#1F2937",
  borderLight: "#374151",
  accent: "#2563EB",
  accentHover: "#1D4ED8",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  textPrimary: "#F9FAFB",
  textSecondary: "#9CA3AF",
  textMuted: "#6B7280",
};

// ─── Mock AI responses ───────────────────────────────────────────────────────
const MOCK_DATA = {
  shortSummary:
    "తెలంగాణ ప్రభుత్వం రైతులకు ఆర్థిక సహాయం అందించేందుకు కొత్త పథకాన్ని ప్రారంభించింది. ఈ పథకం ద్వారా రాష్ట్రంలోని 40 లక్షల మంది రైతులకు ప్రయోజనం చేకూరనుంది.",
  mediumSummary:
    "తెలంగాణ ముఖ్యమంత్రి రేవంత్ రెడ్డి నేతృత్వంలో రాష్ట్ర కాబినెట్ రైతు సంక్షేమ పథకాన్ని ఆమోదించింది. ₹12,000 కోట్ల బడ్జెట్‌తో రూపొందించిన ఈ పథకం ద్వారా నీటిపారుదల, విత్తన సరఫరా, మరియు పంట బీమా సేవలు అందించనున్నారు. ఖరీఫ్ సీజన్ ముందు పథకం అమలు మొదలుపెట్టాలని అధికారులు లక్ష్యంగా పెట్టుకున్నారు.",
  detailedSummary:
    "తెలంగాణ రాష్ట్ర ప్రభుత్వం బుధవారం రైతు సంక్షేమానికి సంబంధించిన సమగ్ర పథకాన్ని ప్రకటించింది. ముఖ్యమంత్రి రేవంత్ రెడ్డి అధ్యక్షతన జరిగిన కాబినెట్ సమావేశంలో ఈ నిర్ణయం తీసుకున్నారు.\n\nపథకం ముఖ్యాంశాలు: ₹12,000 కోట్ల బడ్జెట్, 40 లక్షల రైతుల లబ్ధి, ఎకరాకు ₹5,000 సహాయం. ఖరీఫ్ సీజన్ ముందే నిధులు విడుదల చేయనున్నారు. నీటిపారుదల మౌలిక సదుపాయాల అభివృద్ధికి ప్రత్యేక నిధులు కేటాయించారు.",
  highlights: [
    "₹12,000 కోట్ల రైతు సంక్షేమ పథకం ఆమోదం",
    "40 లక్షల మంది రైతులకు ప్రత్యక్ష ప్రయోజనం",
    "ఎకరాకు ₹5,000 ఆర్థిక సహాయం అందజేత",
    "ఖరీఫ్ సీజన్ ముందే నిధుల విడుదల",
    "నీటిపారుదల మౌలిక సదుపాయాల అభివృద్ధి",
    "పంట బీమా కవరేజ్ విస్తరణ",
  ],
  headlines: {
    breaking: "తెలంగాణ ప్రభుత్వం రైతులకు ₹12,000 కోట్ల సహాయ పథకం ప్రకటించింది",
    seo: "Telangana Farmer Welfare Scheme 2025: Rs 12,000 Crore Package for 40 Lakh Farmers | Key Highlights",
    editorial: "ఖరీఫ్ సీజన్ వేళ రైతుకు ఊరట: తెలంగాణ కాబినెట్ చరిత్రాత్మక నిర్ణయం",
    social: "🌾 BIG NEWS! తెలంగాణ రైతులకు గుడ్ న్యూస్! ₹12K కోట్ల పథకం రెడీ 🎉 #TelanganaFarmers #RythuBandhu",
  },
  quotes: [
    { text: "ఈ పథకం రైతులజీవితాలను మార్చే చరిత్రాత్మక అడుగు. తెలంగాణ రైతు ఇకపై ఏ ఇబ్బందులు పడకుండా ముందుకు సాగుతాడు.", author: "రేవంత్ రెడ్డి", role: "ముఖ్యమంత్రి, తెలంగాణ" },
    { text: "ప్రభుత్వం వ్యవసాయ రంగానికి ఇచ్చిన ప్రాధాన్యత అభినందనీయం. ఇది రైతుల ఆత్మహత్యలు నివారించడంలో కీలక పాత్ర పోషిస్తుంది.", author: "పల్లా రాజేశ్వర్ రెడ్డి", role: "వ్యవసాయ మంత్రి" },
  ],
  whatsapp: "🗞️ *తాజా వార్త | NewsSaar AI*\n\n*తెలంగాణ రైతులకు ₹12,000 కోట్ల పథకం*\n\n✅ 40 లక్షల రైతులకు లాభం\n✅ ఎకరాకు ₹5,000 సహాయం\n✅ ఖరీఫ్ ముందే నిధులు\n\n📌 _NewsSaar AI ద్వారా సమాచారం_\n🔗 namasttelangana.com",
  social: {
    twitter: "🌾 BREAKING: తెలంగాణ ప్రభుత్వం రైతులకు ₹12,000 కోట్ల సంక్షేమ పథకం ప్రకటించింది!\n\n40 లక్షల రైతులకు ఎకరాకు ₹5,000\nఖరీఫ్ సీజన్ ముందే నిధుల విడుదల\n\n#TelanganaNews #RythuBandhu #TelanganaCM",
    facebook: "📢 తెలంగాణ రైతులకు చారిత్రాత్మక సహాయం!\n\nముఖ్యమంత్రి రేవంత్ రెడ్డి నేతృత్వంలో కాబినెట్ ₹12,000 కోట్ల రైతు సంక్షేమ పథకానికి ఆమోదం తెలిపింది. 40 లక్షల మంది రైతులు ఈ పథకం ద్వారా నేరుగా లాభపడనున్నారు.\n\nపూర్తి వివరాలకు మా వెబ్‌సైట్ చూడండి 👇",
    instagram: "రైతు మందహాసం 🌾✨\n\nతెలంగాణ ప్రభుత్వం రైతుల కోసం ₹12,000 కోట్ల పథకం తీసుకొచ్చింది!\n\n40 లక్షల రైతు కుటుంబాలకు ఊరట 🙏\n\n#తెలంగాణ #రైతు #TelanganaNEWS #Telangana #Farmer #Agriculture",
    linkedin: "Telangana Government's ₹12,000 Crore Farmer Welfare Initiative — A Strategic Investment in Agricultural Sustainability\n\nThe Telangana Cabinet, under CM Revanth Reddy, approved a comprehensive welfare package covering 4 million farmers. Key elements include per-acre financial support, irrigation infrastructure, and enhanced crop insurance — signaling a data-driven approach to agrarian economic stability.",
  },
  keywords: ["రైతు సంక్షేమం", "తెలంగాణ కాబినెట్", "వ్యవసాయ పథకం", "రేవంత్ రెడ్డి", "₹12000 కోట్లు", "ఖరీఫ్ సీజన్", "Farmer Welfare", "Telangana", "Agriculture", "Irrigation", "Crop Insurance", "RythuBandhu"],
};

const PROCESSING_STEPS = [
  "Analyzing article structure...",
  "Extracting key information...",
  "Generating summaries...",
  "Creating headlines...",
  "Preparing social content...",
];

// ─── Design tokens (CSS-in-JS) ───────────────────────────────────────────────
const s = {
  card: {
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "12px",
    padding: "24px",
  },
  surface: {
    background: COLORS.surface,
    border: `1px solid ${COLORS.borderLight}`,
    borderRadius: "8px",
    padding: "12px 16px",
  },
  label: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: COLORS.textMuted,
  },
  accent: {
    background: COLORS.accent,
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.02em",
  },
  ghost: {
    background: "transparent",
    color: COLORS.textSecondary,
    border: `1px solid ${COLORS.borderLight}`,
    borderRadius: "8px",
    padding: "8px 14px",
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function CopyButton({ text, small }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={handleCopy}
      style={{
        ...s.ghost,
        padding: small ? "5px 10px" : "7px 14px",
        fontSize: "11px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        transition: "all 0.15s",
        color: copied ? COLORS.success : COLORS.textSecondary,
        borderColor: copied ? COLORS.success : COLORS.borderLight,
      }}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function SectionHeader({ icon, title, badge }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
      <span style={{ fontSize: "16px" }}>{icon}</span>
      <span style={{ fontSize: "13px", fontWeight: 700, color: COLORS.textPrimary, letterSpacing: "0.01em" }}>{title}</span>
      {badge && (
        <span style={{
          background: `${COLORS.accent}22`,
          color: COLORS.accent,
          fontSize: "10px",
          fontWeight: 700,
          padding: "2px 8px",
          borderRadius: "100px",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}>{badge}</span>
      )}
    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: COLORS.border, margin: "24px 0" }} />;
}

function LoadingSkeleton() {
  return (
    <div>
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{ marginBottom: "16px" }}>
          <div style={{
            height: i === 0 ? "14px" : "10px",
            width: i === 0 ? "60%" : `${75 - i * 10}%`,
            background: COLORS.surface,
            borderRadius: "6px",
            marginBottom: "8px",
            animation: "pulse 1.5s ease-in-out infinite",
          }} />
        </div>
      ))}
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  );
}

// ─── Section: AI Summary ─────────────────────────────────────────────────────
function AISummaryCard({ data }) {
  const [tab, setTab] = useState("short");
  const tabs = [{ key: "short", label: "Short" }, { key: "medium", label: "Medium" }, { key: "detailed", label: "Detailed" }];
  const content = { short: data.shortSummary, medium: data.mediumSummary, detailed: data.detailedSummary }[tab];

  return (
    <div style={s.card}>
      <SectionHeader icon="⚡" title="AI Summary" badge="Telugu" />
      <div style={{ display: "flex", gap: "4px", marginBottom: "20px", background: COLORS.bg, borderRadius: "8px", padding: "4px" }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              flex: 1,
              padding: "7px",
              fontSize: "12px",
              fontWeight: 600,
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.15s",
              background: tab === t.key ? COLORS.accent : "transparent",
              color: tab === t.key ? "#fff" : COLORS.textSecondary,
            }}
          >{t.label}</button>
        ))}
      </div>
      <p style={{ fontSize: "14px", lineHeight: 1.85, color: COLORS.textPrimary, margin: "0 0 16px", whiteSpace: "pre-line" }}>{content}</p>
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <CopyButton text={content} />
        <button style={{ ...s.ghost, fontSize: "11px", padding: "7px 14px" }}>↺ Regenerate</button>
      </div>
    </div>
  );
}

// ─── Section: Key Highlights ─────────────────────────────────────────────────
function KeyHighlightsCard({ highlights }) {
  return (
    <div style={s.card}>
      <SectionHeader icon="✦" title="Key Highlights" />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {highlights.map((h, i) => (
          <div key={i} style={{
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
            padding: "12px 14px",
            background: COLORS.bg,
            borderRadius: "8px",
            border: `1px solid ${COLORS.border}`,
          }}>
            <span style={{ color: COLORS.success, fontSize: "13px", marginTop: "1px", flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: "13px", color: COLORS.textPrimary, lineHeight: 1.7 }}>{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Headlines Generator ────────────────────────────────────────────
function HeadlinesCard({ headlines }) {
  const types = [
    { key: "breaking", label: "Breaking News", icon: "🔴", accentColor: "#EF4444" },
    { key: "seo", label: "SEO Headline", icon: "🔍", accentColor: COLORS.accent },
    { key: "editorial", label: "Editorial", icon: "✍️", accentColor: "#8B5CF6" },
    { key: "social", label: "Social Media", icon: "📱", accentColor: COLORS.success },
  ];

  return (
    <div style={s.card}>
      <SectionHeader icon="📰" title="Headlines Generator" />
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {types.map(t => (
          <div key={t.key} style={{
            background: COLORS.bg,
            borderRadius: "8px",
            border: `1px solid ${COLORS.border}`,
            borderLeft: `3px solid ${t.accentColor}`,
            padding: "14px 16px",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "12px" }}>{t.icon}</span>
                <span style={{ ...s.label, color: t.accentColor }}>{t.label}</span>
              </div>
              <CopyButton text={headlines[t.key]} small />
            </div>
            <p style={{ fontSize: "13px", color: COLORS.textPrimary, lineHeight: 1.65, margin: 0 }}>{headlines[t.key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: Quotes ─────────────────────────────────────────────────────────
function QuotesCard({ quotes }) {
  return (
    <div style={s.card}>
      <SectionHeader icon="❝" title="Important Quotes" />
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {quotes.map((q, i) => (
          <div key={i} style={{
            background: COLORS.bg,
            borderRadius: "8px",
            border: `1px solid ${COLORS.border}`,
            borderLeft: `3px solid ${COLORS.accent}`,
            padding: "16px 18px",
          }}>
            <p style={{
              fontSize: "14px",
              lineHeight: 1.8,
              color: COLORS.textPrimary,
              margin: "0 0 12px",
              fontStyle: "italic",
            }}>"{q.text}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: `${COLORS.accent}33`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                color: COLORS.accent,
              }}>{q.author[0]}</div>
              <div>
                <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: COLORS.textPrimary }}>{q.author}</p>
                <p style={{ margin: 0, fontSize: "11px", color: COLORS.textMuted }}>{q.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section: WhatsApp ───────────────────────────────────────────────────────
function WhatsAppCard({ text }) {
  return (
    <div style={s.card}>
      <SectionHeader icon="💬" title="WhatsApp Ready Summary" badge="Shareable" />
      <div style={{ background: "#0a1929", borderRadius: "12px", padding: "16px", border: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", paddingBottom: "10px", borderBottom: `1px solid #1e3a52` }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#fff" }}>N</div>
          <div>
            <p style={{ margin: 0, fontSize: "12px", fontWeight: 700, color: "#E2FCCB" }}>NewsSaar AI</p>
            <p style={{ margin: 0, fontSize: "10px", color: "#8baec1" }}>Media Group · just now</p>
          </div>
        </div>
        <div style={{
          background: "#1b4a2d",
          borderRadius: "8px",
          padding: "12px 14px",
          maxWidth: "90%",
          marginLeft: "auto",
        }}>
          <pre style={{
            margin: 0,
            fontFamily: "'Segoe UI', sans-serif",
            fontSize: "12.5px",
            lineHeight: 1.75,
            color: "#E2FCCB",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}>{text}</pre>
          <p style={{ margin: "6px 0 0", fontSize: "10px", color: "#8baec1", textAlign: "right" }}>✓✓ 9:42 AM</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: "8px", marginTop: "14px", justifyContent: "flex-end" }}>
        <CopyButton text={text} />
        <button style={{ ...s.accent, fontSize: "11px", padding: "8px 16px", background: "#25D366" }}>Share on WhatsApp</button>
      </div>
    </div>
  );
}

// ─── Section: Social Media ────────────────────────────────────────────────────
function SocialCard({ social }) {
  const [tab, setTab] = useState("twitter");
  const platforms = [
    { key: "twitter", label: "X (Twitter)", color: "#1DA1F2" },
    { key: "facebook", label: "Facebook", color: "#4267B2" },
    { key: "instagram", label: "Instagram", color: "#E1306C" },
    { key: "linkedin", label: "LinkedIn", color: "#0A66C2" },
  ];
  const active = platforms.find(p => p.key === tab);

  return (
    <div style={s.card}>
      <SectionHeader icon="📲" title="Social Media Captions" />
      <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
        {platforms.map(p => (
          <button
            key={p.key}
            onClick={() => setTab(p.key)}
            style={{
              padding: "6px 14px",
              fontSize: "11px",
              fontWeight: 600,
              border: `1px solid ${tab === p.key ? p.color : COLORS.borderLight}`,
              borderRadius: "100px",
              cursor: "pointer",
              transition: "all 0.15s",
              background: tab === p.key ? `${p.color}20` : "transparent",
              color: tab === p.key ? p.color : COLORS.textSecondary,
            }}
          >{p.label}</button>
        ))}
      </div>
      <div style={{
        background: COLORS.bg,
        borderRadius: "8px",
        border: `1px solid ${COLORS.border}`,
        borderTop: `2px solid ${active.color}`,
        padding: "16px",
      }}>
        <pre style={{
          margin: "0 0 14px",
          fontFamily: "inherit",
          fontSize: "13px",
          lineHeight: 1.75,
          color: COLORS.textPrimary,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}>{social[tab]}</pre>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: COLORS.textMuted }}>{social[tab].length} chars</span>
          <CopyButton text={social[tab]} small />
        </div>
      </div>
    </div>
  );
}

// ─── Section: Keywords ────────────────────────────────────────────────────────
function KeywordsCard({ keywords }) {
  const [selected, setSelected] = useState([]);
  const toggle = k => setSelected(s => s.includes(k) ? s.filter(x => x !== k) : [...s, k]);

  return (
    <div style={s.card}>
      <SectionHeader icon="🏷️" title="Keywords & SEO Tags" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {keywords.map((k, i) => (
          <button
            key={i}
            onClick={() => toggle(k)}
            style={{
              padding: "6px 14px",
              fontSize: "12px",
              fontWeight: 500,
              borderRadius: "100px",
              cursor: "pointer",
              transition: "all 0.15s",
              border: `1px solid ${selected.includes(k) ? COLORS.accent : COLORS.borderLight}`,
              background: selected.includes(k) ? `${COLORS.accent}20` : COLORS.bg,
              color: selected.includes(k) ? COLORS.accent : COLORS.textSecondary,
            }}
          >{k}</button>
        ))}
      </div>
      {selected.length > 0 && (
        <div style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "11px", color: COLORS.textMuted }}>{selected.length} selected</span>
          <CopyButton text={selected.join(", ")} small />
          <button onClick={() => setSelected([])} style={{ ...s.ghost, fontSize: "11px", padding: "4px 10px" }}>Clear</button>
        </div>
      )}
    </div>
  );
}

// ─── Section: Export ──────────────────────────────────────────────────────────
function ExportCard() {
  const exports = [
    { label: "Export PDF", icon: "📄", color: "#EF4444", desc: "Formatted report" },
    { label: "Export DOCX", icon: "📝", color: COLORS.accent, desc: "Word document" },
    { label: "Export TXT", icon: "📋", color: COLORS.success, desc: "Plain text" },
  ];

  return (
    <div style={s.card}>
      <SectionHeader icon="⬇️" title="Export" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
        {exports.map(e => (
          <button
            key={e.label}
            style={{
              background: COLORS.bg,
              border: `1px solid ${COLORS.borderLight}`,
              borderRadius: "10px",
              padding: "16px 12px",
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.15s",
            }}
            onMouseEnter={el => { el.currentTarget.style.borderColor = e.color; el.currentTarget.style.background = `${e.color}10`; }}
            onMouseLeave={el => { el.currentTarget.style.borderColor = COLORS.borderLight; el.currentTarget.style.background = COLORS.bg; }}
          >
            <div style={{ fontSize: "20px", marginBottom: "6px" }}>{e.icon}</div>
            <p style={{ margin: "0 0 2px", fontSize: "12px", fontWeight: 700, color: COLORS.textPrimary }}>{e.label}</p>
            <p style={{ margin: 0, fontSize: "10px", color: COLORS.textMuted }}>{e.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Processing overlay ───────────────────────────────────────────────────────
function ProcessingView({ step }) {
  return (
    <div style={{ padding: "60px 24px", textAlign: "center" }}>
      <div style={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        border: `2px solid ${COLORS.border}`,
        borderTop: `2px solid ${COLORS.accent}`,
        margin: "0 auto 24px",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{ fontSize: "14px", fontWeight: 600, color: COLORS.textPrimary, margin: "0 0 6px" }}>
        {PROCESSING_STEPS[step] || "Processing..."}
      </p>
      <p style={{ fontSize: "12px", color: COLORS.textMuted, margin: "0 0 24px" }}>
        NewsSaar AI is analyzing your article
      </p>
      <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
        {PROCESSING_STEPS.map((_, i) => (
          <div key={i} style={{
            height: "3px",
            flex: 1,
            maxWidth: "48px",
            borderRadius: "3px",
            background: i <= step ? COLORS.accent : COLORS.border,
            transition: "background 0.3s",
          }} />
        ))}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function NewsSaarAI() {
  const [inputText, setInputText] = useState("");
  const [inputMode, setInputMode] = useState("paste"); // paste | url | pdf
  const [isGenerating, setIsGenerating] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [results, setResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const textareaRef = useRef(null);
  const resultsRef = useRef(null);

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;

  const handleGenerate = () => {
    if (!inputText.trim() && inputMode === "paste") return;
    setIsGenerating(true);
    setProcessingStep(0);
    setResults(null);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProcessingStep(step);
      if (step >= PROCESSING_STEPS.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
          setResults(MOCK_DATA);
          setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }, 600);
      }
    }, 700);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: COLORS.textPrimary,
    }}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 4px; }
        textarea::placeholder { color: ${COLORS.textMuted}; }
        input::placeholder { color: ${COLORS.textMuted}; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.35s ease both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.1s; }
        .fade-up-3 { animation-delay: 0.15s; }
        .fade-up-4 { animation-delay: 0.2s; }
        .fade-up-5 { animation-delay: 0.25s; }
        .fade-up-6 { animation-delay: 0.3s; }
        .fade-up-7 { animation-delay: 0.35s; }
        .fade-up-8 { animation-delay: 0.4s; }
      `}</style>

      {/* ── Navigation ── */}
      <nav style={{
        height: "56px",
        background: COLORS.card,
        borderBottom: `1px solid ${COLORS.border}`,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: "16px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <div style={{
            width: "28px",
            height: "28px",
            background: COLORS.accent,
            borderRadius: "7px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.5px",
          }}>NS</div>
          <span style={{ fontSize: "14px", fontWeight: 700, color: COLORS.textPrimary, letterSpacing: "-0.02em" }}>
            NewsSaar <span style={{ color: COLORS.accent }}>AI</span>
          </span>
          <span style={{
            fontSize: "9px",
            fontWeight: 700,
            background: `${COLORS.warning}20`,
            color: COLORS.warning,
            padding: "2px 6px",
            borderRadius: "4px",
            letterSpacing: "0.05em",
          }}>BETA</span>
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: "480px", margin: "0 auto", position: "relative" }}>
          <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: COLORS.textMuted, fontSize: "13px" }}>🔍</span>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search articles, topics, summaries..."
            style={{
              width: "100%",
              height: "34px",
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "8px",
              padding: "0 12px 0 34px",
              fontSize: "12.5px",
              color: COLORS.textPrimary,
              outline: "none",
            }}
          />
          <kbd style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "10px",
            color: COLORS.textMuted,
            background: COLORS.bg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: "4px",
            padding: "1px 5px",
          }}>⌘K</kbd>
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "auto", flexShrink: 0 }}>
          <button
            onClick={() => setNotifOpen(n => !n)}
            style={{ ...s.ghost, padding: "7px", position: "relative", fontSize: "14px" }}
          >
            🔔
            <span style={{
              position: "absolute",
              top: "3px",
              right: "3px",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: COLORS.danger,
              border: `1px solid ${COLORS.card}`,
            }} />
          </button>
          <button style={{ ...s.ghost, padding: "7px", fontSize: "14px" }}>⚙️</button>
          <div style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.accent}, #7C3AED)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: 700,
            color: "#fff",
            cursor: "pointer",
            border: `2px solid ${COLORS.borderLight}`,
          }}>NS</div>
        </div>
      </nav>

      {/* ── Status Bar ── */}
      <div style={{
        background: COLORS.card,
        borderBottom: `1px solid ${COLORS.border}`,
        padding: "8px 24px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        fontSize: "11px",
        color: COLORS.textMuted,
      }}>
        <span style={{ color: COLORS.success }}>● Live</span>
        <span>తెలుగు న్యూస్ అనాలిటిక్స్ · Namaste Telangana</span>
        <span style={{ marginLeft: "auto" }}>Today: {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}</span>
      </div>

      {/* ── Main Layout ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "35% 65%",
        minHeight: "calc(100vh - 88px)",
        maxWidth: "1600px",
        margin: "0 auto",
      }}>

        {/* ════ LEFT PANEL ════ */}
        <div style={{
          borderRight: `1px solid ${COLORS.border}`,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "0",
          position: "sticky",
          top: "88px",
          height: "calc(100vh - 88px)",
          overflowY: "auto",
        }}>
          <div style={{ marginBottom: "20px" }}>
            <h1 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: 700, color: COLORS.textPrimary, letterSpacing: "-0.02em" }}>
              Article Workspace
            </h1>
            <p style={{ margin: 0, fontSize: "12px", color: COLORS.textMuted }}>Paste, link, or upload a Telugu news article</p>
          </div>

          {/* Input mode selector */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "16px", background: COLORS.bg, borderRadius: "8px", padding: "4px" }}>
            {[{ key: "paste", icon: "📋", label: "Paste" }, { key: "url", icon: "🔗", label: "URL" }, { key: "pdf", icon: "📄", label: "PDF" }].map(m => (
              <button
                key={m.key}
                onClick={() => setInputMode(m.key)}
                style={{
                  flex: 1,
                  padding: "7px 4px",
                  fontSize: "11px",
                  fontWeight: 600,
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  background: inputMode === m.key ? COLORS.surface : "transparent",
                  color: inputMode === m.key ? COLORS.textPrimary : COLORS.textSecondary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                <span>{m.icon}</span> {m.label}
              </button>
            ))}
          </div>

          {/* Input area */}
          {inputMode === "paste" && (
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="వార్తా వ్యాసాన్ని ఇక్కడ పేస్ట్ చేయండి...&#10;&#10;Paste your Telugu news article here. The AI will analyze and generate summaries, headlines, social captions, and more."
              style={{
                flex: 1,
                width: "100%",
                minHeight: "280px",
                background: COLORS.bg,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "10px",
                padding: "14px 16px",
                fontSize: "13px",
                lineHeight: 1.8,
                color: COLORS.textPrimary,
                resize: "none",
                outline: "none",
                fontFamily: "inherit",
                transition: "border-color 0.15s",
              }}
              onFocus={e => e.target.style.borderColor = COLORS.accent}
              onBlur={e => e.target.style.borderColor = COLORS.border}
            />
          )}
          {inputMode === "url" && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                placeholder="https://namasttelangana.com/article-url..."
                style={{
                  width: "100%",
                  height: "44px",
                  background: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "8px",
                  padding: "0 14px",
                  fontSize: "13px",
                  color: COLORS.textPrimary,
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <div style={{
                flex: 1,
                background: COLORS.bg,
                border: `1px dashed ${COLORS.borderLight}`,
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                minHeight: "200px",
              }}>
                <span style={{ fontSize: "28px" }}>🔗</span>
                <p style={{ margin: 0, fontSize: "13px", color: COLORS.textSecondary }}>Article will be fetched automatically</p>
              </div>
            </div>
          )}
          {inputMode === "pdf" && (
            <div style={{
              flex: 1,
              background: COLORS.bg,
              border: `2px dashed ${COLORS.borderLight}`,
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              minHeight: "240px",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}>
              <span style={{ fontSize: "36px" }}>📄</span>
              <p style={{ margin: 0, fontSize: "13px", color: COLORS.textSecondary, fontWeight: 600 }}>Drop PDF here</p>
              <p style={{ margin: 0, fontSize: "11px", color: COLORS.textMuted }}>or click to browse</p>
              <button style={{ ...s.ghost, fontSize: "11px", marginTop: "6px" }}>Browse Files</button>
            </div>
          )}

          {/* Stats */}
          {inputMode === "paste" && (
            <div style={{ display: "flex", gap: "16px", marginTop: "10px", padding: "8px 0" }}>
              <span style={{ fontSize: "11px", color: COLORS.textMuted }}>{charCount.toLocaleString()} chars</span>
              <span style={{ fontSize: "11px", color: COLORS.textMuted }}>{wordCount.toLocaleString()} words</span>
              {wordCount > 0 && <span style={{ fontSize: "11px", color: COLORS.success }}>● Ready to analyze</span>}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              style={{
                ...s.accent,
                flex: 1,
                opacity: isGenerating ? 0.65 : 1,
                cursor: isGenerating ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
                fontSize: "13px",
              }}
            >
              {isGenerating ? (
                <><span style={{ display: "inline-block", animation: "spin 0.8s linear infinite" }}>⟳</span> Generating...</>
              ) : (
                <><span>⚡</span> Generate Summary</>
              )}
            </button>
            <button
              onClick={() => { setInputText(""); setResults(null); }}
              style={{ ...s.ghost, padding: "10px 14px", fontSize: "12px" }}
            >Clear</button>
          </div>

          {/* Quick examples */}
          {!results && (
            <div style={{ marginTop: "20px" }}>
              <p style={{ ...s.label, marginBottom: "10px" }}>Try a sample article</p>
              {["తెలంగాణ బడ్జెట్ 2025", "హైదరాబాద్ మెట్రో విస్తరణ", "రైతు పథకం వార్తలు"].map(ex => (
                <button
                  key={ex}
                  onClick={() => setInputText(`${ex} గురించి వివరణాత్మక వార్తా వ్యాసం ఇక్కడ ఉంది. తెలంగాణ ప్రభుత్వం ఈ విషయంలో ముఖ్యమైన నిర్ణయాలు తీసుకుంది...`)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    padding: "7px 0",
                    fontSize: "12px",
                    color: COLORS.accent,
                    cursor: "pointer",
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}
                >→ {ex}</button>
              ))}
            </div>
          )}
        </div>

        {/* ════ RIGHT PANEL ════ */}
        <div style={{ padding: "24px", overflowY: "auto" }} ref={resultsRef}>
          {!isGenerating && !results && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center" }}>
              <div style={{
                width: "72px",
                height: "72px",
                background: `${COLORS.accent}15`,
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                marginBottom: "20px",
                border: `1px solid ${COLORS.accent}30`,
              }}>📰</div>
              <h2 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 700, color: COLORS.textPrimary, letterSpacing: "-0.02em" }}>
                Your results will appear here
              </h2>
              <p style={{ margin: "0 0 28px", fontSize: "13px", color: COLORS.textMuted, maxWidth: "340px", lineHeight: 1.7 }}>
                Paste a Telugu news article on the left and click "Generate Summary" to begin analysis.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", maxWidth: "420px" }}>
                {[
                  { icon: "⚡", label: "AI Summaries" },
                  { icon: "📰", label: "Headlines" },
                  { icon: "💬", label: "Social Captions" },
                  { icon: "❝", label: "Key Quotes" },
                  { icon: "🏷️", label: "SEO Tags" },
                  { icon: "📲", label: "WhatsApp Ready" },
                ].map(f => (
                  <div key={f.label} style={{
                    background: COLORS.card,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "10px",
                    padding: "14px 10px",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: "18px", marginBottom: "6px" }}>{f.icon}</div>
                    <p style={{ margin: 0, fontSize: "11px", color: COLORS.textMuted, fontWeight: 500 }}>{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isGenerating && <ProcessingView step={processingStep} />}

          {results && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Top meta */}
              <div className="fade-up" style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "12px",
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: COLORS.success, display: "inline-block" }} />
                  <span style={{ fontSize: "13px", fontWeight: 600, color: COLORS.textPrimary }}>Analysis Complete</span>
                  <span style={{ fontSize: "12px", color: COLORS.textMuted }}>Telugu article · {wordCount} words · 8 sections generated</span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button style={{ ...s.ghost, fontSize: "11px", padding: "6px 12px" }}>🔁 Re-analyze</button>
                  <button style={{ ...s.ghost, fontSize: "11px", padding: "6px 12px" }}>📤 Share Report</button>
                </div>
              </div>

              {/* ── Results sections ── */}
              <div className="fade-up fade-up-1"><AISummaryCard data={results} /></div>
              <div className="fade-up fade-up-2"><KeyHighlightsCard highlights={results.highlights} /></div>
              <div className="fade-up fade-up-3"><HeadlinesCard headlines={results.headlines} /></div>
              <div className="fade-up fade-up-4"><QuotesCard quotes={results.quotes} /></div>
              <div className="fade-up fade-up-5"><WhatsAppCard text={results.whatsapp} /></div>
              <div className="fade-up fade-up-6"><SocialCard social={results.social} /></div>
              <div className="fade-up fade-up-7"><KeywordsCard keywords={results.keywords} /></div>
              <div className="fade-up fade-up-8"><ExportCard /></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
