import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.querySelectorAll(".vid-anim"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="video-showcase"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* ── Background video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/newSectionVideo.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay so text is readable ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(20,8,4,0.55) 0%, rgba(20,8,4,0.45) 50%, rgba(20,8,4,0.65) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Content ── */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "860px",
          padding: "100px 24px 80px",
          margin: "0 auto",
        }}
      >
        {/* Brand label */}
        <span
          className="vid-anim"
          style={{
            display: "inline-block",
            fontFamily: '"EB Garamond", Georgia, serif',
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#F5A623",
            marginBottom: "24px",
          }}
        >
          Ashok Spice Clinic
        </span>

        {/* Headline */}
        <h2
          className="vid-anim"
          style={{
            fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 800,
            color: "#FAF7F0",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Pure Spices,{" "}
          <em style={{ color: "#F5A623", fontStyle: "italic" }}>Pure</em>{" "}
          Flavour
        </h2>

        {/* Subtext */}
        <p
          className="vid-anim"
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "rgba(250,247,240,0.85)",
            lineHeight: 1.75,
            marginBottom: "40px",
            maxWidth: "520px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Premium hand-crafted spices and masalas from the heart of India.
          Authentic flavour, honest sourcing — delivered to your kitchen.
        </p>

        {/* CTA buttons */}
        <div
          className="vid-anim"
          style={{
            display: "flex",
            gap: "14px",
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
              padding: "15px 36px",
              borderRadius: "100px",
              textDecoration: "none",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 24px rgba(200,66,26,0.45)";
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
              color: "#FAF7F0",
              fontFamily: '"EB Garamond", Georgia, serif',
              fontWeight: 600,
              fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
              padding: "15px 36px",
              borderRadius: "100px",
              border: "1.5px solid rgba(250,247,240,0.4)",
              textDecoration: "none",
              transition: "border-color 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(250,247,240,0.9)";
              e.target.style.background = "rgba(250,247,240,0.08)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(250,247,240,0.4)";
              e.target.style.background = "transparent";
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Stats row */}
        <div
          className="vid-anim"
          style={{
            display: "flex",
            marginTop: "64px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(250,247,240,0.15)",
            justifyContent: "center",
            maxWidth: "420px",
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
                borderRight:
                  i < 2 ? "1px solid rgba(250,247,240,0.15)" : "none",
                padding: "0 20px",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(1.5rem, 5vw, 2rem)",
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 800,
                  color: "#FAF7F0",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: '"EB Garamond", Georgia, serif',
                  fontSize: "clamp(0.62rem, 1.5vw, 0.75rem)",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#F5A623",
                  marginTop: "5px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 599px) {
          #video-showcase { min-height: 100svh; }
        }
        @media (max-width: 380px) {
          #video-showcase a {
            width: 100% !important;
            box-sizing: border-box;
          }
        }
      `}</style>
    </section>
  );
}
