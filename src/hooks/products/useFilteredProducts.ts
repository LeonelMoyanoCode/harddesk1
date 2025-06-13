import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchPriceRange } from "../../actions";

interface FilterParams {
  page: number;
  brands: string[];
  priceRange: [number, number];
  memories: string[];
  rams: string[];
}

interface ProductsResponse {
  products: any[]; // Reemplaza 'any' con tu interfaz de producto
  total: number;
}

export const useFilteredProducts = ({
  page,
  brands,
  priceRange,
  memories,
  rams,
}: FilterParams) => {
  // 1. Obtener el rango de precios completo
  const { data: priceRangeData } = useQuery({
    queryKey: ["products", "price-range"],
    queryFn: fetchPriceRange,
    staleTime: Infinity, // Los precios no cambian frecuentemente
  });

  // 2. Obtener productos filtrados
  const productsQuery = useQuery<ProductsResponse>({
    queryKey: ["filtered-products", page, brands, priceRange, memories, rams],
    queryFn: () =>
      fetchProducts({
        page,
        brands,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        memories,
        rams,
      }),
    keepPreviousData: true,
    enabled: !!priceRangeData, // Solo ejecutar cuando tengamos los datos de precio
  });

  return {
    data: productsQuery.data?.products || [],
    isLoading: productsQuery.isLoading,
    totalProducts: productsQuery.data?.total || 0,
    priceRangeData,
  };
};
