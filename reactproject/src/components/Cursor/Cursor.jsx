import { useEffect } from "react";
import "./Cursor.css";

const Cursor = () => {
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");

    const moveCursor = (e) => {
      cursor.style.top = e.clientY + "px";
      cursor.style.left = e.clientX + "px";
    };

    const addHover = () => cursor.classList.add("hovered");
    const removeHover = () => cursor.classList.remove("hovered");

    document.addEventListener("mousemove", moveCursor);

    // Targets for interactive glow
    const hoverElements = document.querySelectorAll("button, .route-card, .package-card, .bus-card, a");
    hoverElements.forEach(el => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      hoverElements.forEach(el => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return <div className="custom-cursor"></div>;
};

export default Cursor;
