import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppleLogo from "../../assets/svg/apple.svg";
import SamsungLogo from "../../assets/svg/samsung.svg";
import XiaomiLogo from "../../assets/svg/xiaomi.png";
import MotorolaLogo from "../../assets/svg/motorola.png";

import { fetchPreparedProducts } from "../services/fetchPreparedProducts";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  slug: string;
  price: number;
  images?: string[];
  colors?: { name: string; color: string }[];
}

const ICONOS: Record<string, JSX.Element> = {
  Apple: <img src={AppleLogo} alt="Apple" className="w-4 h-4 mr-2" />,
  Samsung: <img src={SamsungLogo} alt="Samsung" className="w-5 h-4 mr-2" />,
  Xiaomi: <img src={XiaomiLogo} alt="Xiaomi" className="w-4 h-4 mr-2" />,
  Motorola: <img src={MotorolaLogo} alt="Motorola" className="w-4 h-4 mr-2" />,
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPreparedProducts()
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Error al cargar productos:", err);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSuggestionClick = (product: Product) => {
    setSearchTerm(product.name);
    setShowSuggestions(false);
    navigate(`/celulares/${product.slug}`); // Navega a la URL del producto
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setShowSuggestions(false);
    }
  };

  const filteredSuggestions = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {showSuggestions && searchTerm.trim() !== "" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300"></div>
      )}

      <div className="relative z-40 w-full sm:w-auto" ref={wrapperRef}>
        <form
          className="relative text-gray-600 border rounded-full border-gray-400 w-full sm:w-auto"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <input
            type="search"
            name="search"
            value={searchTerm}
            onChange={handleInputChange}
            onClick={() => setShowSuggestions(true)}
            placeholder="Buscar productos, accesorios..."
            className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full sm:w-[300px] md:w-[400px] lg:w-[600px]"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 mt-3 mr-4"
            aria-label="Buscar"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 56.966 56.966">
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786
                  c0-12.682-10.318-23-23-23s-23,10.318-23,23s10.318,23,23,23
                  c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208
                  c0.571,0.593,1.339,0.92,2.162,0.92
                  c0.779,0,1.518-0.297,2.079-0.837
                  C56.255,54.982,56.293,53.08,55.146,51.887z
                  M23.984,6c9.374,0,17,7.626,17,17
                  s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </svg>
          </button>
        </form>

        {showSuggestions && searchTerm.trim() !== "" && (
          <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-xl z-60 max-h-[400px] overflow-auto">
            {/* Título "Productos sugeridos" */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3">
              <h3 className="font-medium text-gray-700">Productos sugeridos</h3>
            </div>

            {filteredSuggestions.length === 0 ? (
              <div className="p-4 text-sm text-gray-500">
                No se encontraron resultados para "{searchTerm}"
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredSuggestions.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className="flex flex-col border border-gray-200 rounded-lg p-3 hover:bg-blue-50 cursor-pointer transition-colors duration-200 group"
                  >
                    {/* Imagen del producto con efecto hover */}
                    <div className="flex justify-center mb-3 group-hover:scale-105 transition-transform duration-200">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-32 object-contain"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                          Sin imagen
                        </div>
                      )}
                    </div>

                    {/* Información del producto */}
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        {ICONOS[product.brand] || null}
                        <h3 className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {product.brand}
                      </p>

                      {/* Colores */}
                      {product.colors && product.colors.length > 0 && (
                        <div className="flex items-center mb-2">
                          <span className="text-xs text-gray-500 mr-2">
                            Colores:
                          </span>
                          <div className="flex space-x-1">
                            {product.colors.slice(0, 3).map((color, index) => (
                              <div
                                key={index}
                                className="w-3 h-3 rounded-full border border-gray-300"
                                style={{
                                  backgroundColor: color.color.toLowerCase(),
                                }}
                                title={color.name}
                              />
                            ))}
                            {product.colors.length > 3 && (
                              <span className="text-xs text-gray-400">
                                +{product.colors.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Precio */}
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSuggestionClick(product);
                          }}
                        >
                          Ver detalle
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
