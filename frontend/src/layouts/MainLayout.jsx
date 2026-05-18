import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaMoon, FaSun } from "react-icons/fa";

function MainLayout({ children, darkMode, setDarkMode }) {
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Sidebar />

      <main>
        {children}
      </main>
    </>
  );
}

export default MainLayout;