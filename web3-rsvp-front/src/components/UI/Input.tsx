import React from "react";
import {UseFormRegister} from "react-hook-form";

type InputPropTypes = {
  label: string;
  id: string;
  register: UseFormRegister<any>;
  type: string;
  placeholder: string;
  textArea?: boolean;
  min?: number;
  step?: number;
};

export const Input = ({
  register,
  label,
  id,
  type,
  placeholder,
  textArea,
  min,
  step,
}: InputPropTypes) => {
  if (textArea)
    return (
      <label className="flex items-center">
        <span className="basis-1/3">{label}</span>
        <textarea
          placeholder={placeholder}
          {...register(id)}
          className="p-2 transition-all duration-200 bg-transparent border-2 border-b-2 border-transparent rounded outline-none border-b-white focus:border-white basis-2/3"
          rows={10}
        />
      </label>
    );

  return (
    <label className="flex items-center">
      <span className="basis-1/3">{label}</span>
      <input
        min={min}
        placeholder={placeholder}
        step={step}
        type={type}
        {...register(id)}
        className="p-2 transition-all duration-200 bg-transparent border-2 border-b-2 border-transparent rounded outline-none border-b-white focus:border-white basis-2/3"
      />
    </label>
  );
};
