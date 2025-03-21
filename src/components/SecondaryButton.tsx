interface SecondaryButtonProps {
  text: string;
  Click: () => void;
}

function SecondaryButton({ text }: SecondaryButtonProps) {
  return (
    <div className="flex justify-center">
      <button
        className={`text-green-600 cursor-pointer py-2 px-6 rounded-3xl w-full border-green-600 border-2 mt-2 hover:bg-green-600 hover:text-white `}
      >
        {text}
      </button>
    </div>
  );
}

export default SecondaryButton;
