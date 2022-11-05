import React from "react";
import {UseFormRegister} from "react-hook-form";

type InputPropTypes = {
  label: string;
  dateId: string;
  timeId: string;
  register: UseFormRegister<any>;
};

export const DateTimeInput = ({
  dateId,
  timeId,
  label,
  register,
}: InputPropTypes) => {
  return (
    <label className="flex items-center">
      <span className="basis-1/3">Date & Time</span>
      <div className="flex items-center gap-6 basis-2/3">
        <input
          className="p-2 transition-all duration-200 bg-transparent border-2 border-b-2 border-transparent rounded outline-none marker:bg-white basis-1/2 border-b-white focus:border-white"
          id="calendar-picker"
          type="date"
          {...register("date")}
        />
        <input
          className="p-2 transition-all duration-200 bg-transparent border-2 border-b-2 border-transparent rounded outline-none border-b-white focus:border-white"
          type="time"
          {...register("time")}
        />
      </div>
    </label>
  );
};
