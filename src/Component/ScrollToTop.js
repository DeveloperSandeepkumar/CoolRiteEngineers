import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top instantly on route change to prevent scrolling up animation transitions
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // Short timeout to allow page elements to mount before setting up observer
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-active");
              // Unobserve after animating once
              observer.unobserve(entry.target);
            }
          });
        },
        { 
          threshold: 0.08, // trigger when 8% is visible
          rootMargin: "0px 0px -40px 0px" // triggers slightly before entering viewport
        }
      );

      const elements = document.querySelectorAll(".reveal");
      elements.forEach((el) => observer.observe(el));
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;