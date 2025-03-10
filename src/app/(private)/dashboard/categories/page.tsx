"use client";

import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

import AddCartOrCategoryButton from "@/components/AddItemOrCategoryButton";
import CreateCategoryModal from "@/components/CreateCategoryModal";
import EditCategoryModal from "@/components/EditCategoryModal";

import { useContext, useEffect } from "react";
import { ModalContext } from "@/contexts/ModalContext";

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
import { useState } from "react";
import { setTimeout } from "timers";
import RemoveItemModal from "@/components/RemoveItemModal";

import { setupAPIClient } from "@/services/api";
import { Stringifier } from "postcss";

type Category = {
  id: string;
  name: string;
  products: number;
  created_at: string;
};

export default function Page() {
  const { closeModal, openModal } = useContext(ModalContext);

  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isRemoveCategoryModalOpen, setIsRemoveCategoryModalOpen] =
    useState(false);

  const [categories, setCategories] = useState<Category[]>();
  const [getCategoryId, setGetCategoryId] = useState("");

  const api = setupAPIClient();

  useEffect(() => {
    api
      .get("/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categories]);

  const openCreateCategoryModal = () => {
    setIsRemoveCategoryModalOpen(false);
    openModal();
    setIsCreateCategoryModalOpen(true);
  };

  const closeCreateCategoryModal = () => {
    closeModal();
    setTimeout(() => setIsCreateCategoryModalOpen(false), 400);
  };

  const openEditModal = () => {
    setIsRemoveCategoryModalOpen(false);
    openModal();
    setIsEditCategoryModalOpen(true);
  };

  const closeEditModal = () => {
    closeModal();
    setTimeout(() => setIsEditCategoryModalOpen(false), 400);
  };

  const openRemoveCategoryModal = () => {
    openModal();
    setIsRemoveCategoryModalOpen(true);
  };

  const formateDate = (dateToFormat: string) => {
    const date = new Date(dateToFormat);
    return date.toLocaleString("pt--BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  }

  return (
    <div
      className="flex flex-col justify-center items-center w-full 
    py-12 gap-y-8 lg:justify-normal lg:text-center"
    >
      <h1 className="text-orangePrimary text-2xl font-bold">
        Gerenciar Categorias
      </h1>

      <div className="w-full px-4 lg:px-24 flex flex-col items-center justify-center gap-y-4">
        <div className="w-full">
          <Table>
            <TableCaption>
              Para remover uma categoria, ela precisa estar sem nenhum produto
              cadastrado.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">Categoria</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.map((item) => (
                <TableRow key={item.id} className="cursor-pointer">
                  <TableCell className="text-start">
                    <div className="flex items-center gap-x-1">
                      <div className="w-4 h-4 bg-orangePrimary rounded-full hidden"></div>
                      <p>{item.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="flex items-center justify-end gap-x-6 lg:gap-x-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                        onClick={() => setGetCategoryId(item.id)}>
                          <AiFillEdit
                            onClick={openEditModal}
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
                              setGetCategoryId(item.id);
                              openRemoveCategoryModal();
                            }}
                            className="text-orangePrimary"
                            size={15}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remover Categoria</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddCartOrCategoryButton onClick={openCreateCategoryModal}>
        Nova Categoria
      </AddCartOrCategoryButton>

      {isCreateCategoryModalOpen && (
        <CreateCategoryModal closeModalFunction={closeCreateCategoryModal} />
      )}

      {isEditCategoryModalOpen && (
        <EditCategoryModal id={getCategoryId} closeModalFunction={closeEditModal} />
      )}

      {isRemoveCategoryModalOpen && (
        <RemoveItemModal
          isCategory={true}
          categoryId={getCategoryId}
        />
      )}
    </div>
  );
}
