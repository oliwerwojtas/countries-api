import { MemoryRouter } from "react-router-dom";
import { DarkModeContext } from "../../../src/components/DarkModeContext";
import { CountryCard } from "../../../src/components/CountryCard";
import { CountryDetail } from "../../../src/pages/CountryDetail";
import { Routes, Route } from "react-router-dom";
describe("<CountryCard /> rendering", () => {
  const countriesData = [
    {
      name: { common: "Polska" },
      flags: { png: "flag1.png" },
      population: 1000000,
      region: "Region 1",
      capital: ["Capital 1"],
    },
  ];

  it("renders cards for country in the data", () => {
    cy.mount(
      <MemoryRouter>
        <DarkModeContext.Provider value={{ darkMode: false }}>
          <CountryCard countriesData={countriesData} />
        </DarkModeContext.Provider>
      </MemoryRouter>
    );
    cy.get("[data-cy='country-card']").should("exist");
    cy.get("[data-cy='country-card']").should("have.length", countriesData.length);
    cy.get("[data-cy='country-card']").each((card, index) => {
      cy.wrap(card).find("img").should("have.attr", "src", countriesData[index].flags.png);

      cy.wrap(card)
        .find("span[data-cy='country-name']")
        .should("have.text", countriesData[index].name.common);

      cy.wrap(card)
        .find("span[data-cy='population']")
        .should(
          "have.text",
          `Population: ${countriesData[index].population.toLocaleString("en-US")}`
        );

      cy.wrap(card)
        .find("span[data-cy='region']")
        .should("have.text", `Region: ${countriesData[index].region}`);

      cy.wrap(card)
        .find("span[data-cy='capital']")
        .should(
          "have.text",
          `Capital: ${countriesData[index].capital && countriesData[index].capital[0]}`
        );
    });
  });
  it("navigates to details after click", () => {
    cy.mount(
      <MemoryRouter initialEntries={["/"]}>
        <DarkModeContext.Provider value={{ darkMode: false }}>
          <Routes>
            <Route path="/" element={<CountryCard countriesData={countriesData} />} />
            <Route path="/countryDetail/:name" element={<CountryDetail />} />
          </Routes>
        </DarkModeContext.Provider>
      </MemoryRouter>
    );

    cy.get("[data-cy='country-card']").should("exist");
    cy.get("[data-cy='country-card']").click();

    cy.url().should("include", "/countryDetail/:name");
  });
});
