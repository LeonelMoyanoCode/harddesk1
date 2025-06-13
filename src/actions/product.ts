import { supabase } from "../supabase/client";

interface PriceRange {
  min: number;
  max: number;
}

interface Product {
  id: string;
  // ... otras propiedades
}

export const fetchPriceRange = async (): Promise<PriceRange> => {
  const { data, error } = await supabase
    .from("products")
    .select("variants ( price )");

  if (error) throw error;

  const allPrices = data
    .flatMap((product) => product.variants.map((v) => v.price))
    .filter((price) => typeof price === "number");

  return {
    min: Math.min(...allPrices),
    max: Math.max(...allPrices),
  };
};

export const fetchProducts = async (params: {
  page: number;
  brands: string[];
  minPrice: number;
  maxPrice: number;
  memories: string[];
  rams: string[];
}): Promise<{ products: Product[]; total: number }> => {
  const PAGE_SIZE = 10;
  const from = (params.page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .gte("variants.price", params.minPrice)
    .lte("variants.price", params.maxPrice)
    .range(from, to);

  if (params.brands.length > 0) {
    query = query.in("brand", params.brands);
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    products: data as Product[],
    total: count || 0,
  };
};

export const getRandomProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*, variants(*)")
    .limit(4); // Obtenés más de los que necesitás

  if (error) throw error;

  const shuffled = data.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10); // Devolvés 10 productos aleatorios
};

export const getRecentProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*, variants(*)") // Incluye variantes si las necesitas
    .order("created_at", { ascending: false })
    .limit(4); // Puedes cambiar el límite si querés más

  if (error) throw error;
  return data as Product[];
};

export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("*, variants(*)") // Incluye variantes
    .eq("slug", slug)
    .single(); // Solo un resultado

  if (error) {
    console.error("Error al obtener producto por slug:", error.message);
    return null;
  }

  return data as Product;
};
