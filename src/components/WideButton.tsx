interface WideButtonProps {
  text: string;
  Click: () => void;
}

function WideButton({ text, Click }: WideButtonProps) {
  return (
    <div className="flex">
      <button
        onClick={Click}
        className="bg-green-600 cursor-pointer hover:border-green-600 text-white  py-2 px-4 rounded-3xl w-full hover:border-2 hover:text-green-600 hover:bg-transparent m-2"
      >
        {text}
      </button>
    </div>
  );
}

export default WideButton;
