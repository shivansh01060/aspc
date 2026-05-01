import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroCanvas from "../canvas/HeroCanvas";
import { BRAND } from "../../constants/brand";

export default function HeroSection() {
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.querySelectorAll(".hero-anim"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.4,
        },
      );
    }, textRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "0 48px",
        paddingTop: "80px",
        background: "linear-gradient(135deg, #FAF7F0 0%, #FFF8ED 100%)",
        overflow: "hidden",
        gap: "32px",
      }}
    >
      {/* Left — text */}
      <div ref={textRef}>
        <span
          className="hero-anim"
          style={{
            display: "inline-block",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#C8421A",
            marginBottom: "20px",
          }}
        >
          Ashok Spice Clinic
        </span>

        <h1
          className="hero-anim"
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            color: "#2C1810",
            lineHeight: 1.12,
            marginBottom: "24px",
          }}
        >
          Pure Spices, <span style={{ color: "#C8421A" }}>Pure</span> Flavour
        </h1>

        <p
          className="hero-anim"
          style={{
            fontSize: "1.1rem",
            color: "#6B4C3B",
            lineHeight: 1.75,
            maxWidth: "440px",
            marginBottom: "36px",
          }}
        >
          Premium hand-crafted spices and masalas from the heart of India.
          Discover our range and connect with us to bring authentic flavour to
          your kitchen.
        </p>

        {/* CTA — contact-focused, no Order Now */}
        <div
          className="hero-anim"
          style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
        >
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#products")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-block",
              background: "#C8421A",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "1px",
              padding: "14px 32px",
              borderRadius: "100px",
              textDecoration: "none",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 24px rgba(200,66,26,0.35)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Explore Products
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-block",
              background: "transparent",
              color: "#2C1810",
              fontWeight: 600,
              fontSize: "0.9rem",
              padding: "14px 32px",
              borderRadius: "100px",
              border: "1.5px solid rgba(44,24,16,0.2)",
              textDecoration: "none",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#C8421A";
              e.target.style.color = "#C8421A";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(44,24,16,0.2)";
              e.target.style.color = "#2C1810";
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Stats row */}
        <div
          className="hero-anim"
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "56px",
            paddingTop: "36px",
            borderTop: "1px solid rgba(44,24,16,0.08)",
          }}
        >
          {[
            { value: "14+", label: "Products" },
            { value: "20+", label: "Years" },
            { value: "100%", label: "Natural" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: "1.8rem",
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  color: "#2C1810",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#C8421A",
                  marginTop: "4px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — 3D canvas */}
      <div
        style={{
          height: "600px",
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
        }}
      >
        <HeroCanvas />
      </div>

      <style>{`
        @media (max-width: 900px) {
          #hero {
            grid-template-columns: 1fr !important;
            padding: 100px 24px 60px !important;
            text-align: center;
          }
          #hero > div:last-child {
            height: 360px !important;
          }
          #hero .hero-anim:nth-child(4) > div {
            justify-content: center;
          }
          #hero .hero-anim:last-child {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
