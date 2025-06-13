import { supabase } from "../../supabase/client";
import { PreparedProducts } from "../../interfaces/product.interface";

export const fetchPreparedProducts = async (): Promise<PreparedProducts[]> => {
  const { data, error } = await supabase.from("products").select(`
      id,
      name,
      brand,
      slug,
      features,
      description,
      images,
      created_at,
      variants (
        id,
        stock,
        price,
        storage,
        color,
        color_name
      )
    `);

  if (error) {
    throw new Error("Error al obtener productos: " + error.message);
  }

  if (!data) {
    throw new Error("No se encontraron productos");
  }

  const prepared: PreparedProducts[] = data.map((product: any) => {
    const variants = product.variants ?? [];

    // Mejor manejo del campo features
    let featuresParsed: Record<string, any> = {};
    if (product.features) {
      try {
        // Verificar si es un string no vacío
        if (
          typeof product.features === "string" &&
          product.features.trim() !== ""
        ) {
          const parsed = JSON.parse(product.features);
          // Asegurarnos que el resultado es un objeto
          featuresParsed =
            typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
        }
        // Si ya es un objeto, usarlo directamente
        else if (
          typeof product.features === "object" &&
          !Array.isArray(product.features)
        ) {
          featuresParsed = product.features;
        }
      } catch (err) {
        console.warn(
          `Error al analizar el campo 'features' para el producto ${product.id}:`,
          err
        );
        featuresParsed = {};
      }
    }

    // Extracción segura de colores
    const colors = variants
      .filter((v: any) => v.color_name && v.color)
      .map((v: any) => ({
        name: v.color_name,
        color: v.color,
      }));

    // Precio del primer variant o 0 por defecto
    const price = variants.length > 0 ? Number(variants[0].price) || 0 : 0;

    return {
      ...product,
      features: featuresParsed,
      colors,
      price,
      variants,
    };
  });

  return prepared;
};
