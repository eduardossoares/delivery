import { SlCloudUpload } from "react-icons/sl";
import Modal from "./Modal";
import { IoMdClose } from "react-icons/io";

import Button from "./Button";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface CreateProductModal {
  closeModalFunction: () => void;
}

const schema = z.object({
  productName: z.string().nonempty("O nome do produto é obrigatório."),
  productPrice: z.string().nonempty("O preço do produto é obrigatório."),
  productDescription: z
    .string()
    .nonempty("A descrição do produto é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export default function CreateProductModal({
  closeModalFunction,
}: CreateProductModal) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const createProductSubmit = () => {
    alert("product created");
  };

  return (
    <Modal>
      <IoMdClose
        onClick={closeModalFunction}
        className="absolute right-2 top-2 text-2xl cursor-pointer text-orangePrimary"
      />

      <div className="px-8 sm:px-4 py-8 sm:py-4 space-y-4">
        <h1 className="font-bold text-xl text-orangePrimary text-start">
          Cadastrar Produto
        </h1>

        <div
          className="w-full h-32 bg-grayPrimary flex items-center justify-center
          cursor-pointer border-zinc-200 border-2 rounded-md"
        >
          <SlCloudUpload size={32} className="text-zinc-400" />
        </div>

        <form
          className="w-full flex flex-col gap-y-4"
          onSubmit={handleSubmit(createProductSubmit)}
        >
          <div className="flex flex-col text-start">
            <label className="text-zinc-400 font-medium" htmlFor="product">
              Nome do produto:
            </label>
            <input
              id="product"
              className="bg-grayPrimary border-2 border-zinc-200 rounded-md h-10 px-4
            placeholder:opacity-60 placeholder:font-light"
              type="text"
              placeholder="Ex: Mega Smash"
              {...register("productName")}
            />
            {errors.productName && (
              <p className="text-sm text-red-500">
                {errors.productName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col text-start">
            <label className="text-zinc-400 font-medium" htmlFor="price">
              Preço do produto:
            </label>
            <input
              id="price"
              className="bg-grayPrimary border-2 border-zinc-200 rounded-md h-10 px-4
                placeholder:opacity-60 placeholder:font-light"
              type="number"
              placeholder="Ex: 16.5"
              {...register("productPrice")}
            />
            {errors.productPrice && (
              <p className="text-sm text-red-500">
                {errors.productPrice.message}
              </p>
            )}
          </div>

          <div className="flex flex-col text-start">
            <label className="text-zinc-400 font-medium" htmlFor="description">
              Descrição do produto:
            </label>
            <textarea
              id="description"
              className="bg-grayPrimary border-2 border-zinc-200 rounded-md h-24 px-4 py-1
                placeholder:opacity-60 placeholder:font-light"
              placeholder="Ex: Hambúrguer duplo de carne e cheddar."
              {...register("productDescription")}
            />
            {errors.productDescription && (
              <p className="text-sm text-red-500">
                {errors.productDescription.message}
              </p>
            )}
          </div>

          <div className="flex flex-col text-start">
            <label className="text-zinc-400 font-medium" htmlFor="category">
              Categoria do produto:
            </label>
            <select
              name="category"
              id="category"
              className="bg-grayPrimary border-2 border-zinc-200 rounded-md h-10 px-4 py-1
            text-zinc-400"
            >
              <option>Hambúrgueres</option>
            </select>
          </div>
          <Button styles="bg-orangePrimary h-10 text-white mt-4">
            Cadastrar
          </Button>
        </form>
      </div>
    </Modal>
  );
}
