import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface PasswordInputProps {
  name: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PasswordInput({
  name,
  placeholder,
  id,
  value,
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full relative">
      <label
        htmlFor={id}
        className="main_text"
      >
        {name}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          className="text-white border border-gray-700 rounded-md p-2 pr-10 focus:border-black transition ease-in-out duration-150 placeholder-gray-400 placeholder:italic w-full"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
