import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "./motion/SmoothScroll";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const toTop = () => {
    // Lenis owns the scroll position while running; a native smooth scroll
    // would fight it.
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      className="animate-fade-in fixed bottom-5 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-primary-100 bg-white text-primary-700 shadow-pill transition-colors hover:bg-primary-600 hover:text-white"
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
