"use client";

import { createContext, ReactNode, useState } from "react";

import { ProductItem } from "@/types/foodItem";
import { CartItem } from "@/types/foodItem";

import { setupAPIClient } from "@/services/api";
import toast from "react-hot-toast";

interface CartContextData {
  cartItems: CartItem[];
  addItemToCart: (itemId: string) => void;
  removeItemFromCart?: (itemId: string) => void;
  resetCart: () => void;
}

export const CartContext = createContext({} as CartContextData);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const api = setupAPIClient();

  const addItemToCart = async (itemId: string) => {
    await api
      .get("/product")
      .then((response) => {
        const product = response.data.find(
          (product: ProductItem) => product.id === itemId
        );
        if (!product) return console.log("Product not found!");
        const productInCart = cartItems.find((item) => item.id === itemId);
        if (!productInCart) {
          return setCartItems([...cartItems, { ...product, amount: 1 }]);
        }
        setCartItems([
          ...cartItems.map((item) =>
            item.id === itemId ? { ...item, amount: item.amount + 1 } : item
          ),
        ]);
      })
      .catch((error) => console.log(error));
    toast.success("Produto adicionado ao carrinho!"); // Preciso ajustar a lógica
  };

  const removeItemFromCart = async (itemId: string) => {
    toast.success("Produto removido do carrinho!");
    const productInCart = cartItems.find((item) => item.id === itemId);
    if (!productInCart) return console.log("Product not found in cart!");
    if (productInCart.amount === 1) {
      return setCartItems([...cartItems.filter((item) => item.id !== itemId)]);
    }
    setCartItems([
      ...cartItems.map((item) =>
        item.id === itemId ? { ...item, amount: item.amount - 1 } : item
      ),
    ]);
  };

  const resetCart = async () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
