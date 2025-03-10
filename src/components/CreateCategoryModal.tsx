import React, { useState } from "react";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { setupAPIClient } from "@/services/api";

import { SlCloudUpload } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";

import Modal from "./Modal";
import Button from "./Button";

import toast from "react-hot-toast";

interface CreateCategoryModal {
  closeModalFunction: () => void;
}

const schema = z.object({
  categoryName: z.string().nonempty("O nome da categoria é obrigatória."),
});

type FormData = z.infer<typeof schema>;

export default function CreateCategoryModal({
  closeModalFunction,
}: CreateCategoryModal) {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [categoryName, setCategoryName] = useState("");

  const api = setupAPIClient();

  const createCategory = async () => {
    try {
      await api.post("/category", {
        name: categoryName
      });
      setCategoryName("");
      closeModalFunction();
      toast.success("Categoria criada com sucesso!");
    } catch(error) {
      return console.log(error);
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
            Cadastrar Categoria
          </h1>

          <div
            className="w-full h-32 bg-grayPrimary flex items-center justify-center
          cursor-pointer border-zinc-200 border-2 rounded-md"
          >
            <SlCloudUpload size={32} className="text-zinc-400" />
          </div>

          <form
            className="w-full flex flex-col"
            onSubmit={handleSubmit(createCategory)}
          >
            <div className="flex flex-col text-start">
              <label className="text-zinc-400 font-medium" htmlFor="product">
                Nome da categoria:
              </label>
              <input
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                  setValue("categoryName", e.target.value, {
                    shouldValidate: true,
                  });
                }}
                id="product"
                className="bg-grayPrimary border-2 border-zinc-200 rounded-md h-10 px-4
                placeholder:opacity-60 placeholder:font-light"
                type="text"
                placeholder="Ex: Mega Smash"
              />
              {errors.categoryName && (
                <p className="text-sm text-red-500">
                  {errors.categoryName.message}
                </p>
              )}
            </div>

            <Button styles="bg-orangePrimary h-10 text-white mt-4">
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
