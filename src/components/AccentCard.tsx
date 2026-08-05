"use client";

import { getAccentColor } from "@/lib/accent-cycle";

type AccentCardProps = {
  index: number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
};

export default function AccentCard({ index, title, description, icon }: AccentCardProps) {
  const accent = getAccentColor(index);

  return (
    <div
      style={{
        background: accent.bg,
        border: `1px solid ${accent.border}`,
        borderRadius: "18px",
        padding: "22px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        fontFamily: "var(--font-ui)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 16px 28px -16px rgba(15, 23, 42, 0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {icon && (
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "#ffffff",
            border: `1px solid ${accent.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            color: accent.text,
          }}
        >
          {icon}
        </div>
      )}

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "17px",
          fontWeight: 700,
          color: "var(--color-dark-slate)",
          margin: 0,
          letterSpacing: "-0.2px",
        }}
      >
        {title}
      </h3>

      {description && (
        <p
          style={{
            fontSize: "13px",
            lineHeight: 1.6,
            color: accent.text,
            margin: 0,
            opacity: 0.85,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

// ── Contoh pemakaian dalam grid ──
//
// const items = [
//   { title: "Program A", description: "Deskripsi singkat" },
//   { title: "Program B", description: "Deskripsi singkat" },
//   { title: "Program C", description: "Deskripsi singkat" },
//   { title: "Program D", description: "Deskripsi singkat" },
//   { title: "Program E", description: "Deskripsi singkat" }, // otomatis cycle balik ke abu-abu
// ];
//
// <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
//   {items.map((item, index) => (
//     <AccentCard key={index} index={index} title={item.title} description={item.description} />
//   ))}
// </div>