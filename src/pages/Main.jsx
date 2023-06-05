import { useState, useEffect } from "react";
import { useData } from "../hooks/useData";
import { CountryCard } from "../components/CountryCard";
import styles from "./Main.module.css";
import { SlMagnifier } from "react-icons/sl";
import { DarkModeContext } from "../components/DarkModeContext";
import { useContext } from "react";

export const Main = () => {
  const API_URL_ALL = "https://restcountries.com/v3.1/all";
  const countriesData = useData(API_URL_ALL);
  const [searchText, setSearchText] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [options, setOptions] = useState([]);
  const { darkMode } = useContext(DarkModeContext);
  useEffect(() => {
    if (countriesData) {
      setOptions(generateOptions(countriesData));
    }
  }, [countriesData]);

  const generateOptions = (countriesData) => {
    if (!countriesData) {
      return [];
    }

    const uniqueRegions = [
      ...new Set(countriesData.map((country) => country.region.toLowerCase())),
    ];

    return [
      { value: "", label: "All Regions" },
      ...uniqueRegions.map((region) => ({
        value: region,
        label: region.charAt(0).toUpperCase() + region.slice(1),
        "data-cy": `region-option-${region.toLowerCase()}`,
      })),
    ];
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleRegionFilterChange = (event) => {
    setRegionFilter(event.target.value);
  };

  const filteredCountries = countriesData?.filter((country) => {
    const nameMatch = country.name.common.toLowerCase().includes(searchText.toLowerCase());
    const regionMatch = regionFilter
      ? country.region.toLowerCase() === regionFilter.toLowerCase()
      : true;
    return nameMatch && regionMatch;
  });

  return (
    <>
      <div className={styles.wrapperMain}>
        <div className={styles.inputDiv}>
          <SlMagnifier className={`${styles.searchIcon} ${darkMode ? styles.darkMode : ""}`} />
          <input
            data-cy="search-input"
            type="text"
            value={searchText}
            onChange={handleInputChange}
            placeholder="Search country..."
            className={`${darkMode ? styles.darkMode : ""}`}
          />
        </div>
        <div className={styles.select}>
          <select data-cy="region-select" value={regionFilter} onChange={handleRegionFilterChange}>
            {options.map((option) => (
              <option key={option.value} value={option.value} data-cy={option["data-cy"]}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <CountryCard countriesData={filteredCountries} />
    </>
  );
};
