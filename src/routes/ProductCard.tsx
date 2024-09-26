import { NavLink, useOutletContext } from "react-router-dom";
import { Product } from "../types/Product";
import { ShoppingBag } from "lucide-react";
import { Order } from "../types/Order.type";

// function action() {}

export function ProductCard({ product }: { product: Product }) {
  const [cart, setCart] = useOutletContext();

  function handleAddToCart(product: Product) {
    const order: Order = cart.find(
      (order: Order) => order.product.id === product.id,
    );

    if (order) {
      const orderIndex = cart.findIndex(
        (order: Order) => order.product.id === product.id,
      );
      setCart([
        ...cart.slice(0, orderIndex),
        {
          ...order,
          quantity: order.quantity + 1,
        },
        ...cart.slice(orderIndex + 1),
      ]);
    } else {
      setCart([
        ...cart,
        {
          product: product,
          quantity: 1,
        },
      ]);
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <NavLink to={`../product/${product.id}`} className="flex flex-col">
          <div className="flex rounded-md bg-white">
            <img
              src={product.image}
              alt={product.title}
              className="aspect-square max-w-full object-contain"
            />
          </div>
          <div className="text-sm text-gray-500">{product.title}</div>
          <div className="font-bold">${product.price}</div>
        </NavLink>

        <div
          onClick={() => {
            handleAddToCart(product);
          }}
          className="flex flex-row rounded-md hover:bg-violet-200"
        >
          <ShoppingBag />
          <span>Add to cart</span>
        </div>
      </div>
    </>
  );
}
