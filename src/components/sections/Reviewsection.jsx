import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    name: "Priya Sharma",
    rating: 5,
    text: "The turmeric from Ashok Spices Clinic is absolutely unmatched. The colour and aroma are so vibrant — you can tell it's pure. Been using it for 3 years and will never switch.",
    product: "Haldi (Turmeric)",
    avatar: "PS",
    color: "#E8A020",
  },
  {
    name: "Rajesh Gupta",
    rating: 4,
    text: "Their Garam Masala is the secret behind my restaurant's dal makhani. Customers always ask what makes it different. The answer is always Ashok Spices.",
    product: "Garam Masala",
    avatar: "RG",
    color: "#C8421A",
  },
  {
    name: "Anita Verma",
    rating: 5,
    text: "I switched to ASPC red chilli powder last year and my family noticed the difference immediately. No artificial colour, just pure heat and flavour.",
    product: "Red Chilli Powder",
    avatar: "AV",
    color: "#C0392B",
  },
  {
    name: "Suresh Patel",
    rating: 4.5,
    text: "We source all our masalas for our catering business from Ashok Spices Clinic. Consistent quality, bulk availability, and prompt delivery every single time.",
    product: "Bulk Supply",
    avatar: "SP",
    color: "#5A8A2E",
  },
  {
    name: "Meena Iyer",
    rating: 5,
    text: "The coriander and cumin powders are so fresh — you open the packet and the aroma fills the whole kitchen. This is what real spices smell like.",
    product: "Coriander & Cumin",
    avatar: "MI",
    color: "#7B8B3A",
  },
  {
    name: "Deepak Joshi",
    rating: 4,
    text: "FSSAI compliant, no additives, honest packaging — exactly what I was looking for. Ashok Spices Clinic has earned a lifelong customer in me.",
    product: "Kitchen King Masala",
    avatar: "DJ",
    color: "#F5A623",
  },
  {
    name: "Kavita Singh",
    rating: 4.7,
    text: "20 years of experience really shows. Every blend is perfectly balanced. The Chaat Masala is so good my kids put it on everything!",
    product: "Chaat Masala",
    avatar: "KS",
    color: "#E8B820",
  },
  {
    name: "Mohammed Ansari",
    rating: 4,
    text: "I run a biryani shop and the quality of spices directly impacts my business. ASPC has never let me down — same great quality every batch.",
    product: "Whole Spices",
    avatar: "MA",
    color: "#8B3A1A",
  },
];

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#F5A623">
          <path d="M7 1l1.5 4h4.5l-3.5 2.5 1.5 4L7 9 3 11.5l1.5-4L1 5h4.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const anim1Ref = useRef(null);
  const anim2Ref = useRef(null);

  const row1 = REVIEWS.slice(0, 4);
  const row2 = REVIEWS.slice(4, 8);

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

      // Auto-scroll row 1 left
      const totalWidth1 = track1Ref.current?.scrollWidth / 2 || 0;
      anim1Ref.current = gsap.to(track1Ref.current, {
        x: -totalWidth1,
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      // Auto-scroll row 2 right (opposite direction)
      const totalWidth2 = track2Ref.current?.scrollWidth / 2 || 0;
      gsap.set(track2Ref.current, { x: -totalWidth2 });
      anim2Ref.current = gsap.to(track2Ref.current, {
        x: 0,
        duration: 32,
        ease: "none",
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pause on hover
  const pauseAll = () => {
    anim1Ref.current?.pause();
    anim2Ref.current?.pause();
  };
  const resumeAll = () => {
    anim1Ref.current?.resume();
    anim2Ref.current?.resume();
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      style={{
        background: "#FAF7F0",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      {/* Heading */}
      <div
        ref={headingRef}
        style={{ textAlign: "center", marginBottom: "64px", padding: "0 24px" }}
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
          What People Say
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
          Trusted by Thousands
        </h2>
        <p
          style={{
            marginTop: "16px",
            fontFamily: '"EB Garamond", Georgia, serif',
            fontSize: "1.1rem",
            color: "#6B4C3B",
            maxWidth: "480px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.7,
          }}
        >
          From home kitchens to commercial restaurants — here's what our
          customers have to say.
        </p>

        {/* Overall rating badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "24px",
            background: "#2C1810",
            borderRadius: "100px",
            padding: "10px 24px",
          }}
        >
          <StarRating count={5} />
          <span
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "#FAF7F0",
            }}
          >
            5.0
          </span>
          <span
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontSize: "0.85rem",
              color: "rgba(250,247,240,0.55)",
            }}
          >
            from 500+ reviews
          </span>
        </div>
      </div>

      {/* ── Row 1 — scrolls left ── */}
      <div
        style={{ overflow: "hidden", marginBottom: "20px" }}
        onMouseEnter={pauseAll}
        onMouseLeave={resumeAll}
      >
        <div
          ref={track1Ref}
          style={{ display: "flex", gap: "20px", width: "max-content" }}
        >
          {[...row1, ...row1].map((review, i) => (
            <ReviewCard key={`r1-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* ── Row 2 — scrolls right ── */}
      <div
        style={{ overflow: "hidden" }}
        onMouseEnter={pauseAll}
        onMouseLeave={resumeAll}
      >
        <div
          ref={track2Ref}
          style={{ display: "flex", gap: "20px", width: "max-content" }}
        >
          {[...row2, ...row2].map((review, i) => (
            <ReviewCard key={`r2-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* Bottom note */}
      <p
        style={{
          textAlign: "center",
          marginTop: "56px",
          fontFamily: '"EB Garamond", Georgia, serif',
          fontSize: "0.95rem",
          color: "#6B4C3B",
          padding: "0 24px",
        }}
      >
        Want to share your experience?{" "}
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
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <div
      style={{
        width: "320px",
        minWidth: "320px",
        background: "#FFFDF8",
        border: "1px solid rgba(200,66,26,0.09)",
        borderRadius: "20px",
        padding: "28px",
        boxShadow: "0 2px 16px rgba(44,24,16,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Top — avatar + name */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${review.color}44, ${review.color}88)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 800,
            fontSize: "0.85rem",
            color: review.color,
            flexShrink: 0,
            border: `1.5px solid ${review.color}44`,
          }}
        >
          {review.avatar}
        </div>
        <div>
          <div
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "#2C1810",
            }}
          >
            {review.name}
          </div>
          <div
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontSize: "0.8rem",
              color: "#6B4C3B",
            }}
          >
            {review.location}
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <StarRating count={review.rating} />
        </div>
      </div>

      {/* Review text */}
      <p
        style={{
          fontFamily: '"EB Garamond", Georgia, serif',
          fontSize: "0.98rem",
          color: "#4A2E20",
          lineHeight: 1.7,
          margin: 0,
          flex: 1,
          fontStyle: "italic",
        }}
      >
        "{review.text}"
      </p>

      {/* Product tag */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: `${review.color}14`,
          border: `1px solid ${review.color}30`,
          borderRadius: "100px",
          padding: "5px 12px",
          width: "fit-content",
        }}
      >
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: review.color,
          }}
        />
        <span
          style={{
            fontFamily: '"EB Garamond", Georgia, serif',
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.5px",
            color: review.color,
          }}
        >
          {review.product}
        </span>
      </div>
    </div>
  );
}
