import { Order } from "./types/Order.type";
import { Product } from "./types/Product";

let cart: Order[] = [];

export function getCart() {
  return cart;
}

export function addToCart(product: Product) {
  // check if that item already in the cart
  const orderIndex = cart.findIndex((order) => order.product.id === product.id);
  if (orderIndex !== -1) {
    cart[orderIndex].quantity++;
  } else {
    cart = [...cart, {
      product: product,
      quantity: 1,
    }]
  }
  console.log(cart);
}

export function removeFromCart(id: number) {
  cart = cart.filter((item) => item.product.id !== id);
}
