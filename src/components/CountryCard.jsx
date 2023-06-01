import styles from "./CountryCard.module.css";
import { Link } from "react-router-dom";
import { DarkModeContext } from "./DarkModeContext";
import { useContext } from "react";
const CountryCard = ({ countriesData }) => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <section className={styles.wrapper}>
      {countriesData &&
        countriesData.map((country) => (
          <Link
            to={`/countryDetail/${encodeURIComponent(country.name.common)}`}
            className={`${styles.card} ${darkMode ? styles.darkmode : ""}`}
            key={country.alpha3Code}
          >
            <div>
              <img src={country.flags.png} alt={country.name.common} className={styles.image} />
            </div>
            <div className={styles.info}>
              <span className={`${styles.countryName} ${darkMode ? styles.darkMode : ""}`}>
                {country.name.common}
              </span>
              <span className={styles.detail}>
                <strong>Population:</strong> {country.population.toLocaleString("en-US")}
              </span>
              <span className={styles.detail}>
                <strong>Region:</strong> {country.region}
              </span>
              <span className={styles.detail}>
                <strong>Capital:</strong> {country.capital && country.capital[0]}
              </span>
            </div>
          </Link>
        ))}
    </section>
  );
};

export default CountryCard;
