import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "../../constants/brand";

gsap.registerPlugin(ScrollTrigger);

export default function ProductSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const scrollStart = useRef(0);

  const products = BRAND.products || [];
  const CARD_WIDTH = 280;
  const CARD_GAP = 24;
  const STEP = CARD_WIDTH + CARD_GAP;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        trackRef.current?.querySelectorAll(".product-card") ?? [],
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: trackRef.current, start: "top 85%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const slideTo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, products.length - 1));
    setActiveIdx(clamped);
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        x: -clamped * STEP,
        duration: 0.55,
        ease: "power3.out",
      });
    }
  };

  const prev = () => slideTo(activeIdx - 1);
  const next = () => slideTo(activeIdx + 1);

  // Drag to slide
  const onMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    const match = trackRef.current?.style.transform?.match(/-?[\d.]+/);
    scrollStart.current = match ? parseFloat(match[0]) : 0;
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current;
    if (trackRef.current) {
      gsap.set(trackRef.current, { x: scrollStart.current + dx });
    }
  };
  const onMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const dx = e.clientX - dragStart.current;
    if (Math.abs(dx) > 60) {
      slideTo(dx < 0 ? activeIdx + 1 : activeIdx - 1);
    } else {
      slideTo(activeIdx);
    }
  };

  // Touch support
  const onTouchStart = (e) => {
    dragStart.current = e.touches[0].clientX;
    const match = trackRef.current?.style.transform?.match(/-?[\d.]+/);
    scrollStart.current = match ? parseFloat(match[0]) : 0;
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - dragStart.current;
    if (Math.abs(dx) > 50) {
      slideTo(dx < 0 ? activeIdx + 1 : activeIdx - 1);
    } else {
      slideTo(activeIdx);
    }
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      style={{ background: "#FAF7F0", padding: "120px 0", overflow: "hidden" }}
    >
      {/* Heading */}
      <div
        ref={headingRef}
        style={{ textAlign: "center", marginBottom: "56px", padding: "0 32px" }}
      >
        <span
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#C8421A",
            display: "block",
            marginBottom: "16px",
          }}
        >
          Our Range
        </span>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 800,
            color: "#2C1810",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Signature Spices &amp; Masalas
        </h2>
        <p
          style={{
            marginTop: "16px",
            fontFamily: '"EB Garamond", Georgia, serif',
            fontSize: "1.15rem",
            color: "#6B4C3B",
            maxWidth: "520px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.7,
          }}
        >
          Slide through our complete range — from whole spices to expertly
          blended masalas. Contact us to enquire about any product.
        </p>
      </div>

      {/* ── Slider window ── */}
      <div
        style={{
          position: "relative",
          maxWidth: "100vw",
          overflow: "hidden",
          paddingLeft: "calc((100vw - 1200px) / 2 + 32px)",
          paddingBottom: "8px",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Fade edges */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background:
              "linear-gradient(to left, #FAF7F0 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: `${CARD_GAP}px`,
            willChange: "transform",
          }}
        >
          {products.map((product, i) => (
            <ProductCard
              key={product.name}
              product={product}
              isActive={i === activeIdx}
            />
          ))}

          {/* Spacer at end */}
          <div
            style={{
              minWidth: "calc((100vw - 1200px) / 2 + 32px)",
              flexShrink: 0,
            }}
          />
        </div>
      </div>

      {/* ── Controls ── */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "40px",
        }}
      >
        {/* Dot indicators */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => slideTo(i)}
              style={{
                width: i === activeIdx ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === activeIdx ? "#C8421A" : "rgba(44,24,16,0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div style={{ display: "flex", gap: "12px" }}>
          <ArrowBtn onClick={prev} disabled={activeIdx === 0} dir="left" />
          <ArrowBtn
            onClick={next}
            disabled={activeIdx === products.length - 1}
            dir="right"
          />
        </div>
      </div>

      {/* Bottom note */}
      <p
        style={{
          textAlign: "center",
          marginTop: "48px",
          fontFamily: '"EB Garamond", Georgia, serif',
          fontSize: "1rem",
          color: "#6B4C3B",
          padding: "0 32px",
        }}
      >
        Looking for bulk supply or custom blends?{" "}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector("#contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{ color: "#C8421A", fontWeight: 600, textDecoration: "none" }}
        >
          Get in touch →
        </a>
      </p>

      <style>{`
        .product-card:hover .product-img img {
          transform: scale(1.07);
        }
        .product-card:hover .img-overlay {
          opacity: 1 !important;
        }
        @media (max-width: 768px) {
          #products .slider-window { padding-left: 24px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── Arrow button ────────────────────────────────────────── */
function ArrowBtn({ onClick, disabled, dir }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        border: "1.5px solid rgba(44,24,16,0.15)",
        background: disabled ? "transparent" : "#2C1810",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition:
          "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
        opacity: disabled ? 0.3 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.transform = "scale(1.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {dir === "left" ? (
          <path
            d="M10 12L6 8L10 4"
            stroke={disabled ? "#2C1810" : "#FAF7F0"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M6 4L10 8L6 12"
            stroke={disabled ? "#2C1810" : "#FAF7F0"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

/* ─── Individual product card ─────────────────────────────── */
function ProductCard({ product, isActive }) {
  return (
    <div
      className="product-card"
      style={{
        minWidth: "280px",
        width: "280px",
        background: "#FFFDF8",
        border: isActive
          ? `1px solid ${product.color || "#C8421A"}44`
          : "1px solid rgba(200,66,26,0.09)",
        borderRadius: "20px",
        overflow: "hidden",
        flexShrink: 0,
        cursor: "default",
        transition:
          "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        boxShadow: isActive
          ? "0 12px 36px rgba(44,24,16,0.12)"
          : "0 2px 12px rgba(44,24,16,0.05)",
        transform: isActive ? "translateY(-6px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div
        className="product-img"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "3/4",
          overflow: "hidden",
          background: product.color
            ? `linear-gradient(135deg, ${product.color}22 0%, ${product.color}44 100%)`
            : "linear-gradient(135deg, #F5E6D0 0%, #EDD5A8 100%)",
          flexShrink: 0,
        }}
      >
        {product.image ? (
          <>
            <img
              src={product.image}
              alt={product.name}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.4s ease",
                pointerEvents: "none",
              }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              style={{
                display: "none",
                position: "absolute",
                inset: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SpiceIcon color={product.color} />
            </div>
          </>
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SpiceIcon color={product.color} />
          </div>
        )}

        {/* Overlay */}
        <div
          className="img-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${product.color || "#C8421A"}55 0%, transparent 60%)`,
            opacity: isActive ? 0.7 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />

        {/* Colour dot */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: product.color || "#F5A623",
            boxShadow: `0 2px 8px ${product.color || "#F5A623"}80`,
            border: "2px solid rgba(255,255,255,0.8)",
          }}
        />
      </div>

      {/* Text */}
      <div
        style={{
          padding: "20px 20px 22px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#2C1810",
            marginBottom: "6px",
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>

        {product.tagline && (
          <p
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontSize: "0.9rem",
              color: "#6B4C3B",
              margin: 0,
              lineHeight: 1.55,
              flex: 1,
            }}
          >
            {product.tagline}
          </p>
        )}

        <div
          style={{
            width: "32px",
            height: "2px",
            background: `linear-gradient(90deg, ${product.color || "#C8421A"}, transparent)`,
            borderRadius: "1px",
            margin: "14px 0",
          }}
        />

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector("#contact")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontFamily: '"EB Garamond", Georgia, serif',
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#C8421A",
            textDecoration: "none",
            transition: "gap 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.gap = "8px")}
          onMouseLeave={(e) => (e.currentTarget.style.gap = "4px")}
        >
          Enquire <span style={{ fontSize: "1rem" }}>→</span>
        </a>
      </div>
    </div>
  );
}

function SpiceIcon({ color = "#F5A623" }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="22" fill={color} opacity="0.18" />
      <circle cx="28" cy="28" r="14" fill={color} opacity="0.28" />
      <circle cx="28" cy="28" r="7" fill={color} opacity="0.7" />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={28 + 20 * Math.cos(rad)}
            cy={28 + 20 * Math.sin(rad)}
            r="2.5"
            fill={color}
            opacity="0.5"
          />
        );
      })}
    </svg>
  );
}
