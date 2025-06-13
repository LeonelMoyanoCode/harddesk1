import { supabase } from "../../supabase/client";

export const getFilteredProducts = async ({
  page = 1,
  brands = [],
  storages = [],
  priceRange = { min: 0, max: 9999999 },
}: {
  page: number;
  brands?: string[];
  storages?: string[];
  priceRange?: { min: number; max: number };
}) => {
  const itemsPerPage = 10;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let query = supabase
    .from("products")
    .select("*, variants!inner(*)", { count: "exact" })
    .order("created_at", { ascending: false });

  // Filtrar por marca
  if (brands.length > 0) {
    query = query.in("brand", brands);
  }

  // Filtro por precio usando .filter en la relación
  query = query
    .filter("variants.price", "gte", priceRange.min)
    .filter("variants.price", "lte", priceRange.max);

  // Filtro por almacenamiento
  if (storages.length > 0) {
    query = query.filter("variants.storage", "in", storages);
  }

  // Paginación
  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return { data, count };
};
