import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import { BRAND } from "../../constants/brand";

gsap.registerPlugin(ScrollTrigger);

// ─── Replace these with your real EmailJS credentials ───────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Create a service (Gmail works) → copy Service ID
// 3. Create an email template     → copy Template ID
// 4. Go to Account → API Keys     → copy Public Key
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
// ─────────────────────────────────────────────────────────────────────────────

const INFO_ITEMS = [
  {
    icon: "📞",
    label: "Call Us",
    value: BRAND.contact?.phone || "+91 00000 00000",
    href: `tel:${(BRAND.contact?.phone || "").replace(/\s/g, "")}`,
  },
  {
    icon: "✉️",
    label: "Email Us",
    value: BRAND.contact?.email || "info@aspc.in",
    href: `mailto:${BRAND.contact?.email || "info@aspc.in"}`,
  },
  {
    icon: "📍",
    label: "Location",
    value: BRAND.contact?.address || "India",
    href: null,
  },
];

const ENQUIRY_TYPES = [
  "General Enquiry",
  "Bulk / Wholesale",
  "Product Information",
  "Custom Blend Request",
  "Other",
];

const INITIAL_FORM = {
  from_name: "",
  from_email: "",
  phone: "",
  enquiry_type: ENQUIRY_TYPES[0],
  message: "",
};

