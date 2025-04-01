interface InactiveButtonProps {
  text: string;
}

function InactiveButton({ text }: InactiveButtonProps) {
  return (
    <div className="flex justify-center">
      <button
        disabled
        className={`text-gray-600 cursor-not-allowed py-2 px-6 rounded-3xl w-full border-gray-600 border-2 mt-2  hover:text-gray-600 `}
      >
        {text}
      </button>
    </div>
  );
}

export default InactiveButton;
