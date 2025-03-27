import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = () => {
  const [mobile, setMobile] = useState<boolean>(false);
  
  useEffect(() => {
    setMobile(window.innerWidth <= 640);
    
    window.addEventListener("resize", () => setMobile(window.innerWidth <= 640));
    return () => window.removeEventListener("resize", () => setMobile(window.innerWidth <= 640));
  }, []);

  useEffect(() => {
    if(mobile) return;

    const lenis = new Lenis({
      lerp: 0.1,
    });

    // Use GSAP's ticker to sync Lenis with ScrollTrigger
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert GSAP time to milliseconds
    });

    // Disable default GSAP scroll listener (Lenis handles it now). By default it is at the window, not body
    ScrollTrigger.defaults({ scroller: document.body });

    // unmount cleanup
    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, [mobile]);

  return null;
};

export default SmoothScroll;
