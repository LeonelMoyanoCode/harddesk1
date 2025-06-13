import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Separator } from "../shared/Separator";
import { Range, getTrackBackground } from "react-range";

type Category = "Celulares" | "Accesorios";

const categories: { name: Category; path: string }[] = [
  { name: "Celulares", path: "/celulares" },
  { name: "Accesorios", path: "/accesorios" },
];

const availableBrands: Record<Category, string[]> = {
  Celulares: ["Samsung", "Apple", "Huawei", "Xiaomi", "Realme", "Honor"],
  Accesorios: ["Anker", "Logitech", "Sony", "JBL", "Belkin"],
};

const memoryCapacities = ["32GB", "64GB", "128GB", "256GB", "512GB"];
const ramOptions = ["2GB", "4GB", "6GB", "8GB", "12GB"];

interface Props {
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;

  selectedPriceRange: [number, number];
  setSelectedPriceRange: (range: [number, number]) => void;

  selectedMemories: string[];
  setSelectedMemories: (memories: string[]) => void;

  selectedRAMs: string[];
  setSelectedRAMs: (rams: string[]) => void;
}

export const ContainerFilter = ({
  selectedBrands,
  setSelectedBrands,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedMemories,
  setSelectedMemories,
  selectedRAMs,
  setSelectedRAMs,
}: Props) => {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("Celulares");

  // Estados para controlar desplegables (acordeones)
  const [openBrand, setOpenBrand] = useState(true);
  const [openPrice, setOpenPrice] = useState(false);
  const [openMemory, setOpenMemory] = useState(false);
  const [openRAM, setOpenRAM] = useState(false);

  const navigate = useNavigate();

  // Funciones para manejar filtros
  const toggleItem = (
    list: string[],
    item: string,
    setter: (newList: string[]) => void
  ) => {
    if (list.includes(item)) {
      setter(list.filter((i) => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleBrandChange = (brand: string) =>
    toggleItem(selectedBrands, brand, setSelectedBrands);

  const handleCategoryChange = (category: { name: Category; path: string }) => {
    setSelectedCategory(category.name);
    navigate(category.path);
    // Limpiar filtros relacionados a marcas y otros cuando se cambia categoría (opcional)
    setSelectedBrands([]);
    setSelectedMemories([]);
    setSelectedRAMs([]);
  };

  const handleMemoryChange = (memory: string) =>
    toggleItem(selectedMemories, memory, setSelectedMemories);

  const handleRAMChange = (ram: string) =>
    toggleItem(selectedRAMs, ram, setSelectedRAMs);

  // Rango mínimo y máximo para precio
  const MIN = 0;
  const MAX = 2000;

  return (
    <div className="p-6 border border-slate-300 rounded-lg h-fit col-span-2 lg:col-span-1 bg-white shadow-md">
      <h3 className="font-semibold text-2xl mb-5 text-gray-800">Filtros</h3>

      {/* Selector de categorías */}
      <div className="flex gap-4 mb-5">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`px-5 py-2 rounded-md font-semibold transition-colors duration-300 ${
              selectedCategory === category.name
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <Separator />

      {/* Accordion Marca */}
      <div className="mt-5">
        <button
          className="flex justify-between w-full font-semibold text-gray-900 text-lg cursor-pointer border-b border-gray-300 pb-3 hover:text-blue-600 transition-colors"
          onClick={() => setOpenBrand(!openBrand)}
          aria-expanded={openBrand}
        >
          Marcas
          <span className="text-2xl font-bold select-none">
            {openBrand ? "−" : "+"}
          </span>
        </button>
        <div
          className={`mt-3 flex flex-col gap-3 max-h-[200px] overflow-auto transition-all duration-300 ease-in-out ${
            openBrand ? "opacity-100" : "opacity-0 max-h-0 pointer-events-none"
          }`}
        >
          {availableBrands[selectedCategory]?.map((brand) => (
            <label
              key={brand}
              className="inline-flex items-center cursor-pointer select-none"
            >
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              <span className="ml-3 text-gray-800 text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Accordion Precio */}
      <div className="mt-8">
        <button
          className="flex justify-between w-full font-semibold text-gray-900 text-lg cursor-pointer border-b border-gray-300 pb-3 hover:text-blue-600 transition-colors"
          onClick={() => setOpenPrice(!openPrice)}
          aria-expanded={openPrice}
        >
          Precio
          <span className="text-2xl font-bold select-none">
            {openPrice ? "−" : "+"}
          </span>
        </button>
        <div
          className={`mt-5 px-2 transition-all duration-300 ease-in-out ${
            openPrice
              ? "opacity-100 max-h-[110px]"
              : "opacity-0 max-h-0 pointer-events-none"
          }`}
        >
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-3">
            <span>${selectedPriceRange[0]}</span>
            <span>${selectedPriceRange[1]}</span>
          </div>

          <Range
            step={10}
            min={MIN}
            max={MAX}
            values={selectedPriceRange}
            onChange={(values) => setSelectedPriceRange([values[0], values[1]])}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "8px",
                  width: "100%",
                  background: getTrackBackground({
                    values: selectedPriceRange,
                    colors: ["#d1d5db", "#3b82f6", "#d1d5db"],
                    min: MIN,
                    max: MAX,
                  }),
                  borderRadius: "6px",
                }}
                className="my-4"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="h-6 w-6 rounded-full bg-blue-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ ...props.style }}
              />
            )}
          />
        </div>
      </div>

      {/* Accordion Capacidad de Memoria */}
      <div className="mt-8">
        <button
          className="flex justify-between w-full font-semibold text-gray-900 text-lg cursor-pointer border-b border-gray-300 pb-3 hover:text-blue-600 transition-colors"
          onClick={() => setOpenMemory(!openMemory)}
          aria-expanded={openMemory}
        >
          Capacidad de memoria
          <span className="text-2xl font-bold select-none">
            {openMemory ? "−" : "+"}
          </span>
        </button>
        <div
          className={`mt-3 flex flex-col gap-3 max-h-[150px] overflow-auto transition-all duration-300 ease-in-out ${
            openMemory ? "opacity-100" : "opacity-0 max-h-0 pointer-events-none"
          }`}
        >
          {memoryCapacities.map((mem) => (
            <label
              key={mem}
              className="inline-flex items-center cursor-pointer select-none"
            >
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                checked={selectedMemories.includes(mem)}
                onChange={() => handleMemoryChange(mem)}
              />
              <span className="ml-3 text-gray-800 text-sm">{mem}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Accordion Memoria RAM */}
      <div className="mt-8">
        <button
          className="flex justify-between w-full font-semibold text-gray-900 text-lg cursor-pointer border-b border-gray-300 pb-3 hover:text-blue-600 transition-colors"
          onClick={() => setOpenRAM(!openRAM)}
          aria-expanded={openRAM}
        >
          Memoria RAM
          <span className="text-2xl font-bold select-none">
            {openRAM ? "−" : "+"}
          </span>
        </button>
        <div
          className={`mt-3 flex flex-col gap-3 max-h-[150px] overflow-auto transition-all duration-300 ease-in-out ${
            openRAM ? "opacity-100" : "opacity-0 max-h-0 pointer-events-none"
          }`}
        >
          {ramOptions.map((ram) => (
            <label
              key={ram}
              className="inline-flex items-center cursor-pointer select-none"
            >
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                checked={selectedRAMs.includes(ram)}
                onChange={() => handleRAMChange(ram)}
              />
              <span className="ml-3 text-gray-800 text-sm">{ram}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
