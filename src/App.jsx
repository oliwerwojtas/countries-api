// import useData from "./hooks/useData";
import "./index.css";
import RootLayout from "./pages/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { CountryDetail } from "./pages/CountryDetail";
import { Main } from "../src/pages/Main";
import { useContext } from "react";
import { DarkModeContext } from "./components/DarkModeContext";
import { useEffect } from "react";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        path: "/",
        element: <Main />,
      },
      { path: "/countryDetail/:name", element: <CountryDetail /> },
    ],
  },
]);
const App = () => {
  const { darkMode } = useContext(DarkModeContext);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkmode");
    } else {
      document.body.classList.remove("darkmode");
    }
  }, [darkMode]);
  return <RouterProvider router={router} />;
};
export default App;
