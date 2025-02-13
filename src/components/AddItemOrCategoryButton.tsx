import { ButtonHTMLAttributes, ReactNode } from "react";
import { FaPlus } from "react-icons/fa6";

import Button from "./Button";

interface AddItemOrCategoryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function AddCartOrCategoryButton({
  children,
  ...rest
}: AddItemOrCategoryButtonProps) {
  return (
    <div className="absolute h-10 right-6 bottom-6 lg:top-6 lg:right-6">
      <button
        className="w-12 h-12 lg:hidden bg-orangePrimary rounded-full p-4 flex
        items-center justify-center text-white cursor-pointer sm:hover:w-16 sm:hover:h-16 sm:duration-500"
        {...rest}
      >
        <FaPlus size={44} />
      </button>

      <Button
        styles="bg-orangePrimary h-10 px-4 text-white hidden lg:flex
      hover:h-11 hover:px-5 duration-300 gap-x-2 ease-in"
        {...rest}
      >
        <FaPlus size={18} />
        <p>{children}</p>
      </Button>
    </div>
  );
}
