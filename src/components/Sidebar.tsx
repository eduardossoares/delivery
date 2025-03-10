"use client";

import Image from "next/image";
import logoImg from "@/../public/logo.svg";

import { FaRegClock } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { FaRegFolder } from "react-icons/fa";
import { FiTag } from "react-icons/fi";
import { ReactNode, useState } from "react";
import { PiSignOut } from "react-icons/pi";
import { IoIosMenu } from "react-icons/io";

import Link from "next/link";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

type Item = {
  title: string;
  path: string;
  icon: ReactNode;
};

const items: Item[] = [
  {
    title: "Pedidos Pendentes",
    path: "/dashboard",
    icon: <FaRegClock className="text-orangePrimary text-xl lg:text-base" />,
  },
  {
    title: "Pedidos Finalizados",
    path: "/dashboard/closed-orders",
    icon: <FaCheck className="text-orangePrimary text-xl lg:text-base" />,
  },
  {
    title: "Gerenciar Categorias",
    path: "/dashboard/categories",
    icon: <FaRegFolder className="text-orangePrimary text-xl lg:text-base" />,
  },
  {
    title: "Gerenciar Produtos",
    path: "/dashboard/products",
    icon: <FiTag className="text-orangePrimary text-xl lg:text-base" />,
  },
];

export default function Sidebar() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const { signOut } = useContext(AuthContext);

  return (
    <div>
      <IoIosMenu
        onClick={() => setIsSidebarVisible(true)}
        className={`cursor-pointer absolute right-2 top-2 text-orangePrimary lg:hidden`}
        size={38}
      />

      <aside
        className={`w-full bg-graySecondary absolute left-[-100%] lg:left-[0%] h-screen flex flex-col items-center 
        justify-between lg:justify-normal lg:gap-y-24 lg:border-r-2 lg:border-r-zinc-200 lg:border-opacity-50 z-50
        duration-500 ease-in-out py-24 lg:py-14 lg:relative lg:w-64 ${
          isSidebarVisible && "left-[0%]"
        }`}
      >
        <IoClose
          onClick={() => setIsSidebarVisible(false)}
          className="cursor-pointer absolute right-2 top-2 text-orangePrimary lg:hidden"
          size={38}
        />

        <Image alt="Logo" src={logoImg} className="w-20 lg:w-16" />
        <div className="flex flex-col gap-y-4 lg:gap-y-0 lg:w-full">
          {items.map((item, index) => (
            <Link
              onClick={() => setIsSidebarVisible(false)}
              className="flex flex-row items-center gap-x-2 text-zinc-500 font-medium
              lg:hover:bg-gray-200 lg:pl-6 lg:py-2 duration-500"
              key={index}
              href={item.path}
            >
              {item.icon}
              <p className="text-xl lg:text-base lg:font-normal">
                {item.title}
              </p>
            </Link>
          ))}
        </div>

        <Link
          className="flex items-center gap-x-1 cursor-pointer lg:absolute bottom-8"
          href={"/sign-in"} onClick={signOut}
        >
          <PiSignOut className="text-xl lg:text-lg text-orangePrimary" />
          <p className="text-lg font-normal text-zinc-500 lg:text-base">Sair</p>
        </Link>
      </aside>
    </div>
  );
}
