"use client";

import { useState } from "react";

import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface LoginInputLabelProps {
  inputType: string;
  labelText: string;
  placeholderText?: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export default function LoginInputLabel({
  labelText,
  placeholderText,
  inputType,
  register,
  error,
  rules,
}: LoginInputLabelProps) {
  if (inputType === "email") {
    return (
      <div className="flex flex-col">
        <label>{labelText}</label>
        <div className="w-full flex flex-col gap-y-1">
          <input
            className="border-b border-b-orangePrimary px-1 text-zinc-500"
            type="email"
            placeholder={placeholderText}
            {...register(inputType, rules)}
            id={inputType}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    );
  }

  if (inputType === "password") {
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const handlePasswordVisibility = () => {
      setPasswordVisibility(!passwordVisibility);
    };

    return (
      <div className="flex flex-col">
        <label>{labelText}</label>
        <div className="flex flex-row justify-between gap-2 pr-1 border-b 
          border-b-orangePrimary">
          <input
            className="px-1 flex-1 text-zinc-500"
            type={passwordVisibility ? "text" : "password"}
            placeholder={placeholderText}
            {...register(inputType, rules)}
            id={inputType}
          />
          {passwordVisibility ? (
            <AiOutlineEye
              onClick={handlePasswordVisibility}
              className="cursor-pointer text-xl text-orangePrimary"
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={handlePasswordVisibility}
              className="cursor-pointer text-xl text-orangePrimary"
            />
          )}
        </div>
        {error && (
            <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
}
