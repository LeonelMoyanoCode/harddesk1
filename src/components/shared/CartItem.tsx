import { LuMinus, LuPlus } from "react-icons/lu";
import { formatPrice } from "../../helpers";
import { useCartStore } from "../../store/cart.store";

export interface ICartItem {
  variantId: string;
  productId: string;
  name: string;
  color: string;
  colorName: string;
  storage: string;
  price: number;
  quantity: number;
  image: string;
}

interface Props {
  item: ICartItem;
  isLast?: boolean;
}

export const CartItem = ({ item, isLast }: Props) => {
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleIncrement = () => {
    addItem({ ...item, quantity: 1 });
  };

  const handleDecrement = () => {
    if (item.quantity === 1) {
      removeItem(item.variantId);
    } else {
      updateQuantity(item.variantId, item.quantity - 1);
    }
  };

  return (
    <li
      className={`flex gap-4 border-b pb-4 items-center ${
        isLast ? "" : "mb-4"
      }`}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-contain rounded"
      />
      <div className="flex-1 text-sm">
        <p className="font-semibold">{item.name}</p>
        <p className="text-gray-500 text-xs mt-1">
          Color: <span className="capitalize">{item.colorName}</span> /
          Almacenamiento: {item.storage}
        </p>
        <p className="text-gray-800 font-medium mt-2">
          {formatPrice(item.price * item.quantity)}
        </p>
        <div className="flex justify-start mt-4 h-7">
          <div className="flex items-center justify-between w-20 bg-gray-100 rounded-full px-2 py-1">
            <button
              onClick={handleDecrement}
              className="text-lg font-bold text-gray-600 hover:text-black rounded-full w-7 h-7 flex items-center justify-center"
              aria-label={`Disminuir cantidad de ${item.name}`}
            >
              <LuMinus size={15} />
            </button>
            <span className="text-sm font-medium">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className="text-lg font-bold text-gray-600 hover:text-black rounded-full w-7 h-7 flex items-center justify-center"
              aria-label={`Aumentar cantidad de ${item.name}`}
            >
              <LuPlus size={15} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
