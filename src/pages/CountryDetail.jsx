import styles from "./CountryDetail.module.css";
import useData from "../hooks/useData";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../components/DarkModeContext";
import { useContext } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
const CountryDetail = () => {
  const API_URL_ALL = "https://restcountries.com/v3.1/all";
  const countriesData = useData(API_URL_ALL);
  const { name } = useParams();
  const { darkMode } = useContext(DarkModeContext);
  if (!countriesData) {
    return;
  }

  const country = countriesData.find((country) => country.name.common === decodeURIComponent(name));
  if (!country) {
    return <div>Country not found</div>;
  }

  const currenciesKey = Object.keys(country.currencies)[0];
  const currencies = Object.values(country.currencies[currenciesKey]);
  const languages = Object.values(country.languages);
  return (
    <div className={styles.all}>
      <div className={styles.backDiv}>
        <AiOutlineArrowLeft className={styles.searchIcon} />
        <Link to="/" className={styles.back}>
          <span className={`${styles.text} ${darkMode ? styles.darkMode : ""}`}>Back</span>
        </Link>
      </div>
      <section className={styles.wrapper}>
        <div className={styles.img}>
          <img src={country.flags.png} alt={country.name.common} />
        </div>
        <div className={styles.details}>
          <h2 className={`${styles.countryName} ${darkMode ? styles.darkMode : ""}`}>
            {country.name.common}
          </h2>
          <div className={`${styles.detailsLeft} ${darkMode ? styles.darkMode : ""}`}>
            <span>
              <strong>Native Name:</strong> {country.altSpellings[1]}
            </span>
            <span>
              <strong>Population:</strong> {country.population.toLocaleString("en-US")}
            </span>
            <span>
              <strong>Region:</strong> {country.region}
            </span>
            <span>
              <strong>Sub Region:</strong> {country.subregion}
            </span>
            <span>
              <strong>Capital:</strong> {country.capital}
            </span>
          </div>
          <div className={`${styles.detailsRight} ${darkMode ? styles.darkMode : ""}`}>
            <span>
              <strong>Top Level Domain:</strong> {country.tld}
            </span>
            {currencies?.length > 0 ? (
              <span>
                <strong>Currencies:</strong> {currencies.join(", ")}
              </span>
            ) : (
              <span>Currencies: No data!</span>
            )}
            {languages?.length > 0 ? (
              <span>
                <strong>Languages:</strong> {languages.join(", ")}
              </span>
            ) : (
              <span>Languages: No data!</span>
            )}
          </div>
          <div className={`${styles.borders} ${darkMode ? styles.darkMode : ""}`}>
            {country.borders?.length > 0 ? (
              <span>
                <strong>Border countries:</strong> {country.borders.join(", ")}
              </span>
            ) : (
              <span>Border countries: No data!</span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CountryDetail;
