import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { LuMinus, LuPlus } from "react-icons/lu";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsChatLeftText } from "react-icons/bs";
import { ToastContainer, toast, Slide } from "react-toastify";

import { Separator } from "../components/shared/Separator";
import { Tag } from "../components/shared/Tag";
import Loader from "../components/shared/Loader";
import { GridImages } from "../components/one-product/GridImages";
import { formatPrice } from "../helpers";
import { useProduct } from "../hooks/products/useProduct";
import { useCounterStore } from "../store/counter.store";
import { useCartStore } from "../store/cart.store";

import "react-toastify/dist/ReactToastify.css";
import { VariantProduct } from "../interfaces";

interface Acc {
  [key: string]: {
    name: string;
    storage: string[];
  };
}

export const CellPhonePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [currentSlug, setCurrentSlug] = useState(slug);
  const { product, isLoading, isError } = useProduct(currentSlug || "");
  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<VariantProduct | null>(
    null
  );

  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const addItem = useCartStore((state) => state.addItem);

  const features = useMemo(() => {
    if (!product?.features) return [];
    return product.features
      .replace(/" "/g, '","')
      .replace(/[{}"]/g, "")
      .split(",");
  }, [product?.features]);

  const colors = useMemo(() => {
    if (!product?.variants) return {};
    return product.variants.reduce((acc: Acc, variant: VariantProduct) => {
      const { color, color_name, storage } = variant;
      if (!acc[color]) {
        acc[color] = { name: color_name, storage: [] };
      }
      if (!acc[color].storage.includes(storage)) {
        acc[color].storage.push(storage);
      }
      return acc;
    }, {} as Acc);
  }, [product?.variants]);

  const availableColors = Object.keys(colors);

  useEffect(() => {
    if (!selectedColor && availableColors.length > 0) {
      setSelectedColor(availableColors[0]);
    }
  }, [availableColors, selectedColor]);

  useEffect(() => {
    if (selectedColor && colors[selectedColor] && !selectedStorage) {
      setSelectedStorage(colors[selectedColor].storage[0]);
    }
  }, [selectedColor, selectedStorage, colors]);

  useEffect(() => {
    if (selectedColor && selectedStorage) {
      const variant = product?.variants.find(
        (v) => v.color === selectedColor && v.storage === selectedStorage
      );
      setSelectedVariant(variant || null);
    }
  }, [selectedColor, selectedStorage, product?.variants]);

  const isOutOfStock = selectedVariant?.stock === 0;

  const addToCart = () => {
    if (!selectedVariant?.id) return;
    addItem({
      variantId: selectedVariant.id,
      productId: product?.id || "",
      name: product?.name || "",
      image: product?.images[0] || "",
      color: selectedVariant.color,
      colorName: selectedVariant.color_name,
      storage: selectedVariant.storage,
      price: selectedVariant.price,
      quantity: count,
    });
    toast.success("Producto añadido al carrito", { position: "bottom-right" });
  };

  const buyNow = () => {
    if (!selectedVariant) {
      toast.error("Por favor selecciona una variante del producto.", {
        position: "bottom-right",
      });
      return;
    }
    addToCart();
    navigate("/checkout");
  };
  //Resetear el slug actual cuando cambia en la URL
  useEffect(() => {
    setCurrentSlug(slug);

    //Reiniciar color
    setSelectedColor(null);
    setSelectedStorage(null);
    setSelectedVariant(null);
  }, [slug]);

  if (isLoading) return <Loader />;
  if (!product || isError)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p>Producto no encontrado</p>
      </div>
    );

  return (
    <div className="h-fit flex flex-col md:flex-row gap-16 mt-8">
      <GridImages images={product.images} />

      <div className="flex-1 space-y-5">
        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

        <div className="flex gap-5 items-center">
          <span className="tracking-wide text-lg font-semibold">
            {formatPrice(selectedVariant?.price || product.variants[0].price)}
          </span>
          {isOutOfStock && <Tag contentTag="agotado" />}
        </div>

        <Separator />

        <ul className="space-y-2 ml-7 my-10">
          {features.length ? (
            features.map((feature, index) => (
              <li
                key={index}
                className="text-sm flex items-center gap-2 tracking-tight font-medium"
              >
                <span className="bg-black w-[5px] h-[5px] rounded-full" />
                {feature}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500">
              No hay características disponibles
            </li>
          )}
        </ul>

        <div className="flex flex-col gap-3">
          <p>Color: {selectedColor && colors[selectedColor].name}</p>
          <div className="flex gap-3">
            {availableColors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedStorage(null); // Reiniciar storage al cambiar color
                }}
                className={`w-8 h-8 border-2 rounded-full flex justify-center items-center ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
              >
                <span
                  className="w-[24px] h-[24px] rounded-full"
                  style={{ backgroundColor: color }}
                />
              </button>
            ))}
          </div>
        </div>

        {selectedColor && (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium">Almacenamiento disponible</p>
            <select
              className="border border-gray-300 rounded-lg px-3 py-1"
              value={selectedStorage || ""}
              onChange={(e) => setSelectedStorage(e.target.value)}
            >
              {colors[selectedColor].storage.map((storage) => (
                <option key={storage} value={storage}>
                  {storage}
                </option>
              ))}
            </select>
          </div>
        )}

        {isOutOfStock ? (
          <button
            className="bg-gray-200 uppercase font-semibold tracking-widest text-xs py-4 rounded-full w-full"
            disabled
          >
            Agotado
          </button>
        ) : (
          <>
            <div className="space-y-3">
              <p className="text-sm font-medium">Cantidad:</p>
              <div className="flex gap-8 px-5 py-3 border border-slate-200 w-fit rounded-full">
                <button onClick={decrement} disabled={count === 1}>
                  <LuMinus size={15} />
                </button>
                <span className="text-slate-500 text-sm">{count}</span>
                <button onClick={increment}>
                  <LuPlus size={15} />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                className="bg-[#F3F3F3] uppercase font-semibold tracking-widest text-xs py-4 rounded-full"
                onClick={addToCart}
              >
                Agregar al carrito
              </button>
              <button
                className="bg-black text-white uppercase font-semibold tracking-widest text-xs py-4 rounded-full"
                onClick={buyNow}
              >
                Comprar ahora
              </button>
            </div>
          </>
        )}

        <div className="flex justify-center items-center w-full py-4">
          <div className="flex flex-col gap-1 items-center justify-center w-1/2">
            <CiDeliveryTruck size={30} />
            <p className="text-xs font-semibold">Envío gratis</p>
          </div>
          <Link
            to="#"
            className="flex flex-col gap-1 items-center justify-center w-1/2"
          >
            <BsChatLeftText size={30} />
            <p className="text-xs font-semibold">¿Necesitas ayuda?</p>
            <p className="text-xs font-semibold">Contáctanos aquí</p>
          </Link>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={1800}
        limit={3}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        transition={Slide}
        toastClassName="bg-white text-gray-800 shadow-lg rounded-lg border border-gray-200"
        progressClassName="bg-blue-500"
        hideProgressBar
        closeButton={false}
      />
    </div>
  );
};
