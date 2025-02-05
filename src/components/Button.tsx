import { ButtonHTMLAttributes, ReactNode } from "react";

import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styles: string;
  children: ReactNode;
  loading?: boolean;
}

export default function Button({
  styles,
  children,
  loading,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={loading}
      className={`font-bold rounded duration-300 flex items-center justify-center 
      ${styles}`}
      {...rest}
    >
      {loading ? <FaSpinner className="text-xl animate-spin" /> : children}
    </button>
  );
}
