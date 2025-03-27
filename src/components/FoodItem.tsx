"use client";

import Image from "next/image";
import type { ProductItem } from "@/types/foodItem";

import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

interface FoodCardProps {
  item: ProductItem;
}

export default function FoodItem({ item }: FoodCardProps) {
  const { addItemToCart, removeItemFromCart, cartItems } =
    useContext(CartContext);

  const handleAddItemToCart = (itemId: string) => {
    if (!addItemToCart) return;
    addItemToCart(itemId);
  };

  const handleRemoveItemFromCart = (itemId: string) => {
    if (!removeItemFromCart) return;
    removeItemFromCart(itemId);
  };

  const handleGetItemAmount = (itemId: string) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (!item) return 0;
    return item.amount;
  };

  return (
    <div className="border-zinc-100 shadow border rounded-lg flex flex-row items-center p-2 gap-x-4
    w-full break-all">
      <div className="relative max-[320px]:w-40 max-[390px]:w-52 w-64 h-full xl:h-full">
        <Image
          src={`http://localhost:3333/files/${item.banner}`}
          alt={item.name}
          fill
          className="object-cover w-full h-full rounded-md"
        />
      </div>

      <div className="w-full max-sm:space-y-4">
        <h3 className="max-[320px]:text-sm text-lg font-bold text-gray-700 mb-1">{item.name}</h3>
        <p className="max-[320px]:h-14 text-xs h-16 sm:h-24 text-gray-600 mb-3 break-all w-full overflow-y-hidden">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="max-[320px]:text-sm text-lg font-bold text-orange-500">
            R$ {item.price},00
          </span>

          <div className="flex items-center gap-2 text-white font-bold">
            <button
              onClick={() => handleRemoveItemFromCart(item.id)}
              className="bg-orangePrimary px-2 rounded-full"
            >
              -
            </button>
            <span className="text-orangePrimary">
              {handleGetItemAmount(item.id)}
            </span>
            <button
              onClick={() => handleAddItemToCart(item.id)}
              className="bg-orangePrimary px-2 rounded-full"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
