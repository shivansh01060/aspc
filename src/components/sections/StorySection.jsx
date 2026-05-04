import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "../../constants/brand";

gsap.registerPlugin(ScrollTrigger);

const STORY_STEPS = [
  {
    icon: "🌱",
    title: "Sourced from Nature",
    body: "Every spice at Ashok Spices Clinic begins its journey on carefully chosen farms across India — where soil, climate, and tradition converge to create exceptional flavour.",
    accent: "#5A8A2E",
  },
  {
    icon: "⚗️",
    title: "Crafted with Precision",
    body: "Our in-house processing facility grinds, blends, and seals each product under strict quality checks — preserving the essential oils that make the difference between ordinary and extraordinary.",
    accent: "#C8421A",
  },
  {
    icon: "🏅",
    title: "Trusted Heritage",
    body: "For over two decades, Ashok Spices Clinic has been the trusted name in households and commercial kitchens alike. Our name is synonymous with purity, potency, and consistency.",
    accent: "#F5A623",
  },
  {
    icon: "🌍",
    title: "Delivered to You",
    body: "Whether you are a home chef, a restaurant, or a food manufacturer — we supply across the region with care, speed, and the assurance of quality on every pack.",
    accent: "#E8B820",
  },
];

export default function StorySection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        },
      );

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: lineRef.current, start: "top 85%" },
        },
      );

      // Video reveal
      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { opacity: 0, x: -60, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: videoRef.current, start: "top 85%" },
          },
        );
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );

        const handleEnter = () =>
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        const handleLeave = () =>
          gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
        card.addEventListener("mouseenter", handleEnter);
        card.addEventListener("mouseleave", handleLeave);
      });

      gsap.to(".story-orb-1", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
      gsap.to(".story-orb-2", {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      style={{
        background:
          "linear-gradient(160deg, #FAF7F0 0%, #FFF8ED 50%, #FAF7F0 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "120px 0",
      }}
    >
      {/* Decorative orbs */}
      <div
        className="story-orb-1"
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="story-orb-2"
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(90,138,46,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        {/* Section header */}
        <div
          ref={headingRef}
          style={{ textAlign: "center", marginBottom: "16px" }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: '"EB Garamond", Georgia, serif',
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#C8421A",
              marginBottom: "16px",
            }}
          >
            Our Journey
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
            From Farm to Your Kitchen
          </h2>
          <p
            style={{
              marginTop: "16px",
              fontFamily: '"EB Garamond", Georgia, serif',
              fontSize: "1.15rem",
              color: "#6B4C3B",
              maxWidth: "560px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
            }}
          >
            The Ashok Spices Clinic promise — pure spices, honest sourcing, and
            the kind of flavour that only comes from doing things right.
          </p>
        </div>

        {/* Animated divider */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "72px",
          }}
        >
          <div
            ref={lineRef}
            style={{
              width: "80px",
              height: "3px",
              background: "linear-gradient(90deg, #F5A623, #C8421A)",
              borderRadius: "2px",
              transformOrigin: "left center",
            }}
          />
        </div>

        {/* ── Human Element Video Panel ── */}
        <div
          ref={videoRef}
          style={{
            position: "relative",
            borderRadius: "35px",
            overflow: "hidden",
            marginBottom: "90px",
            height: "450px",
            background: "linear-gradient(135deg, #2C1810 0%, #4A2510 100%)",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute", // ← ADD
              inset: 0, // ← ADD
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.75,
              zIndex: 1, // ← ADD (sits above the fallback)
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
          Fallback shown when no video
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #2C1810 0%, #5C2A10 40%, #8B4513 100%)",
              zIndex: 0,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "4rem", marginBottom: "12px" }}>🫙</div>
              <p
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  color: "rgba(250,247,240,0.4)",
                  fontSize: "0.9rem",
                  letterSpacing: "2px",
                }}
              ></p>
            </div>
          </div>
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(44,24,16,0.75) 0%, rgba(44,24,16,0.2) 50%, rgba(44,24,16,0.65) 100%)",
              pointerEvents: "none",
              zIndex: 2, // ← ADD
            }}
          />
          {/* Text overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              padding: "0 64px",
              zIndex: 2, // ← ADD
            }}
          >
            <div style={{ maxWidth: "480px" }}>
              <span
                style={{
                  fontFamily: '"EB Garamond", Georgia, serif',
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  color: "#F5A623",
                  marginBottom: "16px",
                }}
              >
                The Human Touch
              </span>
              <h3
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
                  fontWeight: 800,
                  color: "#FAF7F0",
                  lineHeight: 1.2,
                  marginBottom: "20px",
                }}
              >
                Every Blend is a{" "}
                <em style={{ color: "#F5A623", fontStyle: "italic" }}>
                  Labour of Love
                </em>
              </h3>
              <p
                style={{
                  fontFamily: '"EB Garamond", Georgia, serif',
                  fontSize: "1.1rem",
                  color: "rgba(250,247,240,0.8)",
                  lineHeight: 1.75,
                }}
              >
                Behind every packet is a person — hands that have ground,
                tested, and refined for 20 years to make sure what reaches you
                is nothing short of perfect.
              </p>
            </div>
          </div>
        </div>

        {/* Story cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "32px",
          }}
        >
          {STORY_STEPS.map((step, i) => (
            <div
              key={step.title}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{
                background: "#FFFDF8",
                border: "1px solid rgba(200,66,26,0.10)",
                borderRadius: "20px",
                padding: "40px 32px",
                cursor: "default",
                boxShadow: "0 4px 24px rgba(44,24,16,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: "2.8rem",
                  marginBottom: "20px",
                  display: "block",
                  lineHeight: 1,
                }}
              >
                {step.icon}
              </div>
              <div
                style={{
                  width: "32px",
                  height: "3px",
                  background: step.accent,
                  borderRadius: "2px",
                  marginBottom: "20px",
                }}
              />
              <h3
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#2C1810",
                  marginBottom: "12px",
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: '"EB Garamond", Georgia, serif',
                  fontSize: "1rem",
                  color: "#6B4C3B",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {step.body}
              </p>
              <div
                style={{
                  marginTop: "24px",
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "1.5rem",
                  color: step.accent,
                  fontWeight: 700,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
