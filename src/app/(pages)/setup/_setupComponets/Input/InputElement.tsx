import React from "react";
import { useFormContext } from "react-hook-form";
import { FaAsterisk } from "react-icons/fa";

interface InputElementProps {
  id: string;
  label: string;
  type: "text" | "number" | "email" | "time" | "date";
  placeholder?: string;
  required?: boolean;
  registerName: string;
  error?: string;
  readOnly?: boolean;
}

const InputElement: React.FC<InputElementProps> = ({
  id,
  label,
  type,
  placeholder,
  required,
  registerName,
  error,
  readOnly,
}) => {
  const { register } = useFormContext();

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="w-fit h-fit flex font-inter text-[0.8rem] 2xl:text-[0.85rem] font-medium leading-6 text-foundation-grey-grey-800 gap-[1px]"
      >
        {label}
        {required && (
          <span>
            <FaAsterisk size={6} color="red" opacity={0.7} className="mb-1" />
          </span>
        )}
      </label>
      <div className="mt-[2px]">
        <input
          type={type}
          id={id}
          autoComplete={type === "email" ? "email" : "on"}
          placeholder={placeholder}
          className="block w-full rounded-md border border-solid py-1 2xl:py-1.5 px-3 text-foundation-grey-grey-900 shadow-sm outline-none border-foundation-grey-grey-600 placeholder:text-foundation-grey-grey-600 focus:border-2 focus:border-solid focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6 text-[0.835rem] 2xl:text-sm"
          {...register(registerName)}
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
};

export default InputElement;
