import Modal from "./Modal";

import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";

import { IoMdClose } from "react-icons/io";

import { CartContext } from "@/contexts/CartContext";
import Button from "./Button";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";
import { setupAPIClient } from "@/services/api";
import toast from "react-hot-toast";

const closeOrderSchema = z.object({
  name: z.string().nonempty("Digite seu nome corretamente!"),
  phone: z
    .string()
    .nonempty("Digite seu telefone corretamente!")
    .regex(/^\d{11}$/, "Telefone inválido! Deve conter 11 dígitos."),
  street_adress: z.string(),
  number_adress: z.coerce
    .number({
      invalid_type_error: "O número do endereço deve ser um valor numérico!",
    })
    .positive("O número do endereço deve ser maior que zero!")
    .int("O número do endereço deve ser um valor inteiro!"),
  payment_type: z.enum(["Pix", "Dinheiro", "Cartão"], {
    required_error: "Selecione um método de pagamento.",
  }),
  reference_adress: z.string().optional(),
  note: z.string().optional(),
});

type FormData = z.infer<typeof closeOrderSchema>;

export default function CartModal() {
  const { closeModal } = useContext(ModalContext);
  const { addItemToCart, removeItemFromCart, cartItems, resetCart } =
    useContext(CartContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(closeOrderSchema),
  });

  const api = setupAPIClient();

  const handleCloseModal = () => {
    closeModal();
  };

  const handleAddItemToCart = (itemId: string) => {
    if (!addItemToCart) return;
    addItemToCart(itemId);
  };

  const handleRemoveItemFromCart = (itemId: string) => {
    if (!removeItemFromCart) return;
    removeItemFromCart(itemId);
  };

  const handleFormatSubtotalCurrency = (price: number, amount?: number) => {
    if (price && amount) {
      let subtotal = price * amount;
      return subtotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleGetTotal = () => {
    let totalValue = 0;
    cartItems.forEach((item) => {
      let itemValue = item.price;
      let itemAmount = item.amount;
      let subtotal = Number(itemValue) * itemAmount;

      totalValue += subtotal;
    });
    return totalValue;
  };
  const total = handleGetTotal();

  const handleCloseOrder = async (order: FormData) => {
    const orderData = {
      name: order.name,
      phone: order.phone,
      street_adress: order.street_adress,
      number_adress: order.number_adress.toString(), // Converte para string
      payment_type: order.payment_type,
      reference_adress: order.reference_adress || undefined,
      note: order.note || undefined,
    };

    try {
      const response = await api.post("/order", orderData);
      const orderId = response.data.id;
      try {
        const items = cartItems.length;
        for (let i = 0; i < items; i++) {
          let amount = cartItems[i].amount;
          let productId = cartItems[i].id;
          for (let j = 0; j < amount; j++) {
            await api.post(`/order/${orderId}/item`, {
              product_id: productId,
            });
          }
        }
        try {
          await api.patch(`/order/draft/${orderId}`);
          resetCart();
          handleCloseModal();
          toast.success("Seu pedido foi enviado!");
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isCartModal={true}>
      <div className="pt-8 flex items-center justify-center px-4 min-[330px]:px-8 flex-col">
        <IoMdClose
          onClick={handleCloseModal}
          className="absolute right-2 top-2 text-2xl cursor-pointer text-orangePrimary
        "
        />

        {cartItems.length === 0 ? (
          <div className="w-full text-center space-y-4">
            <p className="font-medium text-zinc-500">
              Seu carrinho está vazio...
            </p>
            <Button
              onClick={handleCloseModal}
              styles="text-center mx-auto text-white bg-orangePrimary w-full py-2"
            >
              Voltar ao menu
            </Button>
          </div>
        ) : (
          <div
            className="w-full lg:flex lg:flex-row lg:gap-x-16 space-y-8
          lg:py-0 lg:space-y-0"
          >
            <div className="w-full space-y-2 pb-8">
              <h2 className="text-start font-bold text-orangePrimary text-lg">
                Seu carrinho
              </h2>
              <Table className="bg-zinc-100 rounded-md max-sm:text-xs">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-start w-[33%]">
                      Produto
                    </TableHead>
                    <TableHead className="text-start w-[33%]">
                      Subtotal
                    </TableHead>
                    <TableHead className="text-right w-[33%]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <p className="w-12 sm:w-auto">{item.name}</p>
                      </TableCell>
                      <TableCell>
                        <p className="w-12 sm:w-auto">
                          {handleFormatSubtotalCurrency(
                            Number(item.price),
                            Number(item.amount)
                          )}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-white font-bold justify-end">
                          <button
                            onClick={() => handleRemoveItemFromCart(item.id)}
                            className="bg-zinc-300 px-2 rounded-md"
                          >
                            -
                          </button>
                          <span className="text-zinc-400">{item.amount}</span>
                          <button
                            onClick={() => handleAddItemToCart(item.id)}
                            className="bg-zinc-300 px-2 rounded-md"
                          >
                            +
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="w-full space-y-2 pb-8">
              <h2 className="text-start font-bold text-orangePrimary text-lg">
                Suas Informações
              </h2>
              <form
                onSubmit={handleSubmit(handleCloseOrder)}
                className="space-y-4"
              >
                <div className="flex flex-col">
                  <label className="text-zinc-400 text-sm" htmlFor="">
                    Seu nome*
                  </label>
                  <input
                    {...register("name")}
                    className="bg-grayPrimary border border-zinc-200 py-1 px-4 rounded-sm text-zinc-400
                placeholder:text-sm placeholder:opacity-50"
                    type="text"
                    placeholder="Ex: Eduardo Soares"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors?.name?.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-zinc-400 text-sm" htmlFor="">
                    Seu telefone*
                  </label>
                  <input
                    {...register("phone")}
                    className="bg-grayPrimary border border-zinc-200 py-1 px-4 rounded-sm text-zinc-400
                placeholder:text-sm placeholder:opacity-50"
                    type="text"
                    placeholder="Ex: 51985376531"
                  />
                  {errors?.phone && (
                    <span className="text-red-500 text-sm">
                      {errors?.phone?.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap sm:flex-row max-sm:gap-y-1 sm:gap-x-2 sm:gap-y-1 items-end">
                  <div className="flex flex-col w-full sm:flex-1">
                    <label className="text-zinc-400 text-sm">
                      Seu endereço*
                    </label>
                    <input
                      {...register("street_adress")}
                      className="bg-grayPrimary border border-zinc-200 py-1 px-4 rounded-sm text-zinc-400
                      placeholder:text-sm placeholder:opacity-50"
                      type="text"
                      placeholder="Ex: Bairro Costa, Rua Ribeiro"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-row max-sm:gap-y-1 sm:gap-x-2 sm:gap-y-1 items-end">
                  <div className="flex flex-col w-full">
                    <label className="text-zinc-400 text-sm">
                      Número da Residência*
                    </label>
                    <input
                      {...register("number_adress")}
                      className="bg-grayPrimary border border-zinc-200 py-1 px-4 rounded-sm text-zinc-400
                      placeholder:text-sm placeholder:opacity-50"
                      type="number"
                      min={1}
                      placeholder="Ex: 365..."
                    />
                  </div>
                  {errors.number_adress && (
                    <span className="text-red-500 text-sm">
                      {errors?.number_adress?.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-x-2 w-full">
                  <label className="text-zinc-400 text-sm" htmlFor="">
                    Referência
                    <span className="ml-0.5 text-xs text-zinc-3000">
                      {"(opcional)"}
                    </span>
                  </label>
                  <input
                    {...register("reference_adress")}
                    className="bg-grayPrimary border border-zinc-200 py-1 px-4 rounded-sm text-zinc-400
                      placeholder:text-sm placeholder:opacity-50 w-[100%]"
                    type="text"
                    placeholder="Ex: Casa azul do portão verde..."
                  />
                  {errors.reference_adress && (
                    <span className="text-red-500 text-sm">
                      {errors?.reference_adress?.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-zinc-400 text-sm" htmlFor="">
                    Sua forma de pagamento*
                  </label>
                  <Controller
                    name="payment_type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className="bg-grayPrimary border border-zinc-200 py-1 px-4 rounded-sm text-zinc-400
                placeholder:text-sm placeholder:opacity-50"
                        >
                          <SelectValue placeholder="-" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pix">Pix</SelectItem>
                          <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                          <SelectItem value="Cartão">Cartão</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.payment_type && (
                    <span className="text-red-500 text-sm">
                      {errors.payment_type.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="text-zinc-400 text-sm" htmlFor="">
                    Anotações do pedido
                    <span className="ml-0.5 text-xs text-zinc-3000">
                      {"(opcional)"}
                    </span>
                  </label>
                  <textarea
                    {...register("note")}
                    placeholder="Ex: Hambúrguer Duplo sem cebola."
                    className="bg-grayPrimary border border-zinc-200 py-3 px-4 rounded-sm text-zinc-400
                placeholder:text-sm placeholder:opacity-50 h-32"
                  />
                  {errors?.note && (
                    <span className="text-red-500 text-sm">
                      {errors?.note?.message}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="">
                    Total do Pedido: {handleFormatSubtotalCurrency(total)}
                  </span>
                  <Button styles="w-full bg-greenPrimary py-2 text-white">
                    Finalizar Pedido
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
