import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    stat: "20+",
    label: "Years of Heritage",
    desc: "Decades of mastering the art of spice — passed through generations.",
    color: "#F5A623",
  },
  {
    stat: "14",
    label: "Signature Products",
    desc: "From whole spices to hand-blended masalas, each formulated to perfection.",
    color: "#5A8A2E",
  },
  {
    stat: "100%",
    label: "Natural & Pure",
    desc: "Zero additives, zero artificial colour. Just the spice — nothing else.",
    color: "#C8421A",
  },
  {
    stat: "∞",
    label: "Flavour Guarantee",
    desc: "Every batch tested for aroma, colour, and taste before it reaches you.",
    color: "#E8B820",
  },
];

const QUALITY_MARKS = [
  { icon: "🔬", text: "Lab Tested Batches" },
  { icon: "🌿", text: "No Artificial Colours" },
  { icon: "📦", text: "Airtight Freshness Seal" },
  { icon: "✅", text: "FSSAI Compliant" },
];

export default function QualitySection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef([]);
  const marksRef = useRef(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
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

      // Stat cards
      statsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.75,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );

        // Number count-up for numeric stats
        const numEl = el.querySelector(".stat-number");
        if (numEl) {
          const raw = numEl.dataset.value;
          const numeric = parseFloat(raw);
          if (!isNaN(numeric)) {
            gsap.fromTo(
              { val: 0 },
              { val: numeric },
              {
                duration: 1.8,
                ease: "power2.out",
                onUpdate: function () {
                  numEl.textContent =
                    (raw.includes("+")
                      ? Math.floor(this.targets()[0].val) + "+"
                      : "") ||
                    (raw.includes("%")
                      ? Math.floor(this.targets()[0].val) + "%"
                      : "") ||
                    Math.floor(this.targets()[0].val);
                },
                scrollTrigger: { trigger: el, start: "top 88%" },
              },
            );
          }
        }
      });

      // Quality marks
      if (marksRef.current) {
        gsap.fromTo(
          marksRef.current.querySelectorAll(".quality-mark"),
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: marksRef.current, start: "top 85%" },
          },
        );
      }

      // Banner slide-in
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, scale: 0.96, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: bannerRef.current, start: "top 88%" },
        },
      );

      // Slow parallax on accent orbs
      gsap.to(".quality-orb", {
        y: -60,
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
      id="quality"
      ref={sectionRef}
      style={{
        background: "#2C1810",
        position: "relative",
        overflow: "hidden",
        padding: "120px 0",
      }}
    >
      {/* Decorative orb */}
      <div
        className="quality-orb"
        style={{
          position: "absolute",
          top: "10%",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        className="quality-orb"
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-80px",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,66,26,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        {/* Heading */}
        <div
          ref={headingRef}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#F5A623",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Why Choose ASPC
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              color: "#FAF7F0",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Quality You Can Taste
          </h2>
          <p
            style={{
              marginTop: "16px",
              fontSize: "1.05rem",
              color: "rgba(250,247,240,0.65)",
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
            }}
          >
            From sourcing to sealing, every step is governed by a single
            principle — if it isn't good enough for our own kitchen, it doesn't
            leave the factory.
          </p>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            marginBottom: "72px",
          }}
        >
          {PILLARS.map((p, i) => (
            <div
              key={p.label}
              ref={(el) => (statsRef.current[i] = el)}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${p.color}30`,
                borderRadius: "16px",
                padding: "36px 28px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "28px",
                  width: "40px",
                  height: "3px",
                  background: p.color,
                  borderRadius: "0 0 3px 3px",
                }}
              />
              <div
                className="stat-number"
                data-value={parseFloat(p.stat) || 0}
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 3.2rem)",
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  color: p.color,
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {p.stat}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(250,247,240,0.5)",
                  marginBottom: "16px",
                }}
              >
                {p.label}
              </div>
              <p
                style={{
                  fontSize: "0.92rem",
                  color: "rgba(250,247,240,0.7)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quality marks row */}
        <div
          ref={marksRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "72px",
          }}
        >
          {QUALITY_MARKS.map((m) => (
            <div
              key={m.text}
              className="quality-mark"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(245,166,35,0.08)",
                border: "1px solid rgba(245,166,35,0.2)",
                borderRadius: "100px",
                padding: "10px 20px",
                fontSize: "0.9rem",
                color: "#FAF7F0",
                fontWeight: 500,
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{m.icon}</span>
              {m.text}
            </div>
          ))}
        </div>

        {/* CTA Banner — contact-focused, NO order now */}
        <div
          ref={bannerRef}
          style={{
            background: "linear-gradient(135deg, #C8421A 0%, #F5A623 100%)",
            borderRadius: "24px",
            padding: "56px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <h3
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            Ready to Experience Pure Spice?
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.05rem",
              marginBottom: "32px",
              lineHeight: 1.6,
            }}
          >
            Reach out to us for bulk enquiries, pricing, or to learn more about
            our products.
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#C8421A",
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: "1px",
              padding: "14px 36px",
              borderRadius: "100px",
              textDecoration: "none",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Get in Touch →
          </a>
        </div>
      </div>
    </section>
  );
}
