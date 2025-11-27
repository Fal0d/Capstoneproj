import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className="theme-toggle"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <>
          <svg viewBox="0 0 24 24" className="icon" aria-hidden>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          Dark
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" className="icon" aria-hidden>
            <path d="M6.76 4.84l-1.8-1.79L3.17 4.84 4.97 6.63 6.76 4.84zM11 1h2v3h-2V1zM17.24 4.84l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM23 11h-3v2h3v-2zM1 11v2h3v-2H1zm3.17 8.17l1.79-1.79L4.97 15.8 3.17 17.59zM11 20h2v3h-2v-3zM17.24 19.16l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79z"/>
          </svg>
          Light
        </>
      )}
    </button>
  );
}
