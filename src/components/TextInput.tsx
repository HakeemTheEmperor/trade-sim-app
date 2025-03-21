import "../index.css";

interface TextInputProps {
  name: string;
  placeholder: string;
  id: string;
  type: string;
}

function Input({ name, placeholder, id, type }: TextInputProps) {
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
        className="text-black border-1 border-gray-700 rounded-md p-2 focus:border-black focus:border-1.5 transition ease-in-out duration-150 placeholder-gray-400 placeholder:italic w-full"
      />
    </div>
  );
}

export default Input;
