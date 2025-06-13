import React, { useState, useRef } from "react";
import {
  MdSmartphone,
  MdHeadphones,
  MdWatch,
  MdMemory,
  MdUsb,
  MdChargingStation,
  MdKeyboardArrowDown,
  MdChevronRight,
  MdLocalOffer,
  MdNewReleases,
  MdTrendingUp,
  MdInfo,
} from "react-icons/md";
import AppleLogo from "../../assets/svg/apple.svg";
import SamsungLogo from "../../assets/svg/samsung.svg";
import XiaomiLogo from "../../assets/svg/xiaomi.png";
import MotorolaLogo from "../../assets/svg/motorola.png";

const MENU_STRUCTURE = [
  {
    name: "Productos",
    icon: MdSmartphone,
    children: [
      {
        name: "Celulares",
        href: "/celulares",
        items: [
          { name: "Apple", icon: AppleLogo, href: "/celulares/apple" },
          { name: "Samsung", icon: SamsungLogo, href: "/celulares/samsung" },
          { name: "Xiaomi", icon: XiaomiLogo, href: "/celulares/xiaomi" },
          { name: "Motorola", icon: MotorolaLogo, href: "/celulares/motorola" },
        ],
      },
      {
        name: "Accesorios",
        href: "/accesorios",
        items: [
          {
            name: "Cargador",
            icon: <MdChargingStation size={20} />,
            href: "/accesorios/cargador",
          },
          {
            name: "Auriculares",
            icon: <MdHeadphones size={20} />,
            href: "/accesorios/auriculares",
          },
          {
            name: "Reloj Inteligente",
            icon: <MdWatch size={20} />,
            href: "/accesorios/reloj-inteligente",
          },
          {
            name: "Pendrive",
            icon: <MdUsb size={20} />,
            href: "/accesorios/pendrive",
          },
          {
            name: "Memorias",
            icon: <MdMemory size={20} />,
            href: "/accesorios/memorias",
          },
        ],
      },
    ],
  },
  { name: "Ofertas", icon: MdLocalOffer, href: "/ofertas" },
  { name: "Novedades", icon: MdNewReleases, href: "/novedades" },
  { name: "Más Vendidos", icon: MdTrendingUp, href: "/mas-vendidos" },
  { name: "Sobre Nosotros", icon: MdInfo, href: "/sobre-nosotros" },
];

export const Navbar_Inferior: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  const handleOpen = (name: string) => {
    clearCloseTimeout();
    setOpenMenu(name);
  };

  const handleClose = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
      setHoveredCategory(null);
    }, 200);
  };

  const handleCategoryHover = (categoryName: string) => {
    clearCloseTimeout();
    setHoveredCategory(categoryName);
  };

  return (
    <nav className="hidden sm:flex bg-gradient-to-r from-slate-800 to-slate-900 text-white p-2.5 relative z-20 shadow-lg">
      <ul className="relative flex space-x-8 max-w-[1440px] mx-auto items-center justify-center px-5 lg:px-12">
        {MENU_STRUCTURE.map((entry) => (
          <li
            key={entry.name}
            className="relative group"
            onMouseEnter={() => entry.children && handleOpen(entry.name)}
            onMouseLeave={entry.children ? handleClose : undefined}
          >
            {entry.href ? (
              <a
                href={entry.href}
                className="flex items-center space-x-2 text-lg font-medium hover:text-blue-300 cursor-pointer transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-slate-700"
              >
                <entry.icon size={20} className="text-blue-300" />
                <span>{entry.name}</span>
              </a>
            ) : (
              <button
                className="flex items-center space-x-2 text-lg font-medium hover:text-blue-300 cursor-pointer transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-slate-700"
                aria-haspopup="true"
                aria-expanded={openMenu === entry.name}
              >
                <entry.icon size={20} className="text-blue-300" />
                <span>{entry.name}</span>
                <MdKeyboardArrowDown
                  size={18}
                  className={`transition-transform duration-200 ${openMenu === entry.name ? "rotate-180" : ""}`}
                />
              </button>
            )}

            {entry.children && openMenu === entry.name && (
              <div
                className="absolute top-full left-0 mt-1 w-[600px] bg-white text-gray-800 shadow-xl rounded-lg py-4 px-4 z-50 border border-gray-200 flex"
                onMouseEnter={clearCloseTimeout}
                onMouseLeave={handleClose}
              >
                {/* Columna de categorías */}
                <div className="w-1/3 pr-4 border-r border-gray-200">
                  <ul className="space-y-2">
                    {entry.children.map((cat) => (
                      <li
                        key={cat.name}
                        onMouseEnter={() => handleCategoryHover(cat.name)}
                        className={`group/category rounded-lg transition-colors ${hoveredCategory === cat.name ? "bg-blue-50" : "hover:bg-gray-100"}`}
                      >
                        <a
                          href={cat.href}
                          className="flex items-center justify-between p-2"
                        >
                          <span className="font-medium group-hover/category:text-blue-600">
                            {cat.name}
                          </span>
                          <div className="flex items-center">
                            <MdChevronRight
                              size={18}
                              className={`text-gray-500 group-hover/category:text-blue-600 ${hoveredCategory === cat.name ? "text-blue-600" : ""}`}
                            />
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Panel de items de la categoría */}
                <div className="w-2/3 pl-4">
                  {entry.children.map((cat) => (
                    <div
                      key={cat.name}
                      className={`${hoveredCategory === cat.name ? "block" : "hidden"}`}
                    >
                      <h3 className="text-lg font-bold mb-3 text-blue-600">
                        {cat.name}
                      </h3>
                      <ul className="space-y-3">
                        {cat.items.map((item) => (
                          <li key={item.name}>
                            <a
                              href={item.href}
                              className="flex items-center space-x-3 hover:text-blue-600 transition-colors duration-200 p-2 rounded hover:bg-blue-50"
                            >
                              {typeof item.icon === "string" ? (
                                <img
                                  src={item.icon}
                                  alt={item.name}
                                  className="w-6 h-6 object-contain"
                                />
                              ) : (
                                <span className="text-gray-600">
                                  {item.icon}
                                </span>
                              )}
                              <span className="font-medium">{item.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
