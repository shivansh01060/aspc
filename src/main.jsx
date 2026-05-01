import React from "react";
import ReactDOM from "react-dom/client";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import App from "./App";
import "./styles/globals.css";

// ── Register GSAP plugins ──────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ── Lenis smooth scroll ────────────────────────────────────
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

// Sync Lenis with GSAP ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
// Expose lenis globally so components can use it
window.lenis = lenis;

// ── Mount ──────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
