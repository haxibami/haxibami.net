import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
//import "@fortawesome/fontawesome-svg-core/styles.css";
import Styles from "./style.module.scss";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className={Styles.Container}>
      <button
        className={Styles.Button}
        aria-label="DarkModeToggle"
        type="button"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        {mounted && (
          <div>
            {resolvedTheme === "dark" ? (
              <FontAwesomeIcon icon={faMoon} size={"2x"} color={"#d9c77e"} />
            ) : (
              <FontAwesomeIcon icon={faSun} size={"2x"} color={"#ff6f21"} />
            )}
          </div>
        )}
      </button>
    </div>
  );
};

export default ThemeChanger;
