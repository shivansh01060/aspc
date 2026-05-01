import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollAnimation
 * A reusable hook that wires a GSAP timeline to a ScrollTrigger.
 *
 * @param {function} builder   — receives (tl, el) and adds tweens to tl
 * @param {object}   trigger   — ScrollTrigger config overrides
 * @param {array}    deps      — extra dependencies (default [])
 */
export function useScrollAnimation(builder, trigger = {}, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        ...trigger,
      },
    });

    builder(tl, el);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * useFadeUp — convenience wrapper: fades + slides children up on scroll
 * @param {string} selector  — CSS selector for children to animate (default '.fade-up')
 * @param {object} options   — gsap fromTo options override
 */
export function useFadeUp(
  selector = ".fade-up",
  options = {},
  triggerOverrides = {},
) {
  return useScrollAnimation((tl, el) => {
    const items = el.querySelectorAll(selector);
    if (!items.length) {
      // animate the container itself
      tl.fromTo(
        el,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", ...options },
      );
    } else {
      tl.fromTo(
        items,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          ...options,
        },
      );
    }
  }, triggerOverrides);
}
