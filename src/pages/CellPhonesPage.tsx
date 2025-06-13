import { useState, useEffect, useMemo } from "react";
import { CardProduct } from "../components/products/CardProduct";
import { ContainerFilter } from "../components/products/ContainerFilter";
import { prepareProducts } from "../helpers";
import { useFilteredProducts } from "../hooks/products/useFilteredProducts";
import { Pagination } from "../components/shared/Pagination";

export const CellPhonesPage = () => {
  const [page, setPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedMemories, setSelectedMemories] = useState<string[]>([]);
  const [selectedRAMs, setSelectedRAMs] = useState<string[]>([]);

  const {
    data: products,
    isLoading,
    totalProducts,
    priceRangeData,
  } = useFilteredProducts({
    page,
    brands: selectedBrands,
    memories: selectedMemories,
    rams: selectedRAMs,
    priceRange,
  });

  // Suponiendo que raw tiene { priceRangeData: { min, max } } o similar:
  useEffect(() => {
    if (priceRangeData) {
      setPriceRange([priceRangeData.min, priceRangeData.max]);
    }
  }, [priceRangeData]);

  const preparedProducts = useMemo(() => prepareProducts(products), [products]);

  useEffect(() => {
    setPage(1);
  }, [selectedBrands, priceRange, selectedMemories, selectedRAMs]);

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 p-4">
      <ContainerFilter
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        selectedPriceRange={priceRange}
        setSelectedPriceRange={setPriceRange}
        selectedMemories={selectedMemories}
        setSelectedMemories={setSelectedMemories}
        selectedRAMs={selectedRAMs}
        setSelectedRAMs={setSelectedRAMs}
      />

      <div className="col-span-2 lg:col-span-2 xl:col-span-4 flex flex-col gap-12">
        <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4">
          {preparedProducts.map((product) => (
            <CardProduct
              key={product.id}
              name={product.name}
              price={product.price}
              colors={product.colors}
              img={product.images[0]}
              slug={product.slug}
              variants={product.variants}
            />
          ))}
        </div>
        <Pagination totalItems={totalProducts} page={page} setPage={setPage} />
      </div>
    </div>
  );
};
