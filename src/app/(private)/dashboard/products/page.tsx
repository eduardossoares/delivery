"use client";

import { useEffect, useState } from "react";

import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";

import EditProductModal from "@/components/EditProductModal";
import RemoveItemModal from "@/components/RemoveItemModal";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

import AddCartOrCategoryButton from "@/components/AddItemOrCategoryButton";
import CreateProductModal from "@/components/CreateProductModal";
import { setupAPIClient } from "@/services/api";
import Image from "next/image";

import type { ProductItem } from "@/types/foodItem";
import type { Category } from "@/types/category";


export default function Page() {
  const { closeModal, openModal, openRemoveItemModal, isRemoveItemModalOpen } =
    useContext(ModalContext);

  const [isCreateNewProductModalOpen, setIsCreateNewProductModalOpen] =
    useState(false);

  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>();
  const [products, setProducts] = useState<ProductItem[]>([]);

  const [getProductId, setGetProductId] = useState("");

  const api = setupAPIClient();

  useEffect(() => {
    const getCategories = async () => {
      await api
        .get("/category")
        .then((response) => setCategories(response.data))
        .catch((error) => console.log(error));
    };
    getCategories();
    const getProducts = async () => {
      await api
        .get("/product")
        .then((response) => setProducts(response.data))
        .catch((error) => console.log(error));
    };
    getProducts();
  }, [products]);

  const openCreateProductModal = () => {
    openModal();
    setIsCreateNewProductModalOpen(true);
  };

  const closeCreateProductModal = () => {
    closeModal();
    setTimeout(() => setIsCreateNewProductModalOpen(false), 400);
  };

  const openRemoveModal = () => {
    openModal();
    openRemoveItemModal();
  };

  const openEditProductModal = () => {
    openModal();
    setIsEditProductModalOpen(true);
  };

  const closeEditProductModal = () => {
    closeModal();
    setIsEditProductModalOpen(false);
  };

  const formatCurrency = (value: number) => {
    const valueToFormat = Number(value);
    return valueToFormat.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full 
    py-12 gap-y-8 lg:justify-normal lg:text-center"
    >
      <h1 className="text-orangePrimary text-2xl font-bold">
        Gerenciar Produtos
      </h1>

      <div className="w-full px-4 lg:px-24 flex flex-col items-center justify-center gap-y-4">
        <div className="w-full">
          <div>
            <div className="flex-row items-center gap-x-4 hidden">
              <div className="flex-1 h-0.5 bg-zinc-400"></div>
              <h1 className="text-center font-bold text-zinc-400">
                Hambúrgueres
              </h1>
              <div className="flex-1 h-0.5 bg-zinc-400"></div>
            </div>

            <div className="space-y-20">
              {categories?.map((category) => (
                <div className="space-y-4" key={category.id}>
                  <h1 className="text-start font-bold text-xl text-orangePrimary">
                    {category.name}
                  </h1>
                  <Table>
                    <TableCaption>Sua lista de {category.name}.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-start w-[33%]">Produto</TableHead>
                        <TableHead className="text-start w-[33%]">Preço</TableHead>
                        <TableHead className="text-right w-[33%]">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products?.map((product) => {
                        if (product.category_id === category.id) {
                          return (
                            <TableRow
                              key={product.id}
                              className="cursor-pointer"
                            >
                              <TableCell className="text-start">
                                <div className="flex items-center gap-x-2">
                                  <Image
                                    width={32}
                                    height={32}
                                    className="rounded-full w-6 h-6"
                                    alt="Hi"
                                    src={`https://api-delivery-three.vercel.app/api/files/${product.banner}`}
                                  />
                                  <p className="truncate w-12 sm:w-auto">
                                    {product.name}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="text-start">
                                {formatCurrency(Number(product.price))}
                              </TableCell>
                              <TableCell className="flex items-center justify-end gap-x-6 lg:gap-x-3">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <AiFillEdit
                                        onClick={() => {
                                          openEditProductModal();
                                          setGetProductId(product.id);
                                        }}
                                        className="text-orangePrimary"
                                        size={20}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Editar Categoria</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <FaTrashAlt
                                        onClick={() => {
                                          openRemoveModal();
                                          setGetProductId(product.id);
                                        }}
                                        className="text-orangePrimary"
                                        size={15}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Remover Produto</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddCartOrCategoryButton onClick={openCreateProductModal}>
        Novo Produto
      </AddCartOrCategoryButton>

      {isCreateNewProductModalOpen && (
        <CreateProductModal closeModalFunction={closeCreateProductModal} />
      )}

      {isRemoveItemModalOpen && (
        <RemoveItemModal isProduct={true} productId={getProductId} />
      )}

      {isEditProductModalOpen && (
        <EditProductModal
          productId={getProductId}
          closeModalFunction={closeEditProductModal}
        />
      )}
    </div>
  );
}
