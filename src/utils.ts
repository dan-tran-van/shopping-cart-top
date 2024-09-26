import { Order } from "./types/Order.type";

export function totalOrder(cart: Order[]) {
  let total = 0;
  for (const order of cart) {
    total += order.quantity;
  }
  return total;
}