"use client";

import { useState } from "react";

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

export default function Page() {
  const { closeModal, openModal, openRemoveItemModal, isRemoveItemModalOpen } =
    useContext(ModalContext);

  const [isCreateNewProductModalOpen, setIsCreateNewProductModalOpen] =
    useState(false);

  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

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
            <Table>
              <TableCaption>Sua lista de Hambúrgueres.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-start">Produto</TableHead>
                  <TableHead className="text-start max-sm:hidden">
                    Criado
                  </TableHead>
                  <TableHead className="text-start">Preço</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="cursor-pointer">
                  <TableCell className="text-start">
                    <div className="flex items-center gap-x-1">
                      <div className="w-4 h-4 bg-orangePrimary"></div>
                      <p className="truncate w-12 sm:w-auto">Mega Smash</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-start max-sm:hidden">
                    10/02/25
                  </TableCell>
                  <TableCell className="text-start">R$29,99</TableCell>
                  <TableCell className="flex items-center justify-end gap-x-6 lg:gap-x-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <AiFillEdit
                            onClick={openEditProductModal}
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
                            onClick={openRemoveModal}
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
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <AddCartOrCategoryButton onClick={openCreateProductModal}>
        Novo Produto
      </AddCartOrCategoryButton>

      {isCreateNewProductModalOpen && (
        <CreateProductModal closeModalFunction={closeCreateProductModal} />
      )}

      {isRemoveItemModalOpen && <RemoveItemModal notifyMessage="✔️ Produto removido com sucesso!" />}

      {isEditProductModalOpen && (
        <EditProductModal closeModalFunction={closeEditProductModal} />
      )}
    </div>
  );
}