// Reusable input style
const inputStyle = {
  width: "100%",
  background: "rgba(250,247,240,0.06)",
  border: "1px solid rgba(250,247,240,0.15)",
  borderRadius: "10px",
  padding: "14px 16px",
  fontSize: "0.95rem",
  color: "#FAF7F0",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.2s ease, background 0.2s ease",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: "rgba(250,247,240,0.5)",
  marginBottom: "8px",
};

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const leftRef = useRef(null);
  const formRef = useRef(null);

  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focused, setFocused] = useState(null);

  // ── Scroll animations ──
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
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 85%" },
        },
      );
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 85%" },
        },
      );
      // Info cards stagger
      gsap.fromTo(
        leftRef.current?.querySelectorAll(".info-card") ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 80%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── Form handlers ──
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.from_name,
          from_email: form.from_email,
          phone: form.phone,
          enquiry_type: form.enquiry_type,
          message: form.message,
          to_name: "Ashok Spice Clinic",
        },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const focusStyle = (name) => ({
    ...inputStyle,
    borderColor: focused === name ? "#F5A623" : inputStyle.border,
    background:
      focused === name ? "rgba(245,166,35,0.08)" : inputStyle.background,
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background:
          "linear-gradient(160deg, #1A0F0A 0%, #2C1810 60%, #1A0F0A 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "120px 0",
      }}
    >
      {/* Decorative orbs */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-80px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "-60px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,66,26,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px" }}>
        {/* Section header */}
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
            Get In Touch
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
            Let's Talk Spices
          </h2>
          <p
            style={{
              marginTop: "16px",
              fontSize: "1.05rem",
              color: "rgba(250,247,240,0.6)",
              maxWidth: "500px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
            }}
          >
            Whether you're a home chef, restaurant, or distributor — we'd love
            to hear from you. Reach out for pricing, bulk orders, or product
            queries.
          </p>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "56px",
            alignItems: "start",
          }}
        >
          {/* ── LEFT: Info + WhatsApp ── */}
          <div ref={leftRef}>
            {/* Info cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "40px",
              }}
            >
              {INFO_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="info-card"
                  style={{
                    background: "rgba(250,247,240,0.05)",
                    border: "1px solid rgba(250,247,240,0.08)",
                    borderRadius: "14px",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>
                    {item.icon}
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "rgba(250,247,240,0.4)",
                        marginBottom: "4px",
                      }}
                    >
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{
                          fontSize: "0.95rem",
                          color: "#FAF7F0",
                          textDecoration: "none",
                          fontWeight: 500,
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#F5A623")}
                        onMouseLeave={(e) => (e.target.style.color = "#FAF7F0")}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontSize: "0.95rem",
                          color: "#FAF7F0",
                          fontWeight: 500,
                        }}
                      >
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${(BRAND.contact?.whatsapp || "").replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                background: "#25D366",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                padding: "16px 28px",
                borderRadius: "14px",
                textDecoration: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                marginBottom: "24px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(37,211,102,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>

            {/* Tagline */}
            <p
              style={{
                fontSize: "0.85rem",
                color: "rgba(250,247,240,0.35)",
                lineHeight: 1.7,
                textAlign: "center",
              }}
            >
              Prefer a quick chat? Drop us a WhatsApp message and we'll get back
              to you within the hour.
            </p>
          </div>

          {/* ── RIGHT: Email form ── */}
          <div
            ref={formRef}
            style={{
              background: "rgba(250,247,240,0.04)",
              border: "1px solid rgba(250,247,240,0.08)",
              borderRadius: "20px",
              padding: "40px 36px",
            }}
          >
            <h3
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                fontSize: "1.4rem",
                color: "#FAF7F0",
                marginBottom: "28px",
                marginTop: 0,
              }}
            >
              Send an Enquiry
            </h3>

            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🌶️</div>
                <h4
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: "#FAF7F0",
                    fontSize: "1.3rem",
                    marginBottom: "12px",
                  }}
                >
                  Message Sent!
                </h4>
                <p style={{ color: "rgba(250,247,240,0.6)", lineHeight: 1.7 }}>
                  Thanks for reaching out. We'll get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{
                    marginTop: "24px",
                    background: "none",
                    border: "1px solid rgba(245,166,35,0.4)",
                    color: "#F5A623",
                    padding: "10px 24px",
                    borderRadius: "100px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  Send Another →
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Name + Email row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Your Name *</label>
                    <input
                      type="text"
                      name="from_name"
                      required
                      placeholder="Ravi Sharma"
                      value={form.from_name}
                      onChange={handleChange}
                      onFocus={() => setFocused("from_name")}
                      onBlur={() => setFocused(null)}
                      style={focusStyle("from_name")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      name="from_email"
                      required
                      placeholder="ravi@example.com"
                      value={form.from_email}
                      onChange={handleChange}
                      onFocus={() => setFocused("from_email")}
                      onBlur={() => setFocused(null)}
                      style={focusStyle("from_email")}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label style={labelStyle}>Phone (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                    style={focusStyle("phone")}
                  />
                </div>

                {/* Enquiry type */}
                <div>
                  <label style={labelStyle}>Enquiry Type</label>
                  <select
                    name="enquiry_type"
                    value={form.enquiry_type}
                    onChange={handleChange}
                    onFocus={() => setFocused("enquiry_type")}
                    onBlur={() => setFocused(null)}
                    style={{ ...focusStyle("enquiry_type"), cursor: "pointer" }}
                  >
                    {ENQUIRY_TYPES.map((t) => (
                      <option
                        key={t}
                        value={t}
                        style={{ background: "#2C1810", color: "#FAF7F0" }}
                      >
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us what you're looking for — product name, quantity, or any questions..."
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...focusStyle("message"),
                      resize: "vertical",
                      minHeight: "110px",
                    }}
                  />
                </div>

                {/* Error state */}
                {status === "error" && (
                  <p
                    style={{ color: "#FF6B6B", fontSize: "0.85rem", margin: 0 }}
                  >
                    Something went wrong. Please try WhatsApp or email us
                    directly.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    background:
                      status === "sending"
                        ? "rgba(245,166,35,0.5)"
                        : "linear-gradient(135deg, #C8421A 0%, #F5A623 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "16px 32px",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    transition:
                      "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
                    letterSpacing: "0.5px",
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "sending") {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 8px 24px rgba(200,66,26,0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  {status === "sending" ? "Sending…" : "Send Enquiry →"}
                </button>

                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(250,247,240,0.3)",
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  We typically respond within 24 hours on business days.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          #contact > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
          #contact form > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
