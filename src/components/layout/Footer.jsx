import { BRAND } from "../../constants/brand";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#1A0F0A",
        color: "rgba(250,247,240,0.7)",
        padding: "72px 32px 32px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "48px",
            marginBottom: "56px",
          }}
        >
          {/* Brand column */}
          <div>
            <img
              src="/logo.png"
              alt="ASPC"
              onError={(e) => (e.target.style.display = "none")}
              style={{
                height: "52px",
                marginBottom: "16px",
                objectFit: "contain",
              }}
            />
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.75,
                marginTop: "8px",
                color: "rgba(250,247,240,0.55)",
                maxWidth: "240px",
              }}
            >
              Ashok Spice Clinic — premium spices, pure ingredients, generations
              of trust.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#F5A623",
                marginBottom: "20px",
                fontWeight: 700,
              }}
            >
              Explore
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {["#story", "#products", "#quality", "#contact"].map(
                (href, i) => {
                  const labels = [
                    "Our Story",
                    "Products",
                    "Quality",
                    "Contact Us",
                  ];
                  return (
                    <li key={href}>
                      <a
                        href={href}
                        style={{
                          color: "rgba(250,247,240,0.6)",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#FAF7F0")}
                        onMouseLeave={(e) =>
                          (e.target.style.color = "rgba(250,247,240,0.6)")
                        }
                      >
                        {labels[i]}
                      </a>
                    </li>
                  );
                },
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#F5A623",
                marginBottom: "20px",
                fontWeight: 700,
              }}
            >
              Contact
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {BRAND.contact?.phone && (
                <a
                  href={`tel:${BRAND.contact.phone}`}
                  style={{
                    color: "rgba(250,247,240,0.6)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#FAF7F0")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(250,247,240,0.6)")
                  }
                >
                  📞 {BRAND.contact.phone}
                </a>
              )}
              {BRAND.contact?.email && (
                <a
                  href={`mailto:${BRAND.contact.email}`}
                  style={{
                    color: "rgba(250,247,240,0.6)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#FAF7F0")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(250,247,240,0.6)")
                  }
                >
                  ✉️ {BRAND.contact.email}
                </a>
              )}
              {BRAND.contact?.whatsapp && (
                <a
                  href={`https://wa.me/${BRAND.contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#25D366",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    padding: "10px 18px",
                    borderRadius: "100px",
                    textDecoration: "none",
                    width: "fit-content",
                    marginTop: "4px",
                  }}
                >
                  💬 WhatsApp Us
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(250,247,240,0.08)",
            paddingTop: "28px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "12px",
            fontSize: "0.8rem",
            color: "rgba(250,247,240,0.35)",
          }}
        >
          <span>© {year} Ashok Spice Clinic. All rights reserved.</span>
          <span>Pure Spices · Honest Sourcing · Trusted Heritage</span>
        </div>
      </div>
    </footer>
  );
}
