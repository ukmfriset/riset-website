"use client";

import { useState } from 'react';
import Link from 'next/link';
import { getAccentColor, getAccentColorByString } from "@/lib/accent-cycle"; 

export interface CardItem {
  id?: string;
  slug?: string;
  title: string;
  date: string;
  author: string;
  category: string;
  image?: string;
  excerpt?: string;
  content?: any; // Digunakan sebagai sumber cadangan untuk excerpt otomatis
  link: string;
}

interface NewsCardProps {
  item: CardItem;
  delay: string;
  isVisible: boolean;
  index: number;
}

function getCategoryEmoji(category: string): string {
  const lowerCat = (category || "").toLowerCase();
  if (lowerCat.includes("essay")) return "📝";
  if (lowerCat.includes("puisi")) return "✍️";
  if (lowerCat.includes("artikel")) return "📰";
  if (lowerCat.includes("cerpen")) return "📖";
  return "📰";
}

// ✅ Fungsi ekstraksi otomatis teks dari struktur content Sanity jika excerpt kosong
function extractTextFromContent(content: any): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (block._type !== "block" || !block.children) return "";
        return block.children.map((child: any) => child.text).join("");
      })
      .join(" ");
  }
  return "";
}

export default function NewsCard({ item, delay, isVisible, index }: NewsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const cardAccent = getAccentColor(index, 1);
  const categoryAccent = getAccentColorByString(item.category);

  // Ambil excerpt dari item.excerpt, jika kosong otomatis ekstrak dari content
  const displayExcerpt = item.excerpt && item.excerpt.trim() !== "" 
    ? item.excerpt 
    : extractTextFromContent(item.content);

  const animatedStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}`,
  };

  return (
    <Link
      href={item.link}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#ffffff',
        border: isHovered ? '1px solid #CBD5E1' : '1px solid #E2E8F0',
        padding: '8px',
        borderRadius: '32px',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isHovered ? '0 16px 32px rgba(15, 23, 42, 0.08)' : '0 4px 6px -1px rgba(0,0,0,0.05)',
        opacity: animatedStyle.opacity,
        transform: isHovered ? 'translateY(-6px)' : animatedStyle.transform,
        transition: isHovered ? 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' : animatedStyle.transition,
        height: '100%'
      }}
    >
      <div style={{
        height: '200px',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '40px',
        flexShrink: 0,
        background: item.image ? '#F1F5F9' : `linear-gradient(to bottom, ${cardAccent.bg} 55%, #ffffff 100%)`
      }}>
        {item.image ? (
          <>
            <img src={item.image} alt={item.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: isHovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.5s ease' }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${cardAccent.bg} 60%, transparent 100%)`, mixBlendMode: 'multiply', pointerEvents: 'none', transition: 'opacity 0.3s ease', opacity: isHovered ? 0.8 : 1 }} />
          </>
        ) : (
          <span style={{ fontSize: '48px', opacity: 0.5, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}>
            {getCategoryEmoji(item.category)}
          </span>
        )}

        <div style={{ position: 'absolute', top: '14px', left: '14px', right: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '11px', fontWeight: 800, color: categoryAccent.text, backgroundColor: '#ffffff', padding: '6px 14px', borderRadius: '50px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            {item.category}
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'var(--color-text-muted)', backgroundColor: '#ffffff', padding: '6px 12px', borderRadius: '50px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            {item.date}
          </span>
        </div>
      </div>

      <div style={{ padding: '24px 16px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '12px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, color: 'var(--color-dark-slate)', margin: 0, lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {item.title}
          </h3>
          <span style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: isHovered ? cardAccent.bg : '#F1F5F9', color: isHovered ? '#ffffff' : '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, flexShrink: 0, transform: isHovered ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.3s ease' }}>
            ↗
          </span>
        </div>
        
        {/* Cuplikan kalimat pertama / excerpt berita (Otomatis muncul dari content jika excerpt kosong) */}
        {displayExcerpt && (
          <p style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: '13.5px', 
            color: 'var(--color-text-muted)', 
            lineHeight: 1.6, 
            marginBottom: '16px', 
            fontWeight: 500,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {displayExcerpt}
          </p>
        )}

        {/* Bagian Penulis yang diratakan sejajar di bawah dengan marginTop: auto */}
        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', fontWeight: 700, color: 'var(--color-dark-slate)' }}>
            {item.author || "Anonim"}
          </span>
        </div>
      </div>
    </Link>
  );
}