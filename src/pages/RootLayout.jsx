// import Main from "../components/Main";
import { Header } from "../components/Header";
import "../index.css";
//utilities
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
export default RootLayout;
