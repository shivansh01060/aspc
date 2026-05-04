import { useEffect, useRef } from "react";
import gsap from "gsap";
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 24px 60px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* ── Background video layer ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.18,
            filter: "saturate(1.4) brightness(0.85)",
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #FAF7F0 0%, #FFF8ED 55%, #FAF0DC 100%)",
            opacity: 0.92,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,166,35,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,66,26,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div
        ref={textRef}
        className="hero-content"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "780px",
          margin: "0 auto",
        }}
      >
        {/* Brand label */}
        <span
          className="hero-anim"
          style={{
            display: "inline-block",
            fontFamily: '"EB Garamond", Georgia, serif',
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#C8421A",
            marginBottom: "20px",
          }}
        >
          Ashok Spices Clinic
        </span>

        {/* Headline */}
        <h1
          className="hero-anim"
          style={{
            fontSize: "clamp(2.2rem, 7vw, 5rem)",
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 800,
            color: "#2C1810",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Pure Spices,{" "}
          <em style={{ color: "#C8421A", fontStyle: "italic" }}>Pure</em>{" "}
          Flavour
        </h1>

        {/* Subtext */}
        <p
          className="hero-anim"
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "#6B4C3B",
            lineHeight: 1.75,
            marginBottom: "36px",
            maxWidth: "560px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Premium hand-crafted spices and masalas from the heart of India.
          Authentic flavour, honest sourcing — delivered to your kitchen.
        </p>

        {/* CTA buttons */}
        <div
          className="hero-anim"
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
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
              fontFamily: '"EB Garamond", Georgia, serif',
              fontWeight: 700,
              fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
              letterSpacing: "0.5px",
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
              fontFamily: '"EB Garamond", Georgia, serif',
              fontWeight: 600,
              fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
              padding: "14px 32px",
              borderRadius: "100px",
              border: "1.5px solid rgba(44,24,16,0.22)",
              textDecoration: "none",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#C8421A";
              e.target.style.color = "#C8421A";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(44,24,16,0.22)";
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
            marginTop: "56px",
            paddingTop: "36px",
            borderTop: "1px solid rgba(44,24,16,0.08)",
            justifyContent: "center",
            maxWidth: "480px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {[
            { value: "14+", label: "Products" },
            { value: "20+", label: "Years" },
            { value: "100%", label: "Natural" },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                borderRight: i < 2 ? "1px solid rgba(44,24,16,0.08)" : "none",
                padding: "0 20px",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(1.5rem, 5vw, 2rem)",
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 800,
                  color: "#2C1810",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: '"EB Garamond", Georgia, serif',
                  fontSize: "clamp(0.65rem, 1.5vw, 0.78rem)",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#C8421A",
                  marginTop: "5px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          className="hero-anim"
          style={{
            marginTop: "48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            opacity: 0.35,
          }}
        >
          <span
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontSize: "0.68rem",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: "#2C1810",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "36px",
              background: "linear-gradient(to bottom, #C8421A, transparent)",
            }}
          />
        </div>
      </div>

      <style>{`
        /* ── Desktop: wider max-width, bigger breathing room ── */
        @media (min-width: 1024px) {
          #hero {
            padding: 120px 48px 80px !important;
          }
          .hero-content {
            max-width: 860px !important;
          }
        }
 
        /* ── Tablet ── */
        @media (min-width: 600px) and (max-width: 1023px) {
          #hero {
            padding: 110px 40px 70px !important;
          }
          .hero-content {
            max-width: 680px !important;
          }
        }
 
        /* ── Mobile ── */
        @media (max-width: 599px) {
          #hero {
            padding: 90px 20px 56px !important;
          }
          .hero-content {
            max-width: 100% !important;
          }
        }
 
        /* ── Very small phones: stack buttons ── */
        @media (max-width: 380px) {
          #hero .hero-anim a {
            width: 100% !important;
            box-sizing: border-box;
          }
        }
      `}</style>
    </section>
  );
}
