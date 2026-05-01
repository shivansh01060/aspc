import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BRAND } from "../../constants/brand";

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
    );

    // Scroll state for background
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
        padding: "0 32px",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition:
          "background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease",
        background: scrolled ? "rgba(250,247,240,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(44,24,16,0.08)" : "none",
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("#hero");
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          textDecoration: "none",
        }}
      >
        <img
          src="/logo.png"
          alt="ASPC – Ashok Spice Clinic"
          onError={(e) => {
            e.target.style.display = "none";
          }}
          style={{ height: "48px", width: "auto", objectFit: "contain" }}
        />
        {/* Text fallback (hidden when logo loads) */}
        <span
          className="logo-text-fallback"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            fontSize: "1.3rem",
            color: "#2C1810",
            letterSpacing: "0.5px",
          }}
        >
          ASPC
        </span>
      </a>

      {/* Desktop nav links */}
      <ul
        style={{
          display: "flex",
          gap: "36px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
        className="desktop-nav"
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
                fontSize: "0.9rem",
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
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          flexDirection: "column",
          gap: "5px",
        }}
        className="hamburger"
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
              transition: "transform 0.3s ease",
            }}
          />
        ))}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "72px",
            left: 0,
            right: 0,
            background: "rgba(250,247,240,0.97)",
            backdropFilter: "blur(16px)",
            padding: "24px 32px",
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
                fontSize: "1rem",
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
          .logo-text-fallback { font-size: 1.1rem !important; }
        }
      `}</style>
    </nav>
  );
}
