import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "../../constants/brand";

gsap.registerPlugin(ScrollTrigger);

export default function ProductSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

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

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.querySelectorAll(".product-card"),
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.07,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      style={{ background: "#FAF7F0", padding: "120px 0" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        {/* Heading */}
        <div
          ref={headingRef}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <span
            style={{
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
              fontWeight: 700,
              color: "#2C1810",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Signature Spices & Masalas
          </h2>
          <p
            style={{
              marginTop: "16px",
              fontSize: "1.05rem",
              color: "#6B4C3B",
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
            }}
          >
            Explore our complete range — from whole spices to expertly blended
            masalas. Contact us to enquire about any product.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
            gap: "24px",
          }}
        >
          {BRAND.products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>

        {/* Bottom note */}
        <p
          style={{
            textAlign: "center",
            marginTop: "56px",
            fontSize: "0.9rem",
            color: "#6B4C3B",
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
            style={{
              color: "#C8421A",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Get in touch →
          </a>
        </p>
      </div>

      <style>{`
        .product-card:hover .product-img-wrap img {
          transform: scale(1.07);
        }
        .product-card:hover .product-img-wrap .img-overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

/* ─── Individual card ─────────────────────────────────────── */
function ProductCard({ product }) {
  const cardRef = useRef(null);

  const handleEnter = () => {
    cardRef.current.style.transform = "translateY(-8px)";
    cardRef.current.style.boxShadow = "0 16px 40px rgba(44,24,16,0.13)";
  };
  const handleLeave = () => {
    cardRef.current.style.transform = "translateY(0)";
    cardRef.current.style.boxShadow = "0 2px 12px rgba(44,24,16,0.05)";
  };

  return (
    <div
      ref={cardRef}
      className="product-card"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        background: "#FFFDF8",
        border: "1px solid rgba(200,66,26,0.09)",
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "default",
        transition: "transform 0.28s ease, box-shadow 0.28s ease",
        boxShadow: "0 2px 12px rgba(44,24,16,0.05)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Image area ── */}
      <div
        className="product-img-wrap"
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
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.4s ease",
              }}
              onError={(e) => {
                // graceful fallback: hide broken image, show icon
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback icon (hidden unless img fails) */}
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
          /* No image: render a styled icon placeholder */
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

        {/* Colour-accent overlay on hover */}
        <div
          className="img-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${product.color || "#C8421A"}55 0%, transparent 60%)`,
            opacity: 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />

        {/* Product colour tag */}
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

      {/* ── Text body ── */}
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
            fontSize: "1rem",
            fontFamily: '"Playfair Display", Georgia, serif',
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
              fontSize: "0.78rem",
              color: "#6B4C3B",
              margin: 0,
              lineHeight: 1.55,
              flex: 1,
            }}
          >
            {product.tagline}
          </p>
        )}

        {/* Divider */}
        <div
          style={{
            width: "32px",
            height: "2px",
            background: `linear-gradient(90deg, ${product.color || "#C8421A"}, transparent)`,
            borderRadius: "1px",
            margin: "14px 0",
          }}
        />

        {/* Enquire link */}
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
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "1.2px",
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

/* ─── Spice icon fallback ─────────────────────────────────── */
function SpiceIcon({ color = "#F5A623" }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="22" fill={color} opacity="0.18" />
      <circle cx="28" cy="28" r="14" fill={color} opacity="0.28" />
      <circle cx="28" cy="28" r="7" fill={color} opacity="0.7" />
      {/* decorative dots */}
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
