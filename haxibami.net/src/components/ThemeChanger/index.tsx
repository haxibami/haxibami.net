import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Styles from "./style.module.scss";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
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
          <>
            {resolvedTheme === "dark" ? (
              <FontAwesomeIcon
                icon={faMoon}
                width={30}
                height={30}
                color={"#d9c77e"}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSun}
                width={30}
                height={30}
                color={"darkorange"}
              />
            )}{" "}
          </>
        )}
      </button>
    </div>
  );
};

export default ThemeChanger;
