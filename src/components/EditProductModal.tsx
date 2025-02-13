import Modal from "./Modal";
import { IoMdClose } from "react-icons/io";

import Button from "./Button";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditProductModalProps {
  closeModalFunction: () => void;
}

const schema = z.object({
  newProductName: z.string().nonempty("O nome do produto é obrigatória."),
  newPrice: z.string().nonempty("O preço do produto é obrigatório."),
  newDescription: z.string().nonempty("A descrição do produto é obrigatória."),
});

type FormData = z.infer<typeof schema>;

export default function EditProductModal({
  closeModalFunction,
}: EditProductModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const createCategoryModal = () => {
    alert("product edited");
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
            Editar Produto
          </h1>

          <form
            className="w-full flex flex-col space-y-4"
            onSubmit={handleSubmit(createCategoryModal)}
          >
            <div className="flex flex-col text-start">
              <label className="text-zinc-400 font-medium" htmlFor="product">
                Novo nome:
              </label>
              <input
                id="product"
                className="bg-grayPrimary border-2 border-zinc-200 rounded-md h-10 px-4
            placeholder:opacity-60 placeholder:font-light"
                type="text"
                placeholder="Ex: Mega Smash"
                {...register("newProductName")}
              />
              {errors.newProductName && (
                <p className="text-sm text-red-500">
                  {errors.newProductName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col text-start">
              <label className="text-zinc-400 font-medium" htmlFor="product">
                Novo preço:
              </label>
              <input
                id="price"
                className="bg-grayPrimary border-2 border-zinc-200 rounded-md h-10 px-4
            placeholder:opacity-60 placeholder:font-light"
                type="text"
                placeholder="Ex: 29.90"
                {...register("newPrice")}
              />
              {errors.newPrice && (
                <p className="text-sm text-red-500">
                  {errors.newPrice.message}
                </p>
              )}
            </div>

            <div className="flex flex-col text-start">
              <label
                className="text-zinc-400 font-medium"
                htmlFor="description"
              >
                Nova descrição:
              </label>
              <textarea
                id="description"
                className="bg-grayPrimary border-2 border-zinc-200 rounded-md h-24 px-4 py-1
                placeholder:opacity-60 placeholder:font-light"
                placeholder="Ex: Hambúrguer duplo de carne e cheddar."
                {...register("newDescription")}
              />
              {errors.newDescription && (
                <p className="text-sm text-red-500">
                  {errors.newDescription.message}
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
