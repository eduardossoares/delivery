"use client";

import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";

import AddCartOrCategoryButton from "@/components/AddItemOrCategoryButton";
import CreateCategoryModal from "@/components/CreateCategoryModal";
import EditCategoryModal from "@/components/EditCategoryModal";

import { useContext } from "react";
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

export default function Page() {
  const { closeModal, openModal, isRemoveItemModalOpen, openRemoveItemModal } =
    useContext(ModalContext);

  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isRemoveCategoryModalOpen, setIsRemoveCategoryModalOpen] =
    useState(false);

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
                <TableHead className="text-start max-sm:hidden">
                  Criado
                </TableHead>
                <TableHead className="text-start">Produtos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="cursor-pointer">
                <TableCell className="text-start">
                  <div className="flex items-center gap-x-1">
                    <div className="w-4 h-4 bg-orangePrimary"></div>
                    <p>Hambúrgueres</p>
                  </div>
                </TableCell>
                <TableCell className="text-start max-sm:hidden">
                  10/02/25
                </TableCell>
                <TableCell className="text-start">10</TableCell>
                <TableCell className="flex items-center justify-end gap-x-6 lg:gap-x-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
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
                          onClick={openRemoveCategoryModal}
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
        <EditCategoryModal closeModalFunction={closeEditModal} />
      )}

      {isRemoveCategoryModalOpen && (
        <RemoveItemModal notifyMessage="✔️ Categoria removida com sucesso!" />
      )}
    </div>
  );
}
