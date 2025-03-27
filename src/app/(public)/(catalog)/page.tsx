"use client";
import { useEffect, useState } from "react";

import Header from "@/components/Header";
import Banner from "@/components/Banner/Banner";
import FoodItem from "@/components/FoodItem";

import type { ProductItem } from "@/types/foodItem";
import type { Category } from "@/types/category";

import { setupAPIClient } from "@/services/api";

import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";

import CartModal from "@/components/CartModal";

export default function Catalog() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);

  const api = setupAPIClient();

  const { isCartModalOpen } = useContext(ModalContext);

  useEffect(() => {
    const getCategories = async () => {
      await api
        .get("/category")
        .then((response) => {
          console.log("Categories:", response.data); // Debug
          setCategories(response.data);
        })
        .catch((error) => console.log(error));
    };
    getCategories();

    const getProducts = async () => {
      await api
        .get("/product")
        .then((response) => {
          console.log("Products:", response.data); // Debug
          setProducts(response.data);
        })
        .catch((error) => console.log(error));
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (isCartModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
    };
  }, [isCartModalOpen]);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12 h-full">
      <Header />
      <Banner />
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-orangePrimary mt-4">
          Explore nosso cardápio!
        </h1>

        <div className="space-y-12">
          {categories.map((categoryItem) => (
            <div key={categoryItem.id} className="space-y-2">
              <h2 className="font-bold text-xl text-orangePrimary">
                {categoryItem.name}
              </h2>
              <div className="grid gap-4 grid-row-1 md:grid-cols-2 lg:grid-cols-3">
                {products
                  .filter((product) => {
                    return product.category_id === categoryItem.id;
                  })
                  .map((item) => (
                    <FoodItem key={item.id} item={item} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isCartModalOpen && <CartModal />}
    </div>
  );
}
