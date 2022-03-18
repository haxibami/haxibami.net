import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Styles from "./index.module.scss";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  return (
    <div>
      <button
        className={Styles.Button}
        aria-label="DarkModeToggle"
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {mounted && (
          <>
            {theme === "dark" ? (
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
                color={"orange"}
              />
            )}{" "}
          </>
        )}
      </button>
    </div>
  );
};

export default ThemeChanger;
