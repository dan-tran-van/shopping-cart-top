import { ShoppingCart } from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";
import { getCart } from "../data";
import { Order } from "../types/Order.type";
import { useState } from "react";

export async function loader() {
  const cart: Order[] = getCart();
  return { cart };
}
import { totalOrder } from "../utils";

export default function Root() {
  const [cart, setCart] = useState<Order[]>([]);

  return (
    <>
      <div id="navBar" className="bg-blue-50 px-4">
        <nav className="flex h-16 w-full flex-row items-center justify-around p-6">
          <ul className="flex flex-1 flex-row gap-3">
            <NavLink
              to={`/`}
              className={({ isActive, isPending }) =>
                isActive
                  ? "border-b-4 border-b-orange-300 hover:border-b-orange-500"
                  : isPending
                    ? "text-gray"
                    : "transition-all hover:border-b-4 hover:border-b-orange-100"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"shop"}
              className={({ isActive, isPending }) =>
                isActive
                  ? "border-b-4 border-b-orange-300 hover:border-b-orange-500"
                  : isPending
                    ? "text-gray"
                    : "transition-all hover:border-b-4 hover:border-b-orange-100"
              }
            >
              Shop
            </NavLink>
          </ul>
          <h1 className="text-center font-serif text-xl font-bold text-violet-600">
            Shopping cart
          </h1>
          <div id="cart" className="flex flex-1 flex-row justify-end">
            <NavLink
              to={"cart"}
              className="flex flex-row items-center gap-2 rounded-lg p-2 transition-all hover:bg-violet-300"
            >
              <ShoppingCart className="size-6" />
              <span id="cart-count">{totalOrder(cart)}</span>
            </NavLink>
          </div>
        </nav>
      </div>
      <div id="content">
        <Outlet context={[cart, setCart]} />
      </div>
      <div id="footer">
        <footer>footer</footer>
      </div>
    </>
  );
}
