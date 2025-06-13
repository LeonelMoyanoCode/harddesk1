import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Logo } from "./Logo";
import { SearchBar } from "./Search";
import { useState } from "react";
import CartDropdown from "./Cart";

export const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para alternar el menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-slate-300 text-black py-4   border-b-4 border-slate-700">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-12">
        {/* Primera fila: Botón de menú, logo e íconos */}
        <div className="flex justify-between items-center">
          {/* Botón de menú (izquierda) */}
          <button className="sm:hidden" onClick={toggleMenu}>
            <AiOutlineMenu size={24} />
          </button>

          {/* Logo (centro) */}
          <div className="flex-1 flex justify-center sm:justify-start min-w-max">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Buscador en pantallas grandes y medianas */}
          <div className="hidden sm:flex justify-center w-full mt-2">
            <SearchBar onSearch={(query: string) => console.log(query)} />
          </div>

          {/* Íconos en pantallas grandes y medianas */}
          <div className="hidden sm:flex gap-5 items-center">
            <CartDropdown />

            <div className="relative">
              <Link
                to="/account"
                className="border-2 border-slate-700 w-8 h-8 rounded-full grid place-items-center text-lg font-bold"
              >
                R
              </Link>
            </div>
          </div>

          {/* Íconos solo para dispositivos móviles */}
          <div className="flex gap-5 items-center sm:hidden">
            <CartDropdown />

            <div className="relative">
              <Link
                to="/account"
                className="border-2 border-slate-700 w-8 h-8 rounded-full grid place-items-center text-lg font-bold"
              >
                R
              </Link>
            </div>
          </div>
        </div>

        {/* Buscador en móviles */}
        <div className="w-full mt-4 block sm:hidden">
          <SearchBar onSearch={(query: string) => console.log(query)} />
        </div>
      </div>

      {/* Menú deslizante */}
      <div
        className={`fixed inset-y-0 left-0 w-[70%] bg-slate-300 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Botón para cerrar el menú */}
        <button className="absolute top-4 right-4 p-2" onClick={toggleMenu}>
          <AiOutlineClose size={24} />
        </button>

        {/* Contenido del menú */}
        <nav className="mt-16 p-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/celulares"
                className="text-lg font-semibold hover:text-blue-500"
                onClick={toggleMenu}
              >
                Celulares
              </Link>
            </li>
            <li>
              <Link
                to="/accesorios"
                className="text-lg font-semibold hover:text-blue-500"
                onClick={toggleMenu}
              >
                Accesorios
              </Link>
            </li>
            <li>
              <Link
                to="/productos-populares"
                className="text-lg font-semibold hover:text-blue-500"
                onClick={toggleMenu}
              >
                Productos Populares
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
};
