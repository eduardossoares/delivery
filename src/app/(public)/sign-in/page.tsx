"use client";

import Image from "next/image";
import logoImg from "@/../public/logo.svg";
import illustration from "@/../public/illustration.svg";

import Button from "@/components/Button";
import LoginInputLabel from "@/components/LoginInputLabel";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

const schema = z.object({
  email: z
    .string()
    .nonempty("O campo 'Email' está vazio.")
    .email("Insira um email válido."),
  password: z.string().nonempty("O campo 'Senha' está vazio."),
});

type FormData = z.infer<typeof schema>;

export default function SignIn() {
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isWarningLoginMessageVisible, setIsWarningLoginMessageVisible] =
    useState(false);

  const signInSubmit = async (data: FormData) => {
    try {
      setIsButtonLoading(true);
      await signIn({ email: data.email, password: data.password });
    } catch {
      setIsWarningLoginMessageVisible(true);
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center">
      <div
        className="w-full h-screen bg-grayPrimary hidden lg:flex items-center 
      justify-center"
      >
        <Image
          width={5}
          height={5}
          className="w-96 xl:w-[500px]"
          alt="Ilustração"
          src={illustration}
        />
      </div>

      <div
        className="w-full md:w-[46rem] lg:w-[54rem] flex flex-col items-center justify-center 
      px-4 lg:px-16 gap-y-24"
      >
        <Image width={100} height={100} alt="Logo" src={logoImg} />

        <div className="w-full text-center">
          <h1 className="font-bold text-2xl">Seja Bem-Vindo!</h1>
          <p className="font-light">
            Conecte-se e transforme seus planos em realidade
          </p>
        </div>

        <form
          className="w-full space-y-14"
          onSubmit={handleSubmit(signInSubmit)}
        >
          <div className="space-y-6">
            <LoginInputLabel
              error={errors.email?.message}
              register={register}
              inputType="email"
              labelText="Email"
            />
            <LoginInputLabel
              error={errors.password?.message}
              register={register}
              inputType="password"
              labelText="Senha"
            />
          </div>

          <div className="space-y-3 text-center">
            <Button
              loading={isButtonLoading}
              styles="w-full bg-orangePrimary text-white h-12
          hover:bg-orange-500 duration-300 disabled:bg-orange-300"
            >
              Entrar
            </Button>

            {isWarningLoginMessageVisible && (
              <p className="text-red-500 font-semibold">
                Email ou senha incorretos.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
