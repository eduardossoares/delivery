"use client";
import { useState, useContext } from "react";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { setupAPIClient } from "@/services/api";
import { ModalContext } from "@/contexts/ModalContext";

import Modal from "./Modal";
import Button from "./Button";

import { IoMdClose } from "react-icons/io";

import toast from "react-hot-toast";

interface EditCategoryModal {
  closeModalFunction: () => void;
  id: string;
}

const schema = z.object({
  newCategoryName: z.string().nonempty("O nome da categoria é obrigatória."),
});

type FormData = z.infer<typeof schema>;

export default function EditCategoryModal({
  closeModalFunction,
  id,
}: EditCategoryModal) {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { closeModal } = useContext(ModalContext);

  const [categoryName, setCategoryName] = useState("");

  const api = setupAPIClient();

  const editCategoryModal = async () => {
    try {
      await api.put(`/category/${id}`, {
        name: categoryName,
      });
      toast.success("Categoria atualizada com sucesso!");
      closeModalFunction();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar categoria!");
      closeModalFunction();
    }
  };

  return (
    <Modal>
      <div className="px-8 sm:px-4 py-8 sm:py-4">
        <IoMdClose
          onClick={closeModalFunction}
          className="absolute right-2 top-2 text-2xl cursor-pointer text-orangePrimary"
        />

        <div className="space-y-2">
          <h1 className="font-bold text-xl text-orangePrimary text-start">
            Editar Categoria
          </h1>

          <form
            className="w-full flex flex-col space-y-4"
            onSubmit={handleSubmit(editCategoryModal)}
          >
            <div className="flex flex-col text-start">
              <label className="text-zinc-400 font-medium" htmlFor="product">
                Novo nome:
              </label>
              <input
                id="product"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                  setValue("newCategoryName", e.target.value, {
                    shouldValidate: true,
                  });
                }}
                className="bg-grayPrimary border-2 border-zinc-200 rounded-md h-10 px-4
            placeholder:opacity-60 placeholder:font-light"
                type="text"
                placeholder="Ex: Bebidas"
              />
              {errors.newCategoryName && (
                <p className="text-sm text-red-500">
                  {errors.newCategoryName.message}
                </p>
              )}
            </div>

            <Button styles="bg-orangePrimary h-10 text-white">Editar</Button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
