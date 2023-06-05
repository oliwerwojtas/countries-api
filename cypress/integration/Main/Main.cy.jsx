// import { mount } from "cypress-react-unit-test";
import { DarkModeContext } from "../../../src/components/DarkModeContext";
import { Main } from "../../../src/pages/Main.jsx";
import { MemoryRouter } from "react-router-dom";

describe("<Main /> rendering", () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <DarkModeContext.Provider value={{ darkMode: false }}>
          <Main />
        </DarkModeContext.Provider>
      </MemoryRouter>
    );
  });
  it("search for a country by name", () => {
    cy.get("[data-cy='search-input']").type("Poland");
    cy.get("[data-cy='country-card']").should("exist");
    cy.get("[data-cy='country-card']").should("have.length", 1);
  });

  it("selects a region and displays matching countries", () => {
    const options = ["All Regions", "Europe", "Asia", "Africa", "Oceania", "Americas", "Antarctic"];
    const selectedRegion = Cypress._.sample(options);
    cy.get("[data-cy='region-select']").select(selectedRegion);
    cy.get("[data-cy='country-card']").should("exist");
    cy.get("[data-cy='country-card']").should("have.length.greaterThan", 0);
  });
});
