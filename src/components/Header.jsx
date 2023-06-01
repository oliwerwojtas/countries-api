import styles from "./Header.module.css";
// import { useState } from "react";
import { BsMoon } from "react-icons/bs";
import { BsMoonFill } from "react-icons/bs";
import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";
const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <header className={`${styles.header} ${darkMode ? styles.darkmode : ""}`}>
      <div>
        <p className={styles.text}>Where is the world?</p>
      </div>
      <div className={styles.mode} onClick={toggleDarkMode}>
        {darkMode ? <BsMoonFill className={styles.icon} /> : <BsMoon />}

        <p className={styles.modeText}>Dark Mode</p>
      </div>
    </header>
  );
};

export default Header;
