import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { VariantProduct } from "../../interfaces";
import { formatPrice } from "../../helpers";
import { Tag } from "../shared/Tag";
import { useCartStore } from "../../store/cart.store";
import toast from "react-hot-toast";

interface Props {
  img: string;
  name: string;
  price: number;
  slug: string;
  colors: { name: string; color: string }[];
  variants: VariantProduct[];
}

export const CardProduct = ({
  img,
  name,
  price,
  slug,
  colors,
  variants,
}: Props) => {
  const defaultColor =
    colors.length > 0 ? colors[0] : { name: "default", color: "#000000" };
  const [activeColor, setActiveColor] = useState(defaultColor);

  const selectedVariant = variants.find(
    (variant) => variant.color === activeColor.color
  );

  const stock = selectedVariant?.stock ?? 0;
  const displayPrice = selectedVariant?.price ?? price;

  const addItem = useCartStore((state) => state.addItem);

  const handleAddclick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (selectedVariant && selectedVariant.stock > 0) {
      addItem({
        variantId: selectedVariant.id,
        productId: slug,
        name,
        image: img,
        color: activeColor.color,
        colorName: activeColor.name,
        storage: selectedVariant.storage,
        price: selectedVariant.price,
        quantity: 1,
      });
      toast.success("Producto añadido al carrito", {
        position: "bottom-right",
      });
    } else {
      toast.error("Producto agotado", {
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 relative z-0">
      {/* Imagen y link */}
      <Link
        to={`/celulares/${slug}`}
        className="flex relative group overflow-hidden"
      >
        <div className="flex h-[350px] w-full items-center justify-center py-2 lg:h-[250px]">
          <img src={img} alt={name} className="object-contain h-full w-full" />
        </div>
      </Link>

      {/* Botón fuera del Link */}
      <button
        onClick={handleAddclick}
        className={`bg-white border border-slate-200 w-full py-3 rounded-3xl flex items-center justify-center gap-1 text-sm font-medium 
          hover:bg-stone-100 transition-all duration-300 ${stock === 0 ? "cursor-not-allowed" : ""}`}
        disabled={stock === 0}
      >
        <FiPlus />
        {stock > 0 ? "Añadir" : "Agotado"}
      </button>

      {/* Información del producto */}
      <div className="flex flex-col gap-1 items-center">
        <p className="text-[15px] font-medium">{name}</p>
        <p className="text-[15px] font-medium">{formatPrice(displayPrice)}</p>

        {/* Selección de colores */}
        <div className="flex gap-3">
          {colors.map((color, index) => (
            <span
              key={`${color.color}-${slug}-${index}`}
              className={`grid place-items-center w-5 h-5 rounded-full cursor-pointer ${
                activeColor.color === color.color ? "border border-black" : ""
              }`}
              onClick={() => setActiveColor(color)}
            >
              <span
                className="w-[14px] h-[14px] rounded-full"
                style={{ backgroundColor: color.color }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Etiqueta de "Agotado" */}
      {stock === 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white py-1 px-2 rounded-full text-xs font-bold">
          <Tag contentTag="agotado" />
        </div>
      )}
    </div>
  );
};
