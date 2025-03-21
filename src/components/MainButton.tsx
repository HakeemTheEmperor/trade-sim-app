interface MainButtonProps {
  text: string;
  Click: () => void;
}

function MainButton({ text, Click }: MainButtonProps) {
  return (
    <div className="flex justify-center">
      <button
        className="bg-green-600 cursor-pointer hover:border-green-600 text-white  py-2 px-4 rounded-3xl w-full hover:border-2 hover:text-green-600 hover:bg-transparent m-2"
        onClick={Click}
      >
        {text}
      </button>
    </div>
  );
}

export default MainButton;
