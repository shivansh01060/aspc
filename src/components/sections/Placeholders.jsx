// ── Placeholder sections ──────────────────────────────────────
// These are shells — each will be fully built in Steps 3–5.
// They are already wired with correct section IDs for Navbar scroll.

export function StorySection() {
  return (
    <section
      id="story"
      className="section-pad"
      style={{ background: "var(--cream-dark)" }}
    >
      <div className="container">
        <p
          style={{ opacity: 0.4, fontFamily: "monospace", fontSize: "0.75rem" }}
        >
          [ StorySection — built in Step 3 ]
        </p>
      </div>
    </section>
  );
}

export function QualitySection() {
  return (
    <section
      id="quality"
      className="section-pad"
      style={{ background: "var(--warm-white)" }}
    >
      <div className="container">
        <p
          style={{ opacity: 0.4, fontFamily: "monospace", fontSize: "0.75rem" }}
        >
          [ QualitySection — built in Step 3 ]
        </p>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section-pad"
      style={{ background: "var(--cream)" }}
    >
      <div className="container">
        <p
          style={{ opacity: 0.4, fontFamily: "monospace", fontSize: "0.75rem" }}
        >
          [ ContactSection — built in Step 5 ]
        </p>
      </div>
    </section>
  );
}
