import { useOutletContext } from "react-router-dom";
import { Order } from "../types/Order.type";
import { Trash } from "lucide-react";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { totalOrder } from "../utils";

export default function Cart() {
  const [cart, setCart] = useOutletContext();

  function handleDeleteOrder(order: Order) {
    const newCart = cart.filter((o: Order) => o !== order);
    setCart(newCart);
  }
  function handleIncrease(order: Order) {
    const orderIndex = cart.findIndex((o: Order) => o == order);
    const newCart = [
      ...cart.slice(0, orderIndex),
      {
        ...order,
        quantity: order.quantity + 1,
      },
      ...cart.slice(orderIndex + 1),
    ];
    setCart(newCart);
  }

  function handleDecrease(order: Order) {
    const orderIndex = cart.findIndex((o: Order) => o == order);
    if (order.quantity > 1) {
      const newCart = [
        ...cart.slice(0, orderIndex),
        {
          ...order,
          quantity: order.quantity - 1,
        },
        ...cart.slice(orderIndex + 1),
      ];
      setCart(newCart);
    } else {
      handleDeleteOrder(order);
    }
  }

  return (
    <>
      <div id="order-list" className="min-h-screen bg-blue-50 p-12">
        <div className="py-8 text-center text-xl font-bold">
          Your Cart - {totalOrder(cart)} item{totalOrder(cart) === 1 ? "" : "s"}
        </div>
        <div
          id="table-header"
          className="grid grid-cols-5 border-b border-violet-400 p-4 py-4"
        >
          <h3>Item</h3>
          <h3>Price</h3>
          <h3>Quantity</h3>
          <h3>Total</h3>
        </div>
        <div id="table-body" className="flex flex-col gap-4 p-4">
          {cart.map((order: Order) => (
            <div className="grid grid-cols-5">
              <div className="flex rounded-md bg-white">
                <img
                  src={order.product.image}
                  alt={order.product.title}
                  className="aspect-square object-contain"
                />
              </div>
              <div>${order.product.price}</div>
              <div className="flex flex-row justify-between">
                <Minus onClick={() => handleDecrease(order)} />
                <span>{order.quantity}</span>
                <Plus onClick={() => handleIncrease(order)} />
              </div>
              <div>${order.quantity * order.product.price} </div>
              <div onClick={() => handleDeleteOrder(order)}>
                <Trash className="rounded-md hover:bg-violet-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="bill-preview"></div>
    </>
  );
}
