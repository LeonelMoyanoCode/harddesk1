import { Outlet } from "react-router-dom";
import { Menu } from "../components/shared/Menu";
import { Footer } from "../components/shared/Footer";
import { useLocation } from "react-router-dom";
import { Banner } from "../components/home/Banner";
import { Navbar_Inferior } from "../components/shared/Navbar_Inferior";

export const RootLayout = () => {
  const { pathname } = useLocation();

  console.log(pathname);

  return (
    <div className="h-screen flex flex-col font-openSans">
      <Menu />

      <Navbar_Inferior />

      {pathname === "/" && <Banner />}
      <main className="container my-5 flex-1 z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
