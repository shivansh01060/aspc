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
      style={{
        background: "#FAF7F0",
        padding: "120px 0",
      }}
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
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {BRAND.products.map((product) => (
            <div
              key={product.name}
              className="product-card"
              style={{
                background: "#FFFDF8",
                border: "1px solid rgba(200,66,26,0.08)",
                borderRadius: "16px",
                padding: "28px 20px",
                textAlign: "center",
                cursor: "default",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                boxShadow: "0 2px 12px rgba(44,24,16,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(44,24,16,0.10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 2px 12px rgba(44,24,16,0.04)";
              }}
            >
              {/* Colour dot */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: product.color || "#F5A623",
                  margin: "0 auto 16px",
                  boxShadow: `0 4px 16px ${product.color || "#F5A623"}50`,
                }}
              />
              <h3
                style={{
                  fontSize: "0.95rem",
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  color: "#2C1810",
                  marginBottom: "8px",
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
                    lineHeight: 1.5,
                  }}
                >
                  {product.tagline}
                </p>
              )}
              {/* Enquire link — no Order Now */}
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
                  marginTop: "16px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "#C8421A",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(200,66,26,0.3)",
                  paddingBottom: "1px",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.borderColor = "#C8421A")}
                onMouseLeave={(e) =>
                  (e.target.style.borderColor = "rgba(200,66,26,0.3)")
                }
              >
                Enquire →
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          style={{
            textAlign: "center",
            marginTop: "48px",
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
    </section>
  );
}
