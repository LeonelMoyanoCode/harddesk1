// helpers/prepareProducts.ts
import { Product, PreparedProducts } from "../interfaces/product.interface"; // Ajusta la ruta según tu estructura de archivos
// helpers/index.ts
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const prepareProducts = (products: Product[]): PreparedProducts[] => {
  return products.map((product) => {
    const colors = product.variants.reduce(
      (acc, variant) => {
        const colorExists = acc.some(
          (color) =>
            color.name === variant.color_name && color.color === variant.color
        );
        if (!colorExists) {
          acc.push({ name: variant.color_name, color: variant.color });
        }
        return acc;
      },
      [] as { name: string; color: string }[]
    );

    const minPrice = Math.min(
      ...product.variants.map((variant) => variant.price)
    );

    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      slug: product.slug,
      features: Array.isArray(product.features)
        ? product.features
        : product.features
          ? [product.features]
          : [],
      description: product.description,
      images: product.images,
      created_at: product.created_at,
      price: minPrice,
      colors,
      variants: product.variants,
    };
  });
};
