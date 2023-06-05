import { Header } from "../../../src/components/Header";
import { DarkModeContext } from "../../../src/components/DarkModeContext";
import styles from "../../../src/components/Header.module.css";

describe("<Header /> rendering", () => {
  const modeCases = [
    { darkMode: false, expectedColor: "rgb(0, 0, 0)" },
    { darkMode: true, expectedColor: "rgb(255, 255, 255)" },
  ];

  modeCases.forEach(({ darkMode, expectedColor }) => {
    it(`renders correctly with ${darkMode ? "dark" : "light"} mode styling`, () => {
      const toggleDarkMode = () => {};

      cy.mount(
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
          <Header />
        </DarkModeContext.Provider>
      );

      cy.get("[data-cy='header']").should("have.class", `${styles.header}`);
      cy.get(`.${styles.text}`).should("contain", "Where is the world?");
      cy.get(`.${styles.modeText}`).should("contain", "Dark Mode");

      if (darkMode) {
        cy.get(`.${styles.text}`).should("have.css", "color", expectedColor);
      }
    });
  });
});
