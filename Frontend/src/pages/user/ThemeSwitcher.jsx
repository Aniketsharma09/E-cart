// components/ThemeSwitcher.jsx
import { useEffect, useState } from "react";

const themes = [
  { label: "Modern Dark", value: "modern-soft-dark" },
  { label: "Neo Light", value: "neo-light" },
  { label: "Luxury Gold", value: "luxury-gold-dark" },
  { label: "Pastel Calm", value: "pastel-calm" },
  { label: "Cyber Neon", value: "cyber-neon-dark" },
];

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "modern-soft-dark"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="themeSwitcher w-[60vh] h-full p-3 rounded border bg-[var(--card)] text-[var(--text-h)] text-xl"
    >
      {themes.map((t) => (
        <option key={t.value} value={t.value}>
          {t.label}
        </option>
      ))}
    </select>
  );
};

export default ThemeSwitcher;
