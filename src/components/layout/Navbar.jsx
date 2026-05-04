import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BRAND } from "../../constants/brand";

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
    );

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Our Story", href: "#story" },
    { label: "Products", href: "#products" },
    { label: "Quality", href: "#quality" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 40px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition:
          "background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease",
        background: scrolled ? "rgba(250,247,240,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 2px 32px rgba(44,24,16,0.10)" : "none",
      }}
    >
      {/* Logo + Brand Name */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("#hero");
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          textDecoration: "none",
        }}
      >
        <img
          src="/logo.png"
          alt="Ashok Spices Clinic"
          onError={(e) => {
            e.target.style.display = "none";
          }}
          style={{ height: "64px", width: "auto", objectFit: "contain" }}
        />
        <div
          style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}
        >
          <span
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 1000,
              fontSize: "1.25rem",
              color: "#2C1810",
              letterSpacing: "0.3px",
            }}
          >
            Ashok Spices Clinic
          </span>
          <span
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontSize: "0.7rem",
              fontStyle: "italic",
              color: "#C8421A",
              letterSpacing: "1.5px",
              marginTop: "3px",
            }}
          >
            Pure Spices · Pure Flavour
          </span>
        </div>
      </a>

      {/* Desktop nav */}
      <ul
        className="desktop-nav"
        style={{
          display: "flex",
          gap: "40px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              style={{
                fontFamily: '"EB Garamond", Georgia, serif',
                fontSize: "1rem",
                fontWeight: 600,
                color: "#2C1810",
                textDecoration: "none",
                letterSpacing: "0.5px",
                opacity: 0.75,
                transition: "opacity 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = 1;
                e.target.style.color = "#C8421A";
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = 0.75;
                e.target.style.color = "#2C1810";
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="hamburger"
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          flexDirection: "column",
          gap: "5px",
        }}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: "22px",
              height: "2px",
              background: "#2C1810",
              borderRadius: "2px",
            }}
          />
        ))}
      </button>

      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: 0,
            right: 0,
            background: "rgba(250,247,240,0.97)",
            backdropFilter: "blur(16px)",
            padding: "24px 40px",
            borderBottom: "1px solid rgba(44,24,16,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "#2C1810",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (max-width: 480px) {
          nav { padding: 0 20px !important; }
        }
      `}</style>
    </nav>
  );
}
