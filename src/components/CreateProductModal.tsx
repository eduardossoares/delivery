"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";

import Modal from "./Modal";
import Button from "./Button";

import { IoMdClose } from "react-icons/io";
import { SlCloudUpload } from "react-icons/sl";
import { ChangeEvent, useEffect, useState } from "react";

import { setupAPIClient } from "@/services/api";
import toast from "react-hot-toast";

interface CreateProductModal {
  closeModalFunction: () => void;
}

type Category = {
  id: string;
  name: string;
  created_at: string;
};

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
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [productPic, setProductPic] = useState<any>();

  const [productPicUrl, setProductPicUrl] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const [categories, setCategories] = useState<Category[]>();
  const [productCategory, setProductCategory] = useState(0);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const img = e.target.files[0];
    if (!img) return;
    if (img.type === "image/jpeg" || img.type === "image/png") {
      setProductPic(img);
      setProductPicUrl(URL.createObjectURL(img));
    }
  };

  const api = setupAPIClient();

  useEffect(() => {
    const getCategories = async () => {
      await api
        .get("/category")
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getCategories();
  }, []);

  const createProductSubmit = async () => {
    if (!categories) return;
    const data = new FormData();
    data.append("name", productName);
    data.append("price", productPrice);
    data.append("description", productDescription);
    data.append("category_id", categories[productCategory].id);
    data.append("file", productPic);
    await api
      .post("/product", data)
      .then(() => toast.success("Produto cadastrado com sucesso!"))
      .catch(() => toast.error("Erro ao cadastrar produto."));
    closeModalFunction();
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

        <label
          className="w-full h-32 bg-grayPrimary flex items-center justify-center
          cursor-pointer border-zinc-200 border-2 rounded-md relative"
        >
          <SlCloudUpload size={32} className="text-zinc-400 z-50 absolute" />
          <input
            onChange={handleFile}
            type="file"
            className="hidden"
            id="input"
            accept="image/png, image/jpeg"
          />
          {productPicUrl && (
            <Image
              src={productPicUrl}
              alt="Foto do produto"
              width={1}
              height={1}
              className="object-cover w-[100%] h-[100%]"
            />
          )}
        </label>

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
              value={productName}
              className="bg-grayPrimary border-2 border-zinc-200 rounded-md h-10 px-4
            placeholder:opacity-60 placeholder:font-light"
              type="text"
              placeholder="Ex: Mega Smash"
              onChange={(e) => {
                setProductName(e.target.value);
                setValue("productName", e.target.value, {
                  shouldValidate: true,
                });
              }}
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
              value={productPrice}
              onChange={(e) => {
                setProductPrice(e.target.value);
                setValue("productPrice", e.target.value, {
                  shouldValidate: true,
                });
              }}
              id="price"
              className="bg-grayPrimary border-2 border-zinc-200 rounded-md h-10 px-4
                placeholder:opacity-60 placeholder:font-light"
              type="number"
              placeholder="Ex: 16.5"
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
              value={productDescription}
              onChange={(e) => {
                setProductDescription(e.target.value);
                setValue("productDescription", e.target.value, {
                  shouldValidate: true,
                });
              }}
              id="description"
              className="bg-grayPrimary border-2 border-zinc-200 rounded-md h-24 px-4 py-1
                placeholder:opacity-60 placeholder:font-light"
              placeholder="Ex: Hambúrguer duplo de carne e cheddar."
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
              onChange={(e) => {
                setProductCategory(Number(e.target.value));
              }}
              value={productCategory}
              name="category"
              id="category"
              className="bg-grayPrimary border-2 border-zinc-200 rounded-md h-10 px-4 py-1
            text-zinc-400"
            >
              {categories?.map((item, index) => (
                <option value={index} key={item.id}>
                  {item.name}
                </option>
              ))}
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
