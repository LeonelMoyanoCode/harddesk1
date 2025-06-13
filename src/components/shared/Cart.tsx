import { useEffect, useRef, useState } from "react";
import { HiOutlineShoppingBag, HiTrash, HiCheck } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cart.store";
import toast from "react-hot-toast";
import { formatPrice } from "../../helpers";
import { CartItem } from "./CartItem";

export default function CartDropdown() {
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const cartItems = useCartStore((state) => state.items);
  const cleanCart = useCartStore((state) => state.cleanCart);
  const totalItemsInCart = useCartStore((state) => state.totalItemInCart);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    cleanCart();
    toast.success("Carrito vaciado");
    setShowCart(false);
  };

  const handleCheckout = () => {
    navigate("/checkout");
    setShowCart(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false);
      }
    };

    if (showCart) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCart]);

  return (
    <div className="relative z-50">
      {/* Botón del carrito */}
      <button onClick={() => setShowCart(true)} className="relative">
        <span className="absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full">
          {totalItemsInCart}
        </span>
        <HiOutlineShoppingBag size={30} />
      </button>

      {/* Drawer */}
      {showCart && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          <div
            ref={cartRef}
            className="fixed top-0 right-0 w-[90%] sm:w-[400px] h-full bg-white shadow-lg p-4 z-50 flex flex-col"
          >
            {/* Header del carrito */}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <div className="flex items-center gap-2">
                <HiOutlineShoppingBag size={24} />
                <h2 className="text-xl font-bold">
                  Productos ({totalItemsInCart})
                </h2>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-600 text-2xl hover:text-black"
                aria-label="Cerrar carrito"
              >
                &times;
              </button>
            </div>

            {/* Carrito vacío */}
            {cartItems.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-start pt-10">
                <p className="text-gray-500 text-lg font-semibold">
                  El carrito está vacío.
                </p>
                <button
                  onClick={() => {
                    navigate("/celulares");
                    setShowCart(false);
                  }}
                  className="bg-black text-white rounded-full p-4 hover:bg-gray-800 mt-20 flex items-center gap-2"
                >
                  <HiOutlineShoppingBag />
                  Empieza tu compra
                </button>
              </div>
            ) : (
              <>
                {/* Lista de productos usando CartItem */}
                <ul className="flex-1 overflow-y-auto space-y-4 pr-1">
                  {cartItems.map((item, index) => (
                    <CartItem
                      key={item.variantId}
                      item={item}
                      isLast={index === cartItems.length - 1}
                    />
                  ))}
                </ul>

                {/* Total y botones */}
                <div className="mt-4 border-t pt-4 flex flex-col gap-3 items-center">
                  <p className="w-full text-right text-lg font-semibold">
                    Total:{" "}
                    <span className="text-green-600">
                      {formatPrice(totalPrice)}
                    </span>
                  </p>

                  <button
                    onClick={handleClearCart}
                    className="bg-red-100 text-red-600 rounded-full p-2 hover:bg-red-200 font-medium flex items-center justify-center gap-2 w-48"
                  >
                    <HiTrash />
                    Vaciar carrito
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="bg-black text-white rounded-full p-2 hover:bg-gray-800 font-medium flex items-center justify-center gap-2 w-48"
                  >
                    <HiCheck />
                    Finalizar compra
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
