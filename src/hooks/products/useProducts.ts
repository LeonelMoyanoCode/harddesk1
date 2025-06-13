import { useQuery } from "@tanstack/react-query";
import { getFilteredProducts } from "../../actions";

export const useProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getFilteredProducts({ page: 1, brands: [] }),
    staleTime: 1000 * 60 * 5,
  });

  return { products: data?.data ?? [], isLoading };
};
