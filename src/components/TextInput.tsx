import React from "react";
import "../index.css";

interface TextInputProps {
  name: string;
  placeholder: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  name,
  placeholder,
  id,
  type,
  value,
  onChange,
}: TextInputProps) {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={id}
        className="main_text"
      >
        {name}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        className="text-white border-1 border-gray-700 rounded-md p-2 focus:border-black focus:border-1.5 transition ease-in-out duration-150 placeholder-gray-400 placeholder:italic w-full"
      />
    </div>
  );
}

export default Input;
