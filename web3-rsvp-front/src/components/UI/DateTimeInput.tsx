import React from "react";
import {UseFormRegister} from "react-hook-form";

type InputPropTypes = {
  label: string;
  dateId: string;
  timeId: string;
  description?: string;
  register: UseFormRegister<any>;
};

export const DateTimeInput = ({
  dateId,
  timeId,
  label,
  description,
  register,
}: InputPropTypes) => {
  return (
    <label className="flex items-center gap-10">
      <div className="basis-1/3">
        <span>{label}</span>
        {Boolean(description) && (
          <p className="text-sm">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-6 basis-2/3">
        <input
          className="p-2 transition-all duration-200 bg-transparent border-2 border-b-2 border-transparent rounded outline-none marker:bg-white basis-1/2 border-b-white focus:border-white"
          id="calendar-picker"
          type={dateId}
          {...register("date")}
        />
        <input
          className="p-2 transition-all duration-200 bg-transparent border-2 border-b-2 border-transparent rounded outline-none border-b-white focus:border-white"
          type={timeId}
          {...register("time")}
        />
      </div>
    </label>
  );
};
