interface MainButtonProps {
  text: string;
  onClick: () => void;
}

function MainButton({ text }: MainButtonProps) {
  return (
    <div className="flex justify-center">
      <button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-1/2">
        {text}
      </button>
    </div>
  );
}

export default MainButton;
